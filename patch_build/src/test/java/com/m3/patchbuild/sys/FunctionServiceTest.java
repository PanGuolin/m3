package com.m3.patchbuild.sys;

import junit.framework.TestCase;

public class FunctionServiceTest extends TestCase{

	
	public void test_basic() throws Exception {
		
		FunctionService functService = new FunctionService();
		Function function = (Function)functService.findByBillNo("code", "QueryMessage");
		assertTrue(function != null);
		
		RoleService roleService = new RoleService();
		Role role = (Role)roleService.findByBillNo("code", "[loginedUser]");
		assertTrue(role != null);
		
		function.getRoles().add(role);
		functService.saveInfo(function);
	}
}
