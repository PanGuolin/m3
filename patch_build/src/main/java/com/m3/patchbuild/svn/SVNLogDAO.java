package com.m3.patchbuild.svn;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;

/**
 * 处理SVN日志的DAO对象
 * @author MickeyMic
 *
 */
public class SVNLogDAO extends BaseDAO {
	private static final Logger logger = Logger.getLogger(SVNLogDAO.class);
	
	public SVNLogDAO() {
		super(SVNLog.class);
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
					.createCriteria(bizClass)
					.add(Restrictions.and(
							Restrictions.eq("branch", billNO.substring(0, index).trim()),
							Restrictions.eq("revision", billNO.substring(index).trim())))
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public long getMaxRevision(Branch branch) {
		try {
			Object value = HibernateUtil.openSession()
				.createCriteria(SVNLog.class)
				.add(Restrictions.eq("branch", branch.getBranch()))
				.setProjection(Projections.projectionList().add(Projections.max("revision")))
				.uniqueResult();
			if (value == null)
				return 0;
			return (Long)value;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	@SuppressWarnings({ "unchecked" })
	public List<Object[]> getBaseRevision(Branch branch) {
		try {
			Session session = HibernateUtil.openSession();
			Criteria minCrit = session.createCriteria(bizClass);
			//DetachedCriteria minCrit = DetachedCriteria.forClass(getInfoClass());
			//minCrit = minCrit.createAlias("SVNLog", "log");
			ProjectionList proj = Projections.projectionList();
			proj = proj.add(Projections.groupProperty("path"));
			proj = proj.add(Projections.max("revision"));
			return  minCrit.setProjection(proj)
					.add(Restrictions.eq("branch", branch.getBranch()))
					.add(Restrictions.le("modifyTime", branch.getBaseTime()))
					.list();
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
	public List<SVNLog> findByKeywords(Branch branch, String keywords) {
		StringBuilder sql = new StringBuilder("from SVNLog as l where l.branch = :branch");
		if (keywords != null) {
			sql.append(" AND (");
			String[] ps = keywords.split(";");
			boolean isFirst = true;
			for (int i=0; i<ps.length; i++) {
				if (ps[i].trim().length() == 0)
					continue;
				if (!isFirst)
					sql.append(" OR");
				sql.append(" logMessage like '%" + ps[i] + "%'");
				isFirst = false;
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
	 * @param paths 
	 * @throws Exception 
	 * @throws IOException 
	 */
	@SuppressWarnings("unchecked")
	public void fillBuildPack(Pack pack) throws Exception  {
		if (pack.getBuildFiles().isEmpty())
			return;
		StringBuilder sql = new StringBuilder("SELECT {l.*} FROM pb_svnlog l")
			.append(" INNER JOIN (SELECT MAX(revision) r, path p FROM pb_svnlog GROUP BY path) m")
			.append(" ON l.revision = m.r and l.path = m.p WHERE branch = '" + pack.getBranch().getBranch() + "'")
			.append(" AND (");
		boolean first = true;
		for (BuildFile file : pack.getBuildFiles()) {
			if (!first)
				sql.append(" OR");
			sql.append(" l.path= '" + file.getUrl() + "'");
			first = false;
		}
		sql.append(")");
		
		try {
			List<SVNLog> list = HibernateUtil.openSession().createSQLQuery(sql.toString())
				.addEntity("l", SVNLog.class)
				.list();
			for (BuildFile file : pack.getBuildFiles()) {
				boolean exists = false;
				for (SVNLog log : list) {
					if (log.getPath().equals(file.getUrl())) {
						file.setModifier(log.getAuthor());
						file.setModifyTime(log.getModifyTime());
						file.setRevision(log.getRevision());
						file.setPackUid(pack.getUuid());
						exists = true;
						break;
					}
				}
				if (!exists)
					throw new Exception("找不到文件:" + file.getUrl());
			}
		} finally {
			HibernateUtil.closeSession();
		}
	}

}
