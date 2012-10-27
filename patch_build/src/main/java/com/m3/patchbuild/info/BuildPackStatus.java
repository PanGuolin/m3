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
	published,//已发布
	publishFail,//发布失败
	;

	@Override
	public String toString() {
		switch (this) {
			case builded: 	return "已构建";
			case buildFail: return "构建失败";
			case checked: 	return "检查通过";
			case checkFail: return "检查不通过";
			case init: 		return "初始化";
			case pass: 		return "测试通过";
			case published: return "已发布";
			case request: 	return "请求构建";
			case testFail: 	return "测试打回";
			case testing: 	return "正在测试";
			case publishFail: return "发布失败";
		}
		return super.toString();
	} 
	
	
}
