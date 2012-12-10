package com.m3.metadata.info;

public class BaseMetadataInfo implements IMetadataInfo {

	protected String pack;
	protected String id;
	protected String name;
	
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
