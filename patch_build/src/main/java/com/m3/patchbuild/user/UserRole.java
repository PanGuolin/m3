package com.m3.patchbuild.user;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.sys.Role;

/**
 * 用户角色关系
 * @author pangl
 *
 */
@Entity
@Table(name="User_UserRole")
public class UserRole extends BaseBussInfo{
	
	@ManyToOne()
    @JoinColumn(name = "userId", nullable=false)
	private User user;
	
	@ManyToOne(targetEntity=Role.class)
	@JoinColumn(name="roleId", referencedColumnName="code")
	private Role role;
	
	private String branch;
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Override
	public boolean equals(Object other) {
		if (other == null) return false;
		if (this == other) return true;
		if (!(other instanceof UserRole)) return false;
		UserRole r = (UserRole)other;
		if (!user.equals(r.user))
			return false;
		if (role.equals(r.role))
			return false;
		return branch.equals(r.branch);
	}
	@Override
	public String toString() {
		return role.getCode() + "[branch]";
	}
	
	
}
