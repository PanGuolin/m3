package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.BussFactory;

/**
 * 系统角色工具类
 * @author pangl
 *
 */
public abstract class RoleUtil {

	public static List<Role> listAssignable() {
		IRoleService roleServer = (IRoleService) BussFactory.getService(Role.class);
		return roleServer.listAssignable();
	}
}
