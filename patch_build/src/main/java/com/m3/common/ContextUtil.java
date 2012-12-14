package com.m3.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.sys.Function;
import com.m3.patchbuild.sys.IFunctionService;
import com.m3.patchbuild.sys.Role;
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
	
	private static Map<String, Function> functionMap = new HashMap<String, Function>();
	private static long functionLoadedTime = -1l;
	
	/**
	 * 检查用户权限
	 * @param path
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static boolean checkPermission(HttpServletRequest request, String path) {
		if (functionMap.isEmpty() && functionLoadedTime == -1) {
			synchronized (functionMap) {
				if (functionMap.isEmpty()) {
					IFunctionService fService = (IFunctionService)BussFactory.getService(Function.class);
					List<Function> functions = (List<Function>) fService.list(null);
					Map<String, Function> map = new HashMap<String, Function>();
					for (Function f : functions) {
						String key = f.getInfo();
						if (f.getType() == 1 && !key.startsWith("/")) {
							key = "/"+key;
						}
						map.put(key, f);
					}
					functionMap.putAll(map);
					functionLoadedTime = System.currentTimeMillis();
				}
			}
		}
		Function funct = functionMap.get(path);
		
		if (funct == null || funct.getRoles().isEmpty()) 
			return true;
		User user = ContextUtil.getLoginUser(request);
		if (user == null) {
			setTips(request, "用户必须登录才能继续操作");
			return false;
		}
		
		Set<Role> roles = funct.getRoles();
		Set<UserRole> userRoles = user.getRoles();
		for (Role role : roles) {
			if ("[loginedUser]".equals(role.getCode()))
				return true;
			for (UserRole uRole : userRoles) {
				if (uRole.getRole().equals(role)) {
					return true;
				}
			}
		}
		setTips(request, "用户没有执行当前功能的权限！");
		return false;
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
