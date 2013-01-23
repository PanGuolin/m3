package com.m3.patchbuild.role;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 
 * @author pangl
 *
 */
public class Role extends BaseBussInfo{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String roleId;
	
	private String roleName;

	private String comment;
	
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
