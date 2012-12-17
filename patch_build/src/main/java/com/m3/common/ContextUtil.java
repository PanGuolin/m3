package com.m3.common;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.sys.Function;
import com.m3.patchbuild.sys.IFunctionService;
import com.m3.patchbuild.sys.IMenuService;
import com.m3.patchbuild.sys.IRoleService;
import com.m3.patchbuild.sys.Menu;
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
	
	public static final String KEY_SESS_USERROLES = "userRoles";
	
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
	
	
	public static final String KEY_SESSION_BRANCH = "currentBranch";//当前工作分支 
	public static void setCurrentBranch(Branch branch) {
		setSessAttr(KEY_SESSION_BRANCH, branch);
		User user = getLoginUser();
		removeSessAttr(KEY_SESS_USERROLES);
		if (user != null) {
			Set<UserRole> userRoles = user.getRoles();
			Set<Role> roles = new HashSet<Role>();
			for (UserRole userRole : userRoles) {
				if (userRole.getBranch().equals(branch.getBranch())) {
					roles.add(userRole.getRole());
				}
			}
			IRoleService roleService = (IRoleService)BussFactory.getService(Role.class);
			roles.add(roleService.find(Role.loginedUser));
			setSessAttr(KEY_SESS_USERROLES, roles);
		}
	}
	
	public static Branch getCurrentBranch() {
		return (Branch)getSessAttr(KEY_SESSION_BRANCH);
	}
	
	@SuppressWarnings("unchecked")
	private static Set<Role> getUserRoles() {
		return (Set<Role>) getSessAttr(KEY_SESS_USERROLES);
	}
	
	public static final String KEY_TIPS = "tips"; //保存提示信息的KEY
	/**
	 * 保存提示信息到当前用户的上下文环境中
	 * @param tips
	 */
	public static String setTips(String tips) {
		String old = getTips();
		if (tips == null)
			return getTips();
		
		if (!StringUtil.isEmpty(old)) {
			tips = old + "<br/>" + tips;
		}
		setReqAttr(KEY_TIPS, tips);
		return tips;
	}
	
	public static String getTips() {
		return (String) getReqAttr(KEY_TIPS);
	}
	
	public static final String KEY_SESSION_USER = "userBean"; //保存用户信息的KEY
	public static final String KEY_SESSION_MENUS = "myMenus"; //我的菜单 
	/**
	 * 保存已登录用户信息
	 * @param user
	 * @param branch
	 */
	public static void userLogin(User user) {
		setSessAttr(KEY_SESSION_USER, user);
		removeSessAttr(KEY_SESSION_MENUS);
		Branch mainBranch = ((IBranchService)BussFactory.getService(Branch.class)).getBranch(user.getMainBranch());
		setCurrentBranch(mainBranch);
		Set<Role> userRoles = getUserRoles();
		
		//获取用户菜单信息
		IMenuService menuService = (IMenuService)BussFactory.getService(Menu.class);
		List<Menu> menuList = new ArrayList<Menu>();
		listMenu(menuService, null, menuList, userRoles);
		Collections.sort(menuList, new Comparator<Menu>() {
			@Override
			public int compare(Menu o1, Menu o2) {
				return o1.getLevel() == o2.getLevel() ? (o1.getIndex() - o2.getIndex()) : o1.getLevel() - o2.getLevel();
			}
		});
		setSessAttr(KEY_SESSION_MENUS, menuList);
	}
	
	private static void listMenu(IMenuService menuService, Menu parent, List<Menu> list, Collection<Role> roles) {
		 List<Menu> subMenus = menuService.getMenu(parent, roles);
		 list.addAll(subMenus);
		 for (Menu menu : subMenus) {
			 listMenu(menuService, menu, list, roles);
		 }
	}
	
	public static User getLoginUser() {
		return (User) getSessAttr(KEY_SESSION_USER);
	}
	
	public static final String KEY_REQ_TOOLS = "myTools"; //我的菜单 
	public static final String KEY_REQ_MENUPATH = "menuPath"; //菜单路径 
	
	/**
	 * 检查用户权限
	 * @param path
	 * @return
	 */
	@SuppressWarnings("unchecked")
	
	public static boolean checkPermission(Class<?> actionClass) {
		IFunctionService functService = (IFunctionService)BussFactory.getService(Function.class);
		Function funct = null;
		if (actionClass != null) {
			funct = functService.getByAction(actionClass);
		} else {
			HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
			String basePath = request.getContextPath();
			String path = request.getRequestURI();
			if (path.startsWith(basePath))
				path = path.substring(basePath.length());
			funct = functService.getByUrl(path);
		}
		if (funct == null)
			return true;
		
		User user = ContextUtil.getLoginUser();
		IMenuService menuService = (IMenuService)BussFactory.getService(Menu.class);
		Menu menu = menuService.findByFunction(funct);
		if (menu != null) {
			//存储相应的工具按钮信息
			Menu lastLevel = menu;
			while(lastLevel != null && lastLevel.isToolMenu()) {
				lastLevel = lastLevel.getParent();
			}
			List<Menu> tools = new ArrayList<Menu>();
			List<Menu> menuList = (List<Menu>)getSessAttr(KEY_SESSION_MENUS);
			if (menuList != null && lastLevel != null) {
				for (Menu m : menuList) {
					if (m.isToolMenu() && lastLevel.equals(m.getParent())) {
						tools.add(m);
					}
				}
				Collections.sort(tools, new Comparator<Menu>() {
					public int compare(Menu o1, Menu o2) {
						return o1.getIndex() - o2.getIndex();
					}
				});
				setReqAttr(KEY_REQ_TOOLS, tools);
			}
			
			String mPath = menu.getId();
			while((menu = menu.getParent()) != null) {
				mPath = menu.getId() + ">>" + mPath;
			}
			setReqAttr(KEY_REQ_MENUPATH, mPath);
		}
		
		if (funct.getRoles().isEmpty()) 
			return true;
		
		if (user == null) {
			setTips("用户必须登录才能继续操作");
			return false;
		} else {
			setUserId(user.getUserId());
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
		setTips("用户没有执行当前功能的权限！");
		return false;
	}

	/**
	 * 用户注销
	 */
	public static void logout() {
		removeSessAttr(KEY_SESSION_USER);
		removeSessAttr(KEY_SESSION_BRANCH);
		setValue(KEY_USREID, null);
	}
	
	public static String KEY_HttpServletRequest = "request";
	public static void setRequest(HttpServletRequest request) {
		setValue(KEY_HttpServletRequest, request);
	}
	
	public static void setSessAttr(String key, Object value) {
		HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
		if (request != null) {
			request.getSession().setAttribute(key, value);
		} else {
			ActionContext.getContext().getSession().put(key, value);
		}
	}
	
	public static Object getSessAttr(String key) {
		HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
		if (request != null) {
			return request.getSession().getAttribute(key);
		} else {
			return ActionContext.getContext().getSession().get(key);
		}
	}
	
	public static void removeSessAttr(String key) {
		HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
		if (request != null) {
			request.getSession().removeAttribute(key);
		} else {
			ActionContext.getContext().getSession().remove(key);
		}
	}
	
	public static void setReqAttr(String key, Object value) {
		HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
		if (request != null) {
			request.setAttribute(key, value);
		} else {
			ActionContext.getContext().put(key, value);
		}
	}
	
	public static Object getReqAttr(String key) {
		HttpServletRequest request = (HttpServletRequest) getValue(KEY_HttpServletRequest);
		if (request != null) {
			return request.getAttribute(key);
		} else {
			return ActionContext.getContext().get(key);
		}
	}
}
