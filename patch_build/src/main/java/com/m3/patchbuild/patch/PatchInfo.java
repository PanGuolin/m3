package com.m3.patchbuild.patch;

import java.io.File;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.pack.BuildPack;

/**
 * 补丁信息
 * @author pangl
 *
 */
@Entity
@Table(name="PB_Patch")
public class PatchInfo {
	
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid; //唯一标识
	
	@Column(name="name")
	private String name; //补丁名称
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="branch", columnDefinition="branch")
	private BuildBranch branch; //所属分支
	
	@Column(name="modifyTime")
	private Date lastModify; //最后修改时间
	
	@Column(name="packCount")
	private int packCount; //包含构建包数量 
	
	@Column(name="md5")
	private String md5; //md5信息
	
	@Column(name="createTime")
	private Date createTime;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BuildBranch getBranch() {
		return branch;
	}

	public void setBranch(BuildBranch branch) {
		this.branch = branch;
	}

	public Date getLastModify() {
		return lastModify;
	}

	public void setLastModify(Date lastModify) {
		this.lastModify = lastModify;
	}

	public int getPackCount() {
		return packCount;
	}

	public void setPackCount(int packCount) {
		this.packCount = packCount;
	}

	public String getMd5() {
		return md5;
	}

	public void setMd5(String md5) {
		this.md5 = md5;
	}
	
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取构建包的工作目录
	 * @return
	 */
	public File getWSRoot() {
		return new File(branch.getWorkspace(), "patchs/" + getName());
	}
	
	/**
	 * 获取发布的日志文件
	 * @return
	 */
	public File getPublishLog(BuildPack bp) {
		return new File(getPublishWS(bp) + "publish.log");
	}
	
	/**
	 * 获取发布的根目录
	 * @param bp
	 * @return
	 */
	public File getPublishWS(BuildPack bp) {
		return new File(getWSRoot(), bp.getBuildNo());
	}
}
