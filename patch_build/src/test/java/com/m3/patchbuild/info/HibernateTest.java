package com.m3.patchbuild.info;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import junit.framework.TestCase;

public class HibernateTest extends TestCase{
	
	public void test_1() throws Exception {
		Configuration conf = new Configuration().configure();
		Session sess = conf.buildSessionFactory().openSession();
		Transaction tx = sess.beginTransaction();
		BuildPack bp = new BuildPack();
		bp.setBranch("sp1");
		bp.addBuildFile("test url");
		bp.addDepends("depend1");
		bp.setStatus(BuildPackStatus.deployed);
		sess.save(bp);
		tx.commit();
		sess.close();
	}
	
	public void test_2() throws Exception {
		Configuration conf = new Configuration().configure();
		SessionFactory sf = conf.buildSessionFactory();
		Session sess = sf.openSession();
		Transaction tx = sess.beginTransaction();
		BuildBranch bb = new BuildBranch();
		bb.setBranch("sp1");
		bb.setName("sp1");
		bb.setSvnPassword("test");
		bb.setSvnRoot("root");
		bb.setSvnUrl("url");
		bb.setSvnUser("user");
		bb.setVersion("version");
		bb.setWorkspace("workspace");
		sess.save(bb);
		tx.commit();
		sess.close();
	}
	
	public void test_3() throws Exception {
		Configuration conf = new Configuration().configure();
		SessionFactory sf = conf.buildSessionFactory();
		Session sess = sf.openSession();
		Transaction tx = sess.beginTransaction();
		User user = new User();
		user.setEmail("pangl@threemickey.com");
		user.setPassword("test");
		user.setUserId("pangl");
		user.getRoles().add(UserRoleEnum.admin.name());
		sess.save(user);
		tx.commit();
		sess.close();
	}
	
	
}
