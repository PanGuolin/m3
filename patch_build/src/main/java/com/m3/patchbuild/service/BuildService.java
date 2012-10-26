package com.m3.patchbuild.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.m3.patchbuild.dao.BuildBranchDAO;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;

/**
 * 构建服务，处理系统构建
 * @author pangl
 *
 */
public class BuildService {
	private static final Logger logger = Logger.getLogger(BuildService.class);
	
	private static List<BuildPack> queue = new ArrayList<BuildPack>(); //待构建队列
	
	private static List<BuildThread> buildThreads = new ArrayList<BuildThread>(); //构建线程
	
	private static int threadSize = 3; //同时运行的线程数量
	
	private static volatile boolean start = false;
	
	public static void add(BuildPack buildPack) {
		synchronized (queue) {
			queue.add(buildPack);
			queue.notifyAll();
		}
	}
	
	public static void buildComplete() {
		synchronized (queue) {
			queue.notifyAll();
		}
	}
	
	public static void setThreadSize(int size) {
		synchronized (queue) {
			threadSize = size;
			queue.notifyAll();
		}
	}
	
	/**
	 * 启动监控线程
	 */
	public static void startMonitor() {
		if (start)
			return;
		//从数据库中读取上次未构建的任务重新进行构建
		try {
			List<BuildPack> list = BuildPackService.listByStatus(BuildPackStatus.checked);
			synchronized (queue) {
				for (BuildPack bp : list) {
					queue.add(bp);
				}
			}
		} catch (Exception ex) {
			logger.error("初始化构建数据时出错", ex);
		}
		
		//初始化构建线程
		Thread monitor = new Thread() {
			@Override
			public void run() {
				while(true) {
					synchronized (queue) {
						boolean begin = false;
						if (!queue.isEmpty()) {
							//判断是否有可用的线程，否则等待
							for (BuildThread thread : buildThreads) {
								if (thread.isAlive()) {
									thread.startBuild(queue.remove(0));
									begin = true;
									break;
								}
							}
							if (!begin) {
								if (buildThreads.size() < threadSize) {
									BuildThread thread = new BuildThread();
									thread.setDaemon(true);
									buildThreads.add(thread);
									thread.startBuild(queue.remove(0));
									begin = true;
								}
							}
						}
						if (!begin) {
							try {
								queue.wait();
							} catch (InterruptedException e) {
								logger.error("构建监控线程等待时出错", e);
							}
						}
					}
				}
			}
		};
		monitor.setDaemon(true);
		monitor.start();
		start = true;
	}
	
	private static BuildBranchDAO dao = new BuildBranchDAO();
	/**
	 * 获取分支对应的构建脚本
	 * @param branch
	 * @return
	 */
	public static String getBuildScript(String branch) {
		return dao.getBuildScript(branch);
	}

}