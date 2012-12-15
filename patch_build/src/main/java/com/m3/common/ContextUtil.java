package com.m3.common;

import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.sys.Function;
import com.m3.patchbuild.sys.IFunctionService;
import com.m3.patchbuild.sys.IMenuService;
import com.m3.patchbuild.sys.IToolButtonService;
import com.m3.patchbuild.sys.Menu;
import com.m3.patchbuild.sys.Role;
import com.m3.patchbuild.sys.ToolButton;
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
	public static final String KEY_SESSION_MENUS = "myMenus"; //我的菜单 
	public static final String KEY_SESSION_TOOLBUTTONS = "myTools"; //我的菜单 
	
	public static final String KEY_REQ_MENUPATH = "menuPath"; //菜单路径 
	
	/**
	 * 保存已登录用户信息
	 * @param user
	 * @param branch
	 */
	public static void userLogin(User user) {
		Map<String, Object> session = ActionContext.getContext().getSession();
		session.put(KEY_SESSION_USER, user);
		if (getCurrentBranch() == null) {
			IBranchService branchService = (IBranchService)BussFactory.getService(Branch.class);
			session.put(KEY_SESSION_BRANCH, branchService.getBranch(user.getMainBranch()));
		}
		
		//获取用户菜单信息
		IMenuService menuService = (IMenuService)BussFactory.getService(Menu.class);
		IToolButtonService tbService = (IToolButtonService)BussFactory.getService(ToolButton.class);
		
		List<Menu> topMenus = menuService.getMenu(null);
		Set<Role> userRoles = new HashSet<Role>();
		for (UserRole ur : user.getRoles()) {
			userRoles.add(ur.getRole());
		}
		TreeMap<Menu, List<Menu>> myMenus = new TreeMap<Menu, List<Menu>>(new Comparator<Menu>() {
			@Override
			public int compare(Menu o1, Menu o2) {
				return o1.getIndex() - o2.getIndex();
			}
		});
		
		Map<Menu, List<ToolButton>> myToolButtons = new HashMap<Menu, List<ToolButton>>();
		
		for (int mi=0; mi<topMenus.size(); mi++) {
			Menu topMenu = topMenus.get(mi);
			Set<Role> menuRoles = topMenu.getFunction().getRoles();
			if (checkRole(menuRoles, userRoles)) {
				List<Menu> subMenus = menuService.getMenu(topMenu);
				for (int i=0; i<subMenus.size(); i++) {
					Set<Role> subRoles = subMenus.get(i).getFunction().getRoles();
					if (checkRole(subRoles, userRoles)) {
						List<ToolButton> btns = tbService.getToolButtons(subMenus.get(i));
						for (int ti=0; ti<btns.size(); ti++) {
							Set<Role> toolRoles = btns.get(i).getFunction().getRoles();
							if (!checkRole(toolRoles, userRoles)) {
								btns.remove(ti);
								ti --;
							}
						}
						if (!btns.isEmpty())
							myToolButtons.put(subMenus.get(i), btns);
					} else {
						subMenus.remove(i);
						i --;
					}
				}
				myMenus.put(topMenu, subMenus);
				
			} else {
				topMenus.remove(mi);
				mi--;
			}
		}
		
		session.put(KEY_SESSION_MENUS, myMenus);
		session.put(KEY_SESSION_TOOLBUTTONS, myToolButtons);
	}
	
	private static boolean checkRole(Collection<Role> ownColl, Collection<Role> targetColl) {
		if (ownColl.isEmpty()) 
			return true;
		for (Role o : ownColl) {
			if (Role.loginedUser.equals(o.getCode()) || targetColl.contains(o))
				return true;
		}
		return false;
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
	
	public static boolean checkPermission(HttpServletRequest request) {
		return checkPermission(request, null);
	}
	
	public static boolean checkPermission(Class<?> actionClass) {
		return checkPermission(null, actionClass);
	}
	
	/**
	 * 检查用户权限
	 * @param path
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static boolean checkPermission(HttpServletRequest request, Class<?> actionClass) {
		if (request == null && actionClass == null) 
			return false;
		IFunctionService functService = (IFunctionService)BussFactory.getService(Function.class);
		Function funct = null;
		if (request != null) {
			String basePath = request.getContextPath();
			String path = request.getRequestURI();
			if (path.startsWith(basePath))
				path = path.substring(basePath.length());
			funct = functService.getByUrl(path);
		} else {
			funct = functService.getByAction(actionClass);
		}
		if (funct == null)
			return true;
		IMenuService menuService = (IMenuService)BussFactory.getService(Menu.class);
		Menu menu = menuService.findByFunction(funct);
		if (menu != null) {
			String mPath = menu.getId();
			while((menu = menu.getParent()) != null) {
				mPath = menu.getId() + ">>" + mPath;
			}
			if (request != null) {
				request.setAttribute(KEY_REQ_MENUPATH, mPath);
				Map<Menu, List<ToolButton>>tools = (Map<Menu, List<ToolButton>>)
						request.getSession().getAttribute(KEY_SESSION_TOOLBUTTONS);
				request.setAttribute("tools", tools.get(menu));
			} else {
				ActionContext.getContext().getContextMap().put(KEY_REQ_MENUPATH, mPath);
				Map<Menu, List<ToolButton>>tools = (Map<Menu, List<ToolButton>>) 
						ActionContext.getContext().getSession().get(KEY_SESSION_TOOLBUTTONS);
				ActionContext.getContext().getContextMap().put("tools", tools.get(menu));
			}
		}
		
		if (funct.getRoles().isEmpty()) 
			return true;
		User user = ContextUtil.getLoginUser(request);
		if (user == null) {
			setTips(request, "用户必须登录才能继续操作");
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
