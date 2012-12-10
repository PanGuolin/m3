package com.m3.patchbuild.user;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseReqInfo;

/**
 * 重设密码请求
 * @author pangl
 *
 */
@Entity
@Table(name="user_ResetPassReq")
public class ResetPassReq extends BaseReqInfo{

	private String password; //新口令
	private String clientAddr; //请求的客户地址
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getClientAddr() {
		return clientAddr;
	}

	public void setClientAddr(String clientAddr) {
		this.clientAddr = clientAddr;
	}
}
