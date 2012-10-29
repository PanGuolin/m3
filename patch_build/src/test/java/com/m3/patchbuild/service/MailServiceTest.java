package com.m3.patchbuild.service;

import junit.framework.TestCase;

import com.m3.common.mail.MailServer;
import com.m3.patchbuild.message.MailService;

public class MailServiceTest extends TestCase {
	
	public void test_sendMail() throws Exception {
		MailServer server = MailService.getMailServer();
		if (server == null) {
			server = new MailServer();
		}
		server.setHost("smtp.gmail.com");
		server.setUser("patch_build@threemickey.com");
		server.setPassword("patch_build@3mickey");
		server.setSmtpPort(465);
		server.setUseSSL(true);
		server.setDebug(true);
		MailService.save(server);
	}

}
