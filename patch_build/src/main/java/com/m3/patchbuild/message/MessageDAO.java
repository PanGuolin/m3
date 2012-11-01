package com.m3.patchbuild.message;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.BaseQuery;
import com.sun.org.apache.bcel.internal.generic.Type;

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

	
	public List<Message> fetchNew(String userId) {
		try {
			return HibernateUtil.openSession().createQuery("FROM Message Where operator is null" +
					" AND (:userId = any elements(recievers) OR :userId = any elements(notifiers))")
					.setParameter("userId", userId)
					//.setMaxResults(size)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}


	@Override
	protected void beforeList(BaseQuery query, Criteria criter) {
		MessageQuery q = (MessageQuery)query;
		if (!q.isIncludeDealed()) {
			criter.add(Restrictions.isNull("operator"));
		}
	}

}
