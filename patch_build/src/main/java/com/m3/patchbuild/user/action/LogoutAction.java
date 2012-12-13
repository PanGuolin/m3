package com.m3.patchbuild.user.action;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;

/**
 * 注销当前用户
 * @author MickeyMic
 *
 */
public class LogoutAction extends BaseAction implements ServletResponseAware, ServletRequestAware {

	@Override
	protected String doExecute() throws Exception {
		ContextUtil.logout();
		Cookie[] cookies = request.getCookies();  
		if (cookies != null) {
			for (Cookie cookie : cookies) {  
				if (LoginAction.COOKIE_USERNAME.equals(cookie.getName())) {
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}  else if (LoginAction.COOKIE_PASSWORD.equals(cookie.getName())) {  
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}  
			}
		}
		return LOGIN;
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
}
