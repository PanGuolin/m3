package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.common.query.IQuery;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;
import com.m3.patchbuild.base.BaseService;

/**
 * 功能权限服务类
 * @author pangl
 *
 */
public class FunctionService extends BaseCacheService implements IFunctionService{

	@Override
	public List<String> listRoleByPerm(String permCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> listRoleByPath(String path) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return Function.class;
	}

	
}
