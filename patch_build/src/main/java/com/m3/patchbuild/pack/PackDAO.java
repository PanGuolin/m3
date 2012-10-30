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
public class PackDAO extends BaseDAO {
	private static final List<Pack> empty = new ArrayList<Pack>();

	public Pack find(String branch, String buildNo) {
		try {
			return (Pack) HibernateUtil
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
		return Pack.class;
	}

	public List<Pack> listByStatus(PackStatus status) {
		try {
			return (List<Pack>) HibernateUtil.openSession()
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
	public List<Pack> listUnpublishDepends(Pack bp) {
		if (bp.getDepends().isEmpty())
			return empty;
		try {
			return (List<Pack>) HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.not(Restrictions.eq("status", PackStatus.published)))
					.add(Restrictions.in("buildNo", bp.getDepends()))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
