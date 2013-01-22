package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 角色服务接口
 * @author pangl
 *
 */
public interface IRoleService extends IService {
	
	public Role find(String code);

	public List<Role> listAssignable();

}
