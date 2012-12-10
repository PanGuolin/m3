package com.m3.patchbuild.base;

import org.apache.log4j.Logger;

import com.m3.patchbuild.IBussInfo;

public abstract class BaseService implements IService{
	private static final Logger logger = Logger.getLogger(BaseService.class);
	
	public IService clone() {
		try {
			return (IService) super.clone();
		} catch (CloneNotSupportedException e) {
			logger.error("克隆对象时出错", e);
			return null;
		}
	}
	
	public IBussInfo findByUuid(String uuid) {
		return DaoUtil.loadInfo(getBizClass(), uuid);
	}
	
	public void saveInfo(IBussInfo info) {
		DaoUtil.saveInfo(info);
	}
	
	public void deleteInfo(IBussInfo info) {
		DaoUtil.delete(info);
	}
	
	public IBussInfo findByBillNo(String property, Object value) {
		return findByBillNo(new String[]{property}, new Object[]{value});
	}
	
	public IBussInfo findByBillNo(String[] properties, Object[] values) {
		return DaoUtil.findByBillNo(getBizClass(), properties, values);
	}
	
	final public Class<? extends IBussInfo> getBizClass() {
		return doGetBizClass();
	}
	
	protected abstract Class<? extends IBussInfo> doGetBizClass();

	@Override
	public boolean isSingleton() {
		return true;
	}
}
