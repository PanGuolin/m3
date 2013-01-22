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
	
	private static final long serialVersionUID = 1L;

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
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((branch == null) ? 0 : branch.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserRole other = (UserRole) obj;
		if (branch == null) {
			if (other.branch != null)
				return false;
		} else if (!branch.equals(other.branch))
			return false;
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return role.getCode() + "[branch]";
	}
}
