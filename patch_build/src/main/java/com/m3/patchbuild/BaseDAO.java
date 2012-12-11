package com.m3.patchbuild;

import java.util.List;

import com.m3.common.query.IQuery;
import com.m3.patchbuild.base.DaoUtil;


/**
 * DAO抽象类
 * @author MickeyMic
 *
 */
public abstract class BaseDAO {
	
	protected Class<?> bizClass;
	
	public BaseDAO(Class<?> bizClass) {
		this.bizClass = bizClass;
	}
	
	/**
	 * 查找所有的业务对象
	 * @return
	 */
	public List<?> list(IQuery query) {
		return DaoUtil.list(bizClass, query);
	}
}


