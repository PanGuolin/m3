package com.m3.patchbuild.user;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.DaoUtil;

public class ResetPassReqService extends BaseService implements IResetPassReqService{

	public ResetPassReqService() {
	}

	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return ResetPassReq.class;
	}

	@Override
	public ResetPassReq findValidReq(User user) {
		return (ResetPassReq) DaoUtil.findByBillNo(getBizClass(), 
				new String[]{"requester", "handleTime"}, new Object[]{user, null});
	}

	@Override
	public void handle(IBussInfo info, Object context) {
		HandleContext ctx = (HandleContext)context;
		ResetPassReq req = (ResetPassReq) info;
		req.setAccepted(ctx.isAccepted());
		req.setHandleTime(new Date());
		req.setHandleUser(ContextUtil.getLoginUser());
		if (req.isAccepted()) {
			User user = req.getRequester();
			user.setPassword(req.getPassword());
			BussFactory.getService(User.class).saveInfo(user);
		}
		saveInfo(req);
	}

	@Override
	public HandleContext newContext() {
		return new HandleContext();
	}
	
	static class HandleContext {
		private boolean accepted;

		public boolean isAccepted() {
			return accepted;
		}

		public void setAccepted(boolean accepted) {
			this.accepted = accepted;
		}
	}

}
