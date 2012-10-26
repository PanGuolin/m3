package com.m3.patchbuild.service;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;

import javax.mail.MessagingException;

import org.apache.log4j.Logger;

import com.m3.common.EncodeUtil;
import com.m3.common.mail.MailInfo;
import com.m3.common.mail.MailServer;
import com.m3.patchbuild.dao.MailServerDAO;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.User;
import com.m3.patchbuild.info.UserRoleEnum;

/**
 * 发送邮件业务接口
 * @author pangl
 *
 */
public class MailService {
	private static final Logger logger = Logger.getLogger(MailServer.class);
	private static final String MailServerName = "PatchBuildSystem";
	
	private static MailServerDAO dao = new MailServerDAO();
	
	private static volatile MailServer mailServer = null;
	
	/**
	 * 根据构建包的状态发送相应的邮件
	 * @param bp
	 * @throws UnsupportedEncodingException 
	 * @throws MessagingException 
	 */
	public static void sendMail(BuildPack bp) throws Exception {
		MailServer mailServer = getMailServer();
		if (mailServer == null) {
			logger.info("没有配置邮件服务器信息，取消发送邮件");
			return;
		}
		
		String subject = null;
		String content = null;
		User reqUser = UserService.findUser(bp.getRequester());
		Set<User> toUsers = new HashSet<User>();
		Set<User> ccUsers = reqUser.getFollowers();
		Set<File> attachments = new HashSet<File>();
		
		switch (bp.getStatus()) {
			//请求构建：
			//如果有designer关注提交人，则发邮件给这些designer,否则发邮件所有designer
			//同时抄送给关注人
			case request:
			{
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRoleEnum.designer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(UserService.findUser(UserRoleEnum.designer));
			}
				subject = HtmlTemplateService.MAIL_SUBJ_REQUEST;
				content = HtmlTemplateService.MAIL_CONT_REQUEST;
				break;
			
			case checkFail://发送给，同时抄送关注人
				toUsers.add(reqUser);
				subject = HtmlTemplateService.MAIL_SUBJ_CHKF;
				content = HtmlTemplateService.MAIL_CONT_CHKF;
				attachments.add(bp.getBuildLog());
				break;
			case buildFail://发送给requester，并抄送给关注人
				toUsers.add(reqUser);
				subject = HtmlTemplateService.MAIL_SUBJ_BUILDF;
				content = HtmlTemplateService.MAIL_CONT_BUILDF;
				break;
			case builded://发送给testmanager,并抄送关注人
			{
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRoleEnum.testmanager)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(UserService.findUser(UserRoleEnum.testmanager));
			}
				subject = HtmlTemplateService.MAIL_SUBJ_BUILD;
				content = HtmlTemplateService.MAIL_CONT_BUILD;
				break;
			case pass://发送给deployer，并抄送关注人
			{
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRoleEnum.deployer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(UserService.findUser(UserRoleEnum.deployer));
				ccUsers.add(reqUser);
			}
				subject = HtmlTemplateService.MAIL_SUBJ_PASS;
				content = HtmlTemplateService.MAIL_CONT_PASS;
				break;
			case testFail://发送给开发，并抄送关注人
				toUsers.add(reqUser);
				subject = HtmlTemplateService.MAIL_SUBJ_TESTFAIL;
				content = HtmlTemplateService.MAIL_CONT_TESTFAIL;
				break;
			case testing://仅发送给开发
				toUsers.add(reqUser);
				subject = HtmlTemplateService.MAIL_SUBJ_TESTING;
				content = HtmlTemplateService.MAIL_CONT_TESTING;
				ccUsers.clear();
				break;
			case deployed:
				toUsers.add(reqUser);
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRoleEnum.deployer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(UserService.findUser(UserRoleEnum.deployer));
				subject = HtmlTemplateService.MAIL_SUBJ_DEPLOY;
				content = HtmlTemplateService.MAIL_CONT_DEPLOY;
				break;
			default:
					return;
		}
		sendMail(bp, subject, content, toUsers, ccUsers, attachments);
	
	}
	
	/**
	 * 发送邮件
	 * @param bp
	 * @param subject
	 * @param content
	 * @param toUsers
	 * @param from
	 * @throws Exception
	 */
	private static void sendMail(BuildPack bp, String subject, String content, Set<User> toUsers, Set<User> ccUsers, 
			Set<File> attachments) throws Exception{
		if ((toUsers == null || toUsers.isEmpty()) &&
				(ccUsers == null || ccUsers.isEmpty()))
			return;
		MailInfo mail = new MailInfo();
		mail.setSubject(HtmlTemplateService.getTemplate(subject, bp));
		mail.setContent(HtmlTemplateService.getTemplate(content, bp));
		if (toUsers != null) {
			for (User u : toUsers) {
				mail.addToAddress(u.getEmail(), u.getUsername());
			}
		}
		
		if (ccUsers != null) {
			for (User u : ccUsers) {
				mail.addCcAddress(u.getEmail(), u.getUsername());
			}
		}
		mail.getAttachments().addAll(attachments);
		mailServer.sendMail(mail);
	}
	
	/**
	 * 获取邮件服务器信息
	 * @return
	 */
	public static MailServer getMailServer() {
		if (mailServer == null) {
			synchronized (MailServer.class) {
				
				MailServer preServer = (MailServer) dao.findByNo(MailServerName);
				if (preServer != null) {
					mailServer = new MailServer();
					//mailServer.setDebug(true);
					mailServer.setHost(preServer.getHost());
					mailServer.setName(preServer.getName());
					try {
						mailServer.setPassword(EncodeUtil.decrypt(preServer.getPassword()));
					} catch (Exception e) {
						mailServer.setPassword(preServer.getPassword());
						logger.error("解密用户口令时出错", e);
					}
					mailServer.setSmtpPort(preServer.getSmtpPort());
					mailServer.setUser(preServer.getUser());
					mailServer.setUseSSL(preServer.isUseSSL());
				}
			}
		}
		return mailServer;
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
		mailServer = server;
	}

}
