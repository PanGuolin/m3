package com.m3.patchbuild;

/**
 * 服务接口
 * @author pangl
 *
 */
public interface IService extends Cloneable{

	/**
	 * 根据业务的UUID查找对应的业务对象
	 * @param uuid
	 * @return
	 */
	public IBussInfo findInfoByUuid(String uuid);
	
	public IService clone();
}
