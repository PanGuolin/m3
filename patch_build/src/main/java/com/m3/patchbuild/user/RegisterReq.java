package com.m3.patchbuild.user;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseReqInfo;

/**
 * 注册请求
 * @author pangl
 *
 */
@Entity
@Table(name = "User_RegisterReq")
public class RegisterReq extends BaseReqInfo{
	
	private String userId; //对应的用户ID

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
