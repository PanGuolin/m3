package com.m3.common;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.log4j.Logger;

/**
 * 对象取值工具类
 * @author pangl
 *
 */
public abstract class BeanUtil {
	private static Logger logger = Logger.getLogger(BeanUtil.class);
	
	public static final String EXP_PREFIX = "${";
	public static final String EXP_SUFFIX = "}";
	
	/**
	 * 根据上下文解析一段字符串
	 * @param script
	 * @param context
	 * @return
	 */
	public static String parseString(String script, Map<String, Object> context) {
		if (context == null || context.isEmpty() || StringUtil.isEmpty(script))
			return script;
		int len = EXP_PREFIX.length();
		StringBuilder sb = new StringBuilder(script);
		int start = sb.indexOf(EXP_PREFIX);
		while(start != -1) {
			int end = sb.indexOf(EXP_SUFFIX, start + len);
			if (end == -1) {
				break;
			}
			String exp = sb.substring(start+len, end);
			String objKey = exp;
			if (objKey.indexOf('.') != -1) {
				objKey = objKey.substring(0, objKey.indexOf('.'));
				exp = exp.substring(exp.indexOf('.') +1);
			}
			Object expObj = context.get(objKey);
			if (expObj == null) {
				start = sb.indexOf(EXP_PREFIX, end+EXP_SUFFIX.length());
				continue;
			}
			
			Object value = null;
			try {
				value = BeanUtil.getProperty(expObj, exp);
			} catch (Exception e) {//忽略错误
				logger.error("解析表达式时出错", e);
			}
			if (value == null)
				value = "null";
			
			if (value.getClass().isEnum()) {
				sb.replace(start, end+1, ((Enum<?>)value).name());
			} else {
				sb.replace(start, end+1, value.toString());
			}
			start = sb.indexOf(EXP_PREFIX, start + value.toString().length());
		}
		return sb.toString();
	}
	
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
	public static Object getValue(Object value, String prop) throws Exception {
		if (value == null)
			return null;
		if (StringUtil.isEmpty(prop))
			return null;
		String castMethod = null;
		String property = prop;
		int index = prop.indexOf('#');
		if (index > -1) {
			property = prop.substring(0, index);
			castMethod = prop.substring(index + 1);
		}
		
		Class<? extends Object> cls = value.getClass();
		
		String methodName = Character.toUpperCase(property.charAt(0)) + property.substring(1);
		Object result = null;
		try {
			Method method = cls.getMethod("get" + methodName, (Class<?>[])null);
			result = method.invoke(value, (Object[])null);
		} catch (Exception ex) {
			try {
				Method method = cls.getMethod("is" + methodName, (Class<?>[])null);
				result = method.invoke(value, (Object[])null);
			} catch (Exception ee) {
				try {
					Method method = cls.getMethod(property, (Class<?>[])null);
					result = method.invoke(value, (Object[])null);
				} catch (Exception eee) {
					logger.info("找不到属性相应的方法：" + property,eee);
					throw eee;
				}
			}
		}
		if (castMethod == null || result == null)
			return result;
		Method method = result.getClass().getMethod(castMethod, (Class<?>[])null);
		return method.invoke(result, (Object[])null);
	}
	
	/**
	 * 将对象映射到json集合当中
	 * @param value
	 * @param jsonMap
	 * @param properties
	 * @throws Exception 
	 */
	public static void toJSON(Collection<?> cols, String[] properties, Map<String, Object> jsonMap, String rowkey) throws Exception {
		if (cols == null || cols.isEmpty() || properties == null || properties.length == 0)
			return;
		List<Object> list = new ArrayList<Object>();
		for (Object obj : cols) {
			Map<String, Object> jMap = new HashMap<String, Object>();
			if (obj instanceof Collection<?>) {
				toJSON((Collection<?>)obj, properties, jsonMap, rowkey);
			} else {
				toSimpleJSON(obj, jMap, properties);
			}
			
			list.add(jMap);
		}
		jsonMap.put(rowkey, list);
		
	}
	
	@SuppressWarnings("unchecked")
	public static void toSimpleJSON(Object value, Map<String, Object> jsonMap, String[] properties) throws Exception {
		for (String property : properties) {
			String[] objs = property.split("\\.");
			Map<String, Object> curMap = jsonMap;
			for (int i=0; i<objs.length-1; i++) {
				Map<String, Object> objMap = (Map<String, Object>) curMap.get(objs[i]);
				if (objMap == null) {
					objMap = new HashMap<String, Object>();
					curMap.put(objs[i], objMap);
				}
				curMap = objMap;
			}
			String prop = objs[objs.length -1];
			if (prop.indexOf('#') != -1) {
				prop = prop.substring(0, prop.indexOf('#'));
			}
			curMap.put(prop, getProperty(value, property));
		}
	}

	public static Object executeScript(String script, Map<String, Object> context) throws Exception {
		script = BeanUtil.parseString(script, context);
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName ("js");
		return engine.eval(script);
	}
	
	public static Map<String, Object> createContext(Object[] invokeArgs, Object returnValue) {
		Map<String, Object> context = new HashMap<String, Object>();
		if (invokeArgs != null) {
			for (int i=0; i<invokeArgs.length; i++) {
				context.put("_P" + i, invokeArgs[i]);
			}
		}
		context.put("_Result", returnValue);
		return context;
	}
}
