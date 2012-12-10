package com.m3.common;


import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

/**
 * Hibernate工具类
 * @author MickeyMic
 *
 */
public class HibernateUtil {
	
	private static SessionFactory sf = null; 
	
	private static synchronized void build() {
		try {
			Configuration configuration = new Configuration();
			configuration.configure();
			ServiceRegistry serviceRegistry = new ServiceRegistryBuilder()
	    	.applySettings(configuration.getProperties()).buildServiceRegistry();        
			sf = configuration.buildSessionFactory(serviceRegistry);
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
	}
	
	public static SessionFactory getSessionFactory() {
		if (sf == null)
			build();
		return sf;
	}
	
	private static ThreadLocal<SessionObject> sessions = new ThreadLocal<SessionObject>();
	
	public static Session openSession() {
		SessionObject sess = sessions.get();
		if (sess == null) {
			sess = new SessionObject();
			sessions.set(sess);
		} else {
			sess.open();
		}
		return sess.session;
	}
	
	public static void rollback() {
		SessionObject sess = sessions.get();
		if (sess == null) {
			return;
		}
		sess.rollback();
	}
	
	public static void commit() {
		SessionObject sess = sessions.get();
		if (sess == null) {
			return;
		}
		sess.commit();
	}
	
	public static void closeSession() {
		SessionObject sess = sessions.get();
		if (sess == null) 
			return;
		if (sess.close())
			sessions.remove();
	}
	
	private static class SessionObject {
		private int deeps = 0;
		private Session session = null;
		private Transaction tx = null;
		
		SessionObject() {
			session = getSessionFactory().openSession();
			tx = session.beginTransaction();
			deeps = 1;
		}
		
		synchronized boolean close() {
			deeps --;
			if (deeps <= 0) {
				tx.commit();
				session.clear();
				session.close();
				return true;
			}
			return false;
		}
		
		synchronized void rollback() {
			tx.rollback();
		}
		
		synchronized void commit() {
			tx.commit();
			session.flush();
			tx = session.beginTransaction();
		}
		
		void open() {
			deeps ++;
		}
		
	}
	
//	/**
//	 * 将查询信息应用到hibernate的Criteria对象
//	 * @param query
//	 * @param criteria
//	 */
//	public static void apply(BaseQuery query, Criteria criteria) {
//		if (query == null)
//			return;
//		if (query.getPageIndex() > -1 && query.getPageSize() > 0) {
//			criteria.setFirstResult(query.getPageIndex()-1 * query.getPageSize())
//				.setMaxResults(query.getPageSize());
//		}
//		for (QOrder order : query.getOrders()) {
//			if (order.isDesc())
//				criteria.addOrder(Order.desc(order.getPropertyName()));
//			else
//				criteria.addOrder(Order.asc(order.getPropertyName()));
//		}
//	}
	
	public static Criteria queryEq(Criteria criteria, String property, Object value) {
		if (value == null)
			return criteria;
		if (value instanceof String) {
			String s = ((String)value).trim();
			if (s.length() == 0)
				return criteria;
			value = s;
		}
		criteria.add(Restrictions.eq(property, value));
		return criteria;
	}
	
	public static Criteria queryLike(Criteria criteria, String property, String value) {
		if (!StringUtil.isEmpty(value))
			criteria.add(Restrictions.like(property, value, MatchMode.ANYWHERE));
		return criteria;
	}
}
