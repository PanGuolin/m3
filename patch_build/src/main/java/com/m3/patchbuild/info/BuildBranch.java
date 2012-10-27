package com.m3.patchbuild.info;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 构建分支信息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_Branch")
public class BuildBranch implements IBusInfo{
	
	public static final String DIR_SVN = "svn"; //SVN文件目录名称
	public static final String DIR_JAVA_SRC = "src"; //java文件保存目录名称
	public static final String FILE_BUILD = "build.xml"; //构建所用的脚本名称
	public static final String FILE_PUBLISH = "publish.xml"; //发布所用的脚本名称
	
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid; //唯一标识
	
	@BillNo
	@Column(name="branch")
	private String branch; //分支标识
	
	@Column(name="name")
	private String name; //分支名称
	
	@Column(name="parent")
	private String parent; //对应的主分支，如果为null表示当前分支是主分支。只有主分支才可以发布补丁。同时从分支共享主分支的编译环境
	
	@Column(name="svnUrl")
	private String svnUrl; //SVN路径
	
	@Column(name="svnRoot")
	private String svnRoot; //SVN根路径
	
	@Column(name="svnUser")
	private String svnUser; //登录SVN的用户
	
	@Column(name="svnPassword")
	private String svnPassword; //登录SVN的密码
	
	@Column(name="svnTagRoot")
	private String svnTagRoot; //打Tag时的SVN根路径
	
	@Column(name="version")
	private String version; //补丁版本号
	
	@Column(name="workspace")
	private String workspace; //工作根目录
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getSvnUrl() {
		return svnUrl;
	}
	public void setSvnUrl(String svnUrl) {
		this.svnUrl = svnUrl;
	}
	public String getSvnRoot() {
		return svnRoot;
	}
	public void setSvnRoot(String svnRoot) {
		this.svnRoot = svnRoot;
	}
	public String getSvnUser() {
		return svnUser;
	}
	public void setSvnUser(String svnUser) {
		this.svnUser = svnUser;
	}
	public String getSvnPassword() {
		return svnPassword;
	}
	public void setSvnPassword(String svnPassword) {
		this.svnPassword = svnPassword;
	}
	public String getSvnTagRoot() {
		return svnTagRoot;
	}
	public void setSvnTagRoot(String svnTagRoot) {
		if (svnTagRoot != null && !svnTagRoot.startsWith("/"))
			svnTagRoot = "/" + svnTagRoot;
		this.svnTagRoot = svnTagRoot;
	}
	
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getWorkspace() {
		return workspace;
	}
	public void setWorkspace(String workspace) {
		this.workspace = workspace;
	}
	
	public String trimUrl(String url) {
		if (url == null || this.svnRoot == null || !url.startsWith(svnRoot))
			return url;
		return url.substring(svnRoot.length());
	}
	@Override
	public String toString() {
		return this.name == null ? this.branch : this.name; 
	}
	
	
}
