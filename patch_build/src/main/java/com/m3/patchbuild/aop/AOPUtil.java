package com.m3.patchbuild.aop;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.Namespace;
import org.jdom.input.SAXBuilder;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.aop.impl.FunctionConfig;
import com.m3.patchbuild.aop.impl.HandlerConfig;
import com.m3.patchbuild.aop.impl.ServiceConfig;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.msgflow.AdviceType;
import com.m3.patchbuild.msgflow.InvocationUtil;

/**
 * AOP切面工具类
 * @author pangl
 *
 */
public abstract class AOPUtil {
	private static final Logger logger = Logger.getLogger(AOPUtil.class);
	public static final String CONFIG_FILE = "/m3.aop.xml";
	private static File configFile = null;
	private static long lastmodified = -1L;
	
	private static Map<String, IAOPHandler> handlerInstances = new HashMap<String, IAOPHandler>();
	private static Map<String, ServiceConfig> serviceConfigs = new HashMap<String, ServiceConfig>();
	
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
				
				serviceConfigs.clear();
				List<Element> servElList = root.getChildren("service", ns);
				if (servElList != null) {
					for (Element servEl : servElList) {
						try {
							ServiceConfig nConfig = new ServiceConfig(servEl);
							ServiceConfig serviceConfig = serviceConfigs.get(nConfig.getServiceClass());
							if (serviceConfig != null) {
								serviceConfig.join(nConfig);
							} else {
								serviceConfig = nConfig;
							}
							serviceConfigs.put(serviceConfig.getServiceClass(), serviceConfig);
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
	
	public static IAOPHandler getHandler(String handlerCls) {
		IAOPHandler aopHandler = handlerInstances.get(handlerCls);
		if (aopHandler == null) {
			synchronized (handlerInstances) {
				 aopHandler = handlerInstances.get(handlerCls);
				 if (aopHandler == null) {
					 try {
						 aopHandler = (IAOPHandler) Class.forName(handlerCls).newInstance();
					 } catch (Exception e) {
						 logger.error("初始化Handler时出错", e);
					 } 
					 handlerInstances.put(handlerCls, aopHandler);
				 }
			}
		}
		return aopHandler;
	}

	public static void after(IService service, Method method, Object[] args, Object obj) {
		
		invoke(service, method, args, obj, AdviceType.afterX);
	}
	
	public static void exception(IService service, Method method, Object[] args, Throwable t) {
		invoke(service, method, args, null, AdviceType.afterE);
		
	}
	
	public static void returnning(IService service, Method method, Object[] args, Object obj) {
		invoke(service, method, args, obj, AdviceType.afterR);
	}
	
	public static void before(IService service, Method method, Object[] args) {
		invoke(service, method, args, null, AdviceType.beforeX);
	}
	
	/**
	 * 查找符合条件的AOP服务配置
	 * @param service
	 * @param method
	 * @param context
	 * @param adviceType
	 * @return
	 */
	static void invoke(IService service, Method method, Object[] invokeArgs, Object returnValue, AdviceType adviceType) {
		init();
		ServiceConfig config = serviceConfigs.get(service.getClass().getName());
		if (config == null)
			return;
		String methodName = method.getName();
		Class<?>[] types = method.getParameterTypes();
		FunctionConfig functionConfig = null;
		for (FunctionConfig fConfig : config.getFunctions()) {
			if (!methodName.equals(fConfig.getMethodName()))
				continue;
			Class<?>[] fTypes = fConfig.getParamTypes();
			if (types == null) {
				if(fTypes != null)
					continue;
			} else {
				if (fTypes.length != types.length)
					continue;
				for (int i=0; i<types.length; i++) {
					if (!fTypes[i].isAssignableFrom(types[i]))
						continue;
				}
			}
			//如果有多个，则使用第一个找到的
			functionConfig = fConfig;
			break;
		}
		if (functionConfig == null)
			return;
		
		Map<String, Object> scriptContext = BeanUtil.createContext(invokeArgs, returnValue);
		ExecuteContext context = new ExecuteContext(scriptContext, functionConfig.getInfoIndex());
		
		for (HandlerConfig hConfig : functionConfig.getHandlers()) {
			if (!adviceType.equals(hConfig.getType()))
				continue;
			if (hConfig.getCondition() != null) {
				try {
					boolean flag = ((Boolean)BeanUtil.executeScript(
							hConfig.getCondition(), scriptContext)).booleanValue();
					if (!flag)
						continue;
				} catch (Exception e) {
					logger.error("执行脚本时出错", e);
					continue;
				}
			}
			getHandler(hConfig.getHandlerClz()).execute(hConfig.getArgs(), context);
		}
	}
}
