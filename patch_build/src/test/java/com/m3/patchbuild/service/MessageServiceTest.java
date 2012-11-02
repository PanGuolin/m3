package com.m3.patchbuild.service;

import java.util.Date;

import junit.framework.TestCase;

import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageDAO;
import com.m3.patchbuild.message.MessageDetail;

public class MessageServiceTest extends TestCase {
	
	public void test_fetch() {
		//MessageService service = (MessageService) BussFactory.getService(Message.class);
		Message msg = new Message();
		msg.setSubject("test");
		msg.setSendTime(new Date());
		msg.setSubject("【补丁构建系统】构建包FY-AKS1-01已构建成功，请检查");
		
		
		msg.setBussId("4ea72ab7-6eaf-40c8-ab1d-f390cd04f49a");
		msg.setBussType("pack");
		
		MessageDetail detail = new MessageDetail();
		detail.setContent("您好！<br/>"+ 
				"&nbsp;&nbsp;&nbsp;&nbsp; <b>FY-AKS1-01</b>已成功构建，补丁分支：<b>sp1</b>，构建申请人：developer<br/>" + 
				"&nbsp;&nbsp;&nbsp;&nbsp; 只有设计师的检查通过的补丁才能进入测试，如果您是该申请人的主检查设计师，请登录系统进行检查<br/>" +
				"谢谢<br/><br/>");
		msg.setDetail(detail);
		new MessageDAO().saveInfo(msg);
//		List<Message> msgs = service.fetchNew("developer", 10);
//		for (Message msg : msgs) {
//			System.out.println(msg.getSubject());
//		}
	}

}
