package com.m3.patchbuild.dao;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;

/**
 * 构建包对象DAO
 * @author MickeyMic
 *
 */
public class BuildPackDAO extends BaseDAO {
	
	 public BuildPack find(String branch, String buildNo) {
		try {
			return (BuildPack) HibernateUtil
					.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.and(
							Restrictions.eq("branch.branch", branch),
							Restrictions.eq("buildNo", buildNo)))
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	 }

	@Override
	protected Class<?> getInfoClass() {
		return BuildPack.class;
	}

	@SuppressWarnings("unchecked")
	public List<BuildPack> listByStatus(BuildPackStatus status) {
		try {
			return (List<BuildPack>) HibernateUtil
					.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.eq("status", status))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

}