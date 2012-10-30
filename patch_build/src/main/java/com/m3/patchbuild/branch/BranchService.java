package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.BaseDAO;

/**
 * 构建分支服务类
 * @author MickeyMic
 *
 */
public class BranchService {
	
	private static BranchDAO dao = new BranchDAO();
	
	/**
	 * 获取分支对象
	 * @param branch
	 * @return
	 */
	public static Branch getBranch(String branch) {
		return (Branch)dao.findByBillNo(BaseDAO.getBillNo("branch", branch));
	}
	
	/**
	 * 保存一个分支对象
	 * @param branch
	 */
	public static void saveBranch(Branch branch) {
		dao.saveInfo(branch);
	}
	
	/**
	 * 获取系统中的所有分支信息
	 * @return
	 */
	public static List<Branch> listAllBranch() {
		return dao.listAllBranch();
	}

}
