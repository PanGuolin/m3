package com.m3.metadata.info;

public class MFunction extends BaseMetadataInfo{
	
	private MService service;
	private String method;
	private String condition;
	
	public MService getService() {
		return service;
	}
	
	public void setService(MService service) {
		this.service = service;
		this.pack = service.getPack();
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
}
