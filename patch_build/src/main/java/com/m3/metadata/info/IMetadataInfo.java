package com.m3.metadata.info;

public interface IMetadataInfo {
	
	/**
	 * 返回对象所属的包
	 * @return
	 */
	String getPack();
	
	/**
	 * 返回对象ID
	 * @return
	 */
	String getId();
	
	/**
	 * 返回对象名称
	 * @return
	 */
	String getName();

}
