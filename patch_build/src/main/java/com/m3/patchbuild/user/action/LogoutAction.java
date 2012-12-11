package com.m3.patchbuild.user.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;

/**
 * 注销当前用户
 * @author MickeyMic
 *
 */
public class LogoutAction extends BaseAction implements ServletResponseAware {

	@Override
	protected String doExecute() throws Exception {
		ContextUtil.logout();
		return LOGIN;
	}
	
	private HttpServletResponse response;
	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		this.response = arg0;
		
	}

}
