package com.m3.patchbuild.message;

import java.util.List;

import org.hibernate.Session;

import com.m3.common.ContextUtil;
import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.IStateful;
import com.m3.patchbuild.base.BussFactory;

/**
 * 消息DAO
 * @author MickeyMic
 *
 */
@SuppressWarnings("unchecked")
public class MessageDAO extends BaseDAO{
	
	public MessageDAO() {
		super(Message.class);
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
	
	/**
	 * 获取某个用户未处理（未读）的消息数量
	 * @param userId
	 * @param toType 消息发送类型，true : 通知消息， false: 关注消息
	 * @return
	 */
	public int countUserMessage(String userId, boolean toType) {
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT count(*) FROM Message msg LEFT JOIN fetch msg.recievers rec Where rec.userId=:userId AND msg.status=0 AND rec.sendType=:sendType");
		try {
			Session sess = HibernateUtil.openSession();
			Long size = (Long) sess.createQuery(sb.toString())
					.setParameter("userId", ContextUtil.getUserId())
					.setParameter("sendType", toType ? MessageReciever.SEND_TYPE_TO : MessageReciever.SEND_TYPE_CC)
					.uniqueResult();
			return size.intValue();
		} finally {
			HibernateUtil.closeSession();
		}
	}


	/**
	 * 获取消息的参与人
	 * @param msgUid
	 * @return
	 */
	public List<MessageReciever> listOperators(String msgUid) {
		StringBuilder sb = new StringBuilder();
		sb.append("FROM MessageReciever rec LEFT JOIN fetch rec.message msg Where msg.uuid=:msgUid AND msg.status=0 AND rec.sendType=:sendType");
		try {
			return HibernateUtil.openSession()
				.createQuery(sb.toString())
				.setParameter("msgUid", msgUid)
				.setParameter("sendType", MessageReciever.SEND_TYPE_TO)
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}


	/**
	 * 忽略用户的消息
	 * @param msgUid
	 * @param userId
	 * @return
	 */
	public boolean ignore(String msgUid, String userId) {
		try {
			return HibernateUtil.openSession()
					.createQuery("UPDATE MessageReciever rec SET rec.status = :status WHERE rec.message.uuid=:msgUid AND rec.sendType=:sendType AND rec.userId=:userId")
					.setParameter("sendType", MessageReciever.SEND_TYPE_CC) //只有抄送的消息才能被忽略
					.setParameter("status", MessageReciever.STATUS_INGORE)
					.setParameter("msgUid", msgUid)
					.setParameter("userId", userId)
					.executeUpdate() == 1;
		} finally {
			HibernateUtil.closeSession();
		}
	}

	public List<MessageReciever> listOperatorsByBuss(String bizType,
			String bizId) {
		StringBuilder sb = new StringBuilder();
		sb.append("FROM MessageReciever rec LEFT JOIN fetch rec.message msg Where msg.bussType=:bizType AND msg.bussId=:bizId AND msg.status=0 AND rec.sendType=:sendType");
		try {
			return HibernateUtil.openSession()
				.createQuery(sb.toString())
				.setParameter("bizType", bizType)
				.setParameter("bizId", bizId)
				.setParameter("sendType", MessageReciever.SEND_TYPE_TO)
				.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
