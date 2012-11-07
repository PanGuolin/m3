package com.m3.patchbuild.message.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.m3.common.BeanUtil;
import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseQueryAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageQuery;
import com.m3.patchbuild.message.MessageReciever;
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
	public static final String TYPE_QUERY_OPERATOR = "qo";
	public static final String TYPE_IGNORE = "ig"; //忽略消息
	
	private Map<String, Object> dataMap = new HashMap<String, Object>();
	private String t = TYPE_NEWEST;
	private String i; //消息的UUID

	public FetchMessageAction() {
		super(new MessageQuery());
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected String doExecute() throws Exception {
		MessageService msgService = (MessageService)BussFactory.getService(Message.class);
		if (TYPE_NEWEST.equals(t)) {
			String id = ServletActionContext.getRequest().getSession().getId();
			try {
			UserMessageQueue.consume(id, ContextUtil.getUserId(),
					new ActionMessageConsumer(dataMap));
			} catch (InterruptedException ex) {
				//超时或被其它线程替代，此时客户端不应当重新请求
				
			}
		} else if (TYPE_NEWALL.equals(t)) {
			MessageQuery query = (MessageQuery) getQ();
			List<Message> msgs = (List<Message>) msgService.list(query);
			dataMap.put("total", query.getTotalSize());
			dataMap.put("rows", msgs);
		} else if (TYPE_QUERY_OPERATOR.equals(t)) {
			List<MessageReciever> recievers = msgService.listOperators(i);
			BeanUtil.toJSON(recievers, new String[]{"userId", "userName"}, dataMap, "rows");
		} else if (TYPE_IGNORE.equals(t)) {
			msgService.ignore(i, ContextUtil.getUserId());
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

	public void setI(String i) {
		this.i = i;
	}
	
}
