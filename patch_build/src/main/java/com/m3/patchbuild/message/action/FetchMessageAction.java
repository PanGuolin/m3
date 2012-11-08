package com.m3.patchbuild.message.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.m3.common.BeanUtil;
import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseQuery;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.base.BaseJsonAction;
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
public class FetchMessageAction extends BaseJsonAction  implements IQueryAction {

	public static final String TYPE_NEWEST = "n"; //仅取最新一条
	public static final String TYPE_NEWALL = "nl"; //取所有消息
	public static final String TYPE_QUERY_OPERATOR = "qo";
	public static final String TYPE_IGNORE = "ig"; //忽略消息
	
	private String t = TYPE_NEWEST;
	private String i; //消息的UUID
	private MessageQuery q = new MessageQuery();

	@SuppressWarnings("unchecked")
	@Override
	protected void doExecute(Map<String, Object> dataMap) throws Exception {
		MessageService msgService = (MessageService)BussFactory.getService(Message.class);
		if (TYPE_NEWEST.equals(t)) {
			String id = ServletActionContext.getRequest().getSession().getId();
			UserMessageQueue.consume(id, ContextUtil.getUserId(), new ActionMessageConsumer(dataMap));
		} else if (TYPE_NEWALL.equals(t)) {
			List<Message> msgs = (List<Message>) msgService.list(q);
			dataMap.put("total", q.getTotalSize());
			dataMap.put("rows", msgs);
		} else if (TYPE_QUERY_OPERATOR.equals(t)) {
			List<MessageReciever> recievers = msgService.listOperators(i);
			BeanUtil.toJSON(recievers, new String[]{"userId", "userName"}, dataMap, "rows");
		} else if (TYPE_IGNORE.equals(t)) {
			msgService.ignore(i, ContextUtil.getUserId());
		}
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

	public BaseQuery getQ() {
		return this.q;
	}

	public void setQ(BaseQuery query) {
		this.q = (MessageQuery) query;
	}
	
}
