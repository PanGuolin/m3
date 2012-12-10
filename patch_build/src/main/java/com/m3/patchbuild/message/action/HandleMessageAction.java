package com.m3.patchbuild.message.action;

import java.util.HashMap;
import java.util.Map;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.IStateful;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageHandler;
import com.m3.patchbuild.message.MessageReciever;

/**
 * 处理消息
 * @author pangl
 *
 */
public class HandleMessageAction extends BaseAction{
	
	private Map<String, Object> dataMap = new HashMap<String, Object>();
	
	public static final String KEY_PAGE_MODE = "pageMode"; //JSON KEY OF Page Mode
	
	public static final String KEY_PAGE_URL = "pageUrl"; //JSON KEY OF Page URL
	
	private String i;//消息UUID

	@Override
	protected String doExecute() throws Exception {
		if (i == null) {
			setTips("必须指定ID");
			return ERROR;
		}
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		Message message = (Message) msgService.findByUuid(i);
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
		IBussInfo info = BussFactory.getService(message.getBussType()).findByUuid(message.getBussId());
		this.dataMap.put(KEY_PAGE_MODE, MessageHandler.getViewMode(info));
		this.dataMap.put(KEY_PAGE_URL, MessageHandler.getAction(info));
		
		return SUCCESS;
	}

	public void setI(String i) {
		this.i = i;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}
}

