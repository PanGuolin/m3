package com.m3.patchbuild.message;

import org.hibernate.Criteria;
import org.hibernate.sql.JoinType;

import com.m3.common.ContextUtil;
import com.m3.common.query.BaseQuery;
import com.m3.common.query.QueryField;

/**
 * 消息查询对象
 * @author pangl
 *
 */
public class MessageQuery extends BaseQuery{
	
	public static int NT_RECIEVER = 0; //接收消息
	public static int NT_NOTIFIER = 1; //通知消息
	
	public static int STATUS_NOR = 0; //正常状态
	
	public static int STATUS_INCLUD_EXPIR = 1; //包含处理过的
	
	@QueryField
	private int status = 0; //消息状态，默认为0，即正常状态
	
	@QueryField(property="rec.sendType")
	private int recieveType; //消息类型，0-过滤接收消息，1-过滤通知消息
	
	@QueryField(property="rec.userId")
	private String userId;
	
	@QueryField(property="rec.status")
	private int recieveStatus = MessageReciever.STATUS_NORMAL;
	
	public MessageQuery() {
		this.descOrder("sendTime");
	}

	public int getStatus() {
		return status;
	}


	@Override
	protected void doBeforeQuery(Criteria criteria) {
		criteria.createAlias("recievers", "rec", JoinType.LEFT_OUTER_JOIN);
	}

	public int getRecieveType() {
		return recieveType;
	}

	public void setRecieveType(int recieveType) {
		this.recieveType = recieveType;
	}

	public String getUserId() {
		if (userId == null)
			return ContextUtil.getUserId();
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getRecieveStatus() {
		return recieveStatus;
	}

	public void setRecieveStatus(int recieveStatus) {
		this.recieveStatus = recieveStatus;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
	

	
}
