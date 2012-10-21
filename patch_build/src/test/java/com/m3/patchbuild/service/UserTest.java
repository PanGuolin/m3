package com.m3.patchbuild.service;

import com.m3.patchbuild.info.User;
import com.m3.patchbuild.info.UserRoleEnum;

import junit.framework.TestCase;

public class UserTest extends TestCase{
	
	public void test_getUser() throws Exception{
		User user = UserService.checkUser("pangl22", "");
		assertTrue(user == null);
		user = UserService.checkUser("pangl", "pangl1q");
		assertTrue(user != null);
		
	}
	
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
			UserService.createUser(user);
		}
		User user = UserService.checkUser("admin", "123456");
		assertTrue(user !=  null);
		
	}

}
