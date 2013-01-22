package com.m3.common.ant;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.types.FileSet;

import com.m3.dbupdate.DBUpdateTool;

/**
 * 验证数据库脚本
 * @author pangl
 *
 */
public class ValidateDBScript extends Task {
	
	private String driver;
	private String url;
	private String password;
	private String user;
	private int count = 2; //执行次数
	private List<FileSet> fileSets = new ArrayList<FileSet>();
	
	@Override
	public void execute() throws BuildException {
		Connection conn;
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, user, password);
		} catch (Exception e) {
			throw new BuildException("获取数据库连接时出错", e);
		}
		
		for (int i=0; i<count; i++) {
			log("执行SQL文件,第" + (i+1) + "遍");
			try {
				executeSql(conn);
			} catch (Exception e) {
				throw new BuildException("执行SQL时出错， 执行次数:" + (i+1), e);
			}
		}
	}
	
	private void executeSql(Connection conn) throws IOException, SQLException {
		for (FileSet fs : fileSets) {
			  DirectoryScanner ds = fs.getDirectoryScanner(getProject());
			  File fromDir = fs.getDir(getProject());
			  String[] srcFiles = ds.getIncludedFiles();
			  for (String str : srcFiles) {
				  File file = new File(fromDir, str);
				  log("执行SQL文件:" + file.getAbsolutePath());
				  String[] sqls = DBUpdateTool.readSqls(file);
					for (String sql : sqls) {
						try {
							DBUpdateTool.executeSql(conn, sql);
						} catch (SQLException ex) {
							log("执行错误", ex, Project.MSG_ERR);
							throw ex;
						}
					}
			  }
		}
	}

	public void setDriver(String driver) {
		this.driver = driver;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void addFileSet(FileSet fileset) {
		this.fileSets.add(fileset);
	}

}
