package com.m3.patchbuild.msgflow;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.Namespace;
import org.jdom.input.SAXBuilder;

import com.m3.common.BeanUtil;
import com.m3.common.ContextUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.aop.handler.Participant;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.message.IMessageService;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageInfo;
import com.m3.patchbuild.user.IUserService;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserUtil;

/**
 * 消息工具类
 * @author pangl
 *
 */
public abstract class InvocationUtil {
	public static final String ADVICE_TYPE_BEFORE = "before";
	public static final String ADVICE_TYPE_AFTER = "after";
	public static final String ADVICE_TYPE_RETURNING = "returning";
	public static final String ADVICE_TYPE_EXCEPTION = "exception";
	
	private static Logger logger = Logger.getLogger(InvocationUtil.class);
	
	public static final String CONFIG_FILE = "/messages.m3.xml";
	private static File configFile = null;
	private static long lastmodified = -1L;
	
	private static final List<MessageConfig> msgConfigs = new ArrayList<MessageConfig>();
	
	static {
		init();
	}
	
	/**
	 * 初始化配置信息，如果配置文件有修改需要外部调用本方法进行重新初始化
	 */
	@SuppressWarnings("unchecked")
	public static void init() {
		if (configFile != null && configFile.lastModified() == lastmodified)
			return;
		synchronized (InvocationUtil.class) {
			if (configFile != null && configFile.lastModified() == lastmodified)
				return;
			try {
				URL url = BussFactory.class.getResource(CONFIG_FILE);
				configFile = new File(url.getFile());
				SAXBuilder builder = new SAXBuilder(false);
				Document doc = builder.build(configFile);
				Element root = doc.getRootElement();
				Namespace ns = root.getNamespace();
				
				msgConfigs.clear();
				
				List<Element> msgElList = root.getChildren("message", ns);
				if (msgElList != null) {
					for (Element msgEl : msgElList) {
						try {
							MessageConfig config = new MessageConfig(msgEl, ns);
							msgConfigs.add(config);
						} catch (Exception ex) {
							logger.error("读取消息配置时出错", ex);
						}
					}
				}
				lastmodified = configFile.lastModified();
			} catch (Exception ex) {
				logger.error("初始化业务工厂时出错", ex);
			}
		}
	}
	
	public static void before(IService service, Method method, Object[] args) {
	}
	
	private static Collection<String> getUserIds(Collection<Participant> ps, Map<String, Object> context) {
		IUserService userService = (IUserService)BussFactory.getService(User.class);
		Set<String> users = new HashSet<String>();
		for (Participant p : ps) {
			if (Participant.TYPE_ROLE.equalsIgnoreCase(p.getType())) {
				List<User> us = userService.findUserByRole(null, p.getExpr());
				users.addAll(UserUtil.getUserId(us));
			} else if (Participant.TYPE_RELATION.equalsIgnoreCase(p.getType())) {
				if ("requester".equalsIgnoreCase(p.getExpr())) {
					if (ContextUtil.getUserId() != null)
						users.add(ContextUtil.getUserId());
				}
			} else if (Participant.TYPE_SCRIPT.equalsIgnoreCase(p.getType())) {
				String value = BeanUtil.parseString(p.getExpr(), context);
				if (value != null)
					users.add(value);
			}
		}
		return users;
	}
	
	public static Map<String, Object> getContext(Object[] args, Object obj) {
		Map<String, Object> context = new HashMap<String, Object>();
		if (args != null) {
			for (int i=0; i<args.length; i++) {
				context.put("_P" + i, args[i]);
			}
		}
		context.put("_Result", obj);
		return context;
	}
	
	private static MessageConfig findMsgConfig(IService service, Method method, Map<String, Object> context, AdviceType adviceType) {
		init();
		for (MessageConfig config : msgConfigs) {
			if (AdviceConfigUtil.accept(config, service, method, adviceType, context)) {
				return config;
			}
		}
		return null;
	}
	
	public static void after(IService service, Method method, Object[] args, Object obj) {
		handleMessage(service, method, args, obj, AdviceType.afterX);
	}
	
	public static void exception(IService service, Method method, Object[] args, Throwable t) {
		//andleMessage(service, method, args, obj, AdviceType.afterR);
		
	}
	
	public static void returnning(IService service, Method method, Object[] args, Object obj) {
		handleMessage(service, method, args, obj, AdviceType.afterR);
	}
	
	private static void handleMessage(IService service, Method method, Object[] args, Object obj, AdviceType type) {
		Map<String, Object> context = AdviceConfigUtil.getContext(args, obj);
		MessageConfig config = findMsgConfig(service, method, context, type);
		if (config == null)
			return;
		
		MessageInfo msgInfo = new MessageInfo();
		msgInfo.setSubject(BeanUtil.parseString(config.getSubject(), context));
		msgInfo.setContent(BeanUtil.parseString(config.getContent(), context));
		msgInfo.addReceivers(getUserIds(config.getRecievers(), context));
		msgInfo.addNotifiers(getUserIds(config.getNotifiers(), context));
		
		if (config.getInfoIndex() > -1 
				&& config.getInfoIndex() < args.length
				&& (args[config.getInfoIndex()] instanceof IBussInfo)) {
			msgInfo.setInfo((IBussInfo) args[config.getInfoIndex()]);
		}
			
		IMessageService msgService = (IMessageService)BussFactory.getService(Message.class);
		msgService.sendMessage(msgInfo);
	}
}
