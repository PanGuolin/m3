package com.m3.patchbuild.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.sys.Role;

/**
 * 用户信息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_User")
public class User extends BaseBussInfo {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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
	
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER, mappedBy="user")
	private Set<UserRole> roles = new HashSet<UserRole>(); //用户角色集合
	
	@ManyToMany(
            targetEntity=User.class,
            cascade ={CascadeType.PERSIST,CascadeType.MERGE},
            fetch=FetchType.EAGER
    )
    @JoinTable(
            name="User_Superior",
            joinColumns={@JoinColumn(name="UserId")},
            inverseJoinColumns={@JoinColumn(name="SuperiorID")}
    )
	private Set<User> superiors = new HashSet<User>();//汇报关系人集合
	
	private boolean enabled; //是否可用
	
	private String mainBranch; //主分支
	
	@ManyToMany(
            targetEntity=User.class,
            cascade ={CascadeType.PERSIST,CascadeType.MERGE},
            fetch=FetchType.EAGER
    )
    @JoinTable(
            name="User_Follower",
            joinColumns={@JoinColumn(name="UserId")},
            inverseJoinColumns={@JoinColumn(name="FollowerID")}
    )
	private Set<User> followers = new HashSet<User>(); //跟随人（关注当前用户）集合

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

	public Set<UserRole> getRoles() {
		return roles;
	}

	public void setRoles(Set<UserRole> roles) {
		this.roles = roles;
	}

	public void addRole(String branch, Role role) {
		if (branch == null || role == null)
			return;
		if (hasRole(branch, role)) return;
		
		UserRole nRole = new UserRole();
		nRole.setUser(this);
		nRole.setBranch(branch);
		nRole.setRole(role);
		roles.add(nRole);
	}
	
	public boolean hasRole(String branch, Role role) {
		if (role == null) return false;
		if (roles == null || roles.isEmpty()) return false;
		for (UserRole r : roles) {
			if ((branch == null || branch.equals(r.getBranch()))
				&& role.getCode().equals(role.getCode()))
				return true;
		}
		return false;
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

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getMainBranch() {
		return mainBranch;
	}

	public void setMainBranch(String mainBranch) {
		this.mainBranch = mainBranch;
	}

}
