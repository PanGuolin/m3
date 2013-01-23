package com.m3.patchbuild.pack;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 构建包BUG对象
 * @author pangl
 *
 */
@Entity
@Table(name="Pack_Bug")
public class Bug  extends BaseBussInfo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String bugNo; //BUG 编号
	
	@Column(name="cmmt")
	private String comment; //BUG说明
	private String tester; //测试用户
	private Date createTime; //录入日期
	private Date fixTime; //修复日期
	
	private String buildNo;
	

	public String getBugNo() {
		return bugNo;
	}

	public void setBugNo(String bugNo) {
		this.bugNo = bugNo;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getBuildNo() {
		return buildNo;
	}

	public void setBuildNo(String buildNo) {
		this.buildNo = buildNo;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getFixTime() {
		return fixTime;
	}

	public void setFixTime(Date fixTime) {
		this.fixTime = fixTime;
	}

	public String getTester() {
		return tester;
	}

	public void setTester(String tester) {
		this.tester = tester;
	}
	
	public boolean isFixed() {
		return this.fixTime != null;
	}
	
	public void setFixed(boolean flag) {
		if (flag) {
			if (this.fixTime == null)
				this.fixTime = new Date();
		} else {
			this.fixTime = null;
		}
	}
	
}
