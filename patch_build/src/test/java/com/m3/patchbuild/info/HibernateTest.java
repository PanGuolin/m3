package com.m3.patchbuild.info;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.BuildPack;
import com.m3.patchbuild.pack.BuildPackService;
import com.m3.patchbuild.pack.BuildPackStatus;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRoleEnum;

public class HibernateTest extends TestCase{
	
	public void test_1() throws Exception {
		Configuration conf = new Configuration().configure();
		Session sess = conf.buildSessionFactory().openSession();
		Transaction tx = sess.beginTransaction();
		
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		
		BuildPack bp = new BuildPack();
		bp.setBuildNo("test_build");
		bp.setBranch(branch);
		bp.addDepends("depend1");
		bp.setStatus(BuildPackStatus.published);
		
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
