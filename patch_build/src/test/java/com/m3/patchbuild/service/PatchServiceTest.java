package com.m3.patchbuild.service;

import java.util.Date;

import junit.framework.TestCase;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.patch.IPatchService;
import com.m3.patchbuild.patch.Patch;

public class PatchServiceTest extends TestCase{

	public void test_config() throws Exception {
		
		BranchService branchService = (BranchService)BussFactory.getService(Branch.class);
		Branch branch = branchService.getBranch("sp1");
		IPatchService patchService = (IPatchService)BussFactory.getService(Patch.class);
		Patch patch = patchService.getPatch(branch, new Date());
		if (patch == null) {
			patch = patchService.createPatch(branch);
		}
	}
}
