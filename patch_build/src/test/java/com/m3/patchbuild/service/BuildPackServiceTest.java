package com.m3.patchbuild.service;

import org.tmatesoft.svn.core.SVNException;

import junit.framework.TestCase;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;

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
		BuildPack bp = BuildPackService.find("sp1", "test_build");
		BuildPackService.prepareBuild(bp);
	}

}
