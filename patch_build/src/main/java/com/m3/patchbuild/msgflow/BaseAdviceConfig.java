package com.m3.patchbuild.msgflow;

/**
 * 基础切面配置信息
 * @author pangl
 *
 */
public class BaseAdviceConfig implements IAdviceConfig{
	
	private String service;
	private String methodName;
	private String[] paramTypes;
	private String condition;
	private AdviceType adviceType;

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

	protected void setService(String service) {
		this.service = service;
	}

	protected void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	protected void setParamTypes(String[] paramTypes) {
		this.paramTypes = paramTypes;
	}

	protected void setCondition(String condition) {
		this.condition = condition;
	}

	protected void setAdviceType(AdviceType adviceType) {
		this.adviceType = adviceType;
	}

	
}
