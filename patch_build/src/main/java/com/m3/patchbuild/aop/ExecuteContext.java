package com.m3.patchbuild.aop;

import java.util.HashMap;
import java.util.Map;

import com.m3.patchbuild.IBussInfo;

/**
 * AOP执行上下文
 * @author pangl
 *
 */
public class ExecuteContext implements IExecuteContext {
	
	private IBussInfo bussInfo;
	private Map<String, Object> scriptContext = new HashMap<String, Object>();
	
	public ExecuteContext(Map<String, Object> scriptContext, int bussInfoIndex) {
		this.scriptContext = scriptContext;
		if (bussInfoIndex > -1) {
			Object param = scriptContext.get("_P" + bussInfoIndex);
			if (param instanceof IBussInfo) {
				bussInfo = (IBussInfo)param;
			}
		}
	}
	
	@Override
	public Map<String, Object> getScriptContext() {
		return scriptContext;
	}

	@Override
	public IBussInfo getBussInfo() {
		return bussInfo;
	}

}
