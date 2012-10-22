package com.m3.patchbuild.dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

/**
 * Hibernate工具类
 * @author MickeyMic
 *
 */
public class HibernateUtil {
	
	private static final SessionFactory sf = build(); 
	
	private static SessionFactory build() {
		Configuration configuration = new Configuration();
	    configuration.configure();
	    ServiceRegistry serviceRegistry = new ServiceRegistryBuilder()
	    	.applySettings(configuration.getProperties()).buildServiceRegistry();        
	    SessionFactory factory = configuration.buildSessionFactory(serviceRegistry);
	    return factory;
	}
	
	public static SessionFactory getSessionFactory() {
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
			session = sf.openSession();
			tx = session.beginTransaction();
			deeps = 1;
		}
		
		synchronized boolean close() {
			deeps --;
			if (deeps <= 0) {
				tx.commit();
				session.clear();
				return true;
			}
			return false;
		}
		
		synchronized void rollback() {
			tx.rollback();
		}
		
		synchronized void commit() {
			tx.commit();
			tx = session.beginTransaction();
		}
		
		void open() {
			deeps ++;
		}
		
	}
}
