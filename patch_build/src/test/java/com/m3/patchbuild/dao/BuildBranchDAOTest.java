package com.m3.patchbuild.dao;

import java.util.List;

import com.m3.patchbuild.info.BuildBranch;

import junit.framework.TestCase;

public class BuildBranchDAOTest extends TestCase{
	
	public void test_getAll() throws Exception {
		List<BuildBranch> list = new BuildBranchDAO().listAllBranch();
		for(BuildBranch branch : list) {
			System.out.println(branch.getUuid());
		}
	}

}
