package com.m3.patchbuild.sys;

import com.m3.patchbuild.base.IService;

public interface IRoleService extends IService {
	
	public Role find(String code);

}
