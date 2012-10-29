package com.m3.patchbuild;

import org.apache.log4j.Logger;

public class AbstractService implements IService{
	private static final Logger logger = Logger.getLogger(AbstractService.class);
	
	private BaseDAO dao;
	
	public AbstractService(BaseDAO dao) {
		this.dao = dao;
	}

	public IService clone() {
		try {
			return (IService) super.clone();
		} catch (CloneNotSupportedException e) {
			logger.error("克隆对象时出错", e);
			return null;
		}
	}
	
	public BaseDAO getDao() {
		return dao;
	}

	@Override
	public IBussInfo findInfoByUuid(String uuid) {
		return (IBussInfo)dao.findByUuid(uuid);
	}
}
