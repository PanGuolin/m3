package com.m3.metadata.info;

/**
 * 功能元数据对象
 * @author pangl
 *
 */
public class MFunction extends BaseMetadataInfo{
	
	private MService service;
	private String method;
	private String condition;
	
	public MService getService() {
		return service;
	}
	
	public void setService(MService service) {
		this.service = service;
		setPack(service.getPack());
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
