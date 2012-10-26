package com.m3.common.mail;

import junit.framework.TestCase;

public class MailServerTest extends TestCase {
	
	public void test_sendMail() throws Exception {
		MailServer server = new MailServer();
		server.setName("测试服务器");
		server.setHost("smtp.gmail.com");
		server.setUser("patch_build@threemickey.com");
		server.setPassword("patch_build@3mickey");
		server.setSmtpPort(465);
		server.setUseSSL(true);
		server.setDebug(true);
		
		MailInfo info = new MailInfo();
		info.addToAddress("test@threemickey.com", "测试用户");
		info.setContent("测试邮件");
		info.setSubject("测试邮件主题");
		server.sendMail(info);
	}

}
