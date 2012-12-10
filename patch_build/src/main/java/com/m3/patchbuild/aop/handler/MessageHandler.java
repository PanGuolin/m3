package com.m3.patchbuild.aop.handler;

import java.util.Map;

import org.apache.log4j.Logger;
import org.jdom.Element;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.aop.ExecuteException;
import com.m3.patchbuild.aop.IAOPHandler;
import com.m3.patchbuild.aop.IExecuteArguments;
import com.m3.patchbuild.aop.IExecuteContext;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageInfo;

/**
 * AOP切面之消息处理
 * @author pangl
 *
 */
public class MessageHandler implements IAOPHandler { 
	private static Logger logger = Logger.getLogger(MessageHandler.class);

	@Override
	public IExecuteArguments readArguments(Element argEl) {
		return new MessageExecuteArguments(argEl);
	}

	@Override
	public void execute(IExecuteArguments arguments, IExecuteContext context)
			throws ExecuteException {
		Map<String, Object> scriptContext = context.getScriptContext();
		MessageExecuteArguments args = (MessageExecuteArguments) arguments;
		MessageInfo msgInfo = new MessageInfo();
		msgInfo.setSubject(BeanUtil.parseString(args.getSubject(), scriptContext));
		msgInfo.setContent(BeanUtil.parseString(args.getContent(), scriptContext));
		msgInfo.addReceivers(ParticipantUtil.getUserIds(args.getRecievers(), scriptContext));
		msgInfo.addNotifiers(ParticipantUtil.getUserIds(args.getNotifiers(), scriptContext));
		if (msgInfo.getNotifiers().isEmpty() && msgInfo.getReceivers().isEmpty()) {
			logger.error("消息没有参与人" + args.getSubject());
		}
		IBussInfo bussInfo = context.getBussInfo();
		if (bussInfo != null) {
			msgInfo.setInfo(bussInfo);
		}
			
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		msgService.sendMessage(msgInfo);
	}
}
