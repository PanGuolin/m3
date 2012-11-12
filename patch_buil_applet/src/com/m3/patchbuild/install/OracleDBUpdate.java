package com.m3.patchbuild.install;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Comparator;
import java.util.TreeSet;

/**
 * Oracle 数据库的升级
 * @author pangl
 *
 */
public class OracleDBUpdate {
	public static final String SQL_SUFFIX = "_ORCL.SQL";

	public static void executeUpdate(Connection conn, File root) throws IOException, SQLException {
		final TreeSet<File> set = new TreeSet<File>(new Comparator<File>() {
			public int compare(File o1, File o2) {
				return o1.getName().compareToIgnoreCase(o2.getName());
			}
		});
		root.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isDirectory()) {
					return true;
				}
				if (pathname.getName().toUpperCase().endsWith(SQL_SUFFIX)) {
					set.add(pathname);
				}
				return false;
			}
		});
		
		for (File file : set) {
			System.out.println(file);
			String[] sqls = DBUpdateTool.readSqls(file);
			for (String sql : sqls) {
				//System.out.println(sql);
				try {
					DBUpdateTool.executeSql(conn, sql);
				} catch (SQLException ex) {
					System.out.println(sql);
					//ex.printStackTrace();
					throw ex;
					
				}
			}
		}
	}
}
