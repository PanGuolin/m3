package com.m3.patchbuild.sys;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Cacheable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 功能权限
 * @author pangl
 *
 */
@Entity
@Table(name="Sys_Function")
@Cacheable()
public class Function extends BaseBussInfo {

	private String code;//功能编码
	
	private String name;//功能名称
	
	private String info;//功能信息
	
	private int type;//功能类型
	
	@ManyToMany(cascade ={CascadeType.PERSIST,CascadeType.MERGE}, fetch=FetchType.EAGER)
    @JoinTable(name="Sys_FunctionRole",  joinColumns={@JoinColumn(name="functionId")}, inverseJoinColumns={@JoinColumn(name="roleId")} )
	private Set<Role> roles = new HashSet<Role>();
	
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
