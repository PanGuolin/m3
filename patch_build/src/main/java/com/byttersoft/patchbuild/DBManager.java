package com.byttersoft.patchbuild;

import java.util.HashSet;
import java.util.Set;

/**
 * 数据库相关管理类
 * @author pangl
 *
 */
public class DBManager {
	
	public static void initDB() {
		//创建分支库表T_REPOS结构
		String sqlCrtRepos = "CREATE TABLE IF NOT EXISTS T_REPOS (id VARCHAR(100) PRIMARY KEY, " +
				"name TEXT, desc TEXT, version TEXT," +
				"svnUrl TEXT, svnRoot TEXT, workspace TEXT," +  
				"libDir TEXT, classDir TEXT, svnUser TEXT, " +
				"svnPassword TEXT, verNo TEXT, verPattern TEXT," +
				"verSuffix TEXT)";
		//创建用户表T_USER结构
		String sqlCrtUser = "CREATE TABLE IF NOT EXISTS T_USER(id VARCHAR(100) PRIMARY KEY," +
				"name VARCHAR(100), email TEXT)";
		//创建构建包T_BUILDFILE 结构
		String sqlCrtBuildFile = "CREATE TABLE IF NOT EXISTS T_BUILDFILE(id VARCHAR(100) PRIMARY KEY," +
				"developer VARCHAR(100), tester VARCHAR(100), customer VARCHAR(100)," +
				"buildTS REAL, deployTS REAL, passTS REAL, comment TEXT";
		//构建文件包含VP单信息表
		String sqlCrtBuildVPS = "CREATE TABLE IF NOT EXISTS T_VPS(id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"vpno VARCHAR(100), buildId VARCHAR(100)";
		//构建文件包含文件信息表
		String sqlCrtIncludeFiles = "CREATE TABLE IF NOT EXISTS T_INCLUDES(id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"path TEXT, buildId VARCHAR(100)";
		//构建文件依赖其它构建文件信息表
		String sqlCrtDepends = "CREATE TABLE IF NOT EXISTS T_DEPENDS(id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"buildId VARCHAR(100), dependId VARCHAR(100)";
		//构建文件操作历史表
		String sqlCrtOperHist = "CREATE TABLE IF NOT EXISTS T_OperHist(id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"buildId VARCHAR(100), userId VARCHAR(100), timest REAL, " +
				"operatorId VARCHAR(100), operatorValue VARCHAR(100), comment TEXT";
		
	}

}
