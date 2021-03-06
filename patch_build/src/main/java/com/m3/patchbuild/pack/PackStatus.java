package com.m3.patchbuild.pack;

/**
 * 构建包状态枚举
 * @author MickeyMic
 *
 */
public enum PackStatus {

	init, //初始状态0
	request, //请求构建1
	checkFail, //检查失败2
	checked, //检查完成3
	builded, //构建完成4
	buildFail, //构建失败5
	assigned, //已分配6
	testing, //测试中7
	pass, //测试完成8
	testFail,//测试失败9
	published,//已发布10
	publishFail,//发布失败11
	canceled,//取消
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
			case assigned:	return "已分配";
		default:
			break;
		}
		return super.toString();
	} 
	
	
}
