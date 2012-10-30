package com.m3.patchbuild.pack;

import java.io.File;
import java.io.PrintStream;
import java.util.Set;

import org.apache.log4j.Logger;
import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.m3.common.FileUtil;
import com.m3.common.HibernateUtil;
import com.m3.common.SVNUtil;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.svn.SVNLogService;

/**
 * 构建包组装线程
 * @author pangl
 *
 */
public class BuildThread extends Thread {
	public static final String DEFAULT_ANT_FILE = "/default_build.xml";
	
	private Logger logger = Logger.getLogger(BuildThread.class);
	private Pack bp = null;
	private Set<String> files;
	private PrintStream logOut = null;
	private Project proj = new Project();
	
	BuildThread() {
		super("Build Pack Thead");
		this.setDaemon(true);
	}
	
	public synchronized void startBuild(Pack bp, Set<String> files) {
		this.bp = bp;
		this.files = files;
		this.start();
	}

	@Override
	public void run() {
		
		try {
			doBuild();
			bp.setStatus(PackStatus.builded);
			proj.fireBuildFinished(null);
		} catch (Throwable e) {
			proj.fireBuildFinished(e);
			logger.error("执行构建时出错", e);
			bp.setStatus(PackStatus.buildFail);
		} finally {
			try {
				if (logOut != null) {
					logOut.flush();
					logOut.close();
				}
				BuildService.buildComplete(bp);
				((PackService)BussFactory.getService(Pack.class)).builded(bp);
			} finally {
			}
		}
	}
	

	private void doBuild() throws Throwable {
		
		HibernateUtil.openSession();
		Branch branch = null;
		try {
			PackService packService = (PackService)BussFactory.getService(Pack.class);
			bp = packService.find(bp.getBranch().getBranch(), bp.getBuildNo());
			branch = bp.getBranch();
			File bpRoot = new File(bp.getWSRoot(), Branch.DIR_SVN);
			FileUtil.emptyDir(bpRoot);
			SVNUtil.getFile(branch.getSvnUrl(), branch.getSvnUser(), branch.getSvnPassword(), bpRoot, files);
			SVNLogService.fillBuildPack(bp, files);
		} finally {
			HibernateUtil.closeSession();
		}
		
		logOut = new PrintStream(bp.getBuildLog());
        DefaultLogger consoleLogger = new DefaultLogger();  
        consoleLogger.setErrorPrintStream(logOut);  
        consoleLogger.setOutputPrintStream(logOut); 
        consoleLogger.setMessageOutputLevel(Project.MSG_VERBOSE); 
        
		File antFile = new File(bp.getWSRoot(), Branch.FILE_BUILD);
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
			Branch parent = BranchService.getBranch(branch.getParent());
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
	}	
}
