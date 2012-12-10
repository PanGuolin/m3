package com.m3.patchbuild.msgflow;

/**
 * 切面配置对象
 * @author pangl
 *
 */
public interface IAdviceConfig {
	/**
	 * 切面服务类
	 * @return
	 */
	String getService(); 
	
	/**
	 * 对应方法
	 * @return
	 */
	String getMethodName();
	
	/**
	 * 方法对应参数类型
	 * @return
	 */
	String[] getParamTypes();
	
	/**
	 * 执行的条件
	 * @return
	 */
	String getCondition(); 
	
	/**
	 * 切面类型
	 * @return
	 */
	AdviceType getAdviceType();
	
	

}
