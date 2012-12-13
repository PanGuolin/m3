package com.m3.patchbuild.user;

import junit.framework.TestCase;

import com.m3.patchbuild.sys.Role;
import com.m3.patchbuild.sys.RoleService;

public class UserServiceTest extends TestCase{
	
	public void test_basic() throws Exception {
		UserService service = new UserService();
		User user = service.findUser("pangl");
		service.removeRoles(user, "sp1");
		
		RoleService roleService = new RoleService();
		Role adminRole = roleService.find(IUserRole.admin);
		user.addRole("sp1", adminRole);
		service.saveInfo(user);
	}

}
