package com.m3.patchbuild.sys;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

public class RoleService extends BaseCacheService implements IRoleService{

	@Override
	public Role find(String code) {
		for (IBussInfo info : allDatas.values()) {
			Role role = (Role)info;
			if (role.getCode().equals(code)) {
				return role;
			}
		}
		return null;
	}

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return Role.class;
	}

	
}
