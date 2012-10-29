package com.m3.patchbuild.pack;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.BuildBranchDAO;

/**
 * 构建服务，处理系统构建
 * @author pangl
 *
 */
public class BuildService {
	private static final Logger logger = Logger.getLogger(BuildService.class);
	
	private static List<Pack> queue = new ArrayList<Pack>(); //待构建队列
	
	private static List<BuildThread> buildThreads = new ArrayList<BuildThread>(); //构建线程
	
	private static int threadSize = 3; //同时运行的线程数量
	
	static {
		startMonitor();
	}
	
	public static void add(Pack buildPack) {
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
	private static void startMonitor() {
		//从数据库中读取上次未构建的任务重新进行构建
		try {
			List<Pack> list = ((PackService)BussFactory.getService(Pack.class))
					.listByStatus(PackStatus.checked);
			synchronized (queue) {
				for (Pack bp : list) {
					queue.add(bp);
				}
			}
		} catch (Exception ex) {
			logger.error("初始化构建数据时出错", ex);
		}
		
		//初始化构建线程
		Thread monitor = new Thread("Build Monitor") {
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
