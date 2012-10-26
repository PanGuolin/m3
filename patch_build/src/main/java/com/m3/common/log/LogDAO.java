package com.m3.common.log;

import java.util.List;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;

/**
 * 日志DAO对象
 * @author pangl
 *
 */
public class LogDAO {
	
	public void save(LogInfo info) {
		try {
			HibernateUtil.openSession().saveOrUpdate(info);		
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			HibernateUtil.closeSession();
		}
	}

	@SuppressWarnings("unchecked")
	public List<LogInfo> find(String user) {
		try {
			return HibernateUtil.openSession().createCriteria(LogInfo.class)
				.add(Restrictions.eq("user", user))
				.addOrder(Order.desc("opTime"))
				.list();
		}finally {
			HibernateUtil.closeSession();
		}
	}
}
