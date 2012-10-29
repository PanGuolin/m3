package com.m3.patchbuild.user;

/**
 * 用户角色枚举
 * @author MickeyMic
 *
 */
public interface UserRole {

	String developer = "developer";//开发
	String designer = "designer"; //设计师
	String testmanager = "testmanager"; //测试经理
	String tester = "tester";//测试员
	String deployer = "deployer";//发布人员
	String admin = "admin";//系统管理员
	String loginedUser = "[LoginedUser]";//登录用户
	
}
