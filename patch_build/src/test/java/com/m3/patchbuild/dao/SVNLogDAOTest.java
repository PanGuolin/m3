package com.m3.patchbuild.dao;

import junit.framework.TestCase;

public class SVNLogDAOTest extends TestCase {
	
	public void test_getMaxRevision() {
		SVNLogDAO dao = new SVNLogDAO();
		long max = dao.getMaxRevision("testbranch");
		System.out.println("Max Resvision:" + max);
		
		max = dao.getMaxRevision("sp1");
		System.out.println("Max Resvision:" + max);
	}

}
