package com.m3.dbupdate;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Oracle ��ݿ����
 * @author pangl
 *
 */
public abstract class OracleDBUpdate {

	public static void executeUpdate(Connection conn, File root, final String fileSuffix) throws IOException, SQLException {
		final List<File> set = new ArrayList<File>();
		root.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isDirectory()) {
					return true;
				}
				if (pathname.getName().toUpperCase().endsWith(fileSuffix)) {
					set.add(pathname);
				}
				return false;
			}
		});
		Collections.sort(set, new Comparator<File>() {
			@Override
			public int compare(File o1, File o2) {
				return o1.getName().compareTo(o2.getName());
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
	
	public static void main(String[] args) throws Exception{
		File root = new File("E:\\downloads\\chrome\\V10.03.121212beta\\sql");
		String suffix = "_SQL2005.SQL";
		String url = "jdbc:sqlserver://192.168.0.36:1433;DatabaseName=hc_test";
		String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		String user = "sa";
		String password = "sasa";
		
		Class.forName(driver);
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(url, user, password);
			executeUpdate(conn, root, suffix);
		} finally {
			conn.close();
		}
		
	}
}
