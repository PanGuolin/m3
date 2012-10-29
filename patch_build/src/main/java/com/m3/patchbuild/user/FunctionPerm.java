package com.m3.patchbuild.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.IBussInfo;

/**
 * 功能权限
 * @author pangl
 *
 */
@Entity
@Table(name="Sys_FunctionPerm")
public class FunctionPerm implements IBussInfo{
	
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid;

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

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

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
