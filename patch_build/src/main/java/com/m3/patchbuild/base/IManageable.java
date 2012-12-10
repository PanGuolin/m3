package com.m3.patchbuild.base;


public interface IManageable extends Cloneable {
	
	/**
	 * 否单例模式
	 * @return
	 */
	public boolean isSingleton();
	
	public IManageable clone();

}
