package com.m3.patchbuild.user;

import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.message.IHandleService;

/**
 * 改变角色申请
 * @author pangl
 *
 */
public interface IChangeRoleReqService extends IService, IHandleService{
	
	public ChangeRoleReq findUnhandle(User user);
}
