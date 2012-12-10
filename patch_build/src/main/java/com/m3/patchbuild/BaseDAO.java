package com.m3.patchbuild;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;

import com.m3.common.HibernateUtil;
import com.m3.common.query.IQuery;


/**
 * DAO抽象类
 * @author MickeyMic
 *
 */
public abstract class BaseDAO {
	
	protected Class<?> bizClass;
	
	public BaseDAO(Class<?> bizClass) {
		this.bizClass = bizClass;
	}
	
	/**
	 * 查找所有的业务对象
	 * @return
	 */
	public List<?> list(IQuery query) {
		try {
			Session sess = HibernateUtil.openSession();
			Criteria criter = sess.createCriteria(bizClass);
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
}


