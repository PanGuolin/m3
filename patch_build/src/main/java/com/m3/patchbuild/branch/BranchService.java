package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BaseDAO;

/**
 * 构建分支服务类
 * @author MickeyMic
 *
 */
public class BranchService extends AbstractService{
	
	public BranchService() {
		super(new BranchDAO());
	}
	
	protected BranchDAO getDao() {
		return (BranchDAO)super.getDao();
	}
	
	/**
	 * 获取分支对象
	 * @param branch
	 * @return
	 */
	public Branch getBranch(String branch) {
		return (Branch)getDao().findByBillNo(BaseDAO.getBillNo("branch", branch));
	}
	
	/**
	 * 保存一个分支对象
	 * @param branch
	 */
	public void saveBranch(Branch branch) {
		getDao().saveInfo(branch);
	}
	
	/**
	 * 获取系统中的所有分支信息
	 * @return
	 */
	public List<Branch> listAllBranch() {
		return getDao().listAllBranch();
	}

}
