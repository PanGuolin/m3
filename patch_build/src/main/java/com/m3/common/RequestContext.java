package com.m3.common;

import javax.servlet.http.HttpServletRequest;

import com.opensymphony.xwork2.ActionContext;

/**
 * 请求上下文
 * @author pangl
 *
 */
public class RequestContext {
	
	private HttpServletRequest request;
	public RequestContext(HttpServletRequest request){
		this.request = request; 
	}
	
	public void setSessionAttr(String key, Object value) {
		if (request == null)
			ActionContext.getContext().getSession().put(key, value);
		else
			request.getSession().setAttribute(key, value);
	}

}
