package com.m3.patchbuild.info;

/**
 * 构建包状态枚举
 * @author MickeyMic
 *
 */
public enum BuildPackStatus {

	init, //初始状态
	request, //请求构建
	checkFail, //检查失败
	checked, //检查完成
	builded, //构建完成
	buildFail, //构建失败
	testing, //测试中
	pass, //测试完成
	testFail,//测试失败
	deployed, //已发布
}
