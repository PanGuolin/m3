package com.m3.patchbuild;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.user.FunctionPerm;
import com.m3.patchbuild.user.FunctionPermService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
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
		
		FunctionPermService fpService = (FunctionPermService)BussFactory.getService(FunctionPerm.class);
		List<String> roles = fpService.listRoleByAction(this.getClass());
		if (roles != null && !roles.isEmpty()) {
			User user = getLoginUser();
			if (user == null) {
				setTips("用户必须登录才能继续操作");
				return LOGIN;
			}
			boolean hasRole = false;
			for (String role : roles) {
				if (UserRole.loginedUser.equals(role)) {
					hasRole = true;
					break;
				}
				if (user.hasRole(role)) {
					hasRole = true;
					break;
				}
			}
			if (!hasRole) {
				setTips("用户没有执行当前功能的权限！");
				return LOGIN;
			}
		}
		
		User user = getLoginUser();
		ContextUtil.setUserId(user == null ? null : user.getUserId());
		try {
			HibernateUtil.openSession();
			return doExecute();
		} catch (Throwable ex) {
			logger.error("Action发生异常", ex);
			setTips("错误:" + ex.getMessage());
			return ERROR;
		} finally {
			HibernateUtil.closeSession();
		}
		
	}
	

	protected abstract String doExecute() throws Exception;
	
}
