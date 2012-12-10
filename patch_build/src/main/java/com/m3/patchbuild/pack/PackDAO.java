package com.m3.patchbuild.pack;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.branch.Branch;

/**
 * 构建包对象DAO
 * 
 * @author MickeyMic
 * 
 */
@SuppressWarnings("unchecked")
public class PackDAO extends BaseDAO {
	
	public PackDAO() {
		super(Pack.class);
		// TODO Auto-generated constructor stub
	}

	private static final List<Pack> empty = new ArrayList<Pack>();

	public List<Pack> listByStatus(PackStatus status) {
		try {
			return (List<Pack>) HibernateUtil.openSession()
					.createCriteria(bizClass)
					.add(Restrictions.eq("status", status))
					.addOrder(Order.asc("branch"))
					.addOrder(Order.asc("requestTime"))
					.list();
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
					.createCriteria(bizClass)
					.add(Restrictions.not(Restrictions.eq("status", PackStatus.published)))
					.add(Restrictions.in("buildNo", bp.getDepends()))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	public List<Pack> listByStatus(Collection<PackStatus> slist) {
		try {
			return HibernateUtil.openSession()
				.createCriteria(bizClass)
				.addOrder(Order.asc("branch"))
				.addOrder(Order.asc("requestTime"))
				.add(Restrictions.in("status", slist))
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 列出所有已发布的构建包
	 * @param branch
	 * @return
	 */
	public List<Pack> listByStatus(String branch, PackStatus status) {
		try {
			return HibernateUtil.openSession()
				.createCriteria(bizClass)
				.add(Restrictions.eq("branch", branch))
				.add(Restrictions.eq("status", status))
				.addOrder(Order.asc("requestTime"))
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 列出所有指定UUID的构建包
	 * @param uuids
	 * @return
	 */
	public List<Pack> listByUuids(Collection<String> uuids) {
		try {
			return HibernateUtil.openSession()
				.createCriteria(bizClass)
				.add(Restrictions.in("uuid", uuids))
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 移除构建包依赖
	 * @param pack
	 */
	public void removeDependOn(Pack pack) {
		try {
			HibernateUtil.openSession()
					.createSQLQuery("delete from Pack_Depend where dependUid=:uuid")
					.setParameter("uuid", pack.getUuid())
					.executeUpdate();
		} finally {
			HibernateUtil.closeSession();
		}
		// TODO Auto-generated method stub
		
	}

	/**
	 * 查找包含指定文件的所有构建包UUID
	 * @param buildFiles
	 * @return
	 */
	public List<Pack> findDepends(Pack pack) {
		List<BuildFile> buildFiles = pack.getBuildFiles();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT DISTINCT pack.uuid FROM Pack_Pack pack")
			.append(" left outer join Pack_BuildFile bfile on bfile.packuid = pack.uuid")
			.append(" WHERE pack.uuid <> '" + pack.getUuid() + "' AND (");
		boolean isFirst = true;
		for (BuildFile file : buildFiles) {
			if (!isFirst)
				sb.append(" OR ");
			sb.append(" bfile.url = '" + file.getUrl() + "'");
			isFirst = false;
		}
		sb.append(")");
		try {
			Session session = HibernateUtil.openSession();
			List<String> uuids = session.createSQLQuery(sb.toString()).list();
			if (uuids.isEmpty())
				return new ArrayList<Pack>();
			return (List<Pack>) session.createCriteria(bizClass)
				.add(Restrictions.in("uuid", uuids))
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 清除构建文件信息
	 * @param oldPack
	 */
	public void clearBuildFiles(Pack pack) {
		if (pack == null || pack.getUuid() == null)
			return;
		try {
			HibernateUtil.openSession()
					.createSQLQuery("delete from Pack_buildFile where packUid=:uuid")
					.setParameter("uuid", pack.getUuid())
					.executeUpdate();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	public List<Pack> listPublished(Branch branch, Date time) {
		try {
			return HibernateUtil.openSession()
				.createCriteria(bizClass)
				.add(Restrictions.eq("branch", branch))
				.add(Restrictions.eq("status", PackStatus.published))
				.add(Restrictions.le("deployTime", time))
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
