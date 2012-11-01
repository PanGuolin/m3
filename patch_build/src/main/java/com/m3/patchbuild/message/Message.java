package com.m3.patchbuild.message;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid;//唯一ID
	
	private String groudId; //消息分组ID
	
	private String owner; //拥有者
	
	private String ownType; //拥有类型: notifier -通知, reciever -接收人
	
	private boolean attached; //是否有附件
	
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
	
	@Column(name="sender")
	private String sender; //发送人
	
	@Column(name="sendTime")
	private Date sendTime; //发送时间
	
	@Column(name="status")
	private int status; //消息状态
	
	//@OneToOne(fetch=FetchType.LAZY, optional = true, cascade = CascadeType.ALL, mappedBy = "messageId")
	@ManyToOne(optional=true, targetEntity=MessageDetail.class,  cascade = CascadeType.ALL)
	@JoinColumn(name="messageId")
	private MessageDetail detail;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getGroudId() {
		return groudId;
	}

	public void setGroudId(String groudId) {
		this.groudId = groudId;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getOwnType() {
		return ownType;
	}

	public void setOwnType(String ownType) {
		this.ownType = ownType;
	}

	public boolean isAttached() {
		return attached;
	}

	public void setAttached(boolean attached) {
		this.attached = attached;
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

	public MessageDetail getDetail() {
		return detail;
	}

	public void setDetail(MessageDetail detail) {
		this.detail = detail;
	}

}
