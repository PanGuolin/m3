package com.m3.patchbuild.exception;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.Pack;


/**
 * 分支不是主分支异常
 * @author pangl
 *
 */
public class NotMainBranchException extends BuildPackException{

	private static final long serialVersionUID = 1L;
	
	public NotMainBranchException(Pack bp) {
		super(bp);
	}

	public Branch getBranch() {
		return super.buildPack.getBranch();
	}

	@Override
	public String getMessage() {
		return "当前分支[" + buildPack.getBranch() + "]不是主分支";
	}
	
	
}
