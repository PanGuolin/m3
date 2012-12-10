package com.m3.patchbuild.aop.handler;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.m3.common.BeanUtil;
import com.m3.common.ContextUtil;
import com.m3.patchbuild.aop.ExecuteException;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

public abstract class ParticipantUtil {
	
	/**
	 * #role(testmanager)>#superiors(${userId})
	 * @param userId
	 * @param script
	 * @param context
	 */
	public static void parseUser(Collection<String> userIds, String script, Map<String, Object> context) throws ExecuteException{
		script = script.trim();
		int index = script.indexOf('>');
		if (index != -1) {
			Set<String> all = new HashSet<String>();
			String cScript = script.substring(0, index);
			parseUser(all, cScript, context);
			
			Set<String> subColl = new HashSet<String>();
			String fScript = script.substring(index + 1);
			parseUser(subColl, fScript, context);
			
			if (subColl.isEmpty()) {
				userIds.addAll(all);
			}
			for (String u : subColl) {
				if (all.contains(u)) {
					userIds.add(u);
				}
			}
			return;
		} 
		if (script.startsWith("#")) {
			IUserService userService = (IUserService)BussFactory.getService(User.class);
			String param = getParam(script, "#role");
			if (param != null) {
				String branch = null;
				String role = null;
				int ind = param.indexOf(",");
				if (ind != -1) {
					role = param.substring(0, ind).trim();
					branch = param.substring(ind+1).trim();
				} else {
					role = param.trim();
//					if (ContextUtil.getCurrentBranch() != null) {
//						branch = ContextUtil.getCurrentBranch().getBranch();
//					}
				}
				List<User> us = userService.findUserByRole(branch, role);
				userIds.addAll(ParticipantUtil.getUserId(us));
				return;
			}
			param = getParam(script, "#superiors");
			if (param != null) {
				User us = userService.findUser(param);
				if (us != null) {
					userIds.addAll(ParticipantUtil.getUserId(us.getSuperiors()));
				}
				return;
			}
			param = getParam(script, "#followers");
			if (param != null) {
				User us = userService.findUser(param);
				if (us != null) {
					userIds.addAll(ParticipantUtil.getUserId(us.getFollowers()));
				}
				return;
			}
			throw new ExecuteException("无法识别的联系人:" + script);
		} 
		userIds.add(script);
	}

	public static String getParam(String script, String funct) {
		if (script.startsWith(funct + " ") || script.startsWith(funct + "(")) {
			script = script.substring(funct.length()).trim();
			return script.substring(1, script.length()-1).trim();
		}
		return null;
	}

	/**
	 * 获取用户的用户ID列表
	 * @param users
	 * @return
	 */
	public static List<String> getUserId(Collection<User> users) {
		List<String> list = new ArrayList<String>();
		if (users != null) {
			for (User user : users) {
				list.add(user.getUserId());
			}
		}
		return list;
	}
	
	/**
	 * #role(testmanager)>#superiors(${_P0.requester})
	 * @param ps
	 * @param context
	 * @return
	 */
	public static Collection<String> getUserIds(String[] ps, Map<String, Object> context) throws ExecuteException {
		Set<String> users = new HashSet<String>();
		if (ps == null)
			return users;
		for (String p : ps) {
			p = BeanUtil.parseString(p, context);
			ParticipantUtil.parseUser(users, p, context);
		}
		return users;
	}
}
