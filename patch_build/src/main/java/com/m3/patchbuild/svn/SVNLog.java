package com.m3.patchbuild.svn;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * SVN修改日志对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_SVNLog")
public class SVNLog extends BaseBussInfo{
	
	@Column(name="branch")
	private String branch;//所属分支名称
	
	@Column(name="revision")
	private long revision; //文件版本号
	
	@Column(name="author")
	private String author; //修改作者
	
	@Column(name="modifyTime")
	private Date modifyTime; //修改时间表
	
	@Column(name="modifyType")
	private char modifyType; //修改类型：A，M，D
	
	@Column(name="fileType")
	private String fileType; //文件类型：file, dir
	
	@Column(name="path")
	private String path; //文件路径
	
	@Column(name="log") //文件日志信息
	private String logMessage;

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public long getRevision() {
		return revision;
	}

	public void setRevision(long revision) {
		this.revision = revision;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public char getModifyType() {
		return modifyType;
	}

	public void setModifyType(char modifyType) {
		this.modifyType = modifyType;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getLogMessage() {
		return logMessage;
	}

	public void setLogMessage(String logMessage) {
		this.logMessage = logMessage;
	}
	
}
