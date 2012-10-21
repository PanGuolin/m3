package com.m3.patchbuild.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.patchbuild.info.SVNLog;

/**
 * 处理SVN日志的DAO对象
 * @author MickeyMic
 *
 */
public class SVNLogDAO extends BaseDAO {
	private static final Logger logger = Logger.getLogger(SVNLogDAO.class);

	@Override
	protected Class<?> getInfoClass() {
		return SVNLog.class;
	}
	
	/**
	 * 根据单据编号查找相应的单据
	 * @param billNO,格式为branch + ":" + revision
	 * @return
	 */
	public Object findByNo(String billNO) {
		int index = billNO.lastIndexOf(':');
		if (index == -1) {
			logger.info("SVNLog的编号不合法:" + billNO + ",必须是【brach:revision】形式");
		}
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.and(
							Restrictions.eq("branch", billNO.substring(0, index).trim()),
							Restrictions.eq("revision", billNO.substring(index).trim())))
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public SVNLog getMaxRevision(String branch) {
		try {
			return (SVNLog) HibernateUtil.openSession()
				.createCriteria(SVNLog.class)
				.add(Restrictions.eq("branch", branch))
				.setProjection(Projections.projectionList().add(Projections.max("revision")))
				.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 根据日志关键字查找对应的修改记录
	 * @param branch
	 * @param keywords
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<SVNLog> findByKeywords(String branch, String keywords) {
		StringBuilder sql = new StringBuilder("from SVNLog as l where l.branch = :branch");
		if (keywords != null) {
			sql.append(" AND (");
			String[] ps = keywords.split(";");
			for (int i=0; i<ps.length; i++) {
				if (i > 0)
					sql.append(" OR");
				sql.append(" logMessage like '%" + ps[i] + "%'");
			}
			sql.append(")");
		}
		try {
			return HibernateUtil.openSession().createQuery(sql.toString())
					.setParameter("branch", branch).list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

}
