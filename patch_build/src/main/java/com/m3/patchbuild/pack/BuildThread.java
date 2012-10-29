package com.m3.patchbuild.pack;

import java.io.File;
import java.io.PrintStream;

import org.apache.log4j.Logger;
import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BuildBranchService;

/**
 * 构建包组装线程
 * @author pangl
 *
 */
public class BuildThread extends Thread {
	public static final String DEFAULT_ANT_FILE = "/default_build.xml";
	
	private Logger logger = Logger.getLogger(BuildThread.class);
	private Pack bp = null;
	
	BuildThread() {
		super("Build Pack Thead");
	}
	
	public synchronized void startBuild(Pack bp) {
		this.bp = ((PackService)BussFactory.getService(Pack.class))
				.find(bp.getBranch().getBranch(), bp.getBuildNo());
		this.start();
	}

	@Override
	public synchronized void run() {
		try {
			doBuild();
			bp.setStatus(BuildPackStatus.builded);
		} catch (Exception e) {
			logger.error("执行构建时出错", e);
			bp.setStatus(BuildPackStatus.buildFail);
		} finally {
			BuildService.buildComplete();
			((PackService)BussFactory.getService(Pack.class)).builded(bp);
		}
		
	}
	
	private void doBuild() throws Exception {
		File antFile = new File(bp.getWSRoot(), Branch.FILE_BUILD);
		if (!antFile.exists()) {
			antFile = new File(BuildThread.class.getResource(DEFAULT_ANT_FILE).getFile());
		}
		
		Project proj = new Project();
		//添加日志输出  
		PrintStream logOut = new PrintStream(bp.getBuildLog());
        DefaultLogger consoleLogger = new DefaultLogger();  
        consoleLogger.setErrorPrintStream(logOut);  
        consoleLogger.setOutputPrintStream(logOut);  
        //输出信息级别  
        consoleLogger.setMessageOutputLevel(Project.MSG_VERBOSE);  
        proj.addBuildListener(consoleLogger);  
		
		proj.fireBuildStarted();
		proj.init();
		Branch branch = bp.getBranch();
		proj.setProperty("dir.branch", branch.getWorkspace());
		proj.setProperty("dir.build", bp.getWSRoot().getAbsolutePath());
		proj.setProperty("build.buildNo", bp.getBuildNo());
		//如果是子分支，那么需要共享主分支的编译环境
		boolean hasParent = branch.getParent() != null;
		if (hasParent) {
			Branch parent = BuildBranchService.getBranch(branch.getParent());
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
