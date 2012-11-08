package com.m3.patchbuild.base;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.opensymphony.xwork2.Action;

/**
 * 以Json形式响应的Action基础类
 * @author pangl
 *
 */
public abstract class BaseJsonAction implements Action{
	
	protected static final Logger logger = Logger.getLogger(BaseJsonAction.class);
	
	public static final String KEY_STATUS = "status"; //保存结果状态的KEY值
	
	public static final String KEY_ERROR = "error"; //保存错误信息的KEY值
	
	public static final int STATUS_INTERRUPTED = -1; //线程被中断
	
	public static final int STATUS_NOTLOGIN = -2; //用户未登录
	
	public static final int STATUS_EXECUTEERROR = -3; //执行错误
	
	protected Map<String, Object> dataMap = new HashMap<String, Object>(); //保存或接收返回值的数据

	@Override
	public String execute() throws Exception {
		if (!ContextUtil.checkPermission(null, this.getClass().getName())) {
			dataMap.put(KEY_STATUS, STATUS_NOTLOGIN);
			return SUCCESS;
		}
		try {
			HibernateUtil.openSession();
			doExecute(this.dataMap);
		} catch (InterruptedException ex) {
			dataMap.put(KEY_STATUS, STATUS_INTERRUPTED);
		} catch (Throwable ex) {
			logger.error("Action发生异常", ex);
			dataMap.put(KEY_STATUS, STATUS_EXECUTEERROR);
			dataMap.put(KEY_ERROR, ex.getMessage());
		} finally {
			HibernateUtil.closeSession();
		}
		return SUCCESS;
	}
	
	/**
	 * 执行具体 业务，由子类重载实现
	 */
	protected abstract void doExecute(Map<String, Object> dataMap) throws Exception;

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}

	
}
