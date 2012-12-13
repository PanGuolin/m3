package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;

/**
 * 查看
 * @author pangl
 *
 */
public class GetPackAction extends BaseAction{

	private String uuid = null;
	private Pack pack = null;
	
	@Override
	protected String doExecute() throws Exception {
		IPackService pService = (IPackService) BussFactory.getService(Pack.class);
		pack = (Pack) pService.findByUuid(uuid);
		return SUCCESS;
	}
	
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public Pack getPack() {
		return pack;
	}
	
	

}
