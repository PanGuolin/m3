package com.m3.patchbuild.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 功能权限
 * @author pangl
 *
 */
@Entity
@Table(name="Sys_FunctionPerm")
public class FunctionPerm  extends BaseBussInfo {

	@Column(name="code")
	private String code;
	
	@Column(name="permName")
	private String name;
	
	@Column(name="info")
	private String info;
	
	@Column(name="type")
	private int type;
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "SYS_RolePermission", joinColumns = @JoinColumn(name = "roleName"))
	private Set<String> roles = new HashSet<String>(); //用户角色集合

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

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	
}
