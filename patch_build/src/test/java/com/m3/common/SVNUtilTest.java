package com.m3.common;

import java.io.File;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;

import com.m3.patchbuild.svn.SVNUtil;

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
	
	public void test_getFile() throws Exception {
		String svnRoot = "https://svn.bytter.com/svn/v101/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/";
		File root = new File("c:/temp");
		root.mkdirs();
		String[] urls = new String[]{
				"cms/src/main/webapp/cms/MatureQuery.jsp",
				"admin-api/src/main/java/com/byttersoft/admin/persistence/dao/VUserCorpSysOprDao.java",
				"cms/src/main/webapp/cms/AllMatureQuery.jsp"
		};
		
		Set<String> set = new HashSet<String>();
		set.addAll(Arrays.asList(urls));
		SVNUtil.getFile(svnRoot, "pangl", "pangl1q", root, set);
	}
}
