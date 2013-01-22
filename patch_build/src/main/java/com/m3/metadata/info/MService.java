package com.m3.metadata.info;

/**
 * 服务元数据对象
 * @author pangl
 *
 */
public class MService extends BaseMetadataInfo {

	private String clz; //对应java类

	public String getClz() {
		return clz;
	}

	public void setClz(String clz) {
		this.clz = clz;
	}
}
