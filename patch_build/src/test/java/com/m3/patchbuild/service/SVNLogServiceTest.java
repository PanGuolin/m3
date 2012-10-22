package com.m3.patchbuild.service;

import java.util.List;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.info.SVNLog;

import junit.framework.TestCase;

public class SVNLogServiceTest extends TestCase {
	
	public void test_findByKeyword() throws SVNException {
		List<SVNLog> logs = SVNLogService.listByKeyword("sp1", "调整");
		for (SVNLog log : logs) {
			System.out.println(log.getModifyTime() + "：" + log.getPath());
		}
	}

}
