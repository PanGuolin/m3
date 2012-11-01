package com.m3.patchbuild.message.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
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
public class FetchMessageAction extends BaseAction  {
	public static final String TYPE_NEWEST = "n"; //仅取最新一条
	public static final String TYPE_NEWALL = "nl"; //取所有消息
	private Map<String, Object> dataMap = new HashMap<String, Object>();
	private String t = TYPE_NEWEST;
	private int page = 0;
	private int rows = 10;

	@SuppressWarnings("unchecked")
	@Override
	protected String doExecute() throws Exception {
		if (TYPE_NEWEST.equals(t)) {
			String id = ServletActionContext.getRequest().getSession().getId();
			UserMessageQueue.consume(id, new ActionMessageConsumer(dataMap));
		} else if (TYPE_NEWALL.equals(t)) {
			MessageQuery query = new MessageQuery();
			query.setPageIndex(page);
			query.setPageSize(rows);
			MessageService msgService = (MessageService)BussFactory.getService(Message.class);
			List<Message> msgs = (List<Message>) msgService.list(query);
			//List<Message> msgs = msgService.fetchNew(ContextUtil.getUserId());
			dataMap.put("total", msgs.size());
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

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}
	
	
	
}
