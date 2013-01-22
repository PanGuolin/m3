package com.m3.patchbuild.aop;

import java.util.Map;

import com.m3.patchbuild.IBussInfo;

/**
 * 执行上下文接口
 * @author pangl
 *
 */
public interface IExecuteContext {
	
	Map<String, Object> getScriptContext();
	
	IBussInfo getBussInfo();

}
