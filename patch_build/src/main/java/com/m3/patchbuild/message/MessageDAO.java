package com.m3.patchbuild.message;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.BaseQuery;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.IStateful;

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
	public List<?> list(BaseQuery query) {
		
		StringBuilder sql = new StringBuilder();
		sql.append(" FROM Message msg LEFT JOIN msg.recievers rec Where rec.userId=:userId");
		MessageQuery q = (MessageQuery)query;
		
		try {
			Session sess = HibernateUtil.openSession();
			if (query != null) {
				Long size = (Long) sess.createQuery("SELECT count(*) " + sql.toString())
						.setParameter("userId", ContextUtil.getUserId())
						.uniqueResult();
				query.setTotalSize(size.longValue());
				if (size.longValue() == 0)
					return new ArrayList<Message>();
			}
			return sess.createQuery(" FROM Message msg LEFT JOIN fetch msg.recievers rec Where rec.userId=:userId")
					.setParameter("userId", ContextUtil.getUserId())
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}


	@Override
	protected void beforeList(BaseQuery query, Criteria criter) {
		MessageQuery q = (MessageQuery)query;
		if (q.getStatus() == MessageQuery.STATUS_NOR) {
			criter.add(Restrictions.eq("status", IStateful.STATE_NORMAL));
		} else if (q.getStatus() == MessageQuery.STATUS_INCLUD_EXPIR) {
			
		}
		
		if (q.getNt() == MessageQuery.NT_NOTIFIER) {
			criter.createAlias("notifiers", "notifiers")
			.add(Restrictions.eq("notifiers.userId", ContextUtil.getUserId())); 
		} else if (q.getNt() == MessageQuery.NT_RECIEVER) {
			criter.createAlias("recievers", "recievers")
			.add(Restrictions.eq("recievers.userId", ContextUtil.getUserId())); 
		}
	}
	
	public void expiredByBussInfo(IBussInfo info) {
		String type = BussFactory.getBussType(info.getClass());
		String uuid = info.getUuid();
		try {
			HibernateUtil.openSession()
				.createQuery("UPDATE Message SET status = :status WHERE bussType=:bussType AND bussId=:bussId AND status=:oldStatus")
				.setParameter("status", IStateful.STATE_INVALID)
				.setParameter("bussType", type)
				.setParameter("bussId", uuid)
				.setParameter("oldStatus", IStateful.STATE_NORMAL)
				.executeUpdate();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
}
