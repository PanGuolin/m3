package com.m3.patchbuild.message.action;

import java.util.Map;

import com.m3.patchbuild.message.IMessageConsumer;
import com.m3.patchbuild.message.Message;

/**
 * Action 消息消费者
 * @author pangl
 *
 */
public class ActionMessageConsumer implements IMessageConsumer{
	
	//private static final MessageService msgService = (MessageService)BussFactory.getService(Message.class);

	private Map<String, Object> dataMap;
	
	public ActionMessageConsumer(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	
	/**
	 * 消息一条消息
	 */
	public void consume(Message message) throws Exception {
		dataMap.put("message", message);
	}

}
