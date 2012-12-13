package com.m3.patchbuild.user.action;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.role.Role;
import com.m3.patchbuild.svn.SVNUtil;
import com.m3.patchbuild.sys.IRoleService;
import com.m3.patchbuild.user.IUserRole;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

public class ImportUserFromSVN extends BaseAction{
	
	private User user;
	private String branch;

	@Override
	public String doExecute() throws Exception {
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		User exUser = userService.findUser(user.getUserId());
		if (exUser != null) {
			setTips("用户已存在，请不要重复注册!");
			return INPUT;
		}
		IBranchService branchService = (IBranchService)BussFactory.getService(Branch.class);
		Branch bBranch = branchService.getBranch(branch);
		if (SVNUtil.checkLogin(bBranch.getSvnUrl(), user.getUserId(), user.getPassword())) {
			IRoleService roleService = (IRoleService)BussFactory.getService(Role.class);
			user.getRoles().clear();
			user.setEnabled(true);
			user.addRole(branch, roleService.find(IUserRole.developer));
			userService.add(user);
			ContextUtil.userLogin(user);
			return SUCCESS;
		} else {
			setTips("用户名/口令在SVN上验证失败，请检查输入是否正确!你也可以向管理员申请注册");
			return INPUT;
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
