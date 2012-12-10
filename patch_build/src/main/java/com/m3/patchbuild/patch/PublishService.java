package com.m3.patchbuild.patch;

import java.io.File;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackHandleContext;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 发布服务
 * @author pangl
 *
 */
public class PublishService {
	public static final String DEFAULT_ANT_FILE = "/default_publish.xml";
	
	private static final Logger logger = Logger.getLogger(PublishService.class);
	
	private static List<String> queue = new ArrayList<String>(); //待构建队列
	private static Map<String, String> reqUsers = new HashMap<String, String>();
	
	
	static {
		startMonitor();
	}
	
	/**
	 * 发布构建包， 同时返回队列长度
	 * @param pack
	 * @return
	 */
	public static int publish(String packUuid) {
		synchronized (queue) {
			queue.add(packUuid);
			reqUsers.put(packUuid, ContextUtil.getUserId());
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
		Thread monitor = new Thread("Publish Thread") {
			@Override
			public void run() {
				while(true) {
					try {
						synchronized (queue) {
							if (!queue.isEmpty()) {
								String uuid = queue.remove(0);
								String userid = reqUsers.remove(uuid);
								publish(uuid, userid);
							} else {
								try {
									queue.wait();
								} catch (InterruptedException e) {
									logger.error("发布线程等待时出错", e);
								}
							}
						}
					} catch(Throwable t) {
						logger.error("发布时出错", t);
					}
				}
			}
		};
		monitor.setDaemon(true);
		monitor.start();
	}
	
	public static void publish(String packuuid, String userId) {
		HibernateUtil.openSession();
		IPackService packService = (IPackService) BussFactory.getService(Pack.class);
		Pack pack = (Pack) packService.findByUuid(packuuid);
		PackHandleContext context = (PackHandleContext)packService.newContext();
		context.setOldStatus(pack.getStatus());
		Patch patch = null;
		try {
			patch = doBuild(pack);
			patch.setLastModify(new Date());
			patch.addBuild(pack.getBuildNo());
			IPatchService patchService = ((IPatchService) BussFactory
					.getService(Patch.class));
			patchService.save(patch);
			// 发送相应的邮件
		} catch (Exception e) {
			context.setException(e);
			logger.error("执行发布时出错", e);
		} finally {
			context.setDeployer(userId);
			if (patch != null)
				context.setPatchNo(patch.getName());
			ContextUtil.setUserId(userId);
			packService.handle(pack, context);
			HibernateUtil.closeSession();
		}
	}

	private static Patch doBuild(Pack pack) throws Exception {
		if (!pack.getDepends().isEmpty()) {
			String deps = "";
			for (Pack p : pack.getDepends()) {
				if (!PackStatus.published.equals(p.getStatus()))
					deps += p + ",";
			}
			if (deps.length() > 0)
				throw new Exception("无法发布" + pack.getBuildNo() + ", 依赖的包未发布:" + deps);
		}
		Branch branch = pack.getBranch();
		IPatchService patchService = ((IPatchService) BussFactory
				.getService(Patch.class));
		Patch patch = patchService.getPatch(branch, (Date) null);
		// 如果当天还没有补丁生成，则先生成补丁
		if (patch == null) {
			patch = patchService.createPatch(branch);
		}

		File antFile = new File(branch.getWorkspace(), Branch.FILE_PUBLISH);
		if (!antFile.exists()) {
			antFile = new File(PublishService.class.getResource(
					DEFAULT_ANT_FILE).getFile());
		}

		Project proj = new Project();
		// 添加日志输出
		File logFile = patch.getPublishLog(pack);
		if (!logFile.getParentFile().exists())
			logFile.getParentFile().mkdirs();
		PrintStream logOut = new PrintStream(logFile);
		DefaultLogger consoleLogger = new DefaultLogger();
		consoleLogger.setErrorPrintStream(logOut);
		consoleLogger.setOutputPrintStream(logOut);
		// consoleLogger.setErrorPrintStream(System.err);
		// consoleLogger.setOutputPrintStream(System.out);
		// 输出信息级别
		consoleLogger.setMessageOutputLevel(Project.MSG_VERBOSE);
		proj.addBuildListener(consoleLogger);

		proj.fireBuildStarted();
		proj.init();

		proj.setProperty("dir.branch", branch.getWorkspace());
		proj.setProperty("dir.patch", patch.getWSRoot().getAbsolutePath());
		proj.setProperty("dir.publish", patch.getPublishWS(pack)
				.getAbsolutePath());
		proj.setProperty("pack.file", pack.getZipFile().getAbsolutePath());
		proj.setProperty("patch.name", patch.getName());

		ProjectHelper helper = ProjectHelper.getProjectHelper();
		helper.parse(proj, antFile);
		proj.executeTarget(proj.getDefaultTarget());
		proj.fireBuildFinished(null);
		logOut.flush();
		logOut.close();
		return patch;
	}

}
