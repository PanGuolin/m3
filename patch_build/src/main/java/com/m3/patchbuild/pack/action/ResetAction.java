package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 转发给用户处理
 * @author pangl
 *
 */
public class ResetAction extends BaseAction {
	
	private String cancel;
	private String i= null;//构建包ID

	@Override
	protected String doExecute() throws Exception {
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		Pack pack = (Pack) packService.findByUuid(i);
		if (pack == null) {
			throw new Exception("指定的构建包不存在" + i);
		}
		if (cancel != null) {
			packService.cancel(pack);
			msgService.expiredByBussInfo(pack);
		} else {
			pack.setStatus(PackStatus.checkFail);
			pack.setFailReason("构建包被重置");
			packService.saveInfo(pack);
		}
		return SUCCESS;
	}

	public void setCancel(String cancel) {
		this.cancel = cancel;
	}

	public String getI() {
		return i;
	}

	public void setI(String i) {
		this.i = i;
	}

	
	
}
