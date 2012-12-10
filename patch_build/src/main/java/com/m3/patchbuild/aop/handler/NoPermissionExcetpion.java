package com.m3.patchbuild.aop.handler;

import com.m3.patchbuild.aop.ExecuteException;

public class NoPermissionExcetpion extends ExecuteException{

	public NoPermissionExcetpion(String string) {
		super(string);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String getMessage() {
		return "用户没有相应的权限:" + super.getMessage();
	}
	
	

}
