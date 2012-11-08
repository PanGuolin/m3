package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.message.MessageConstant;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;
import com.m3.patchbuild.pack.PackStatus;
import com.opensymphony.xwork2.ActionContext;

/**
 * 根据构建状态进行任务分发
 * @author pangl
 *
 */
public class DispatchTaskAction extends BaseAction{
	private String bussId; //业务对象ID
	private String checkId;
	private String reqtype; //请求内容类型
	private String messageId; //消息ID号
	
	private Pack pack; //构建包对象

	@Override
	protected String doExecute() throws Exception {

		if (!(boolean)ActionContext.getContext().getSession().get(checkId)) {
			setTips("访问路径 不合法，拒绝访问");
			return ERROR;
		}
		PackService packService = (PackService)BussFactory.getService(Pack.class);
		pack = (Pack) packService.findInfoByUuid(bussId);
		if (MessageConstant.REQTYPE_PAGEMODE.equals(reqtype)) {
			if (PackStatus.builded.equals(pack.getStatus())) {
				return MessageConstant.PAGETYPE_NEWWIN;//new window
			} else {
				return MessageConstant.PAGETYPE_INERWIN;//inner window
			}
		} else {
			return pack.getStatus().name();
		}
	}

	public void setBussId(String bussId) {
		this.bussId = bussId;
	}

	public void setCheckId(String checkId) {
		this.checkId = checkId;
	}

	public Pack getPack() {
		return pack;
	}

	public void setPack(Pack pack) {
		this.pack = pack;
	}

	public void setReqtype(String reqtype) {
		this.reqtype = reqtype;
	}

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
	
}
