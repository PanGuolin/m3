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
	
	private Map<String, Object> dataMap;
	
	public ActionMessageConsumer(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	
	/**
	 * 消费一条消息，简单地将消息放到json对象中返回给客户端
	 */
	public void consume(Message message) throws Exception {
		dataMap.put("message", message);
	}

}
