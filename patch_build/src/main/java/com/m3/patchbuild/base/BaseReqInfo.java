package com.m3.patchbuild.base;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.m3.patchbuild.user.User;

/**
 * 基础请求对象
 * @author pangl
 *
 */
@Entity
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
public abstract class BaseReqInfo extends BaseBussInfo implements IReqInfo{
	private Date createTime; //请求创建时间
	private Date handleTime; //处理时间
	private boolean accepted; //是否接受重置
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="handleUser")
	private User handleUser;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="requester")
	private User requester; //申请者ID
	
	private String comment;
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getHandleTime() {
		return handleTime;
	}
	public void setHandleTime(Date handleTime) {
		this.handleTime = handleTime;
	}
	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public User getHandleUser() {
		return handleUser;
	}
	public void setHandleUser(User handleUser) {
		this.handleUser = handleUser;
	}
	public User getRequester() {
		return requester;
	}
	public void setRequester(User requester) {
		this.requester = requester;
	}

	
}
