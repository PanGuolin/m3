package com.m3.patchbuild.service;

import java.util.Date;

import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.patch.Patch;
import com.m3.patchbuild.patch.PatchService;

import junit.framework.TestCase;

public class PatchServiceTest extends TestCase{

	public void test_config() throws Exception {
		Branch branch = BranchService.getBranch("sp1");
		PatchService patchService = (PatchService)BussFactory.getService(Patch.class);
		Patch patch = patchService.getPatch(branch, new Date());
		if (patch == null) {
			patch = patchService.createPatch(branch);
		}
	}
}
