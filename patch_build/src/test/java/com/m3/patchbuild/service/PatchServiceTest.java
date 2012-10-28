package com.m3.patchbuild.service;

import java.util.Date;

import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.patch.PatchInfo;
import com.m3.patchbuild.patch.PatchService;

import junit.framework.TestCase;

public class PatchServiceTest extends TestCase{

	public void test_config() throws Exception {
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		PatchInfo patch = PatchService.getPatch(branch, new Date());
		if (patch == null) {
			patch = PatchService.createPatch(branch);
		}
	}
}
