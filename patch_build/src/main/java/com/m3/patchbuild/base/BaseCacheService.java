package com.m3.patchbuild.base;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.query.IQuery;
import com.m3.patchbuild.IBussInfo;

public abstract class BaseCacheService implements IService{
	private static final Logger logger = Logger.getLogger(BaseCacheService.class);
	protected Map<String, IBussInfo> allDatas = new HashMap<String, IBussInfo>();
	
	public BaseCacheService() {
		this.loadAll();
	}
	
	@SuppressWarnings("unchecked")
	protected synchronized void loadAll() {
		allDatas.clear();
		List<IBussInfo> list = (List<IBussInfo>) DaoUtil.list(getBizClass(), null);
		for (IBussInfo info : list) {
			allDatas.put(info.getUuid(), info);
		}
	}
	
	@Override
	public IBussInfo findByUuid(String uuid) {
		return allDatas.get(uuid);
	}

	@Override
	public List<IBussInfo> list(IQuery query) {
		List<IBussInfo> infos = new ArrayList<IBussInfo>();
		infos.addAll(allDatas.values());
		return infos;
	}

	@Override
	public void saveInfo(IBussInfo info) {
		DaoUtil.saveInfo(info);
		allDatas.put(info.getUuid(), info);
	}

	@Override
	public void deleteInfo(IBussInfo info) {
		DaoUtil.delete(info);
		allDatas.remove(info.getUuid());
	}

	@Override
	public IBussInfo findByBillNo(String property, Object value) {
		String name = "get" + Character.toUpperCase(property.charAt(1)) + property.substring(1);
		try {
			Method method = getBizClass().getMethod(name, (Class<?>[])null);
			for (IBussInfo info : allDatas.values()) {
				Object pv = method.invoke(info, (Object[])null);
				if (value.equals(pv)) {
					return info;
				}
			}
		} catch (Exception ex) {
			logger.error("获取属性时出错", ex);
		}
		return null;
	}

	@Override
	public IBussInfo findByBillNo(String[] properties, Object[] values) {
		return null;
	}

	@Override
	public boolean isSingleton() {
		return true;
	}
	
	final public Class<? extends IBussInfo> getBizClass() {
		return doGetBizClass();
	}
	
	protected abstract Class<? extends IBussInfo> doGetBizClass();

	public IService clone() {
		try {
			return (IService) super.clone();
		} catch (CloneNotSupportedException e) {
			logger.error("克隆对象时出错", e);
			return null;
		}
	}
}
