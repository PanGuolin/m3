package com.m3.common;

/**
 * SVN服务器文件不存在异常
 * @author MickeyMic
 *
 */
public class SVNFileNotExistsException extends Exception {
	private static final long serialVersionUID = 1L;
	
	private String path;
	public SVNFileNotExistsException(String path, Throwable cause) {
		super(cause);
		this.path = path;
	}
	
	public String getPath() {
		return this.path;
	}

}
