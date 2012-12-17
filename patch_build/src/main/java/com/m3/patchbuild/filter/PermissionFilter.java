package com.m3.patchbuild.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.m3.common.ContextUtil;

/**
 * 权限过滤器
 * @author MickeyMic
 *
 */
public class PermissionFilter implements Filter{
	
	public static final String LOGIN_PAGE_KEY = "loginPage";

	private String loginPage = null; //登录页面地址
	public void destroy() {
	}

	public void doFilter(ServletRequest req, ServletResponse rep,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)req;
		ContextUtil.setRequest(request);
		if (!ContextUtil.checkPermission(null)) {
			request.getRequestDispatcher(loginPage).forward(req, rep);
			return;
		}
		chain.doFilter(req, rep);
	}

	public void init(FilterConfig config) throws ServletException {
		loginPage = config.getInitParameter("loginPage");
	}

}
