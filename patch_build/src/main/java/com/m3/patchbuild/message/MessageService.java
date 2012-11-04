package com.m3.patchbuild.message;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.jboss.logging.Logger;

import com.m3.common.StringUtil;
import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.IStateful;
import com.m3.patchbuild.attached.Attachment;
import com.m3.patchbuild.attached.AttachmentService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserRole;
import com.m3.patchbuild.user.UserService;

/**
 * 消息服务
 * 
 * @author MickeyMic
 * 
 */
public class MessageService extends AbstractService {
	private static final Logger logger = Logger.getLogger(MessageService.class);

	public MessageService() {
		super(new MessageDAO());
	}

	protected MessageDAO getDao() {
		return (MessageDAO) super.getDao();
	}
	
	/**
	 * 获取用户前N条未处理的消息
	 * @param userId
	 * @param size
	 * @return
	 */
	public List<Message> fetchNew(String userId) {
		return getDao().fetchNew(userId);
	}

	/**
	 * 构建包状态改变
	 */
	public void statusChanged(Pack bp) {
		switch (bp.getStatus()) {
		case init:
		case request:
			return;
		}
		
		UserService userService = (UserService) BussFactory.getService(User.class);
		User reqUser = userService.findUser(bp.getRequester());
		Set<User> toUsers = new HashSet<User>();
		Set<User> ccUsers = reqUser.getFollowers();
		Set<String> attachments = new HashSet<String>();
		Set<User> superiors = reqUser.getSuperiors();

		switch (bp.getStatus()) {
		case buildFail:// 发送给requester
			toUsers.add(reqUser);
			attachments.add(bp.getBuildLog().getAbsolutePath());
			break;
		case builded:// 发送给testmanager,并抄送关注人
			for (User user : superiors) {
				if (user.hasRole(UserRole.testmanager)) {
					toUsers.add(user);
				}
			}
			if (toUsers.isEmpty())
				toUsers.addAll(userService.findUserByRole(UserRole.testmanager));
			ccUsers.add(reqUser);
			break;
		case checkFail:// 发送给请求人，同时抄送关注人
			toUsers.add(reqUser);
			break;
		
		case pass:// 发送给deployer，并抄送关注人
			for (User user : superiors) {
				if (user.hasRole(UserRole.deployer)) {
					toUsers.add(user);
				}
			}
			if (toUsers.isEmpty())
				toUsers.addAll(userService.findUserByRole(UserRole.deployer));
			ccUsers.add(reqUser);
			break;
		case testFail:// 发送给开发，并抄送关注人
			toUsers.add(reqUser);
			break;
		case testing:// 仅发送给开发
			toUsers.add(reqUser);
			ccUsers.clear();
			break;
		case published:
			toUsers.add(reqUser);
			break;
		default:
			return;
		}
		sendMessage(bp, toUsers, ccUsers, attachments);
	}
	
	/**
	 * 读取未处理的消息(任务消息)
	 * @param userId
	 * @return
	 */
	public int countMessage(String userId, boolean toType) {
		return getDao().countUserMessage(userId, toType);
	}
	
	/**
	 * 发送邮件
	 * 
	 * @param bp
	 * @param subject
	 * @param content
	 * @param toUsers
	 * @param from
	 * @throws Exception
	 */
	private void sendMessage(Pack bp, Set<User> toUsers,Set<User> ccUsers, Set<String> attachments) {
		if ((toUsers == null || toUsers.isEmpty())
				&& (ccUsers == null || ccUsers.isEmpty()))
			return;

		MessageDetail detail = new MessageDetail();
		detail.setAttachments(StringUtil.join(attachments, ";"));
		detail.setContent(HtmlTemplateService.getTemplate("sc_content_" + bp.getStatus().name(), bp));
		
		Message msg = new Message();
		msg.setAttached(attachments != null && !attachments.isEmpty());
		msg.setBussId(bp.getUuid());
		msg.setBussType(BussFactory.getBussType(Pack.class));
		msg.setDetail(detail);
		msg.setSender("System");
		msg.setSendTime(new Date());
		msg.setStatus(IStateful.STATE_NORMAL);
		msg.setSubject(HtmlTemplateService.getTemplate("sc_subject_" + bp.getStatus().name(), bp));
		msg.setMessageType(0);
		
		if (toUsers != null) {
			for (User u : toUsers) {
				MessageReciever rec = new MessageReciever();
				rec.setMessage(msg);
				rec.setSendType(MessageReciever.SEND_TYPE_TO);
				rec.setStatus(IStateful.STATE_NORMAL);
				rec.setUserId(u.getUserId());
				msg.getRecievers().add(rec);
			}
		}
		if (ccUsers != null) {
			for (User u : ccUsers) {
				MessageReciever rec = new MessageReciever();
				rec.setMessage(msg);
				rec.setSendType(MessageReciever.SEND_TYPE_CC);
				rec.setStatus(IStateful.STATE_NORMAL);
				rec.setUserId(u.getUserId());
				msg.getRecievers().add(rec);
			}
		}
		getDao().expiredByBussInfo(bp);
		getDao().saveInfo(msg);
		if (msg.isAttached()) {
			AttachmentService attService = (AttachmentService)BussFactory.getService(Attachment.class);
			try {
				for (String att : attachments) {
					attService.createAttachment(new File(att), msg, true);
				}
			} catch (IOException ex) {
				logger.error("保存附件时出错", ex);
			}
		}
		UserMessageQueue.messageSended(msg);
	}
	

}
