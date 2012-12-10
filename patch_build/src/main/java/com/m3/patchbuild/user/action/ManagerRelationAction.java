package com.m3.patchbuild.user.action;

import java.util.ArrayList;
import java.util.List;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.IUserRole;

/**
 * 管理用户关系
 * @author pangl
 *
 */
public class ManagerRelationAction extends BaseAction{
	
	private List<User> followable = null; //所有可以关注的用户
	private List<User> memberable = null; //所有可以管理的下属用户
	private String followers = null; //关注的用户ID，用分号连接
	private String members = null; //下属用户ID，用分号连接

	@Override
	protected String doExecute() throws Exception {
		String branch = ContextUtil.getCurrentBranch().getBranch();
		if (followers == null) {//为空，表示查询
			fetch(branch);
		} else {
			IUserService userService = (IUserService)BussFactory.getService(User.class);
			String userId = ContextUtil.getUserId();
			User curUser = userService.findUser(userId);
			String[] fus = followers.split(";");
			for (String fu : fus) {
				fu = fu.trim();
				if (fu.equals(curUser.getUuid()))
					continue;
				User u = (User) userService.findByUuid(fu);
				if (u != null) {
					u.getFollowers().add(curUser);
					userService.saveInfo(u);
				}
			}
			if (canHaveMember(branch, curUser) && members != null) {
				String[] mus = members.split(";");
				for (String mu : mus) {
					if (mu.equals(curUser.getUuid()))
						continue;
					User u = (User) userService.findByUuid(mu);
					if (u != null) {
						u.getSuperiors().add(curUser);
						userService.saveInfo(u);
					}
				}
			}
			fetch(branch);
			setTips("保存关系成功!");
		}
		return SUCCESS;
	}
	
	private void fetch(String branch) {
		
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		String userId = ContextUtil.getUserId();
		User curUser = userService.findUser(userId);
		followable = userService.findUserByRole(branch, IUserRole.developer);
		for (int i=0; i<followable.size(); i++) {
			if (userId.equals(followable.get(i).getUserId())) {
				followable.remove(i);
				break;
			}
		}
		List<User> followed = userService.findFollows(userId);
		followers = "";
		for (User u : followed) {
			followers += u.getUuid() + ";";
		}
		if (canHaveMember(branch, curUser)) {
			memberable = new ArrayList<User>();
			memberable.addAll(followable);
			List<User> users = userService.findUserByRole(branch, IUserRole.tester);
			for (User user : users) {
				if (!memberable.contains(user)) {
					memberable.add(user);
				}
			}
			List<User> ms = userService.findMemebers(userId);
			members = "";
			for (User u : ms) {
				members += u.getUuid() + ";";
			}
		}
	}
	
	private boolean canHaveMember(String branch, User curUser) {
		return curUser.hasRole(branch, IUserRole.designer) ||
				curUser.hasRole(branch, IUserRole.deployer) ||
				curUser.hasRole(branch, IUserRole.testmanager) ||
				curUser.hasRole(branch, IUserRole.admin);
	}

	public String getFollowers() {
		return followers;
	}

	public void setFollowers(String followers) {
		this.followers = followers;
	}

	public String getMembers() {
		return members;
	}

	public void setMembers(String members) {
		this.members = members;
	}

	public List<User> getFollowable() {
		return followable;
	}

	public List<User> getMemberable() {
		return memberable;
	}
}
