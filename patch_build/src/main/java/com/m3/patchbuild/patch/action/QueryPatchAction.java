package com.m3.patchbuild.patch.action;

import java.util.List;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.patch.IPatchService;
import com.m3.patchbuild.patch.Patch;

/**
 * 查询补丁信息
 * @author pangl
 *
 */
public class QueryPatchAction extends BaseAction {
	private PatchQuery q = new PatchQuery();

	public PatchQuery getQ() {
		return q;
	}

	public void setQ(PatchQuery query) {
		this.q = query;
	}

	@Override
	protected String doExecute() throws Exception {
		IPatchService patchService = (IPatchService)BussFactory.getService(Patch.class);
		q.descOrder("createTime");
		List<Patch> list = patchService.query(q);
		dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", list);
		return SUCCESS;
	}
}
