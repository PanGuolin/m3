package com.m3.patchbuild;

/**
 * 基础查询Action
 * @author pangl
 *
 */
public abstract class BaseQueryAction extends BaseAction{
	private BaseQuery query;
	
	public BaseQueryAction(BaseQuery query) {
		super();
		this.query = query;
	}

	public BaseQuery getQ() {
		return query;
	}

	public void setQ(BaseQuery query) {
		this.query = query;
	}

}
