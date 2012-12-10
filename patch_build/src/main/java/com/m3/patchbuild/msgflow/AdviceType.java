package com.m3.patchbuild.msgflow;

/**
 * 切面执行类型
 * @author pangl
 *
 */
public enum AdviceType {

	beforeX, //执行前
	afterX, //返回或异常
	afterR, //返回
	afterE, //异常时
	;
}
