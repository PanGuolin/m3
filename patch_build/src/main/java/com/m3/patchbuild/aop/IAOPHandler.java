package com.m3.patchbuild.aop;

import org.jdom.Element;

/**
 * 切面AOP接口
 * @author pangl
 *
 */
public interface IAOPHandler { 

	/**
	 * 从XML配置文件中读取参数
	 * @param argEl
	 * @return
	 */
	IExecuteArguments readArguments(Element argEl);
	
	/**
	 * 执行某个切面功能
	 * @param argEl
	 * @param context
	 * @throws ExecuteException
	 */
	void execute(IExecuteArguments arguments, IExecuteContext context) throws ExecuteException;
	
	
}
