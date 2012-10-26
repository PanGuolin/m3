package com.m3.patchbuild.info;

/**
 * 检查信息
 * @author pangl
 *
 */
public class CheckInfo {
	
	private String user; //审批用户
	
	private String message; //审批意见
	
	private boolean isPass; //是否通过

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isPass() {
		return isPass;
	}

	public void setPass(boolean isPass) {
		this.isPass = isPass;
	}
}
