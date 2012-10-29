package com.m3.patchbuild;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
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
	public List<?> listAll() {
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass()).list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
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
	
	

	
	/**
	 * 保存一个业务对象
	 * @param info
	 */
	public void saveInfo(Object info) {
		try {
			Session sess = HibernateUtil.openSession();
			sess.clear();
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


