package com.m3.patchbuild.pack;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.m3.common.FileUtil;
import com.m3.common.HibernateUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.SysParam;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.message.IHandleService;
import com.m3.patchbuild.svn.ISVNLogService;
import com.m3.patchbuild.svn.SVNLog;
import com.m3.patchbuild.svn.SVNUtil;

/**
 * 构建包组装线程
 * @author pangl
 *
 */
public class BuildThread extends Thread {
	public static final String DEFAULT_ANT_FILE = "/default_build.xml";
	
	private Logger logger = Logger.getLogger(BuildThread.class);
	private Pack bp = null;
	private PrintStream logOut = null;
	private Project proj = new Project();
	private PrintStream sysOut = null;
	
	BuildThread() {
		super("Build Pack Thead");
		this.setDaemon(true);
	}
	
	public synchronized void startBuild(Pack bp) {
		this.bp = bp;
		this.start();
	}

	@Override
	public void run() {
		IHandleService packService = (IHandleService)BussFactory.getService(Pack.class);
		PackHandleContext context = (PackHandleContext) packService.newContext();
		context.setOldStatus(bp.getStatus());
		try {
			doBuild();
			proj.fireBuildFinished(null);
		} catch (Throwable e) {
			if (logOut != null)
				e.printStackTrace(new PrintStream(this.logOut));
			context.setException(e);
			logger.error("执行构建时出错", e);
//			bp.setStatus(PackStatus.buildFail);
		} finally {
			if (logOut != null) {
				logOut.flush();
				logOut.close();
			}
			if (sysOut != null) {
				System.setOut(sysOut);
			}
			BuildService.buildComplete(bp);
			packService.handle(bp, context);
		}
	}
	

	private void doBuild() throws Throwable {
		
		HibernateUtil.openSession();
		Branch branch = null;
		try {
			IPackService packService = (IPackService)BussFactory.getService(Pack.class);
			bp = packService.find(bp.getBranch().getBranch(), bp.getBuildNo());
			File logFile = bp.getBuildLogFile();
			logFile.getParentFile().mkdirs();
			logOut = new PrintStream(logFile);
			branch = bp.getBranch();
			File bpRoot = new File(bp.getWSRoot(), Branch.DIR_SVN);
			FileUtil.emptyDir(bpRoot);
			List<String> files = Arrays.asList(bp.getFilePaths());
			SVNUtil.getFile(branch.getSvnUrl(), branch.getSvnUser(), branch.getSvnPassword(), bpRoot, files);
			ISVNLogService logService = (ISVNLogService) BussFactory.getService(SVNLog.class);
			logService.fillBuildPack(bp);
		} finally {
			HibernateUtil.closeSession();
		}
		
		if (!StringUtil.isEmpty(bp.getLibfiles())) {
			String[] files = bp.getLibfiles().split(";");
			String rootUrl = SysParam.getLibRootURL();
			if (!rootUrl.endsWith("/"))
				rootUrl = rootUrl + "/";
			for (String file : files) {
				file = file.replaceAll("\\\\", "/").trim();
				if (file.startsWith("/"))
					file = file.substring(1);
				String name = file;
				if (name.indexOf('/') != -1) {
					name = name.substring(name.lastIndexOf('/') + 1);
				}
				URL url = new URL(rootUrl + file);
				InputStream input = url.openStream();
				File toFile = new File(bp.getWSRoot(), "/lib/" + name);
				toFile.getParentFile().mkdirs();
				OutputStream output = new FileOutputStream(toFile);
				final int buffSize = 1024;
				byte[] bs = new byte[buffSize];
				int len;
				while((len = input.read(bs)) != -1) {
					output.write(bs, 0, len);
				}
				input.close();
				output.close();
			}
		}
		
        DefaultLogger consoleLogger = new DefaultLogger();  
        consoleLogger.setErrorPrintStream(logOut);  
        consoleLogger.setOutputPrintStream(logOut); 
        consoleLogger.setMessageOutputLevel(Project.MSG_VERBOSE); 
        
		File antFile = new File(bp.getBranch().getWorkspace(), Branch.FILE_BUILD);
		if (!antFile.exists()) {
			antFile = new File(BuildThread.class.getResource(DEFAULT_ANT_FILE).getFile());
		}
		
        //输出信息级别  
        proj.addBuildListener(consoleLogger); 
		proj.fireBuildStarted();
		proj.init();
		proj.setProperty("dir.branch", branch.getWorkspace());
		proj.setProperty("dir.build", bp.getWSRoot().getAbsolutePath());
		proj.setProperty("build.buildNo", bp.getBuildNo());
		//如果是子分支，那么需要共享主分支的编译环境
		boolean hasParent = branch.getParent() != null;
		if (hasParent) {
			IBranchService branchService = (IBranchService)BussFactory.getService(Branch.class);
			Branch parent = branchService.getBranch(branch.getParent());
			if (parent != null) {
				proj.setProperty("compile.lib", parent.getWorkspace() + "/lib");
				proj.setProperty("compile.classes", parent.getWorkspace() + "/classes");
			} else {
				hasParent = false;
			}
		}
		if (!hasParent) {
			proj.setProperty("compile.lib", branch.getWorkspace() + "/lib");
			proj.setProperty("compile.classes", branch.getWorkspace() + "/classes");
		}
		
		sysOut = System.out;
		System.setOut(logOut);
		System.setErr(logOut);
		ProjectHelper helper = ProjectHelper.getProjectHelper();
		helper.parse(proj, antFile);
		proj.executeTarget(proj.getDefaultTarget());
		proj.fireBuildFinished(null);
	}	
}
