package com.m3.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.user.FunctionPerm;
import com.m3.patchbuild.user.IFunctionPermService;
import com.m3.patchbuild.user.IUserRole;
import com.m3.patchbuild.user.User;
import com.opensymphony.xwork2.ActionContext;

/**
 * 线程上下文环境
 * @author MickeyMic
 *
 */
public abstract class ContextUtil {
	
	public static final String KEY_USREID = "userId";
	
	public static final String KEY_SESSION_BRANCH = "currentBranch";
	
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
	public static Branch getCurrentBranch() {
		return (Branch)ActionContext.getContext().getSession().get(KEY_SESSION_BRANCH);
	}
	
	public static void setBranch(Branch branch) {
		ActionContext.getContext().getSession().put(KEY_SESSION_BRANCH, branch);
	}
	
	
	public static final String KEY_TIPS = "tips"; //保存提示信息的KEY
	/**
	 * 保存提示信息到当前用户的上下文环境中
	 * @param tips
	 */
	public static String setTips(HttpServletRequest request, String tips) {
		if (tips == null)
			return getTips(request);
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
		return tips;
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
		if (getCurrentBranch() == null) {
			IBranchService branchService = (IBranchService)BussFactory.getService(Branch.class);
			map.put(KEY_SESSION_BRANCH, branchService.getBranch(user.getMainBranch()));
		}
	}
	
	public static User getLoginUser() {
		return getLoginUser(null);
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
	
	private static Map<String, List<String>> roleMap = new HashMap<String, List<String>>();
	/**
	 * 检查用户权限
	 * @param path
	 * @return
	 */
	public static boolean checkPermission(HttpServletRequest request, String path) {
		List<String> roles = roleMap.get(path);
		if (roles == null) {
			IFunctionPermService fpService = (IFunctionPermService)BussFactory.getService(FunctionPerm.class);
			roles = fpService.listRoleByPath(path);
			roleMap.put(path, roles);
		}
		
		User user = getLoginUser(request);
		if (roles != null && !roles.isEmpty()) {
			if (user == null) {
				setTips(request, "用户必须登录才能继续操作");
				return false;
			}
			boolean hasRole = false;
			Branch branch = getCurrentBranch();
			for (String role : roles) {
				if (IUserRole.loginedUser.equals(role)) {
					hasRole = true;
					break;
				}
				if (user.hasRole(branch.getBranch(), role)) {
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
		map.remove(KEY_SESSION_USER);
		map.remove(KEY_SESSION_BRANCH);
		setValue(KEY_USREID, null);
	}

}
