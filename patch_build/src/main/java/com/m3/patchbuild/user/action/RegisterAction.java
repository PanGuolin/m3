package com.m3.patchbuild.user.action;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.ChangeRoleReq;
import com.m3.patchbuild.user.IChangeRoleReqService;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

/**
 * 用户注册
 * @author pangl
 *
 */
public class RegisterAction extends BaseAction{

	private User user = null;
	private String[] roles = null;
	
	@Override
	protected String doExecute() throws Exception {
		if (user != null) {
			IUserService userService = (IUserService) BussFactory.getService(User.class);
			User oldUser = userService.findUser(user.getUserId());
			if (oldUser != null) {
				setTips("用户" + user.getUserId() + "已存在!");
				return INPUT;
			}
			user.setEnabled(true);
			userService.saveInfo(user);
			if (roles != null && roles.length > 0) {
				IChangeRoleReqService cService = (IChangeRoleReqService)BussFactory.getService(ChangeRoleReq.class);
				ChangeRoleReq req = new ChangeRoleReq();
				req.setRequester(user);
				req.setBranch(user.getMainBranch());
				req.setNewRoles(StringUtil.join(roles, ";"));
				cService.saveInfo(req);
				setTips("角色列表变更，请等待审批");
			}
			ContextUtil.userLogin(user);
			return SUCCESS;
		}
		return INPUT;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String[] getRoles() {
		return roles;
	}
	public void setRoles(String[] roles) {
		this.roles = roles;
	}
}
