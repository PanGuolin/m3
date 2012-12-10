package com.m3.patchbuild.pack.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

public class PublishAction extends BaseAction{
	
	private List<Pack> packs;
	private String[] uuids;//待发布的构建包列表

	@Override
	protected String doExecute() throws Exception {
		IPackService service = (IPackService)BussFactory.getService(Pack.class);
		if (uuids == null) {//请求发布
			List<Pack> pks = service.listByStatus(PackStatus.pass);
			this.packs = new ArrayList<Pack>(); 
			packs.addAll(pks);
			Map<String, Pack> packMap = new HashMap<String, Pack>();
			for (Pack pack : packs) {
				packMap.put(pack.getBuildNo(), pack);
			}
			List<Pack> remList = new ArrayList<Pack>();
			for (Pack pack : packs) {
				for (Pack depend : pack.getDepends()) {
					if (!packs.contains(depend) 
							&& !depend.getStatus().equals(PackStatus.published)) {//依赖未发布，删除
						remList.add(pack);
					}
				}
			}
			packs.removeAll(remList);
			sort(packs);
			return "handle";
		} else {//发布指定构建包
			List<Pack> packs = service.listByUuids(Arrays.asList(uuids));
			sort(packs);
			for (Pack pack : packs) {
				service.publish(pack);
			}
		}
		return SUCCESS;
	}
	
	private static void sort(List<Pack> packs) {
		List<Pack> list = new ArrayList<Pack>();
		List<String> buildNos = new ArrayList<String>();
		//按依赖关系进行排序
		for (Pack pack : packs) {
			if (!PackStatus.pass.equals(pack.getStatus())) {
				continue;
			}
			list.add(pack);
			buildNos.add(pack.getBuildNo());
		}
		for (Pack pack : packs) {
			for (Pack dep : pack.getDepends()) {
				int index  = list.indexOf(dep);
				int index2 = list.indexOf(pack);
				if (index > index2) {
					list.add(index2, list.remove(index));
				}
			}
		}
		packs.clear();
		packs.addAll(list);
	}

	public List<Pack> getPacks() {
		return packs;
	}


	public void setUuids(String[] uuids) {
		this.uuids = uuids;
	}
	
	

}
