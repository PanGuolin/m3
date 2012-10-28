package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.patchbuild.BaseDAO;

/**
 * 构建分支服务类
 * @author MickeyMic
 *
 */
public class BuildBranchService {
	
	private static BuildBranchDAO dao = new BuildBranchDAO();
	
	/**
	 * 获取分支对象
	 * @param branch
	 * @return
	 */
	public static BuildBranch getBranch(String branch) {
		return (BuildBranch)dao.findByBillNo(BaseDAO.getBillNo("branch", branch));
	}
	
	/**
	 * 保存一个分支对象
	 * @param branch
	 */
	public static void saveBranch(BuildBranch branch) {
		dao.saveInfo(branch);
	}
	
	/**
	 * 获取系统中的所有分支信息
	 * @return
	 */
	public static List<BuildBranch> listAllBranch() {
		return dao.listAllBranch();
	}

}
