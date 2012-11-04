package com.m3.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.user.FunctionPerm;
import com.m3.patchbuild.user.FunctionPermService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
import com.opensymphony.xwork2.ActionContext;

/**
 * 线程上下文环境
 * @author MickeyMic
 *
 */
public abstract class ContextUtil {
	
	public static final String KEY_USREID = "userId";
	
	private volatile static ThreadLocal<Map<String, Object>> values = new ThreadLocal<Map<String,Object>>();

	public static Object getValue(String key) {
		Map<String, Object> tValues = values.get();
		if (tValues == null)
			return null;
		return tValues.get(key);
	}
	
	public static void setValue(String key, Object value) {
		Map<String, Object> tValues = values.get();
		if (tValues == null) {
			tValues = new HashMap<String, Object>();
			values.set(tValues);
		}
		tValues.put(key, value);
	}
	
	public static String getUserId() {
		return (String) getValue(KEY_USREID);
	}
	
	public static void setUserId(String userId) {
		setValue(KEY_USREID, userId);
	}
	
	
	public static final String KEY_TIPS = "tips"; //保存提示信息的KEY
	/**
	 * 保存提示信息到当前用户的上下文环境中
	 * @param tips
	 */
	public static void setTips(HttpServletRequest request, String tips) {
		if (tips == null)
			return;
		if (request == null) {
			String old = (String) ActionContext.getContext().get(KEY_TIPS);
			if (!StringUtil.isEmpty(old)) {
				tips = old + "<br/>" + tips;
			}
			ActionContext.getContext().put(KEY_TIPS, tips);
		} else {
			String old = (String) request.getAttribute(KEY_TIPS);
			if (!StringUtil.isEmpty(old)) {
				tips = old + "<br/>" + tips;
			}
			request.setAttribute(KEY_TIPS, tips);
		}
	}
	
	public static String getTips(HttpServletRequest request) {
		if (request == null) {
			return (String) ActionContext.getContext().get(KEY_TIPS);
		} else {
			return (String) request.getAttribute(KEY_TIPS);
		}
	}
	
	public static final String KEY_SESSION_USER = "userBean"; //保存用户信息的KEY
	
	/**
	 * 保存已登录用户信息
	 * @param user
	 * @param branch
	 */
	public static void userLogin(User user) {
		Map<String, Object> map = ActionContext.getContext().getSession();
		map.put(KEY_SESSION_USER, user);
	}
	
	/**
	 * 获取已登录用户信息
	 * @return
	 */
	public static User getLoginUser(HttpServletRequest request) {
		if (request != null)
			return (User)request.getSession().getAttribute(KEY_SESSION_USER);
		else
			return (User)ActionContext.getContext().getSession().get(KEY_SESSION_USER);
	}
	
	/**
	 * 检查用户权限
	 * @param path
	 * @return
	 */
	public static boolean checkPermission(HttpServletRequest request, String path) {
		FunctionPermService fpService = (FunctionPermService)BussFactory.getService(FunctionPerm.class);
		List<String> roles = fpService.listRoleByPath(path);
		User user = getLoginUser(request);
		if (roles != null && !roles.isEmpty()) {
			if (user == null) {
				setTips(request, "用户必须登录才能继续操作");
				return false;
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
				setTips(request, "用户没有执行当前功能的权限！");
				return false;
			}
		}
		if (user != null)
			setUserId(user.getUserId());
		return true;
	}

	/**
	 * 用户注销
	 */
	public static void logout() {
		Map<String, Object> map = ActionContext.getContext().getSession();
		map.put(KEY_SESSION_USER, null);
	}

}
