package com.m3.common;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

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
			Method method = cls.getMethod("is" + methodName, (Class<?>[])null);
			return method.invoke(value, (Object[])null);
				
		}
	}

}
