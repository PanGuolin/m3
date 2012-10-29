package com.m3.patchbuild.exception;

import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 不正确的构建包状态异常
 * @author pangl
 *
 */
public class IllegalBPStateException extends BuildPackException{

	private static final long serialVersionUID = 1L;

	private PackStatus expected; //预期状态

	public IllegalBPStateException(Pack bp, PackStatus expected) {
		super(bp);
		this.expected = expected;
	}

	public PackStatus getExpected() {
		return expected;
	}

	public PackStatus getActual() {
		return super.buildPack.getStatus();
	}

	@Override
	public String getMessage() {
		return "构建包状态不对，预期状态为[" + expected + "], 实际状态为[" + buildPack.getStatus() + "]";
	}
	
	
}
