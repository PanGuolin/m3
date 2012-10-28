package com.m3.patchbuild.service;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRoleEnum;
import com.m3.patchbuild.user.UserService;

import junit.framework.TestCase;

public class UserServiceTest extends TestCase{
	
	
	public void test_addUser() throws Exception{
		if (UserService.checkUser("admin", "123456") == null) {
			User user = new User();
			user.setUserId("admin");
			user.setPassword("123456");
			user.setEmail("patchbuild@threemickey");
			user.addRole(UserRoleEnum.admin);
			user.addRole(UserRoleEnum.deployer);
			user.addRole(UserRoleEnum.designer);
			user.addRole(UserRoleEnum.designer);
			user.addRole(UserRoleEnum.tester);
			user.addRole(UserRoleEnum.testmanager);
			user.setSVNUser(false);
			user.setUsername("系统管理员");
			UserService.save(user);
		}
		User user = UserService.checkUser("admin", "123456");
		assertTrue(user !=  null);
	}
	
	/**
	 * 测试带有上级的用户对象
	 * @throws Exception
	 */
	public void test_superiors() throws Exception {
		HibernateUtil.openSession();
		User developer = test_createUser("developer", UserRoleEnum.developer);
		User deployer = test_createUser("deployer", UserRoleEnum.deployer);
		User designer = test_createUser("designer", UserRoleEnum.designer);
		User tester = test_createUser("tester", UserRoleEnum.tester);
		User testmanager = test_createUser("testmanager", UserRoleEnum.testmanager);
		
		developer.getSuperiors().add(deployer);
		developer.getSuperiors().add(designer);
		
		tester.getSuperiors().add(testmanager);
		
		UserService.save(tester);
		UserService.save(developer);
		
		HibernateUtil.closeSession();
	}
	
	public void test_findUserByRole() throws Exception {
		List<User> list = UserService.findUser(UserRoleEnum.designer);
		for (User user : list) {
			System.out.println(user.getUserId());
		}
	}
	
	private User test_createUser(String userId, UserRoleEnum role) throws Exception {
		User user = UserService.findUser(userId);
		if (user == null) {
			user = new User();
			user.setUserId(userId);
			user.setUsername(userId);
			user.setEmail(userId + "@threemickey.com");
			user.setPassword("pswd");
			user.addRole(role);
			UserService.save(user);
		}
		return user;
	}

}
