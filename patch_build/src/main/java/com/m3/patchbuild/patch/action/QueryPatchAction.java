package com.m3.patchbuild.patch.action;

import java.util.List;
import java.util.Map;

import com.m3.patchbuild.base.BaseJsonAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.patch.IPatchService;
import com.m3.patchbuild.patch.Patch;

/**
 * 查询补丁信息
 * @author pangl
 *
 */
public class QueryPatchAction extends BaseJsonAction {
	private PatchQuery q = new PatchQuery();

	public PatchQuery getQ() {
		return q;
	}

	public void setQ(PatchQuery query) {
		this.q = query;
	}

	@Override
	protected void doExecute(Map<String, Object> dataMap) throws Exception {
		IPatchService patchService = (IPatchService)BussFactory.getService(Patch.class);
		List<Patch> list = patchService.query(q);
		dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", list);
		
	}

}
