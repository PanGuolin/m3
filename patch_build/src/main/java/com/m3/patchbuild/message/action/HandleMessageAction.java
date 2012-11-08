package com.m3.patchbuild.message.action;

import java.util.UUID;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.IStateful;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageReciever;
import com.m3.patchbuild.message.MessageService;
import com.opensymphony.xwork2.ActionContext;

/**
 * 处理消息
 * @author pangl
 *
 */
public class HandleMessageAction extends BaseAction{
	
	public static final String NEXT = "next"; //下一个页面
	
	private String bussType; //处理业务的ACTION命名空间

	private String nextAction; //处理业务的ACTION名称 
	
	private String bussId; //消息关联业务ID
	
	private String i;//消息UUID
	
	private String checkId; //防止恶意访问的ID号
	
	private String t; //请求类型

	@Override
	protected String doExecute() throws Exception {
		if (i == null) {
			setTips("必须指定ID");
			return ERROR;
		}
		MessageService msgService = (MessageService)BussFactory.getService(Message.class);
		Message message = (Message) msgService.findInfoByUuid(i);
		if (message == null) {
			setTips("没有找到相应的消息");
			return ERROR;
		}
		if (message.getStatus() != IStateful.STATE_NORMAL) {
			setTips("消息已过期!");
			return ERROR;
		}
		
		String userId = ContextUtil.getUserId();
		boolean isParticiant = false;
		for (MessageReciever rec : message.getRecievers()) {
			if (rec.getSendType() == MessageReciever.SEND_TYPE_TO && userId.equals(rec.getUserId())) {
				isParticiant = true;
				break;
			}
		}
		if (!isParticiant) {
			setTips("当前用户没有权限处理该消息");
			return ERROR;
		}
		if (message.getBussType() == null || message.getBussId() == null) {
			setTips("当前消息没有对应的业务，不需要处理");
			return ERROR;
		}
		this.checkId = UUID.randomUUID().toString();
		ActionContext.getContext().getSession().put(checkId, true);
		this.bussId = message.getBussId();
		this.bussType = "/" + message.getBussType();
		//this.nextAction = "handle";
		return NEXT;
	}

	public String getI() {
		return i;
	}

	public void setI(String i) {
		this.i = i;
	}

	public String getNextAction() {
		return nextAction;
	}

	public void setNextAction(String nextAction) {
		this.nextAction = nextAction;
	}

	public String getBussId() {
		return bussId;
	}

	public String getBussType() {
		return bussType;
	}

	public String getCheckId() {
		return checkId;
	}

	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}
}
