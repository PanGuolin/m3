package com.m3.patchbuild.user;

/**
 * 用户角色枚举
 * @author MickeyMic
 *
 */
public interface IUserRole {
	String DEVELOPER = "developer";//开发
	String DESIGNER = "designer"; //设计师
	String TESTMANAGER = "testmanager"; //测试经理
	String TESTER = "tester";//测试员
	String DEPLOYER = "deployer";//发布人员
	String ADMIN = "admin";//系统管理员
	String LOGINEDUSER = "[loginedUser]";//登录用户
}
