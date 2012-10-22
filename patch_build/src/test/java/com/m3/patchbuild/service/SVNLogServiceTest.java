package com.m3.patchbuild.service;

import java.util.List;
import java.util.Set;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.SVNLog;

import junit.framework.TestCase;

public class SVNLogServiceTest extends TestCase {
	
	public void test_fillBuildPack() throws SVNException {
		BuildPack pack = new BuildPack();
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		pack.setBranch(branch);
		
		List<SVNLog> logs = SVNLogService.listByKeyword(branch, "XD-JD03-021");
		for (SVNLog log : logs) {
			pack.addFilePath(log.getPath());
		}
		
		SVNLogService.fillBuildPack(pack);
		Set<BuildFile> list = pack.getBuildFiles();
		for (BuildFile file : list) {
			System.out.println(file.getUrl() + ", " + file.getRevision() + ", " + file.getModifier());
		}
		
		
	}

}
