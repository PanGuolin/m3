package com.m3.patchbuild.sys.action;

import java.util.List;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.sys.Function;
import com.m3.patchbuild.sys.IFunctionService;

public class QueryFunctionAction extends BaseAction{
	private FunctionQuery q = new FunctionQuery();

	@SuppressWarnings("unchecked")
	@Override
	protected String doExecute() throws Exception {
		q.ascOrder("type");
		q.ascOrder("code");
		IFunctionService packService = (IFunctionService)BussFactory.getService(Function.class);
		List<Function> list = (List<Function>) packService.list(q);
		dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", list);
		return SUCCESS;
	}

	public FunctionQuery getQ() {
		return q;
	}

}
