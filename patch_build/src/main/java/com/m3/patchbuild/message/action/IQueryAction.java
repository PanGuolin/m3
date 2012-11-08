package com.m3.patchbuild.message.action;

import com.m3.patchbuild.BaseQuery;

/**
 * 接收查询条件的Action
 * @author pangl
 *
 */
public interface IQueryAction {
	
	/**
	 * 获取查询对象
	 * @return
	 */
	public BaseQuery getQ(); 

	/**
	 * 设置查询对象
	 * @param query
	 */
	public void setQ(BaseQuery query);

}
