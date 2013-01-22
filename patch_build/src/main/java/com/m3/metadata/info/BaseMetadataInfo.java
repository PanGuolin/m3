package com.m3.metadata.info;

/**
 * 基础的元数据描述
 * @author pangl
 *
 */
public class BaseMetadataInfo implements IMetadataInfo {

	private String pack;
	private String id;
	private String name;
	
	public String getPack() {
		return pack;
	}
	
	public void setPack(String pack) {
		this.pack = pack;
	}

	public String getId() {
		return this.id;
	}
	
	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

}
