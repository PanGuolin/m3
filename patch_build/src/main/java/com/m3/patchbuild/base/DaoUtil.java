package com.m3.patchbuild.base;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.common.query.IQuery;
import com.m3.patchbuild.IBussInfo;

public abstract class DaoUtil {

	/**
	 * 保存业务对象
	 * @param info
	 */
	public static void saveInfo(IBussInfo info) {
		try {
			HibernateUtil.openSession().saveOrUpdate(info);
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 查找 /加载业务对象
	 * @param infoClass 业务对象类型
	 * @param uuid 业务对象的唯一ID编号
	 * @return
	 */
	public static IBussInfo loadInfo(Class<? extends IBussInfo> infoClass, String uuid) {
		try {
			return (IBussInfo) HibernateUtil.openSession().get(infoClass, uuid);
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 根据业务编号查找/加载业务对象
	 * @param infoClass 业务对象类型
	 * @param properties 业务字段列表
	 * @param values 业务字段值列表
	 * @return
	 */
	public static IBussInfo findByBillNo(
			Class<? extends IBussInfo> infoClass, String[] properties,
			Object[] values) {
		try {
			Criteria cri = HibernateUtil.openSession()
					.createCriteria(infoClass)
					.setMaxResults(1);
			for (int i = 0; i < properties.length; i++) {
				if (values[i] == null)
					cri.add(Restrictions.isNull(properties[i]));
				else
					cri.add(Restrictions.eq(properties[i], values[i]));
			}
			return (IBussInfo) cri.uniqueResult();

		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 根据业务编号查找/加载业务对象
	 * @param infoClass 业务对象类型
	 * @param properties 业务字段列表
	 * @param values 业务字段值列表
	 * @return
	 */
	public static IBussInfo findByBillNo(
			Class<? extends IBussInfo> infoClass, String property,
			Object value) {
		try {
			Criteria cri = HibernateUtil.openSession()
					.createCriteria(infoClass);
			cri.add(Restrictions.eq(property, value));
			return (IBussInfo) cri.uniqueResult();

		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 根据业务编号查找/加载业务对象
	 * @param infoClass 业务对象类型
	 * @param billNo 业务对象的属性列表及属
	 * @return
	 */
	public static IBussInfo findByBillNo(Class<? extends IBussInfo> infoClass,
			Map<String, Object> billNo) {
		try {
			Criteria crit = HibernateUtil.openSession().createCriteria(
					infoClass);
			for (String key : billNo.keySet()) {
				crit.add(Restrictions.eq(key, billNo.get(key)));
			}
			return (IBussInfo) crit.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 批量处理大小
	 */
	public static int batch_size = 20;

	/**
	 * 批量保存 
	 * @param infos 业务对象列表
	 */
	public static void saveBatch(Collection<?> infos) {
		if (infos == null || infos.size() == 0)
			return;
		if (batch_size < 1)
			batch_size = 1;
		try {
			Session session = HibernateUtil.openSession();
			int s = 0;
			for (Object o : infos) {
				s ++;
				session.saveOrUpdate(o);
				if (s % batch_size == 0) {
					session.flush();
					session.clear();
					s = 0;
				}
			}
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public static void deleteAll(Collection<?> infos) {
		if (infos == null || infos.size() == 0)
			return;
		if (batch_size < 1)
			batch_size = 1;
		try {
			Session session = HibernateUtil.openSession();
			int s = 0;
			for (Object o : infos) {
				s ++;
				session.delete(o);
				if (s % batch_size == 0) {
					session.flush();
					session.clear();
					s = 0;
				}
			}
		} finally {
			HibernateUtil.closeSession();
		}
	}

	/**
	 * 删除一个业务对象
	 * @param info
	 */
	public static void delete(Object info) {
		try {
			HibernateUtil.openSession().delete(info);
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 查找所有的业务对象
	 * @return
	 */
	public static List<?> list(Class<? extends IBussInfo> bizClass, IQuery query) {
		try {
			Session sess = HibernateUtil.openSession();
			Criteria criter = sess.createCriteria(bizClass);
			apply(query, criter);
			if (query != null)
				query.beforeQuery(criter);
			List <?> result = criter.list();
			if (query != null) {
				criter = sess.createCriteria(bizClass);
				query.beforeQuery(criter);
				Long count = (Long) criter.setProjection(Projections.rowCount()).uniqueResult();
				query.setTotalSize(count.longValue());
			}
			return result;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 将查询信息应用到hibernate的Criteria对象
	 * @param query
	 * @param criteria
	 */
	public static void apply(IQuery query, Criteria criteria) {
		if (query == null)
			return;
		query.beforeQuery(criteria);
	}
	
	public static void commit() {
		HibernateUtil.commit();
	}
}
