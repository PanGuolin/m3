package com.m3.patchbuild.message.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.message.IHandleService;
import com.m3.patchbuild.message.MessageHandler;

/**
 * 业务处理Action
 * @author pangl
 *
 */
public class HandleAction extends BaseAction implements ServletRequestAware {
	
	private static final Logger logger = Logger.getLogger(HandleAction.class);
	
	private String i; //请求的UUID
	
	private String t; //业务类型
	
	private String input; //输入页面

	public void setI(String i) {
		this.i = i;
	}
	
	public void setT(String t) {
		this.t = t;
	}
	
	private IBussInfo info;
	public IBussInfo getInfo() {
		return info;
	}
	
	@Override
	protected String doExecute() throws Exception {
		if (context == null) {
			info = BussFactory.getService(t).findByUuid(i);
			input = MessageHandler.getInputView(info);
			if (input == null) {
				throw new Exception("无法找到相应的输入页面:" + info);
			}
			return INPUT;
		} else {
			try {
				IService service = BussFactory.getService(t);
				IHandleService handleService = (IHandleService)service;
				handleService.handle(service.findByUuid(i), context);
				setTips("任务处理成功");
			} catch (Exception ex) {
				logger.error("任务处理失败", ex);
				throw ex;
			}
			return SUCCESS;
		}
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getI() {
		return i;
	}

	public String getT() {
		return t;
	}
	
	private Object context;

	public Object getContext() {
		if (context == null) {
			if (t == null)
				t = request.getParameter("t");
			if (!StringUtil.isEmpty(t))
				context =  ((IHandleService)BussFactory.getService(t)).newContext();
		}
		return context;
	}

	public void setContext(Object context) {
		this.context = context;
	}

	private HttpServletRequest request;
	public void setServletRequest(HttpServletRequest paramHttpServletRequest) {
		this.request = paramHttpServletRequest;
	}

	
	
}
