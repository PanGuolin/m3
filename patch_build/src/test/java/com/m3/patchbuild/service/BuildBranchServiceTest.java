package com.m3.patchbuild.service;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;

import junit.framework.TestCase;

public class BuildBranchServiceTest extends TestCase{
	
	public void test_createBuildBranch() {
		BranchService branchService = (BranchService)BussFactory.getService(Branch.class);
		Branch branch = branchService.getBranch("testbranch");
		if (branch == null)
			branch = new Branch();
		branch.setBranch("testbranch");
		branch.setName("测试分支");
		branch.setVersion("test.yyMMdd");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/BTFMS/");
		branch.setSvnRoot("");
		branch.setWorkspace("d:/patch_build/testbranch");
		branchService.saveBranch(branch);
		
		
		
		 branch = branchService.getBranch("sp1");
			if (branch == null)
				branch = new Branch();
		branch.setBranch("sp1");
		branch.setName("sp1分支");
		branch.setVersion("SP10.03.yyMMddsp1");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/v101/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setSvnRoot("/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setWorkspace("d:/patch_build/sp1");
		branchService.saveBranch(branch);
	}

}
