package com.m3.patchbuild.sys;

import java.util.ArrayList;
import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

/**
 * 角色服务
 * @author pangl
 *
 */
public class RoleService extends BaseCacheService implements IRoleService{

	@Override
	public Role find(String code) {
		for (IBussInfo info : getAllDatas().values()) {
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

	@Override
	public List<Role> listAssignable() {
		List<Role> list = new ArrayList<Role>();
		for (IBussInfo info : getAllDatas().values()) {
			Role role = (Role)info;
			if (role.isAssignable()) {
				list.add(role);
			}
		}
		return list;
	}

	
}
