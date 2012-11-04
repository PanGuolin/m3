package com.m3.patchbuild;

import org.apache.log4j.Logger;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.opensymphony.xwork2.Action;

public abstract class BaseAction implements Action {
	
	private static final Logger logger = Logger.getLogger(BaseAction.class);
	
	protected void setTips(String tips) {
		ContextUtil.setTips(null, tips);
	}
	
	final public String execute() throws Exception {
		if (!ContextUtil.checkPermission(null, this.getClass().getName()))
			return LOGIN;
		try {
			HibernateUtil.openSession();
			return doExecute();
		} catch (Throwable ex) {
			logger.error("Action发生异常", ex);
			setTips("错误:" + ex.getMessage());
			return ERROR;
		} finally {
			HibernateUtil.closeSession();
		}
		
	}
	
	protected abstract String doExecute() throws Exception;
	
}
