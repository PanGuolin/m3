package com.m3.patchbuild.base;

/**
 * 可管理对象接口
 * @author pangl
 *
 */
public interface IManageable extends Cloneable {
	
	/**
	 * 否单例模式
	 * @return
	 */
	public boolean isSingleton();
	
	public IManageable clone();

}
