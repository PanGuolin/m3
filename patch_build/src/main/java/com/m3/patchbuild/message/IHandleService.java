package com.m3.patchbuild.message;

import com.m3.patchbuild.IBussInfo;


public interface IHandleService {

	public void handle(IBussInfo info, Object context);
	
	public Object newContext();
}
