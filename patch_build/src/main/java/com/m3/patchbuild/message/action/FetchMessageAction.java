package com.m3.patchbuild.message.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.m3.common.BeanUtil;
import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageQuery;
import com.m3.patchbuild.message.MessageReciever;
import com.m3.patchbuild.message.UserMessageQueue;
import com.m3.patchbuild.sys.UserNoLoginException;

/**
 * 获取消息的Action
 * @author pangl
 *
 */
public class FetchMessageAction extends BaseAction {

	public static final String TYPE_NEWEST = "n"; //仅取最新一条
	public static final String TYPE_NEWALL = "nl"; //取所有消息
	public static final String TYPE_QUERY_OPERATOR = "qo";
	public static final String TYPE_IGNORE = "ig"; //忽略消息
	
	private String t = TYPE_NEWEST;
	private String i; //消息的UUID
	private String b; //业务类型
	private MessageQuery q = new MessageQuery();

	@Override
	protected String doExecute() throws Exception {
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		if (TYPE_NEWEST.equals(t)) {
			String id = ServletActionContext.getRequest().getSession().getId();
			try {
				UserMessageQueue.consume(id, ContextUtil.getUserId(), 
					new ActionMessageConsumer(dataMap));
			} catch (UserNoLoginException e) {
				dataMap.put("status", "-1");
			} catch (Exception ex) {
				setTips("当前请求被其它请求中断");
			}
		} else if (TYPE_NEWALL.equals(t)) {
			q.descOrder("sendTime");
			List<Message> msgs = (List<Message>) msgService.list(q);
			dataMap.put("total", q.getTotalSize());
			dataMap.put("rows", msgs);
		} else if (TYPE_QUERY_OPERATOR.equals(t)) {
			List<MessageReciever> recievers = null;
			if (b != null)
				recievers = msgService.listOperatorsByBuss(b, i);
			else
				recievers = msgService.listOperators(i);
			BeanUtil.toJSON(recievers, new String[]{"userId", "userName"}, dataMap, "rows");
		} else if (TYPE_IGNORE.equals(t)) {
			msgService.ignore(i, ContextUtil.getUserId());
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

	public MessageQuery getQ() {
		return this.q;
	}

	public void setQ(MessageQuery query) {
		this.q = query;
	}

	public void setB(String b) {
		this.b = b;
	}
	
	
	
}
