package com.m3.patchbuild.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.IBussInfo;

/**
 * 用户信息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_User")
public class User implements IBussInfo{
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid; //唯一标识
	
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
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "PB_UserRole", joinColumns = @JoinColumn(name = "UserUuid"))
	private Set<String> roles = new HashSet<String>(); //用户角色集合
	
	@ManyToMany(
            targetEntity=User.class,
            cascade ={CascadeType.PERSIST,CascadeType.MERGE},
            fetch=FetchType.EAGER
    )
    @JoinTable(
            name="PB_ReportRelation",
            joinColumns={@JoinColumn(name="UserNo")},
            inverseJoinColumns={@JoinColumn(name="SuperiorNo")}
    )
	private Set<User> superiors = new HashSet<User>();//汇报关系人集合
	
	@ManyToMany(
            targetEntity=User.class,
            cascade ={CascadeType.PERSIST,CascadeType.MERGE},
            fetch=FetchType.EAGER
    )
    @JoinTable(
            name="PB_UserFollow",
            joinColumns={@JoinColumn(name="UserId")},
            inverseJoinColumns={@JoinColumn(name="FollowerID")}
    )
	private Set<User> followers = new HashSet<User>(); //跟随人（关注当前用户）集合

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
	
	public void addRole(String role) {
		if (role != null)
			this.roles.add(role);
	}
	
	public boolean hasRole(String role) {
		return this.roles.contains(role);
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

	public Set<User> getSuperiors() {
		return superiors;
	}

	public void setSuperiors(Set<User> superiors) {
		this.superiors = superiors;
	}

	public Set<User> getFollowers() {
		return followers;
	}

	public void setFollowers(Set<User> followers) {
		this.followers = followers;
	}

	@Override
	public String toString() {
		return userId;
	}
	
	
	

}
