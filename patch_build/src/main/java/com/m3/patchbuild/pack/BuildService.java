package com.m3.patchbuild.pack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.patchbuild.base.BussFactory;

/**
 * 构建服务，处理系统构建
 * @author pangl
 *
 */
public class BuildService {
	private static final Logger logger = Logger.getLogger(BuildService.class);
	
	private static List<Pack> queue = new ArrayList<Pack>(); //待构建队列
	
	private static Map<String, BuildThread> buildThreads = new HashMap<String, BuildThread>(); //构建线程
	
	private static int threadSize = 3; //同时运行的线程数量
	
	static {
		startMonitor();
	}
	
	public static void add(Pack pack) {
		synchronized (queue) {
			queue.add(pack);
			queue.notifyAll();
		}
	}
	
	public static void buildComplete(Pack pack) {
		synchronized (queue) {
			buildThreads.remove(pack.getBuildNo());
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
			List<Pack> list = ((IPackService)BussFactory.getService(Pack.class))
					.listByStatus(PackStatus.request);
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
					try {
						synchronized (queue) {
							try {
								if (!queue.isEmpty()) {
									Pack pack = queue.remove(0);
									//正在构建相同的包，则忽略现有
									if (buildThreads.containsKey(pack.getBuildNo())) {
										logger.error("相同的构建包正在构建当中，放弃当前构建" + pack.getBuildNo());
									} else if (buildThreads.size() >= threadSize) {
										try {
											Thread.sleep(1000);
										} catch (Throwable t) {
											logger.error("构建监控线程等待时出错", t);
										}
										queue.add(0, pack);
									} else {
										BuildThread thread = new BuildThread();
										buildThreads.put(pack.getBuildNo(), thread);
										thread.startBuild(pack);
									}
								} else {
									try {
										queue.wait();
									} catch (InterruptedException e) {
										logger.error("构建监控线程等待时出错", e);
									}
								}
							} catch (Throwable t) {
								logger.error("构建时出错", t);
							}
						}
					} catch (Throwable t) {
						logger.error("打包主线程出错", t);
					}
				}
			}
		};
		monitor.setDaemon(true);
		monitor.start();
	}
}
