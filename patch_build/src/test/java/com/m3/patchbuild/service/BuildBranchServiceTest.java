package com.m3.patchbuild.service;

import com.m3.patchbuild.info.BuildBranch;

import junit.framework.TestCase;

public class BuildBranchServiceTest extends TestCase{
	
	public void test_createBuildBranch() {
		BuildBranch branch = new BuildBranch();
		branch.setBranch("testbranch");
		branch.setName("测试分支");
		branch.setVersion("SP10.03.yymmddtest");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/BTFMS/");
		branch.setSvnRoot("https://svn.bytter.com/svn/BTFMS/");
		branch.setWorkspace("d:/patch_build/testbranch");
		BuildBranchService.saveBranch(branch);
	}

}
