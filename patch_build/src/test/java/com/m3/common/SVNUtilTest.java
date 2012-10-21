package com.m3.common;

import java.util.Map;
import java.util.Set;

import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;

import junit.framework.TestCase;

/**
 * test for svnUtil
 * @author MickeyMic
 *
 */
public class SVNUtilTest extends TestCase {
	private String svnUrl = "https://svn.bytter.com/svn/BTFMS/";
	private String user = "pangl";
	private String password = "pangl1q";

	public void test_checkLogin() throws Exception {
		assertTrue(SVNUtil.checkLogin(svnUrl, user, password));
		assertTrue(SVNUtil.checkLogin(svnUrl, "autobuild", "build@bytter.com"));
	}
	
	public void test_listProject() throws Exception {
		String[] projects = SVNUtil.listSVNProjects(svnUrl, user, password);
		for (String p : projects) {
			System.out.println(p);
		}
	}
	
	public void test_getSVNLogEntry() throws Exception {
		Set<SVNLogEntry> logs = SVNUtil.getSVNLogEntry(svnUrl, user, password, 1000);
		for (SVNLogEntry log : logs) {
			System.out.println(log.getAuthor() + ":" + log.getMessage() + ":" + log.getRevision() + ":" + log.getDate() );
			 Map<String, SVNLogEntryPath> paths = log.getChangedPaths();
			 for (String key : paths.keySet()) {
				 System.out.println(key + "====" + paths.get(key).getPath() + ":" + paths.get(key).getType() + paths.get(key).getKind());
			 }
		}
	}
}
