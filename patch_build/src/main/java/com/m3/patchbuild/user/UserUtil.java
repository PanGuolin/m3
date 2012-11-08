package com.m3.patchbuild.user;

import java.util.List;

import com.m3.patchbuild.BussFactory;

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
	public static List<User> listAllTester() {
		UserService userService = (UserService)BussFactory.getService(User.class);
		return userService.findUserByRole(UserRole.tester);
	}
}
