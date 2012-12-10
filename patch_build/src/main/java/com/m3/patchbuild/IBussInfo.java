package com.m3.patchbuild;
/**
 * 业务对象接口
 * @author pangl
 *
 */
public interface IBussInfo {

	/**
	 * 获取业务对象的唯一编号
	 * @return
	 */
	public String getUuid();
	
	public void setUuid(String uuid);
}
