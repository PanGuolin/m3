package com.m3.patchbuild.msgflow;

public class BaseAdviceConfig implements IAdviceConfig{
	
	protected String service;
	protected String methodName;
	protected String[] paramTypes;
	protected String condition;
	protected AdviceType adviceType;

	public String getService() {
		return service;
	}

	public String getMethodName() {
		return methodName;
	}

	public String[] getParamTypes() {
		return paramTypes;
	}

	public String getCondition() {
		return condition;
	}

	@Override
	public AdviceType getAdviceType() {
		return adviceType;
	}

}
