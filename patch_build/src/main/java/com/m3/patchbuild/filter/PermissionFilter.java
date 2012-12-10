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
		String basePath = request.getContextPath();
		String url = request.getRequestURI();
		if (url.startsWith(basePath))
			url = url.substring(basePath.length());
		
		if (!ContextUtil.checkPermission(request, url)) {
			request.getRequestDispatcher(loginPage).forward(req, rep);
			//HttpServletResponse reponse = (HttpServletResponse)rep;
			//reponse.sendRedirect(basePath + loginPage + "?" + ContextUtil.KEY_TIPS + "=" + URLEncoder.encode(ContextUtil.getTips(request)));
			return;
		}
		chain.doFilter(req, rep);
	}

	public void init(FilterConfig config) throws ServletException {
		loginPage = config.getInitParameter("loginPage");
	}

}
