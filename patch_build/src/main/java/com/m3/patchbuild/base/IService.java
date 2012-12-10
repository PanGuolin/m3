package com.m3.patchbuild.base;

import com.m3.patchbuild.IBussInfo;

/**
 * 服务接口
 * @author pangl
 *
 */
public interface IService extends IManageable{

	/**
	 * 根据业务的UUID查找对应的业务对象
	 * @param uuid
	 * @return
	 */
	public IBussInfo findByUuid(String uuid);
	
	public IService clone();
	
	public void saveInfo(IBussInfo info);
	
	public void deleteInfo(IBussInfo info);
	
	public IBussInfo findByBillNo(String property, Object value);
	
	public IBussInfo findByBillNo(String[] properties, Object[] values);
	
	public boolean isSingleton() ;
	
}
