package com.m3.patchbuild.message.action;

import java.util.List;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageQuery;

/**
 * 查询消息
 * @author pangl
 *
 */
public class QueryMessageAction extends BaseAction{

	private MessageQuery q = new MessageQuery();
	
	@Override
	protected String doExecute() throws Exception {
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		q.descOrder("sendTime");
		List<Message> msgs = (List<Message>) msgService.list(q);
		dataMap.put("total", q.getTotalSize());
		dataMap.put("rows", msgs);
		return SUCCESS;
	}

	public MessageQuery getQ() {
		return this.q;
	}

	public void setQ(MessageQuery query) {
		this.q = query;
	}
}
