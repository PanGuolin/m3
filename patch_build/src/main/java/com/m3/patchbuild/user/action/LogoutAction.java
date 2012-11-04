package com.m3.patchbuild.user.action;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;

/**
 * 注销当前用户
 * @author MickeyMic
 *
 */
public class LogoutAction extends BaseAction {

	@Override
	protected String doExecute() throws Exception {
		ContextUtil.logout();
		return LOGIN;
	}

}
