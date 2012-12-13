package com.m3.patchbuild.user.action;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.sys.IRoleService;
import com.m3.patchbuild.sys.Role;
import com.m3.patchbuild.user.IResetPassReqService;
import com.m3.patchbuild.user.IUserRole;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.ResetPassReq;
import com.m3.patchbuild.user.User;

/**
 * 重设密码请求
 * @author pangl
 *
 */
public class ResetPassReqAction extends BaseAction implements ServletRequestAware{
	
	private String userId;
	private String password;
	private String comment;

	@Override
	protected String doExecute() throws Exception {
		if (userId == null || password == null)
			return SUCCESS;
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		User requester = userService.findUser(userId);
		if (requester == null) {
			setTips("用户名错误！");
			return INPUT;
		}
		
		IRoleService roleService = (IRoleService)BussFactory.getService(Role.class);
		Role adminRole = roleService.find(IUserRole.admin);
		if (requester.hasRole(null, adminRole)) {
			setTips("无法重置管理员密码");
			return INPUT;
		}
		IResetPassReqService rprService = (IResetPassReqService) BussFactory.getService(ResetPassReq.class);
		ResetPassReq req = rprService.findValidReq(requester);
		if (req != null) {
			setTips("已提交过申请，请不要重复提交");
			return INPUT;
		}
		String visitorIp = request.getRemoteAddr();
		String visitorhost = request.getRemoteHost();
		
		req = new ResetPassReq();
		req.setClientAddr(visitorIp + ":" + visitorhost);
		req.setPassword(password);
		req.setRequester(requester);
		req.setComment(comment);
		req.setAccepted(false);
		req.setCreateTime(new Date());
		rprService.saveInfo(req);
		setTips("重置密码申请已发送，请耐心等待管理员审批");
		return LOGIN;
	}

	
	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	private HttpServletRequest request = null; 
	@Override
	public void setServletRequest(HttpServletRequest paramHttpServletRequest) {
		request = (HttpServletRequest)paramHttpServletRequest;
	}


	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}
}
