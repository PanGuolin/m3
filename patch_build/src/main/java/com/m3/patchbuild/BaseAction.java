package com.m3.patchbuild;

import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.HibernateUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRoleEnum;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;

public abstract class BaseAction implements Action {
	
	private static final Logger logger = Logger.getLogger(BaseAction.class);
	
	public static final String KEY_TIPS = "tips";
	
	public static final String KEY_SESSION_USER = "userBean";
	
	protected void setTips(String tips) {
		if (tips != null) {
			String old = (String) ActionContext.getContext().get(KEY_TIPS);
			if (!StringUtil.isEmpty(old)) {
				tips = old + "<br/>" + tips;
			}
			ActionContext.getContext().put(KEY_TIPS, tips);
		}
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
	
	protected User getLoginUser() {
		return (User)ActionContext.getContext().getSession().get(KEY_SESSION_USER);
	}

	final public String execute() throws Exception {
		UserRoleEnum[] roles = getAccessableRoles();
		if (roles != null) {
			User user = getLoginUser();
			if (user == null) {
				setTips("用户必须登录才能继续操作");
				return LOGIN;
			}
			boolean valid = false;
			for (UserRoleEnum role : roles) {
				if (user.hasRole(role)) {
					valid = true;
					break;
				}
			}
			if (!valid) {
				if (user != null) {
					setTips("当前用户没有权限执行本操作");
					return INPUT;
				}
			}
			
		}
		try {
			HibernateUtil.openSession();
			return doExecute();
		} catch (Throwable ex) {
			logger.error("Action发生异常", ex);
			setTips("程序发生异常:" + ex.getMessage());
			return ERROR;
		} finally {
			HibernateUtil.closeSession();
		}
		
	}
	

	protected abstract String doExecute() throws Exception;
	
	/**
	 * 获取有权限执行当前action的角色列表，返回空或null表示任意人都可以执行
	 * TODO: 修改为可配置方式
	 * @return
	 */
	public UserRoleEnum[] getAccessableRoles() {
		return null;
	}
}
