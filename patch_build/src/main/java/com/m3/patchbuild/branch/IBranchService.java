package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 分支服务接口
 * @author pangl
 *
 */
public interface IBranchService extends IService{
	/**
	 * 获取分支对象
	 * @param branch
	 * @return
	 */
	public Branch getBranch(String branch);
	
	/**
	 * 保存一个分支对象
	 * @param branch
	 */
	public void saveBranch(Branch branch);
	
	/**
	 * 获取系统中的所有分支信息
	 * @return
	 */
	public List<Branch> listAllBranch();
}
