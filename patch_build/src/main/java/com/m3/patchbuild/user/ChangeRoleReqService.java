package com.m3.patchbuild.user;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.DaoUtil;

/**
 * 改变角色列表
 * @author pangl
 *
 */
public class ChangeRoleReqService extends BaseService implements IChangeRoleReqService{

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return ChangeRoleReq.class;
	}

	@Override
	public ChangeRoleReq findUnhandle(User user) {
		return (ChangeRoleReq) DaoUtil.findByBillNo(getBizClass(), 
				new String[]{"requester", "handleTime"},
				new Object[]{user, null});
	}
	
	@Override
	public void handle(IBussInfo info, Object context) {
		ChangeRoleReq req = (ChangeRoleReq) info;
		HandleContext ctx = (HandleContext)context;
		req.setAccepted(ctx.accepted);
		req.setHandleTime(new Date());
		req.setHandleUser(ContextUtil.getLoginUser());
		req.setComment(StringUtil.join(ctx.roles, ";"));
		if (req.isAccepted()) {
			String branch = req.getBranch();
			IUserService uService = (IUserService)BussFactory.getService(User.class);
			User user = req.getRequester();
			uService.removeRoles(user, branch);
			for (String s : ctx.roles) {
				user.addRole(branch, s);
			}
			uService.saveInfo(user);
		}
		saveInfo(req);
	}

	@Override
	public HandleContext newContext() {
		return new HandleContext();
	}
	
	static class HandleContext {
		private boolean accepted = false;
		private String[] roles = null;

		public boolean isAccepted() {
			return accepted;
		}
		public void setAccepted(boolean accepted) {
			this.accepted = accepted;
		}
		public String[] getRoles() {
			return roles;
		}
		public void setRoles(String[] roles) {
			this.roles = roles;
		}
	}

}
