package com.m3.patchbuild.aop;

import java.util.Map;

import com.m3.patchbuild.IBussInfo;

public interface IExecuteContext {
	
	Map<String, Object> getScriptContext();
	
	IBussInfo getBussInfo();

}
