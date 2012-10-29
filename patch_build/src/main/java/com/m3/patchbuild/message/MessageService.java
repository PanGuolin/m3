package com.m3.patchbuild.message;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.mail.MessagingException;

import org.apache.log4j.Logger;

import com.m3.common.mail.MailInfo;
import com.m3.common.mail.MailServer;
import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.template.HtmlTemplateService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
import com.m3.patchbuild.user.UserService;

/**
 * 消息服务
 * @author MickeyMic
 *
 */
public class MessageService extends AbstractService{
	private static final Logger logger = Logger.getLogger(MailServer.class);

	public MessageService() {
		super(new MessageDAO());
	}
	
	protected MessageDAO getDao() {
		return (MessageDAO)super.getDao();
	}

	/**
	 * 构建包状态改变
	 */
	public void statusChanged(Pack bp) {
		
		String subject = null;
		String content = null;
		UserService userService = (UserService)BussFactory.getService(User.class);
		User reqUser = userService.findUser(bp.getRequester());
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
					if (user.hasRole(UserRole.designer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(userService.findUserByRole(UserRole.designer));
			}
				break;
			
			case checkFail://发送给，同时抄送关注人
				toUsers.add(reqUser);
				attachments.add(bp.getBuildLog());
				break;
			case buildFail://发送给requester，并抄送给关注人
				toUsers.add(reqUser);;
				break;
			case builded://发送给testmanager,并抄送关注人
			{
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRole.testmanager)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(userService.findUserByRole(UserRole.testmanager));
			};
				break;
			case pass://发送给deployer，并抄送关注人
			{
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRole.deployer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(userService.findUserByRole(UserRole.deployer));
				ccUsers.add(reqUser);
			}
				break;
			case testFail://发送给开发，并抄送关注人
				toUsers.add(reqUser);
				break;
			case testing://仅发送给开发
				toUsers.add(reqUser);
				ccUsers.clear();
				break;
			case published:
				toUsers.add(reqUser);
				Set<User> superiors = reqUser.getSuperiors();
				for (User user : superiors) {
					if (user.hasRole(UserRole.deployer)) {
						toUsers.add(user);
					}
				}
				if (toUsers.isEmpty())
					toUsers.addAll(userService.findUserByRole(UserRole.deployer));
				break;
			default:
					return;
		}
		try {
			sendMessage(bp, toUsers, ccUsers, attachments);
		} catch (Exception e) {
			logger.error("发送邮件时出错", e);
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
		private static void sendMessage(Pack bp, Set<User> toUsers, Set<User> ccUsers, Set<File> attachments) throws Exception{
			if ((toUsers == null || toUsers.isEmpty()) &&
					(ccUsers == null || ccUsers.isEmpty()))
				return;
			
			String bussType = BussFactory.getBussType(Pack.class);
			String groupId = UUID.randomUUID().toString();
			
			String subject = HtmlTemplateService.getTemplate("sc_subject_" + bp.getStatus().name(), bp);
			String content = HtmlTemplateService.getTemplate("sc_subject_" + bp.getStatus().name(), bp);
			
			
			MailInfo mail = new MailInfo();
			mail.setSubject(HtmlTemplateService.getTemplate("sc_subject_" + bp.getStatus().name(), bp));
			mail.setContent(HtmlTemplateService.getTemplate("sc_content" +  bp.getStatus().name() , bp));
			if (toUsers != null) {
				for (User u : toUsers) {
					mail.addToAddress(u.getEmail(), u.getUsername());
					Message msg = new Message();
					msg.setOwner(u.getUserId());
					msg.setBussType(bussType);
					msg.setGroup(groupId);
					msg.setBussId(bp.getUuid());
					msg.setContent(content);
					msg.setSubject(subject);
					msg.set
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
	
}
