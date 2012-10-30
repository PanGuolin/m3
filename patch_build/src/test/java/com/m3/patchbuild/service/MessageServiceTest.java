package com.m3.patchbuild.service;

import java.util.Date;
import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageDAO;
import com.m3.patchbuild.message.MessageService;

import junit.framework.TestCase;

public class MessageServiceTest extends TestCase {
	
	public void test_fetch() {
		MessageService service = (MessageService) BussFactory.getService(Message.class);
		Message msg = new Message();
		msg.setSubject("test");
		msg.setSendTime(new Date());
		msg.setSubject("【补丁构建系统】构建包FY-AKS1-01已构建成功，请检查");
		msg.setContent("您好！<br/>"+ 
				"&nbsp;&nbsp;&nbsp;&nbsp; <b>FY-AKS1-01</b>已成功构建，补丁分支：<b>sp1</b>，构建申请人：developer<br/>" + 
				"&nbsp;&nbsp;&nbsp;&nbsp; 只有设计师的检查通过的补丁才能进入测试，如果您是该申请人的主检查设计师，请登录系统进行检查<br/>" +
				"谢谢<br/><br/>");
		msg.getRecievers().add("tester");
		msg.getRecievers().add("pangl");
		msg.getRecievers().add("testmanager");
		msg.getRecievers().add("developer");
		msg.getRecievers().add("admin");
		msg.getRecievers().add("user1");
		msg.getRecievers().add("designer");
		msg.getRecievers().add("deployer");
		msg.getRecievers().add("admin");
		msg.setBussId("4ea72ab7-6eaf-40c8-ab1d-f390cd04f49a");
		msg.setBussType("pack");
		
		new MessageDAO().saveInfo(msg);
//		List<Message> msgs = service.fetchNew("developer", 10);
//		for (Message msg : msgs) {
//			System.out.println(msg.getSubject());
//		}
	}

}
