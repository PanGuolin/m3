package com.m3.patchbuild.service;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
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
			user.addRole(UserRole.admin);
			user.addRole(UserRole.deployer);
			user.addRole(UserRole.designer);
			user.addRole(UserRole.designer);
			user.addRole(UserRole.tester);
			user.addRole(UserRole.testmanager);
			user.setSVNUser(false);
			user.setUsername("系统管理员");
			userService.save(user);
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
		User developer = test_createUser("developer", UserRole.developer);
		User deployer = test_createUser("deployer", UserRole.deployer);
		User designer = test_createUser("designer", UserRole.designer);
		User tester = test_createUser("tester", UserRole.tester);
		User testmanager = test_createUser("testmanager", UserRole.testmanager);
		
		developer.getSuperiors().add(deployer);
		developer.getSuperiors().add(designer);
		
		tester.getSuperiors().add(testmanager);
		
		userService.save(tester);
		userService.save(developer);
		
		HibernateUtil.closeSession();
	}
	
	public void test_findUserByRole() throws Exception {
		UserService userService = (UserService)BussFactory.getService(User.class);
		List<User> list = userService.findUserByRole(UserRole.designer);
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
		userService.save(user);
		return user;
	}
	

}
