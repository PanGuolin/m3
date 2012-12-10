package com.m3.patchbuild.user.action;

import org.apache.struts2.ServletActionContext;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

public class LoginAction extends BaseAction {
	private String username;
	private String password;
	
	@Override
	public String doExecute() throws Exception {
		User user = ((IUserService)BussFactory.getService(User.class))
				.checkUser(username, password);
		if (user == null) {
			setTips("登录失败，请重试！");
			return INPUT;
		}
		
		ContextUtil.userLogin(user);
		dataMap.put("sessionId", ServletActionContext.getRequest().getSession().getId());
		return SUCCESS;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}
}
