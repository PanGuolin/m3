package com.m3.patchbuild.base.action;

import java.util.List;

import com.m3.common.query.IQuery;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.IService;

/**
 * 基础查询Action
 * @author pangl
 *
 */
public abstract class BaseQueryAction extends BaseAction{
	
	private IQuery q;
	private Class<? extends IBussInfo> bizClass;
	public BaseQueryAction(IQuery q, Class<? extends IBussInfo> bizClass) {
		this.q = q;
		this.bizClass = bizClass;
	}

	@Override
	protected String doExecute() throws Exception {
		IService service = BussFactory.getService(bizClass);
		List<? extends IBussInfo> list = service.list(q);
		if (q != null)
			dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", list);
		return SUCCESS;
	}
	
	public IQuery getQ() {
		return q;
	}

}
