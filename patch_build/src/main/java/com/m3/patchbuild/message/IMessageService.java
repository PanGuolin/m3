package com.m3.patchbuild.message;

import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.IService;

/**
 * 消息处理接口
 * @author pangl
 *
 */
public interface IMessageService extends IService{
	
	/**
	 * 获取用户前N条未处理的消息
	 * @param userId
	 * @param size
	 * @return
	 */
	public List<Message> fetchNew(String userId);
	
	/**
	 * 读取未处理的消息(任务消息)
	 * @param userId
	 * @return
	 */
	public int countMessage(String userId, boolean toType);
	

	/**
	 * 列出指定消息的参与人
	 * @param i
	 * @return
	 */
	public List<MessageReciever> listOperators(String msgUid);
	
	public List<MessageReciever> listOperatorsByBuss(String bizType, String bizId);

	/**
	 * 忽略一条消息
	 * @param i
	 * @param userId
	 * @return
	 */
	public boolean ignore(String msgUid, String userId);
	
	public void expiredByBussInfo(IBussInfo info);

	/**
	 * 发送通知消息
	 * @param userId
	 * @param string
	 */
	public void sendMessage(MessageInfo message);
	
	public List<Message> list(MessageQuery q);
}
