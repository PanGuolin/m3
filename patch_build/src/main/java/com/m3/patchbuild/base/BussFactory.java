package com.m3.patchbuild.base;

import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.aop.IProxyService;

/**
 * 业务工厂类，用于获取业务信息
 * @author pangl
 *
 */
public class BussFactory {
	private static Logger logger = Logger.getLogger(BussFactory.class);
	private static Map<String, IService> serviceRegister = new Hashtable<String, IService>(); //服务对象原型
	
	/**
	 * 获取对应的接口
	 * @param bizType
	 * @return
	 */
	public static IService getService(String bizClass) {
		String name = bizClass + "Service";
		IService service = (IService)serviceRegister.get(name);
		if (service == null) {
			synchronized (serviceRegister) {
				service = (IService)serviceRegister.get(name);
				if (service == null) {
					try {
						IService s = (IService) Class.forName(name).newInstance();
						IProxyService proxyService = new IProxyService(s);
						List<Class<?>> interfaces = new ArrayList<Class<?>>();
						getInterfaces(s.getClass(), interfaces);
						s = (IService) Proxy.newProxyInstance(
								s.getClass().getClassLoader(), 
								(Class<?>[])interfaces.toArray(new Class<?>[interfaces.size()]),
								proxyService);
						serviceRegister.put(name, s);
						service = s;
					} catch (Exception e) {
						logger.error("实例化IService时出错", e);
					}
				}
			}
		}
		return service.isSingleton() ? service : (IService) service.clone();
	}
	
	private static void getInterfaces(Class<?> clz, List<Class<?>> interfalces) {
		if (clz.equals(Object.class))
			return;
		
		Class<?>[] inters = clz.getInterfaces();
		for (Class<?> inter : inters) {
			if (!interfalces.contains(inter)) {
				interfalces.add(inter);
			}
		}
		Class<?> superClz = clz.getSuperclass();
		getInterfaces(superClz, interfalces);
	}
	
	public static IService getService(Class<? extends IBussInfo> bizClass) {
		return getService(bizClass.getName());
	}
	
	/**
	 * 返回业务对象类对应的业务类型名称
	 * @param bizClass
	 * @return 如果没有找到则返回null
	 */
	public static String getBussType(Class<? extends IBussInfo> bizClass) {
		return bizClass.getName();
	}
	
	@SuppressWarnings("unchecked")
	public static Class<? extends IBussInfo> getBizClass(String bizClass) {
		try {
			return (Class<? extends IBussInfo>) Class.forName(bizClass);
		} catch (ClassNotFoundException e) {
			logger.error("查找业务类时出错", e);
		}
		return null;
	}
	
	public static Class<? extends IBussInfo> getBizClass(Class<? extends IBussInfo> bizClass) {
		return bizClass;
	}
	
}
