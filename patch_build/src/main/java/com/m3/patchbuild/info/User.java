package com.m3.patchbuild.info;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
	
	@BillNO
	@Column(name="userId", nullable=false)
	private String userId; //用户登录名
	
	@Column(name="password", nullable=false)
	private String password; //登录口令
	
	@Column(name="email", nullable=false)
	private String email; //用户邮箱
	
	@Column(name="username", nullable=true)
	private String username;//用户姓名
	
	@Column(name="isSVN")
	private boolean isSVNUser = false; //是否SVN用户，如果是SVN用户则密码验证交由SVN系统负责
	
	@OneToMany(mappedBy="")
	private Set<User> staffs; //管理的员工
	

	@ElementCollection
	@CollectionTable(name = "PB_UserRole", joinColumns = @JoinColumn(name = "UserUuid"))
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
	
	public void addRole(UserRoleEnum role) {
		if (role != null)
			this.roles.add(role.name());
	}
	
	public boolean hasRole(UserRoleEnum role) {
		return this.roles.contains(role.name());
	}

	public String getUsername() {
		if (username == null)
			username = this.userId;
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isSVNUser() {
		return isSVNUser;
	}

	public void setSVNUser(boolean isSVNUser) {
		this.isSVNUser = isSVNUser;
	}
	
	

}
