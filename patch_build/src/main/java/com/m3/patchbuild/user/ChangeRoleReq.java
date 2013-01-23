package com.m3.patchbuild.user;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseReqInfo;

/**
 * 改变角色申请
 * @author pangl
 */
@Entity
@Table(name = "User_ChangeRoleReq")
public class ChangeRoleReq extends BaseReqInfo{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String newRoles; //新的角色列表，用分号连接
	
	private String branch; //所在分支
	
	public String getNewRoles() {
		return newRoles;
	}
	public void setNewRoles(String newRoles) {
		this.newRoles = newRoles;
	}
	
	public String[] getRoleArray() {
		return newRoles == null ? null : newRoles.split(";");
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
}
