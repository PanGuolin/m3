package com.m3.patchbuild.message;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 消息DAO
 * @author MickeyMic
 *
 */
@SuppressWarnings("unchecked")
public class MessageDAO extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return Message.class;
	}

	
	public List<Message> fetchNew(String userId, int size) {
		try {
			return HibernateUtil.openSession().createQuery("FROM Message Where operator is null" +
					" AND (:userId = any elements(recievers) OR :userId = any elements(notifiers))")
					.setParameter("userId", userId)
					.setMaxResults(size)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

}
