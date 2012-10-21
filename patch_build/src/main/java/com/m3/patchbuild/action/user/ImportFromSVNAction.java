package com.m3.patchbuild.action.user;

import com.m3.common.SVNUtil;
import com.m3.patchbuild.action.BaseAction;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.User;
import com.m3.patchbuild.info.UserRoleEnum;
import com.m3.patchbuild.service.BuildBranchService;
import com.m3.patchbuild.service.UserService;

public class ImportFromSVNAction extends BaseAction{
	
	private User user;
	private String branch;

	@Override
	public String doExecute() throws Exception {
		
		User exUser = UserService.findUser(user.getUserId());
		if (exUser != null) {
			setTips("用户已存在，请不要重复注册!");
			return ERROR;
		}
		BuildBranch bBranch = BuildBranchService.getBranch(branch);
		if (SVNUtil.checkLogin(bBranch.getSvnUrl(), user.getUserId(), user.getPassword())) {
			user.getRoles().clear();
			user.addRole(UserRoleEnum.developer);
			UserService.createUser(user);
			return SUCCESS;
		} else {
			setTips("用户名/口令在SVN上验证失败，请检查输入是否正确!你也可以向管理员申请注册");
			return ERROR;
		}
		
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}
}
