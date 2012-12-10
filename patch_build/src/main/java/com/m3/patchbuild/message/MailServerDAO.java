package com.m3.patchbuild.message;

import java.math.BigInteger;

import org.hibernate.Session;

import com.m3.common.HibernateUtil;
import com.m3.common.mail.MailServer;
import com.m3.patchbuild.BaseDAO;

/**
 * 邮箱服务器信息DAO类
 * @author pangl
 *
 */
public class MailServerDAO extends BaseDAO{

	public MailServerDAO() {
		super(MailServer.class);
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
