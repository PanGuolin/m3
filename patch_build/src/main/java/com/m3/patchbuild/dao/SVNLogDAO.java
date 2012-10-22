package com.m3.patchbuild.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
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
	
	public long getMaxRevision(BuildBranch branch) {
		try {
			Object value = HibernateUtil.openSession()
				.createCriteria(SVNLog.class)
				.add(Restrictions.eq("branch", branch.getBranch()))
				.setProjection(Projections.projectionList().add(Projections.max("revision")))
				.uniqueResult();
			if (value == null)
				return 0;
			return (long)value;
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
	public List<SVNLog> findByKeywords(BuildBranch branch, String keywords) {
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
					.setParameter("branch", branch.getBranch()).list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 *  更新构建包中的文件版本
	 * @param pack
	 */
	@SuppressWarnings("unchecked")
	public void fillBuildPack(BuildPack pack) {
		
		String[] paths = pack.getFilePaths();
		if (paths.length == 0)
			return;
		
		StringBuilder sql = new StringBuilder("SELECT {l.*} FROM pb_svnlog l")
			.append(" INNER JOIN (SELECT MAX(revision) r, path p FROM pb_svnlog GROUP BY path) m")
			.append(" ON l.revision = m.r and l.path = m.p WHERE branch = '" + pack.getBranch().getBranch() + "'")
			.append(" AND (");
		for (int i=0; i<paths.length; i++) {
			if (i > 0)
				sql.append(" OR");
			sql.append(" l.path = '" + paths[i] + "'");
		}
		sql.append(")");
		
		List<SVNLog> list = HibernateUtil.openSession().createSQLQuery(sql.toString())
			.addEntity("l", SVNLog.class)
			.list();
		pack.getBuildFiles().clear();
		for (SVNLog log : list) {
			//if (log.getRevision() == 0 && log.getAuthor() == null)
			//	continue;
			BuildFile file = new BuildFile();
			file.setModifier(log.getAuthor());
			file.setModifyTime(log.getModifyTime());
			file.setRevision(log.getRevision());
			file.setUrl(log.getPath());
			pack.addBuildFile(file);
		}
	}

}
