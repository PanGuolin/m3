package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;

/**
 * 根据构建状态进行任务分发
 * @author pangl
 *
 */
public class DispatchPackAction extends BaseAction {
	
	private String i; //构建包UUID
	
	private Pack pack; //构建包对象
	
	protected String doExecute() throws Exception {
		pack = (Pack)((IPackService)BussFactory.getService(Pack.class)).findByUuid(i);
		return pack.getStatus().name();
	}

	public Pack getPack() {
		return pack;
	}

	public void setI(String i) {
		this.i = i;
	}
	
	
}
