package com.m3.patchbuild.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import junit.framework.TestCase;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.svn.ISVNLogService;
import com.m3.patchbuild.svn.SVNLog;

public class SVNLogServiceTest extends TestCase {
	
	public void test_fillBuildPack() throws Exception {
		BranchService branchService = (BranchService)BussFactory.getService(Branch.class);
		Pack pack = new Pack();
		Branch branch = branchService.getBranch("sp1");
		pack.setBranch(branch);
		
		List<SVNLog> logs = ((ISVNLogService)BussFactory.getService(SVNLog.class)).listByKeyword(branch, "XD-JD03-021");
		for (SVNLog log : logs) {
			pack.addFilePath(log.getPath());
		}
		
		Set<String> set = new HashSet<String>();
		set.addAll(Arrays.asList(pack.getFilePaths()));
		((ISVNLogService)BussFactory.getService(SVNLog.class)).fillBuildPack(pack);
		List<BuildFile> list = pack.getBuildFiles();
		for (BuildFile file : list) {
			System.out.println(file.getUrl() + ", " + file.getRevision() + ", " + file.getModifier());
		}
		
		
	}

}
