package com.m3.patchbuild.user.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.ChangeRoleReq;
import com.m3.patchbuild.user.IChangeRoleReqService;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;

public class EditUserAction extends BaseAction{
	
	private String i; //维护的目标用户UUID
	private User user;
	private String[] roles;

	@Override
	protected String doExecute() throws Exception {
		String branch = ContextUtil.getCurrentBranch().getBranch();
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		if (user == null) {//查询
			if (i == null) {
				user = userService.findUser(ContextUtil.getUserId());
				ContextUtil.userLogin(user);
			} else
				user = (User) userService.findByUuid(i);
			List<String> list = new ArrayList<String>();
			for (UserRole role : user.getRoles()) {
				if (branch.equals(role.getBranch())) {
					list.add(role.getRoleId());
				}
			}
			this.roles = (String[])list.toArray(new String[list.size()]);
			return INPUT;
		} else {
			User oldUser = (User)userService.findByUuid(user.getUuid());
			oldUser.setEmail(user.getEmail());
			oldUser.setUsername(user.getUsername());
			if (roles != null) {
				Set<UserRole> oldRoles = oldUser.getRoles();
				boolean equal = roles.length == oldRoles.size();
				if (equal) {
					for (String role : roles) {
						boolean exists = false;
						for (UserRole r : oldRoles) {
							if (r.getBranch().equals(branch) 
									&& r.getRoleId().equals(role)) {
								exists = true; break;
							}
						}
						if (!exists) {
							equal = false;
							break;
						}
					}
				}
				if (!equal) {
					IChangeRoleReqService cService = (IChangeRoleReqService)BussFactory.getService(ChangeRoleReq.class);
					ChangeRoleReq req = cService.findUnhandle(oldUser);
					if (req == null || req.getHandleTime() != null) {
						req = new ChangeRoleReq();
					}
					String nr = StringUtil.join(roles, ";");
					if (!nr.equals(req.getNewRoles())) {//改变角色列表
						req.setCreateTime(new Date());
						req.setNewRoles(nr);
						req.setRequester(oldUser);
						req.setBranch(branch);
						cService.saveInfo(req);
						setTips("角色列表变更，请等待审批");
					}
				}
			}
			userService.saveInfo(oldUser);
			setTips("信息更新成功");
			user = oldUser;
			return INPUT;
		}
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setI(String i) {
		this.i = i;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}

	public String[] getRoles() {
		return roles;
	}
	
	
}
