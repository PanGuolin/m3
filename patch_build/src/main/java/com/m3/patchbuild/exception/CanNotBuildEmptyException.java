package com.m3.patchbuild.exception;

import com.m3.patchbuild.pack.BuildPack;

/**
 * 不能构建空的包
 * @author MickeyMic
 *
 */
public class CanNotBuildEmptyException extends BuildPackException{
	private static final long serialVersionUID = 1L;

	public CanNotBuildEmptyException(BuildPack bp) {
		super(bp);
	}

	@Override
	public String getMessage() {
		return "无法构建空包，请指定文件列表";
	}
	
	

}
