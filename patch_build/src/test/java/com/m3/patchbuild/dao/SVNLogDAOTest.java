package com.m3.patchbuild.dao;

import com.m3.patchbuild.info.SVNLog;

import junit.framework.TestCase;

public class SVNLogDAOTest extends TestCase {
	
	public void test_getMaxRevision() {
		SVNLogDAO dao = new SVNLogDAO();
		SVNLog log = dao.getMaxRevision("testbranch");
		System.out.println("Max Resvision:" + log);
	}

}
