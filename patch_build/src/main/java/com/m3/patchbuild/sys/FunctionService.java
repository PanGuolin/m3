package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

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

	@Override
	public Function getByUrl(String url) {
		if (url == null) return null;
		for (IBussInfo info : allDatas.values()) {
			Function funct = (Function)info;
			if (url.equals(funct.getUrl()))
				return funct;
		}
		return null;
	}

	@Override
	public Function getByAction(Class<?> actionClass) {
		String name = actionClass.getName();
		for (IBussInfo info : allDatas.values()) {
			Function funct = (Function)info; 
			if (name.equals(funct.getAction()))
				return funct;
		} 
		return null; 
	}

	
}
