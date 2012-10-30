package com.m3.patchbuild.branch;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 补丁分支DAO对象
 * @author MickeyMic
 *
 */
public class BranchDAO extends BaseDAO{

	@SuppressWarnings("unchecked")
	public List<Branch> listAllBranch() {
		return (List<Branch>)super.listAll();
	}

	@Override
	protected Class<?> getInfoClass() {
		return Branch.class;
	}
	
	/**
	 * 获取分支对应的构建脚本
	 * @param branch
	 * @return
	 */
	public String getBuildScript(String branch) {
		try {
			return (String) HibernateUtil.openSession()
					.createSQLQuery("select script from PB_AntScript where branch=:branch")
					.setParameter("branch", branch)
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
