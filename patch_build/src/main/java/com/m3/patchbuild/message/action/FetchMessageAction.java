package com.m3.patchbuild.message.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageService;

/**
 * 获取消息的Action
 * @author pangl
 *
 */
public class FetchMessageAction extends BaseAction{
	private int size = 5; //默认获取5条
	private Map<String, Object> dataMap = new HashMap<String, Object>();

	@Override
	protected String doExecute() throws Exception {
		if (size < 1)
			size = 5;
		MessageService msgService = (MessageService)BussFactory.getService(Message.class);
		List<Message> msgs = msgService.fetchNew(ContextUtil.getUserId(), size);
		StringBuilder sb = new StringBuilder();
		
		dataMap.put("size", msgs.size());
		for(Message msg : msgs) {
			if (sb.length() > 0)
				sb.append(";");
			sb.append(msg.getUuid());
			dataMap.put(msg.getUuid(), msg);
		}
		dataMap.put("ids", sb.toString());
		return SUCCESS;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
}
