package com.m3.patchbuild.info;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;
import com.m3.patchbuild.pack.PackStatus;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;

public class HibernateTest extends TestCase{
	
	public void test_1() throws Exception {
		Configuration conf = new Configuration().configure();
		Session sess = conf.buildSessionFactory().openSession();
		Transaction tx = sess.beginTransaction();
		
		Branch branch = BranchService.getBranch("sp1");
		
		Pack bp = new Pack();
		bp.setBuildNo("test_build");
		bp.setBranch(branch);
		bp.addDepends("depend1");
		bp.setStatus(PackStatus.published);
		
		BuildFile file = new BuildFile();
		file.setUrl("test url");
		bp.addBuildFile(file);
		
		sess.save(bp);
		tx.commit();
		sess.close();
	}
	
	public void test_2() throws Exception {
		Configuration conf = new Configuration().configure();
		SessionFactory sf = conf.buildSessionFactory();
		Session sess = sf.openSession();
		Transaction tx = sess.beginTransaction();
		Branch bb = new Branch();
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
		user.getRoles().add(UserRole.admin);
		sess.save(user);
		tx.commit();
		sess.close();
	}
	
	
}
