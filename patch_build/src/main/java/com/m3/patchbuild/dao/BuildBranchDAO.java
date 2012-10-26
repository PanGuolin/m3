package com.m3.patchbuild.dao;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.info.BuildBranch;

/**
 * 补丁分支DAO对象
 * @author MickeyMic
 *
 */
public class BuildBranchDAO extends BaseDAO{

	@SuppressWarnings("unchecked")
	public List<BuildBranch> listAllBranch() {
		return (List<BuildBranch>)super.listAll();
	}

	@Override
	protected Class<?> getInfoClass() {
		return BuildBranch.class;
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
