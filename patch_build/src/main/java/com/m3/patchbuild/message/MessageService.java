package com.m3.patchbuild.message;

import java.util.Date;
import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.IStateful;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;

/**
 * 消息服务
 * 
 * @author MickeyMic
 * 
 */
public class MessageService extends BaseService implements IMessageService{
	
	private MessageDAO dao;
	public MessageService() {
		this.dao = new MessageDAO();
	}

	protected MessageDAO getDao() {
		return dao;
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
	 * 读取未处理的消息(任务消息)
	 * @param userId
	 * @return
	 */
	public int countMessage(String userId, boolean toType) {
		return getDao().countUserMessage(userId, toType);
	}

	/**
	 * 列出指定消息的参与人
	 * @param i
	 * @return
	 */
	public List<MessageReciever> listOperators(String msgUid) {
		return getDao().listOperators(msgUid);
	}

	/**
	 * 忽略一条消息
	 * @param i
	 * @param userId
	 * @return
	 */
	public boolean ignore(String msgUid, String userId) {
		return getDao().ignore(msgUid, userId);
	}

//	/**
//	 * BUG新增
//	 * @param pack
//	 * @param bugNo
//	 */
//	public void bugAdded(Pack pack, String bugNo) {
//		Bug bug = pack.findBugByNo(bugNo);
//		if (bug == null)
//			return;
//		bugStateChange(pack, bug);
//	}
//	
	private void attachReciever(Message message, User user, boolean isTo) {
		MessageReciever rec = new MessageReciever();
		rec.setMessage(message);
		rec.setSendType(isTo ? MessageReciever.SEND_TYPE_TO : MessageReciever.SEND_TYPE_CC);
		rec.setStatus(IStateful.STATE_NORMAL);
		rec.setUserId(user.getUserId());
		rec.setUserName(user.getUsername());
		message.getRecievers().add(rec);
	}

//	/**
//	 * BUG状态变更
//	 * @param pack
//	 * @param bugNo
//	 */
//	public void bugFixed(Pack pack, String bugNo) {
//		Bug bug = pack.findBugByNo(bugNo);
//		if (bug == null)
//			return;
//		bugStateChange(pack, bug);
//	}
//	
//	public void bugStateChange(Pack pack, Bug bug) {
//		
//		IUserService userService = (IUserService) BussFactory.getService(User.class);
//		User requester = userService.findUser(pack.getRequester());
//		User tester = userService.findUser(bug.getTester());
//		Set<User> ccUsers = new HashSet<User>();
//		ccUsers.addAll(requester.getFollowers());
//		
//		Message msg = new Message();
//		msg.setBussType(BussFactory.getBussType(Bug.class));
//		msg.setBussId(bug.getUuid());
//		msg.setSender(bug.getTester());
//		msg.setSendTime(new Date());
//		msg.setStatus(IStateful.STATE_NORMAL);
//		msg.setMessageType(0);
//		
//		String subj = bug.isFixed() ? "subj_bug_fixed" : "subj_bug_added" ;
//		String content = bug.isFixed() ? "cont_bug_fixed" : "cont_bug_added";
//		Map<String, Object> context = new HashMap<String, Object>();
//		context.put("requester", requester);
//		context.put("pack", pack);
//		context.put("tester", tester);
//		context.put("bug", bug);
//		
//		msg.setSubject(HtmlTemplateService.getValue(subj, context));
//		msg.setContent(HtmlTemplateService.getValue(content, context));
//		
//		attachReciever(msg, requester, !bug.isFixed());
//		for (User user : ccUsers) {
//			attachReciever(msg, user, false);
//		}
//		getDao().expiredByBussInfo(bug);
//		saveInfo(msg);
//		UserMessageQueue.messageSended(msg);
//	}
//	
	public void expiredByBussInfo(IBussInfo info) {
		getDao().expiredByBussInfo(info);
	}

	public List<Message> list(MessageQuery q) {
		return (List<Message>) dao.list(q);
	}

	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return Message.class;
	}

	@Override
	public void sendMessage(MessageInfo info) {
		Message msg = new Message();
		msg.setSendTime(new Date());
		msg.setStatus(IStateful.STATE_NORMAL);
		msg.setMessageType(0);
		msg.setSubject(info.getSubject());
		msg.setContent(info.getContent());
		msg.setSender(info.getSender());
		IUserService userService = (IUserService) BussFactory.getService(User.class);
		if (info.getReceivers() != null) {
			for (String userId : info.getReceivers()) {
				attachReciever(msg, userService.findUser(userId), true);
			}
		}
		if (info.getNotifiers() != null) {
			for (String userId : info.getNotifiers()) {
				attachReciever(msg, userService.findUser(userId), false);
			}
		}
		if (info.getBussInfo() != null) {
			msg.setBussId(info.getBussInfo().getUuid());
			msg.setBussType(info.getBussInfo().getClass().getName());
		}
		if (info.getBussInfo() != null) {
			dao.expiredByBussInfo(info.getBussInfo());
		}
		saveInfo(msg);
		UserMessageQueue.messageSended(msg);
	}

	@Override
	public List<MessageReciever> listOperatorsByBuss(String bizType,
			String bizId) {
		return dao.listOperatorsByBuss(bizType, bizId);
	}

}
