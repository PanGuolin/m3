package com.m3.patchbuild;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.UndeclaredThrowableException;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.opensymphony.xwork2.Action;
/**
 * 基础Action类
 * @author pangl
 *
 */
public abstract class BaseAction implements Action {
	
	public static final String JSON = "json";
	
	protected Map<String, Object> dataMap = new HashMap<String, Object>();
	protected boolean jfs = false; //json for success;
	
	private static final Logger logger = Logger.getLogger(BaseAction.class);
	
	protected void setTips(String tips) {
		dataMap.put("tips", ContextUtil.setTips(tips));
	}
	
	public final String execute() throws Exception {
		if (!ContextUtil.checkPermission(getClass()))
			return LOGIN;
		try {
			HibernateUtil.openSession();
			String rs = doExecute();
			return jfs ? JSON : rs;
		} catch (Throwable ex) {
			logger.error("Action发生异常", ex);
			Throwable le = ex;
			if (ex instanceof UndeclaredThrowableException) {
				UndeclaredThrowableException ue = (UndeclaredThrowableException)ex;
				if (ue.getCause() instanceof InvocationTargetException) {
					InvocationTargetException ie = (InvocationTargetException)ue.getCause();
					le = ie.getCause() == null ? le : ie.getCause();
				}
			}
			setTips("错误:" + le.getMessage());
			return jfs ? JSON : ERROR;
		} finally {
			HibernateUtil.closeSession();
		}
		
	}
	
	protected abstract String doExecute() throws Exception;

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setJfs(boolean jfs) {
		this.jfs = jfs;
	}
}
