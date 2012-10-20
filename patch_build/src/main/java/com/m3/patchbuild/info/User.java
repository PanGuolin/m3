package com.m3.patchbuild.info;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 用户信息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_User")
public class User {
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid; //唯一标识
	
	@Column(name="user", nullable=false)
	private String userId; //用户登录名
	
	@Column(name="user", nullable=false)
	private String password; //登录口令
	
	@Column(name="email", nullable=false)
	private String email; //用户邮箱
	
	@Column(name="role")
	private Set<String> roles = new HashSet<String>(); //用户角色集合

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		if (roles == null)
			this.roles.clear();
		this.roles = roles;
	}

}
