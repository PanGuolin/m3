package com.m3.patchbuild.pack;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 构建包对象DAO
 * 
 * @author MickeyMic
 * 
 */
@SuppressWarnings("unchecked")
public class BuildPackDAO extends BaseDAO {
	private static final List<BuildPack> empty = new ArrayList<BuildPack>();

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

	public List<BuildPack> listByStatus(BuildPackStatus status) {
		try {
			return (List<BuildPack>) HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.eq("status", status)).list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 返回某个构建包依赖的所有未发布的构建包信息
	 * @param bp
	 * @return
	 */
	public List<BuildPack> listUnpublishDepends(BuildPack bp) {
		if (bp.getDepends().isEmpty())
			return empty;
		try {
			return (List<BuildPack>) HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.not(Restrictions.eq("status", BuildPackStatus.published)))
					.add(Restrictions.in("buildNo", bp.getDepends()))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
