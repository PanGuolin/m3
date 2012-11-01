package com.m3.patchbuild.info;

import java.util.UUID;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageDetail;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;
import com.m3.patchbuild.pack.PackStatus;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;

public class HibernateTest extends TestCase{
	
	public void test_entity() throws Exception {
		Configuration conf = new Configuration().configure();
		Session sess = conf.buildSessionFactory().openSession();
		Transaction tx = sess.beginTransaction();
		
		Message message = new Message();
		message.setGroudId(UUID.randomUUID().toString());
		message.setSubject("test subject");
		
		MessageDetail detail = new MessageDetail();
		detail.setContent("test Content");
		message.setDetail(detail);
		
		sess.save(message);
		tx.commit();
		sess.close();
	}
	
	
	
}
