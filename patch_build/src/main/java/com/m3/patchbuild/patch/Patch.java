package com.m3.patchbuild.patch;

import java.io.File;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.m3.common.StringUtil;
import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.Pack;

/**
 * 补丁信息
 * @author pangl
 *
 */
@Entity
@Table(name="Patch_Patch")
public class Patch extends BaseBussInfo {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="name")
	private String name; //补丁名称
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="branch", columnDefinition="branch")
	private Branch branch; //所属分支
	
	@Column(name="modifyTime")
	private Date lastModify; //最后修改时间
	
	@Column(name="packCount")
	private int packCount; //包含构建包数量 
	
	private String builds;
	
	@Column(name="md5")
	private String md5; //md5信息
	
	@Column(name="createTime")
	private Date createTime;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
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
	public File getPublishLog(Pack bp) {
		return new File(getPublishWS(bp) + "publish.log");
	}
	
	/**
	 * 获取发布的根目录
	 * @param bp
	 * @return
	 */
	public File getPublishWS(Pack bp) {
		return new File(getWSRoot(), bp.getBuildNo());
	}

	public String getBuilds() {
		return builds;
	}

	public void setBuilds(String builds) {
		this.builds = builds;
	}
	
	public void addBuild(String buildNo) {
		if (builds == null)
			this.builds = buildNo;
		Set<String> set = new HashSet<String>();
		set.addAll(Arrays.asList(builds.split(";")));
		set.add(buildNo);
		builds = StringUtil.join(set, ";");
	}
	
}
