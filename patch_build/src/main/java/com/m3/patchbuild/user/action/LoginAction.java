package com.m3.patchbuild.user.action;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

public class LoginAction extends BaseAction implements ServletResponseAware, ServletRequestAware {
	
	public static final String COOKIE_USERNAME = "SESSION_LOGIN_USERNAME";
	public static final String COOKIE_PASSWORD = "SESSION_LOGIN_PASSWORD";
	
	private String username;
	private String password;
	private boolean storeCookie;
	
	@Override
	public String doExecute() throws Exception {
		IUserService uService = (IUserService)BussFactory.getService(User.class);
		User user = null;
		if (username == null) {
			Cookie[] cookies = request.getCookies();  
			if (cookies != null) {
				for (Cookie cookie : cookies) {  
					if (COOKIE_USERNAME.equals(cookie.getName())) {  
						username = cookie.getValue(); 
					}  else if (COOKIE_PASSWORD.equals(cookie.getName())) {  
						password = cookie.getValue();  
					}  
				}
				if (username == null)
					return INPUT;
				user = uService.findUser(username);
				if (user == null) {
					setTips("用户不存在");
					return INPUT;
				} else if (!user.getPassword().equals(password)){
					setTips("用户名&口令错误");
					return INPUT;
				}
			} else {
				setTips("必须录入用户名&密码");
				return INPUT;
			}
		} else {						user = uService.checkUser(username, password);
			if (user == null) {
				setTips("用户名&口令错误");
				return INPUT;
			}
		}
		
		ContextUtil.userLogin(user);
		dataMap.put("sessionId", ServletActionContext.getRequest().getSession().getId());
		
		if (storeCookie) {
			Cookie cookie = new Cookie(COOKIE_USERNAME, username);
			cookie.setMaxAge(99999999);  
			response.addCookie(cookie);  
			
			cookie = new Cookie(COOKIE_PASSWORD, user.getPassword());  
			cookie.setMaxAge(99999999);  
			response.addCookie(cookie);  
		}
		return SUCCESS;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	private HttpServletResponse response;
	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		this.response = arg0;
		
	}

	private HttpServletRequest request;
	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
	}

	public boolean isStoreCookie() {
		return storeCookie;
	}

	public void setStoreCookie(boolean storeCookie) {
		this.storeCookie = storeCookie;
	}
	
	
}
