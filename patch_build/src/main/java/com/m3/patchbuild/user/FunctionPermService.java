package com.m3.patchbuild.user;

import java.util.List;

import com.m3.patchbuild.AbstractService;

/**
 * 功能权限服务类
 * @author pangl
 *
 */
public class FunctionPermService extends AbstractService{

	public FunctionPermService() {
		super(new FunctionPermDAO());
	}
	
	protected FunctionPermDAO getDAO() {
		return (FunctionPermDAO)super.getDao();
	}
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByPerm(String permCode) {
		return getDAO().listRoleByPerm(permCode);
	}
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByAction(Class<?> actionClass) {
		return getDAO().listRoleByAction(actionClass);
	}

}
