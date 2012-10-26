package com.m3.common.log;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 日志业务对象
 * @author pangl
 *
 */
@Entity
@Table(name="SYS_OperationLog")
public class LogInfo {
	
	public static final int STATE_FAIL = 0;
	
	public static final int STATE_SUCC = 1;

	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name = "uuid", unique = true)
	private String uuid; //唯一ID
	
	@Column(name="opUser", nullable=false)
	private String user; //操作用户
	
	@Column(name="opTime", nullable=false)
	private Date opTime; //操作时间
	
	@Column(name="opType")
	private String opType; //操作类型
	
	@Column(name="bussType")
	private String bussType; //业务类型
	
	@Column(name="bussId")
	private String bussId; //业务ID
	
	@Column(name="property")
	private String property; //操作属性
	
	@Column(name="opState")
	private int opState; //操作状态

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Date getOpTime() {
		return opTime;
	}

	public void setOpTime(Date opTime) {
		this.opTime = opTime;
	}

	public String getOpType() {
		return opType;
	}

	public void setOpType(String opType) {
		this.opType = opType;
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

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public int getOpState() {
		return opState;
	}

	public void setOpState(int opState) {
		this.opState = opState;
	}
}
