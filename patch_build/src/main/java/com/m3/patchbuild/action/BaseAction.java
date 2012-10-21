package com.m3.patchbuild.action;

import java.util.Map;

import com.m3.patchbuild.info.User;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;

public abstract class BaseAction implements Action {
	
	public static final String KEY_TIPS = "tips";
	
	public static final String KEY_SESSION_USER = "userBean";
	
	protected void setTips(String tips) {
		if (tips != null)
			ActionContext.getContext().put(KEY_TIPS, tips);
	}
	
	/**
	 * 保存已登录用户信息
	 * @param user
	 * @param branch
	 */
	protected void userLogin(User user) {
		Map<String, Object> map = ActionContext.getContext().getSession();
		map.put(KEY_SESSION_USER, user);
	}
	

}
