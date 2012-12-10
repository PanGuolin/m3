package com.m3.patchbuild.message;

import java.io.File;
import java.net.URL;
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
import com.m3.common.StringUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BussFactory;

/**
 * 消息处理配置
 * @author pangl
 *
 */
public class MessageHandler {
	
	private static final String DEFAULT_ACTION = "/msg/handleTask";
	
	private static final Logger logger = Logger.getLogger(MessageHandler.class);
	
	public static final String CONFIG_FILE = "/m3.message_handle.xml";
	
	public static final String PAGE_MODE_NW = "mode_nw"; //page mode: new window
	
	public static final String PAGE_MODE_IW = "mode_iw"; //page mode: inner window
	private static Set<HandlerConfig> configs = new HashSet<HandlerConfig>();
	private static File configFile;
	private static long lastModified = -1L;
	
	static {
		init();
	}
	
	/**
	 * 获取处理某个业务对象消息的页面模式
	 * @param info
	 * @return
	 */
	public static String getViewMode(IBussInfo info) {
		HandlerConfig config = getConfig(info);
		return (config == null || config.viewmode == null) ? PAGE_MODE_IW : config.viewmode;
	}
	
	public static String getInputView(IBussInfo info) {
		HandlerConfig config = getConfig(info);
		if (config == null)
			return null;
		return config.input;
	}
	
	private static HandlerConfig getConfig(IBussInfo info) {
		init();
		String infoname = info.getClass().getName();
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("_info", info);
		for (HandlerConfig config : configs) {
			if (!config.info.equals(infoname)) {
				continue;
			}
			if (!StringUtil.isEmpty(config.condition)) {
				try {
					boolean accept = (Boolean)BeanUtil.executeScript(config.condition, context);
					if (accept)
						return config;
				} catch (Exception e) {
					logger.error("执行脚本时出错:" + config.condition, e);
				}
			} else {
				return config;
			}
		}
		return null;
	}
	
	/**
	 * 获取处理某个业务对象消息的Action 地址
	 * @param info
	 * @return
	 */
	public static String getAction(IBussInfo info) {
		HandlerConfig config = getConfig(info);
		String action = DEFAULT_ACTION;
		if (config != null && config.action != null) {
			action = config.action;
		}
		action += "?i=" + info.getUuid() 
				+ "&t=" + info.getClass().getName();
		return action;
	}
	
	@SuppressWarnings("unchecked")
	
	private static void init() {
		if (configFile != null && configFile.lastModified() == lastModified)
			return;
		synchronized (MessageHandler.class) {
			if (configFile != null && configFile.lastModified() == lastModified)
				return;
			try {
				URL url = BussFactory.class.getResource(CONFIG_FILE);
				configFile = new File(url.getFile());
				SAXBuilder builder = new SAXBuilder(false);
				Document doc = builder.build(configFile);
				Element root = doc.getRootElement();
				Namespace ns = root.getNamespace();
				
				configs.clear();
				
				List<Element> msgElList = root.getChildren("handler", ns);
				if (msgElList != null) {
					for (Element msgEl : msgElList) {
						try {
							HandlerConfig config = new HandlerConfig(msgEl);
							configs.add(config);
						} catch (Exception ex) {
							logger.error("读取消息配置时出错", ex);
						}
					}
				}
				lastModified = configFile.lastModified();
			} catch (Exception ex) {
				logger.error("初始化出错", ex);
			}
		}
	}
	
	private static class HandlerConfig {
		String info;
		String action;
		String viewmode;
		String condition;
		String input;
		//String[] conditions;
		//String[] condModes;
		
		HandlerConfig(Element el) {
			Namespace ns = el.getNamespace();
			this.info = el.getChildTextTrim("info", ns);
			this.action = el.getChildTextTrim("action", ns);
			this.viewmode = el.getChildTextTrim("viewmode", ns);
			this.condition = el.getChildTextTrim("condition", ns);
			this.input = el.getChildTextTrim("input", ns);
		}
	}
}
