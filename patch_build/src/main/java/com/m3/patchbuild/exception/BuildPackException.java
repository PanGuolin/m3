package com.m3.patchbuild.exception;

import com.m3.patchbuild.pack.BuildPack;

/**
 * 构建包相关异常类
 * @author pangl
 *
 */
public class BuildPackException extends BussException{

	private static final long serialVersionUID = 1L;

	protected BuildPack buildPack;
	
	public BuildPackException(BuildPack bp) {
		this.buildPack = bp;
	}
}
