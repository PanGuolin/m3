package com.m3.patchbuild.message;

import org.apache.log4j.Logger;

import com.m3.common.EncodeUtil;
import com.m3.common.mail.MailServer;

/**
 * 发送邮件业务接口
 * @author pangl
 *
 */
public abstract class MailService {
	private static final Logger logger = Logger.getLogger(MailServer.class);
	private static final String MailServerName = "PatchBuildSystem";
	private static MailServerDAO dao = new MailServerDAO();
	
	//private static volatile MailServer mailServer = null;
	
	public static void sendMessage(Message msg) {
		MailServer mailServer = getMailServer();
		if (mailServer == null) {
			logger.info("没有配置邮件服务器信息，取消发送邮件");
			return;
		}
		
/*		try {
			MailInfo mail = new MailInfo();
			mail.setContent(msg.getContent());
			mail.setSubject(msg.getSubject());
			
			if (msg.getAttachments() != null) {
				Set<File> files = new HashSet<File>();
				for (String s : msg.getAttachments().split(";")) {
					files.add(new File(s));
				}
				mail.setAttachments(files);
			}
			
			UserService userService = (UserService)BussFactory.getService(User.class);
			if (msg.getRecievers() != null) {
				List<User> users = userService.listByUserId(StringUtil.split2Set(msg.getRecievers(), ";"));
				for (User usr : users) {
					mail.addToAddress(usr.getEmail(), usr.getUsername());
				}
			}
			if (msg.getNotifiers() != null) {
				List<User> users = userService.listByUserId(StringUtil.split2Set(msg.getNotifiers(), ";"));
				for (User usr : users) {
					mail.addCcAddress(usr.getEmail(), usr.getUsername());
				}
			}
			mailServer.sendMail(mail);*/
/*		} catch (Throwable t) {
			logger.error("发送邮件失败!", t);
		}*/
	}
	
	/**
	 * 获取邮件服务器信息
	 * @return
	 */
	public static MailServer getMailServer() {return null;
//		if (mailServer == null) {
//			synchronized (MailServer.class) {
//				
//				MailServer preServer = (MailServer) dao.findByNo(MailServerName);
//				if (preServer != null) {
//					mailServer = new MailServer();
//					//mailServer.setDebug(true);
//					mailServer.setHost(preServer.getHost());
//					mailServer.setName(preServer.getName());
//					try {
//						mailServer.setPassword(EncodeUtil.decrypt(preServer.getPassword()));
//					} catch (Exception e) {
//						mailServer.setPassword(preServer.getPassword());
//						logger.error("解密用户口令时出错", e);
//					}
//					mailServer.setSmtpPort(preServer.getSmtpPort());
//					mailServer.setUser(preServer.getUser());
//					mailServer.setUseSSL(preServer.isUseSSL());
//				}
//			}
//		}
//		return mailServer;
	}
	
	/**
	 * 保存服务器信息
	 * @param server
	 * @throws Exception
	 */
	public static void save(MailServer server) throws Exception{
		server.setName(MailServerName);
		try {
			server.setPassword(EncodeUtil.encrypt(server.getPassword()));
		} catch (Exception e) {
			logger.error("加密口令时出错", e);
			throw e;
		}
		dao.saveInfo(server);
		//mailServer = server;
	}

}
