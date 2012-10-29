package com.m3.patchbuild.message;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.IBussInfo;

/**
 * 消息对象
 * @author MickeyMic
 *
 */
@Entity
@Table(name="PB_Message")
public class Message implements IBussInfo{
	
	public static final int TYPE_VIEW = 1;
	public static final int TYPE_DEAL = 1 >> 1;
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid;
	
	@Column(name="group")
	private String group; //消息分组
	
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
	
	@Column(name="owner")
	private String owner; //消息消息用户
	
	private Date createTime; //创建时间
	
	private Date dealTime; //处理时间

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
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

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}
	

}
