package com.m3.dbupdate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

/**
 * 辅助类
 * @author pangl
 *
 */
public abstract class DBUpdateTool {
	
	private static final Logger logger = Logger.getLogger(DBUpdateTool.class);
	
	/** 可以忽略的特征码 **/
	public static final String[] IGNORE_CHARACTER = new String[] {
		"ORA-00955",//名称已被现有对象占用
		"ORA-02260",//table can have only one primary key 
		"ORA-01430",//column being added already exists in table 
		"ORA-00001",//Unique constraint violated 
		"ORA-02261",//such unique or primary key already exists in the table. 
		"ORA-02275",//such a referential constraint already exists in the table 
		"ORA-01440"//column to be modified must be empty to decrease precision or scale
	};
	
	/**
	 * 从SQL文件中读取SQL语句
	 * @param sqlFile
	 * @return
	 */
	public static String[] readSqls(File sqlFile) throws IOException{
		BufferedReader reader = new BufferedReader(new FileReader(sqlFile));
		StringBuilder sb = new StringBuilder();
		List<String> list = new ArrayList<String>(); 
		boolean isMultiComment = false;//是否多行注释
		boolean isCreateTri = false;//是否创建触发器
		boolean isDeclare = false; //是否declarey语句 
		//boolean isCreateView = false; //是否创建存储过程
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
				if (line.startsWith("create or replace trigger ") ||
						line.startsWith("create or replace procedure ")) {
					isCreateTri = true;
				} else if (!isCreateTri && line.startsWith("declare")) {
					isDeclare = true;
				}
				boolean sqlEnd = false;
				if (isCreateTri || isDeclare) {
					sqlEnd = line.endsWith("/");
				} else {
					if (line.endsWith(";")) {
						line = line.substring(0, line.length() - 1);
						sb.append(" ").append(line);
						sqlEnd = true;
					} else if (line.equalsIgnoreCase("go")) {
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
		Statement stmt = null;
		try {
			stmt = conn.createStatement();
			stmt.execute(sql);
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
			}
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (Exception ex) {
			}
		}
		if (rs != null) {
			try {
				rs.close();
			} catch (Exception ex) {
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
		if (sql.length() > 0 && !sql.startsWith("comment ") && !sql.equals("commit")) {
			while(sql.indexOf("  ") != -1) {
				sql = sql.replaceAll("  ", " ");
			}
			list.add(sql);
		}
		sb.setLength(0);
	}
	

	/**
	 * 判断指定的索引是否落在字符串中（被两个单引号包含）
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
}
