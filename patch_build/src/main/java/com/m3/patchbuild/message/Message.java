package com.m3.patchbuild.message;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 消息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="Msg_Message")
public class Message  extends BaseBussInfo {
	
	private static final long serialVersionUID = 1L;

	public static final int MESSAGE_TYPE_TASK = 0; //消息类型：任务
	
	@Column(name="bussType")
	private String bussType; //业务类别
	
	@Column(name="bussId")
	private String bussId; //业务ID
	
	@Column(name="subject")
	private String subject; //消息主题
	
	@Column(name="messageType")
	private int messageType; //消息类型
	
	@Column(name="operateTime")
	private Date operateTime;//处理时间
	
	private String operator; //处理人
	
	@Column(name="sender")
	private String sender; //发送人
	
	@Column(name="sendTime")
	private Date sendTime; //发送时间
	
	@Column(name="status")
	private int status; //消息状态
	
	private String content; //消息主体

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "message",  cascade = CascadeType.ALL) 
	private Set<MessageReciever> recievers = new HashSet<MessageReciever>();
	
	public String getBussType() {
		return bussType;
	}

	public void setBussType(String bussType) {
		this.bussType = bussType;
	}

	public String getBussId() {
		return bussId;
	}

	public void setBussId(String bussId) {
		this.bussId = bussId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getMessageType() {
		return messageType;
	}

	public void setMessageType(int messageType) {
		this.messageType = messageType;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Set<MessageReciever> getRecievers() {
		return recievers;
	}

	public void setRecievers(Set<MessageReciever> recievers) {
		this.recievers = recievers;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
}
