package com.m3.patchbuild.pack.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 列出特定的构建包
 * @author pangl
 *
 */
public class ListPackByStatusAction extends BaseAction{
	
	private String status; //状态索引
	
	private Map<String, Object> dataMap = new HashMap<String, Object>();

	@Override
	protected String doExecute() throws Exception {
		
		String[] ss = status.split(",");
		List<PackStatus> slist = new ArrayList<PackStatus>();
		for (String s : ss) {
			int i = Integer.parseInt(s);
			PackStatus stat = PackStatus.values()[i];
			slist.add(stat);
		}
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		List<Pack> packs = packService.listByStatus(slist);
		BeanUtil.toJSON(packs, new String[]{"uuid", "branch.branch", "buildNo", "status#toString"}, dataMap, "rows");
		return SUCCESS;
	}

	public void setStatus(String status) {
		this.status = status;
	}



	public Map<String, Object> getDataMap() {
		return dataMap;
	}
	
}
