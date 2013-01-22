package com.m3.patchbuild.message;

import com.m3.patchbuild.IBussInfo;

/**
 * 业务处理服务接口
 * @author pangl
 *
 */
public interface IHandleService {

	public void handle(IBussInfo info, Object context);
	
	public Object newContext();
}
