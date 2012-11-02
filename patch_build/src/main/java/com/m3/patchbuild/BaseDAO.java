package com.m3.patchbuild;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;


/**
 * DAO抽象类
 * @author MickeyMic
 *
 */
public abstract class BaseDAO {
	
	//private static final Logger logger = Logger.getLogger(BaseDAO.class);
	
	/**
	 * 批量处理大小
	 */
	protected int batch_size = 20;
	
	protected abstract Class<?> getInfoClass();

	/**
	 * 查找所有的业务对象
	 * @return
	 */
	public List<?> list(BaseQuery query) {
		try {
			Session sess = HibernateUtil.openSession();
			Criteria criter = sess.createCriteria(getInfoClass());
			//HibernateUtil.apply(query, criter);
			beforeList(query, criter);
			List <?> result = criter.list();
			if (query != null) {
				criter = sess.createCriteria(getInfoClass());
				beforeList(query, criter);
				long count = (long) criter.setProjection(Projections.rowCount()).uniqueResult();
				query.setTotalSize(count);
			}
			return result;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 在查询之前根据具体类设置额外条件，由子类实现 
	 * @param criter
	 */
	protected void beforeList(BaseQuery query, Criteria criter) {};
	
	
	public Object findByBillNo(Map<String, Object> billNo) {
		try { 
			Criteria crit = HibernateUtil.openSession().createCriteria(getInfoClass());
			for (String key : billNo.keySet()) {
				crit.add(Restrictions.eq(key, billNo.get(key)));
			}
			return crit.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public void update(Object info) {
		try { 
			HibernateUtil.openSession().update(info);
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public Object findByBillNo(BillNo billNo) {
		return findByBillNo(billNo.getProps());
	}
	
	public Object findByUuid(String uuid) {
		try { 
			return HibernateUtil.openSession().get(getInfoClass(), uuid);
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public static void commit() {
		HibernateUtil.commit();
	}
	

	
	/**
	 * 保存一个业务对象
	 * @param info
	 */
	public void saveInfo(Object info) {
		try {
			Session sess = HibernateUtil.openSession();
			//sess.clear();
			sess.saveOrUpdate(info);		
		}finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 批量保存
	 * @param infos
	 */
	public void saveBatch(List<?> infos) {
		if(infos == null || infos.size() == 0)
			return;
		if (batch_size < 1)
			batch_size = 1;
		try {
			Session session = HibernateUtil.openSession();
			for (int i=0; i<infos.size(); i++) {
				session.saveOrUpdate(infos.get(i));
				if (i % batch_size == 0) {
					session.flush();
					session.clear();
					//HibernateUtil.commit();
				}
			}
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public void delete(Object info) {
		try {
			HibernateUtil.openSession().delete(info);
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public static BillNo getBillNo(String key, Object value) {
		return new BillNo(key, value);
	}
}


