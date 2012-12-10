package com.m3.patchbuild;

import com.m3.common.query.IQuery;

/**
 * 基础查询Action
 * @author pangl
 *
 */
public abstract class BaseQueryAction extends BaseAction{
	private IQuery query;
	
	public BaseQueryAction(IQuery query) {
		super();
		this.query = query;
	}

	public IQuery getQ() {
		return query;
	}

	public void setQ(IQuery query) {
		this.query = query;
	}

}
