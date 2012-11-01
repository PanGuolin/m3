package com.m3.patchbuild.message;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.IBussInfo;

/**
 * 消息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="Msg_Message")
public class Message implements IBussInfo{
	
	public static final int TYPE_VIEW = 1;
	public static final int TYPE_DEAL = 1 >> 1;
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid;
	
	private String notifiers = null;//消息通知人，以分号连接
	
	private String recievers;//消息接收人列表，以分号连接

	private String attachments; //附件列表，以分号连接
	
	@Column(name="bussType")
	private String bussType; //业务类别
	
	@Column(name="bussId")
	private String bussId; //业务ID
	
	@Column(name="subject")
	private String subject; //消息主题
	
	@Column(name="content")
	private String content; //消息内容
	
	@Column(name="messageType")
	private int messageType; //消息类型
	
	@Column(name="operator")
	private String operator; //处理人
	
	@Column(name="operateTime")
	private Date operateTime;//处理时间
	
	@Column(name="sender")
	private String sender; //发送人
	
	@Column(name="sendTime")
	private Date sendTime; //发送时间
	
	@Column(name="status")
	private int status; //消息状态

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getMessageType() {
		return messageType;
	}

	public void setMessageType(int messageType) {
		this.messageType = messageType;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
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

	public String getNotifiers() {
		return notifiers;
	}

	public void setNotifiers(String notifiers) {
		this.notifiers = notifiers;
	}

	public String getRecievers() {
		return recievers;
	}

	public void setRecievers(String recievers) {
		this.recievers = recievers;
	}

	public String getAttachments() {
		return attachments;
	}

	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}

}
