package com.m3.patchbuild.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.base.BussFactory;

/**
 * 用户工具类
 * @author pangl
 *
 */
public abstract class UserUtil {

	/**
	 * 列出系统中所有的测试人员
	 * @return
	 */
	public static List<User> listAllTester(String branch) {
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		return userService.findUserByRole(branch, IUserRole.tester);
	}
	
	/**
	 * 列出系统中所有的测试人员
	 * @return
	 */
	public static List<User> listAllTester() {
		return listAllTester(ContextUtil.getCurrentBranch().getBranch());
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
}
