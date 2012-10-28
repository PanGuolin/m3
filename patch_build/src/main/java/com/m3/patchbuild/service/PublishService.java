package com.m3.patchbuild.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;
import com.m3.patchbuild.info.PatchInfo;

/**
 * 发布服务
 * @author pangl
 *
 */
public class PublishService {
	public static final String DEFAULT_ANT_FILE = "/default_publish.xml";
	
	private static final Logger logger = Logger.getLogger(PublishService.class);
	
	private static List<BuildPack> queue = new ArrayList<BuildPack>(); //待构建队列
	
	private static PublishThread publishThread = new PublishThread();
	
	static {
		startMonitor();
	}
	
	/**
	 * 发布构建包， 同时返回队列长度
	 * @param pack
	 * @return
	 */
	public static int publish(BuildPack pack) {
		synchronized (queue) {
			queue.add(pack);
			queue.notifyAll();
		}
		return queue.size();
	}
	
	public static void complete() {
		synchronized (queue) {
			queue.notifyAll();
		}
	}
	
	/**
	 * 启动监控线程
	 */
	private static void startMonitor() {
		//初始化构建线程
		Thread monitor = new Thread() {
			@Override
			public void run() {
				while(true) {
					synchronized (queue) {
						boolean begin = false;
						if (!queue.isEmpty()) {
							if (!publishThread.isAlive()) {
								publishThread.publish(queue.remove(0));
								begin = true;
							}
						}
						if (!begin) {
							try {
								queue.wait();
							} catch (InterruptedException e) {
								logger.error("发布线程等待时出错", e);
							}
						}
					}
				}
			}
		};
		monitor.setDaemon(true);
		monitor.start();
	}
	
	/**
	 * 补丁构建线程
	 * @author pangl
	 *
	 */
	private static class PublishThread extends Thread {
			private BuildPack bp = null;
			private PatchInfo patch = null;
			
			public synchronized void publish(BuildPack bp) {
				this.bp = bp;
				this.patch = PatchService.getPatch(bp.getBranch(), (Date)null);
				//如果当天还没有补丁生成，则先生成补丁
				if (patch == null) {
					patch = PatchService.createPatch(bp.getBranch());
				}
				this.start();
			}

			@Override
			public synchronized void run() {
				try {
					doBuild();
					bp.setStatus(BuildPackStatus.published);
					bp.setPatch(patch.getName());
					//发送相应的邮件
				} catch (Exception e) {
					logger.error("执行构建时出错", e);
					bp.setStatus(BuildPackStatus.publishFail);
					ByteArrayOutputStream bo = new ByteArrayOutputStream();
					e.printStackTrace(new PrintStream(bo));
					bp.setFailReason(bo.toString());
					//出错则不改变状态, 同时发布邮件
				} finally {
					BuildPackService.save(bp);
					MailService.sendMail(bp);
				}
			}
			
			private void doBuild() throws Exception {
				BuildBranch branch = bp.getBranch();
				File antFile = new File(branch.getWorkspace(), BuildBranch.FILE_PUBLISH);
				if (!antFile.exists()) {
					antFile = new File(PublishService.class.getResource(DEFAULT_ANT_FILE).getFile());
				}
				
				Project proj = new Project();
				//添加日志输出  
				File logFile = patch.getPublishLog(bp);
				if (!logFile.getParentFile().exists())
					logFile.getParentFile().mkdirs();
				PrintStream logOut = new PrintStream(logFile);
		        DefaultLogger consoleLogger = new DefaultLogger();  
		        consoleLogger.setErrorPrintStream(logOut);  
		        consoleLogger.setOutputPrintStream(logOut);  
		        //consoleLogger.setErrorPrintStream(System.err);  
		        //consoleLogger.setOutputPrintStream(System.out);
		        //输出信息级别  
		        consoleLogger.setMessageOutputLevel(Project.MSG_VERBOSE);  
		        proj.addBuildListener(consoleLogger);  
				
				proj.fireBuildStarted();
				proj.init();

				proj.setProperty("dir.branch", branch.getWorkspace());
				proj.setProperty("dir.patch", patch.getWSRoot().getAbsolutePath());
				proj.setProperty("dir.publish", patch.getPublishWS(bp).getAbsolutePath());
				proj.setProperty("pack.file", bp.getZipFile().getAbsolutePath());
				proj.setProperty("patch.name", patch.getName());
				
				ProjectHelper helper = ProjectHelper.getProjectHelper();
				helper.parse(proj, antFile);
				proj.executeTarget(proj.getDefaultTarget());
				proj.fireBuildFinished(null);
				logOut.flush();
				logOut.close();
				//改变构建包状态
				//bp.setStatus(BuildPackStatus.builded);
				//BuildPackService.builded(bp);
			}	
		}


}
