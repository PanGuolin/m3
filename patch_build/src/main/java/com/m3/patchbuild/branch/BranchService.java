package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.DaoUtil;

/**
 * 构建分支服务类
 * @author MickeyMic
 *
 */
public class BranchService extends BaseService implements IBranchService{
	
	/**
	 * 获取分支对象
	 * @param branch
	 * @return
	 */
	public Branch getBranch(String branch) {
		return (Branch) findByBillNo("branch", branch);
	}
	
	/**
	 * 保存一个分支对象
	 * @param branch
	 */
	public void saveBranch(Branch branch) {
		DaoUtil.saveInfo(branch);
	}
	
	/**
	 * 获取系统中的所有分支信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Branch> listAllBranch() {
		return (List<Branch>) DaoUtil.list(getBizClass(), null);
	}


	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return Branch.class;
	}

}
