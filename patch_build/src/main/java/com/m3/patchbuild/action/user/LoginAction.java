package com.m3.patchbuild.action.user;

import com.m3.patchbuild.action.BaseAction;
import com.m3.patchbuild.info.User;
import com.m3.patchbuild.service.UserService;

public class LoginAction extends BaseAction {
	
	private String username;
	private String password;
	
	@Override
	public String doExecute() throws Exception {
		User user = UserService.getUser(username, password);
		
		if (user == null) {
			setTips("登录失败，请重试！");
			return ERROR;
		}
		
		super.userLogin(user);
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
