package com.m3.patchbuild.user.action;

import com.m3.common.SVNUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
import com.m3.patchbuild.user.UserService;

public class ImportUserFromSVN extends BaseAction{
	
	private User user;
	private String branch;

	@Override
	public String doExecute() throws Exception {
		UserService userService = (UserService)BussFactory.getService(User.class);
		User exUser = userService.findUser(user.getUserId());
		if (exUser != null) {
			setTips("用户已存在，请不要重复注册!");
			return ERROR;
		}
		BranchService branchService = (BranchService)BussFactory.getService(Branch.class);
		Branch bBranch = branchService.getBranch(branch);
		if (SVNUtil.checkLogin(bBranch.getSvnUrl(), user.getUserId(), user.getPassword())) {
			user.getRoles().clear();
			user.addRole(UserRole.developer);
			userService.save(user);
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
