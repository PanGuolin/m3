package com.m3.patchbuild.service;

import com.m3.patchbuild.info.BuildBranch;

import junit.framework.TestCase;

public class BuildBranchServiceTest extends TestCase{
	
	public void test_createBuildBranch() {
		BuildBranch branch = new BuildBranch();
		branch.setBranch("testbranch");
		branch.setName("测试分支");
		branch.setVersion("test.yymmdd");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/BTFMS/");
		branch.setSvnRoot("");
		branch.setWorkspace("d:/patch_build/testbranch");
		BuildBranchService.saveBranch(branch);
		
		
		
		branch = new BuildBranch();
		branch.setBranch("sp1");
		branch.setName("sp1分支");
		branch.setVersion("SP10.03.yymmddsp1");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/v101/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setSvnRoot("/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setWorkspace("d:/patch_build/sp1");
		BuildBranchService.saveBranch(branch);
	}

}
