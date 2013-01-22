package com.m3.patchbuild.sys;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 系统角色
 * @author pangl
 *
 */
@Entity
@Table(name="Sys_Role")
public class Role extends BaseBussInfo implements Serializable{
	
	public static final String LOGINED_USER = "[loginedUser]";

	private static final long serialVersionUID = 1L;
	
	private String code;//编码
	private String name;//名称
	private boolean systemRole;//是否系统角色
	private boolean manageRole;//是否管理角色
	private boolean assignable; //是否可分配
	
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
	public boolean isSystemRole() {
		return systemRole;
	}
	public void setSystemRole(boolean systemRole) {
		this.systemRole = systemRole;
	}
	public boolean isManageRole() {
		return manageRole;
	}
	public void setManageRole(boolean manageRole) {
		this.manageRole = manageRole;
	}
	public boolean isAssignable() {
		return assignable;
	}
	public void setAssignable(boolean assignable) {
		this.assignable = assignable;
	}
}
