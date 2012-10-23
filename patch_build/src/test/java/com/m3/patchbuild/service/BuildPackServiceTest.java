package com.m3.patchbuild.service;

import java.util.List;

import org.tmatesoft.svn.core.SVNException;

import junit.framework.TestCase;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;
import com.m3.patchbuild.info.SVNLog;

public class BuildPackServiceTest extends TestCase{
	
	public void test_create() {
		if (BuildPackService.find("sp1", "test_build") == null) {
			BuildBranch branch = BuildBranchService.getBranch("sp1");
			BuildPack bp = new BuildPack();
			bp.setBuildNo("test_build");
			bp.setBranch(branch);
			bp.addDepends("depend1");
			bp.setStatus(BuildPackStatus.init);
			
			BuildFile file = new BuildFile();
			file.setUrl("test url");
			bp.addBuildFile(file);
			
			BuildPackService.save(bp);
			System.out.println("Bulid Pack crateed!");
		}
	}
	
	public void test_prepareBuild() throws SVNException {
		BuildPack bp = BuildPackService.find("sp1", "testBuild2");
		if (bp != null) {
			BuildPackService.delete(bp);
		}
		bp = new BuildPack();
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		bp.setBranch(branch);
		bp.setBuildNo("testBuild2");
		List<SVNLog> logs = SVNLogService.listByKeyword(branch, "SX-AKS1-002");
		for (SVNLog log : logs) {
			bp.addFilePath(log.getPath());
		}
		BuildPackService.prepareBuild(bp);
//		BuildPack bp = new BuildPack();
//		BuildBranch branch = BuildBranchService.getBranch("sp1");
//		bp.setBuildNo("aaaaaaaaaa");
//		bp.setBranch(branch);
		//BuildPackService.save(bp);
	}

}
