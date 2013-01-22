package com.m3.patchbuild.exception;

import com.m3.patchbuild.pack.Pack;

/**
 * 构建包相关异常类
 * @author pangl
 *
 */
public class BuildPackException extends BussException{

	private static final long serialVersionUID = 1L;

	private Pack buildPack;
	
	public BuildPackException(Pack bp) {
		this.buildPack = bp;
	}

	public Pack getBuildPack() {
		return buildPack;
	}

	public void setBuildPack(Pack buildPack) {
		this.buildPack = buildPack;
	}
}
