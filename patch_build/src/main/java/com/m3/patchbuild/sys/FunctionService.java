package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;

/**
 * 功能权限服务类
 * @author pangl
 *
 */
public class FunctionService extends BaseService implements IFunctionService{

	private FunctionPermDAO dao = new FunctionPermDAO();
	public FunctionService() {
	}
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByPerm(String permCode) {
		return dao.listRoleByPerm(permCode);
	}
	
	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	public List<String> listRoleByPath(String path) {
		return dao.listRoleByPath(path);
	}

	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return Function.class;
	}
}
