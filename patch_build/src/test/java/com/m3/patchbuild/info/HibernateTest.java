package com.m3.patchbuild.info;

import java.util.HashSet;
import java.util.Set;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageDetail;
import com.m3.patchbuild.message.MessageReciever;

public class HibernateTest extends TestCase{
	
	public void test_Message() throws Exception {
		Configuration conf = new Configuration().configure();
		Session sess = conf.buildSessionFactory().openSession();
		Transaction tx = sess.beginTransaction();
		
		Message message = new Message();
		message.setSubject("test subject");
		
		MessageDetail detail = new MessageDetail();
		detail.setContent("test Content");
		message.setDetail(detail);
		
		MessageReciever rec = new MessageReciever();
		rec.setUserId("developer");
		rec.setMessage(message);
		message.getRecievers().add(rec);
		
//		message.getSendRecords().add(rec);
		
//		UserService userService = (UserService) BussFactory.getService(User.class);
//		User user = userService.findUser("developer");
//		message.getRecievers().add(user);
//		message.getNotifiers().add(user);
		
		sess.save(message);
		tx.commit();
		sess.close();
		
		sess = conf.buildSessionFactory().openSession();
		tx = sess.beginTransaction();
		Message msg = (Message) sess.get(Message.class, message.getUuid());
		assertTrue(msg != null);
		assertEquals(msg.getSubject(), message.getSubject());
	}
	
}
