package com.m3.patchbuild.pack.action;

import java.util.List;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;

/**
 * 查询构建包信息
 * @author pangl
 *
 */
public class QueryPackAction extends BaseAction {
	private PackQuery q = new PackQuery();

	public PackQuery getQ() {
		return q;
	}

	public void setQ(PackQuery query) {
		this.q = (PackQuery) query;
	}

	@Override
	protected String doExecute() throws Exception {
		super.jfs = true;
		q.ascOrder("branch.branch");
		q.descOrder("buildTime");
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		List<Pack> list = packService.query(q);
		dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", list);
		return SUCCESS;
	}

}
