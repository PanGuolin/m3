package com.m3.patchbuild.message;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BussFactory;
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
	//private static final Logger logger = Logger.getLogger(MailServer.class);

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
	public List<Message> fetchNew(String userId, int size) {
		return getDao().fetchNew(userId, size);
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

		Message msg = new Message();
		msg.setBussId(bp.getUuid());
		msg.setBussType(BussFactory.getBussType(Pack.class));
		msg.setSubject(HtmlTemplateService.getTemplate("sc_subject_" + bp.getStatus().name(), bp));
		msg.setContent(HtmlTemplateService.getTemplate("sc_content_" + bp.getStatus().name(), bp));
		msg.setSendTime(new Date());
		msg.setMessageType(0);
		msg.setAttachments(attachments);

		if (toUsers != null) {
			Set<String> userIds = new HashSet<String>();
			for (User u : toUsers) {
				userIds.add(u.getUserId());
			}
			msg.setRecievers(userIds);
		}

		if (ccUsers != null) {
			Set<String> userIds = new HashSet<String>();
			for (User u : ccUsers) {
				userIds.add(u.getUserId());
			}
			msg.setNotifiers(userIds);
		}
		getDao().saveInfo(msg);
		
		MailService.sendMessage(msg);
	}

}
