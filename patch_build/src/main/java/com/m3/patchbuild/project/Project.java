package com.m3.patchbuild.project;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.user.User;

/**
 * 项目信息
 * @author pangl
 *
 */
@Entity
@Table(name="Project_Project")
public class Project extends BaseBussInfo{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String code;
	private String name;
	private Date createTime;
	private User createUser;
	private boolean enable;
	private String comment;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public User getCreateUser() {
		return createUser;
	}
	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}
	public boolean isEnable() {
		return enable;
	}
	public void setEnable(boolean enable) {
		this.enable = enable;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
}
