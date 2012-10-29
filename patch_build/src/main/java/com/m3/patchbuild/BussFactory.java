package com.m3.patchbuild;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.Namespace;
import org.jdom.input.SAXBuilder;

/**
 * 业务工厂类，用于获取业务信息
 * @author pangl
 *
 */
@SuppressWarnings("unchecked")
public class BussFactory {
	public static final String CONFIG_FILE = "/bussiness.m3.xml";
	
	private static Logger logger = Logger.getLogger(BussFactory.class);
	private static Map<String, BussConfig> configs = new HashMap<String, BussConfig>(); //不需要考虑多线程调用的冲突
	private static Map<String, IService> serviceRegister = new Hashtable<String, IService>(); //服务对象原型
	
	static {
		try {
			init();
		} catch (Exception ex) {
			logger.error("初始化业务工厂时出错", ex);
		}
	}
	
	/**
	 * 获取对应的接口
	 * @param bizType
	 * @return
	 */
	public static IService getService(String bizType) {
		BussConfig config = configs.get(bizType);
		if (config == null) {
			logger.info("没有配置业务" + bizType + "的服务接口实现");
			return null;
		}
		IService service = serviceRegister.get(bizType);
		if (service == null) {
			synchronized (serviceRegister) {
				service = serviceRegister.get(bizType);
				if (service == null) {
					try {
						service = (IService) Class.forName(config.serviceClass).newInstance();
					} catch (Exception e) {
						logger.error("实例化业务接口时出错:" + bizType, e);
						return null;
					}
					serviceRegister.put(bizType, service);
				}
			}
		}
		return config.serviceSingletone ? service : service.clone();
	}
	
	/**
	 * 返回业务对象类对应的业务类型名称
	 * @param bizClass
	 * @return 如果没有找到则返回null
	 */
	public static String getBussType(Class<? extends IBussInfo> bizClass) {
		String clsName = bizClass.getName();
		for (String key : configs.keySet()) {
			BussConfig config = configs.get(key);
			if (clsName.equals(config.infoClass)) {
				return key;
			}
		}
		return null;
	}
	
	/**
	 * 根据业务类返回业务服务接口
	 * @param bizClass
	 * @return
	 */
	public static IService getService(Class<? extends IBussInfo> bizClass) {
		return getService(getBussType(bizClass));
	}
	
	/**
	 * 初始化配置信息，如果配置文件有修改需要外部调用本方法进行重新初始化
	 */
	public synchronized static void init() throws Exception{
		URL url = BussFactory.class.getResource(CONFIG_FILE);
		File configFile = new File(url.getFile());
		SAXBuilder builder = new SAXBuilder(false);
		Document doc = builder.build(configFile);
		Element root = doc.getRootElement();
		Namespace ns = root.getNamespace();
		
		configs.clear();
		serviceRegister.clear();
		
		List<Element> bussElList = root.getChildren("buss");
		if (bussElList != null) {
			for (Element bussEl : bussElList) {
				BussConfig config = new BussConfig(bussEl, ns);
				if (configs.containsKey(config.type)) {
					throw new Exception("业务类型不唯一:" + config.type);
				}
				configs.put(config.type, config);
			}
		}
	}
	
	/**
	 * 业务配置信息
	 * @author pangl
	 *
	 */
	private static class BussConfig {
		String type; //业务类型
		String infoClass; //业务对象类
		String serviceClass; //业务服务类
		boolean serviceSingletone; //业务服务类是否单例
		
		public BussConfig(Element bussEl, Namespace ns) {
			type = bussEl.getChildText("type", ns);
			infoClass = bussEl.getChildText("info", ns);
			serviceClass = bussEl.getChildText("service", ns);
			serviceSingletone = "true".equalsIgnoreCase(bussEl.getChildText("singleton", ns));
		}
	}
	
}
