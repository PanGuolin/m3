package com.m3.patchbuild.info;

/**
 * 构建包状态枚举
 * @author MickeyMic
 *
 */
public enum BuildPackStatus {

	init, //初始状态
	request, //请求构建
	builded, //构建完成
	failed, //失效
	testing, //测试中
	pass, //测试完成
	deployed, //已发布
}
