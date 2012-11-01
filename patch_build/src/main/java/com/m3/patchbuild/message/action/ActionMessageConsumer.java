package com.m3.patchbuild.message.action;

import java.util.Map;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
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
	
	@Override
	public void consume(Message message) throws Exception {
		dataMap.put("message", message);
	}

	/**
	 * 是否接受指定消息，如果接受说明可以让本队列的消费者消费，否则不进入队列
	 * @param message
	 * @return
	 */
	public boolean accept(Message message) {
		String userId = ContextUtil.getUserId();
		if (StringUtil.isEmpty(userId))
			return false;
		return message.getNotifiers().contains(userId) || message.getRecievers().contains(userId);
	}
}
