package com.m3.patchbuild.dao;

import java.util.List;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BuildBranchDAO;

import junit.framework.TestCase;

public class BuildBranchDAOTest extends TestCase{
	
	public void test_getAll() throws Exception {
		List<Branch> list = new BuildBranchDAO().listAllBranch();
		for(Branch branch : list) {
			System.out.println(branch.getUuid());
		}
	}

}
