package com.m3.patchbuild.user;

import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.message.IHandleService;

/**
 * 重置密码请求服务
 * @author pangl
 *
 */
public interface IResetPassReqService extends IService, IHandleService {
	
	/**
	 * 查找有效的请求
	 * @param user
	 * @return
	 */
	public ResetPassReq findValidReq(User user);

}
