package com.m3.patchbuild.service;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.IUserRole;
import com.m3.patchbuild.user.UserService;

import junit.framework.TestCase;

public class UserServiceTest extends TestCase{
	
	
	public void test_addUser() throws Exception{
		UserService userService = (UserService)BussFactory.getService(User.class);
		if (userService.checkUser("admin", "123456") == null) {
			User user = new User();
			user.setUserId("admin");
			user.setPassword("123456");
			user.setEmail("patchbuild@threemickey");
			user.addRole(IUserRole.admin);
			user.addRole(IUserRole.deployer);
			user.addRole(IUserRole.designer);
			user.addRole(IUserRole.designer);
			user.addRole(IUserRole.tester);
			user.addRole(IUserRole.testmanager);
			user.setSVNUser(false);
			user.setUsername("系统管理员");
			userService.saveInfo(user);
		}
		User user = userService.checkUser("admin", "123456");
		assertTrue(user !=  null);
	}
	
	/**
	 * 测试带有上级的用户对象
	 * @throws Exception
	 */
	public void test_superiors() throws Exception {
		UserService userService = (UserService)BussFactory.getService(User.class);
		HibernateUtil.openSession();
		User developer = test_createUser("developer", IUserRole.developer);
		User deployer = test_createUser("deployer", IUserRole.deployer);
		User designer = test_createUser("designer", IUserRole.designer);
		User tester = test_createUser("tester", IUserRole.tester);
		User testmanager = test_createUser("testmanager", IUserRole.testmanager);
		
		developer.getSuperiors().add(deployer);
		developer.getSuperiors().add(designer);
		
		tester.getSuperiors().add(testmanager);
		
		userService.saveInfo(tester);
		userService.saveInfo(developer);
		
		HibernateUtil.closeSession();
	}
	
	public void test_findUserByRole() throws Exception {
		UserService userService = (UserService)BussFactory.getService(User.class);
		List<User> list = userService.findUserByRole(IUserRole.designer);
		for (User user : list) {
			System.out.println(user.getUserId());
		}
	}
	
	private User test_createUser(String userId, String role) throws Exception {
		UserService userService = (UserService)BussFactory.getService(User.class);
		User user = userService.findUser(userId);
		if (user == null) {
			user = new User();
		}
		user.setUserId(userId);
		user.setUsername(userId);
		user.setEmail(userId + "@threemickey.com");
		user.setPassword("pswd");
		user.addRole(role);
		userService.saveInfo(user);
		return user;
	}
	

}
