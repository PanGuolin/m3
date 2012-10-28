package com.m3.patchbuild.exception;

import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.pack.BuildPack;


/**
 * 分支不是主分支异常
 * @author pangl
 *
 */
public class NotMainBranchException extends BuildPackException{

	private static final long serialVersionUID = 1L;
	
	public NotMainBranchException(BuildPack bp) {
		super(bp);
	}

	public BuildBranch getBranch() {
		return super.buildPack.getBranch();
	}

	@Override
	public String getMessage() {
		return "当前分支[" + buildPack.getBranch() + "]不是主分支";
	}
	
	
}
