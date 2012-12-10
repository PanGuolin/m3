package com.m3.patchbuild.message;

import org.hibernate.Criteria;

import com.m3.common.query.BaseQuery;

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
	
	private int status = 0; //消息状态，默认为0，即正常状态
	private int nt = 0; //消息类型，0-过滤接收消息，1-过滤通知消息
	
	public MessageQuery() {
		this.descOrder("sendTime");
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getNt() {
		return nt;
	}

	public void setNt(int nt) {
		this.nt = nt;
	}

	@Override
	protected void doBeforeQuery(Criteria criteria) {
	}
	
}
