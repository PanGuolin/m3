package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.IService;

public interface IFunctionService extends IService{
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByPerm(String permCode);
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByPath(String path);

}
