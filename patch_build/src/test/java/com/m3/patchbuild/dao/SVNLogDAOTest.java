package com.m3.patchbuild.dao;

import junit.framework.TestCase;

import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.svn.SVNLogDAO;

public class SVNLogDAOTest extends TestCase {
	
	public void test_getMaxRevision() {
		SVNLogDAO dao = new SVNLogDAO();
		
		long max = dao.getMaxRevision(BuildBranchService.getBranch("sp1"));
		System.out.println("Max Resvision:" + max);
	}

}
