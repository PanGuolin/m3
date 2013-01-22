package com.m3.dbupdate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

/**
 * ������
 * @author pangl
 *
 */
public abstract class DBUpdateTool {
	
	private static final Logger logger = Logger.getLogger(DBUpdateTool.class);
	
	private static String fileEncoding = "GBK";
	
	public static final String[] IGNORE_CHARACTER = new String[] {
		"ORA-00955",
		"ORA-02260",//table can have only one primary key 
		"ORA-01430",//column being added already exists in table 
		"ORA-00001",//Unique constraint violated 
		"ORA-02261",//such unique or primary key already exists in the table. 
		"ORA-02275",//such a referential constraint already exists in the table 
		"ORA-01440",//column to be modified must be empty to decrease precision or scale
		"数据库中已存在名为",
		"已经有针对它定义的主键",
		"违反了 PRIMARY KEY 约束",
		"各表中的列名必须唯一",
		"数据库中已存在名为",
		"违反了 UNIQUE KEY 约束",
		"上已存在名称为",
		"已用作 object 名称，因此会导致重复",
		"已存在属性",
	};
	
	/**
	 * @param sqlFile
	 * @return
	 */
	public static String[] readSqls(File sqlFile) throws IOException{
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(sqlFile), fileEncoding));
		StringBuilder sb = new StringBuilder();
		List<String> list = new ArrayList<String>(); 
		boolean isMultiComment = false;
		boolean isCreateTri = false;
		boolean isDeclare = false; 
		try {
			String line = null;
			while((line = reader.readLine()) != null) {
				line = trim(line);
				if (line.length() == 0) continue;
				if (line.startsWith("--")) continue;
				if (line.indexOf("/*") != -1) {
					int index = line.indexOf("/*");
					if (!inString(line, index)) {
						line = line.substring(index + 2);
						isMultiComment = true;
					}
				}
				
				if (isMultiComment) {
					if (line.indexOf("*/") != -1) {
						int index = line.indexOf("*/");
						if (!inString(line, index)) {
							line = line.substring(index+2);
							isMultiComment = false;
						}
					}
				}
				if (isMultiComment) continue;
				
				if (line.indexOf("--") != -1) {
					int index = line.indexOf("--");
					if (!inString(line, index)) {
						line = line.substring(0, index);
					}
				}
				if (line.startsWith("create or replace trigger ") 
						|| line.startsWith("create or replace procedure ")
						|| line.startsWith("alter trigger ")) {
					isCreateTri = true;
				} else if (!isCreateTri && line.startsWith("declare")) {
					isDeclare = true;
				}
				boolean sqlEnd = false;
				if (isCreateTri || isDeclare) {
					sqlEnd = line.endsWith("/") || line.toLowerCase().endsWith("go");
				} else {
					if (line.endsWith(";")) {
						line = line.substring(0, line.length() - 1);
						sb.append(" ").append(line);
						sqlEnd = true;
					} else if("go".equalsIgnoreCase(line)){
						sqlEnd = true;
					}
				}
				
				if (sqlEnd) {
					isCreateTri = false;
					isDeclare = false;
					addSql(list, sb);
					continue;
				}
				sb.append(" ").append(line);
			}
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
		addSql(list, sb);
		return (String[])list.toArray(new String[list.size()]);
	}
	
	public static void executeSql(Connection conn, String sql) throws SQLException {
		if (sql.toUpperCase().startsWith("DROP ")) {
			throw new SQLException("不允许执行删除语句");
		}
		Statement stmt = null;
		try {
			if (sql.toUpperCase().startsWith("EXECUTE")) {
				stmt = conn.prepareCall(sql);
				((CallableStatement)stmt).execute();
			} else {
				stmt = conn.createStatement();
				stmt.execute(sql);
			}
			
		} catch (SQLException ex) {
			String msg = ex.getMessage();
			for (String str : IGNORE_CHARACTER) {
				if (msg.indexOf(str) != -1) {
					logger.info(sql);
					logger.info(msg);
					return;
				}
			}
			throw ex;
		} finally {
			release(null, stmt, null);
		}
	}
	
	public static void release(Connection conn, Statement stmt, ResultSet rs) {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception ex) {
				logger.error("", ex);
			}
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (Exception ex) {
				logger.error("", ex);
			}
		}
		if (rs != null) {
			try {
				rs.close();
			} catch (Exception ex) {
				logger.error("", ex);
			}
		}
	}
	
	private static String trim(String line) {
		line = line.trim().toLowerCase();
		while(line.indexOf("  ") != -1) {
			line = line.replaceAll("  ", " ");
		}
		return line;
	}
	
	private static void addSql(List<String> list, StringBuilder sb) {
		String sql = sb.toString().trim();
		if (sql.length() > 0 && !sql.startsWith("comment ") && !"commit".equals(sql)) {
			while(sql.indexOf("  ") != -1) {
				sql = sql.replaceAll("  ", " ");
			}
			list.add(sql);
		}
		sb.setLength(0);
	}
	

	/**
	 * @param sql
	 * @param index
	 * @return
	 */
	private static boolean inString(String sql, int index) {
		int sIndex = sql.indexOf('\'');
		while(sIndex != -1) {
			int eIndex = sql.indexOf('\'', sIndex+1);
			if (sIndex <index && eIndex > index) {
				return true;
			}
			if (eIndex == -1)
				return false;
			sIndex = sql.indexOf('\'', eIndex + 1);
		}
		return false;
	}
	
	public static String getFileEncoding() {
		return fileEncoding;
	}

	public static void setFileEncoding(String fileEncoding) {
		DBUpdateTool.fileEncoding = fileEncoding;
	}

}
