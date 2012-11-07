package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;
import com.opensymphony.xwork2.ActionContext;

/**
 * 处理构建包
 * @author pangl
 *
 */
public class HandlePackAction extends BaseAction{
	
	private static final String BUILD_FAILD = "buildfail";
	
	private static final String CHECK = "check";//检查状态的页面跳转
	
	private String bussId;
	
	private String checkId;
	
	private Pack pack; //构建包对象

	@Override
	protected String doExecute() throws Exception {

		if (!(boolean)ActionContext.getContext().getSession().get(checkId)) {
			setTips("访问路径 不合法，拒绝访问");
			return ERROR;
		}
		PackService packService = (PackService)BussFactory.getService(Pack.class);
		pack = (Pack) packService.findInfoByUuid(bussId);
		switch(pack.getStatus()) {
		case buildFail:
			return BUILD_FAILD;
		case builded:
			return CHECK;
		}
		return SUCCESS;
	}

	public void setBussId(String bussId) {
		this.bussId = bussId;
	}

	public void setCheckId(String checkId) {
		this.checkId = checkId;
	}

	public Pack getPack() {
		return pack;
	}

	public void setPack(Pack pack) {
		this.pack = pack;
	}
}
