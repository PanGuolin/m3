package com.m3.patchbuild.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.svn.SVNLog;
import com.m3.patchbuild.svn.SVNLogService;

import junit.framework.TestCase;

public class SVNLogServiceTest extends TestCase {
	
	public void test_fillBuildPack() throws SVNException {
		Pack pack = new Pack();
		Branch branch = BranchService.getBranch("sp1");
		pack.setBranch(branch);
		
		List<SVNLog> logs = SVNLogService.listByKeyword(branch, "XD-JD03-021");
		for (SVNLog log : logs) {
			pack.addFilePath(log.getPath());
		}
		
		Set<String> set = new HashSet<String>();
		set.addAll(Arrays.asList(pack.getFilePaths()));
		SVNLogService.fillBuildPack(pack, set);
		Set<BuildFile> list = pack.getBuildFiles();
		for (BuildFile file : list) {
			System.out.println(file.getUrl() + ", " + file.getRevision() + ", " + file.getModifier());
		}
		
		
	}

}
