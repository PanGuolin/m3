package com.m3.patchbuild.exception;

/**
 * 业务异常
 * @author pangl
 *
 */
public class BussException extends Exception{
	private static final long serialVersionUID = 1L;
	public BussException() {
		super();
	}
	public BussException(Throwable e) {
		super(e);
	}
}
