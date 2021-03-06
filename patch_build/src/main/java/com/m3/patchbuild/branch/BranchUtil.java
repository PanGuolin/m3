package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.base.BussFactory;

/**
 * 分支服务辅助工具类
 * @author pangl
 *
 */
public abstract class BranchUtil {
	
	/**
	 * 返回系统中所有构建分支 
	 * @return
	 */
	public static List<Branch> listAllBranch() {
		IBranchService branchService = (IBranchService)BussFactory.getService(Branch.class);
		return branchService.listAllBranch();
	}

}
