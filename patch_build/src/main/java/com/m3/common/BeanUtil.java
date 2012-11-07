package com.m3.common;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

/**
 * 对象取值工具类
 * @author pangl
 *
 */
public abstract class BeanUtil {
	private static Logger logger = Logger.getLogger(BeanUtil.class);
	
	/**
	 * 获取指定对象的属性
	 * @param value
	 * @param propertyExp 属性的属性用.号表示，如 property.subproperty 表示获取当前对象的property属性的subproperty子属性
	 * @return
	 * @throws SecurityException 
	 * @throws NoSuchFieldException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 */
	public static Object getProperty(Object value, String propertyExp) throws Exception {
		
		if(value == null && StringUtil.isEmpty(propertyExp))
			return value;
		String[] props = propertyExp.split("\\.");
		for (String prop : props) {
			value = getValue(value, prop);
			if (value == null)
				return null;
		}
		return value;
	}
	
	/**
	 * 获取对象上的属性值
	 * @param value
	 * @param property
	 * @return
	 * @throws Exception
	 */
	public static Object getValue(Object value, String property) throws Exception {
		if (value == null)
			return null;
		if (StringUtil.isEmpty(property))
			return null;
		Class<? extends Object> cls = value.getClass();
		
		String methodName = Character.toUpperCase(property.charAt(0)) + property.substring(1);
		try {
			Method method = cls.getMethod("get" + methodName, (Class<?>[])null);
			return method.invoke(value, (Object[])null);
		} catch (Exception ex) {
			logger.error("找不到get方法", ex);
			Method method = cls.getMethod("is" + methodName, (Class<?>[])null);
			return method.invoke(value, (Object[])null);
				
		}
	}
	
	/**
	 * 将对象映射到json集合当中
	 * @param value
	 * @param jsonMap
	 * @param properties
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public static void toJSON(Collection value, String[] properties, Map<String, Object> jsonMap, String rowkey) throws Exception {
		if (value == null || properties == null || properties.length == 0)
			return;
		if (value instanceof Collection<?>) {
			List<Object> list = new ArrayList<Object>();
			Collection cols = (Collection<?>) value;
			for (Object obj : cols) {
				Map<String, Object> jMap = new HashMap<String, Object>();
				toSimpleJSON(obj, jMap, properties);
				list.add(jMap);
			}
			jsonMap.put(rowkey, list);
		} else {
			toSimpleJSON(value, jsonMap, properties);
		}
		
	}
	
	public static void toSimpleJSON(Object value, Map<String, Object> jsonMap, String[] properties) throws Exception {
		for (String property : properties) {
			String[] objs = property.split("\\.");
			Map<String, Object> curMap = jsonMap;
			for (int i=0; i<objs.length-2; i++) {
				Map<String, Object> objMap = (Map<String, Object>) curMap.get(objs[i]);
				if (objMap == null) {
					objMap = new HashMap<String, Object>();
					curMap.put(objs[i], objMap);
				}
				curMap = objMap;
			}
			curMap.put(objs[objs.length-1], getValue(value, property));
		}
	}

}
