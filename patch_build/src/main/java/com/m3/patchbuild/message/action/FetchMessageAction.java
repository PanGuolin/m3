package com.m3.patchbuild.message.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.m3.patchbuild.BaseQueryAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageQuery;
import com.m3.patchbuild.message.MessageService;
import com.m3.patchbuild.message.UserMessageQueue;

/**
 * 获取消息的Action
 * @author pangl
 *
 */
public class FetchMessageAction extends BaseQueryAction  {

	public static final String TYPE_NEWEST = "n"; //仅取最新一条
	public static final String TYPE_NEWALL = "nl"; //取所有消息
	private Map<String, Object> dataMap = new HashMap<String, Object>();
	private String t = TYPE_NEWEST;

	public FetchMessageAction() {
		super(new MessageQuery());
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected String doExecute() throws Exception {
		if (TYPE_NEWEST.equals(t)) {
			String id = ServletActionContext.getRequest().getSession().getId();
			UserMessageQueue.consume(id, new ActionMessageConsumer(dataMap));
		} else if (TYPE_NEWALL.equals(t)) {
			MessageQuery query = (MessageQuery) getQuery();
			MessageService msgService = (MessageService)BussFactory.getService(Message.class);
			List<Message> msgs = (List<Message>) msgService.list(query);
			dataMap.put("total", query.getTotalSize());
			dataMap.put("rows", msgs);
		} else {
			return ERROR;
		}
		return SUCCESS;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setT(String t) {
		this.t = t;
	}
	
}
