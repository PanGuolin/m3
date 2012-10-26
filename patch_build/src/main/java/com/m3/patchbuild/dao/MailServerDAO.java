package com.m3.patchbuild.dao;

import java.math.BigInteger;

import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.common.mail.MailServer;

/**
 * 邮箱服务器信息DAO类
 * @author pangl
 *
 */
public class MailServerDAO extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return MailServer.class;
	}

	/**
	 * 根据单据编号查找相应的单据
	 * @param billNO
	 * @return
	 */
	public Object findByNo(Object billNO) {
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.eq("name", billNO))
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 保存一个业务对象
	 * @param info
	 */
	public void saveInfo(MailServer server) {
		try {
			Session session = HibernateUtil.openSession();
			BigInteger count = (BigInteger) session.createSQLQuery("SELECT COUNT(1) FROM SYS_MailServer Where name=:name")
					.setParameter("name", server.getName())
					.uniqueResult();
			if (count.intValue() > 0) {
				session.update(server);
			} else {
				session.save(server);
			}
		}finally {
			HibernateUtil.closeSession();
		}
	}
}
