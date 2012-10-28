package com.m3.common;

import java.util.HashMap;
import java.util.Map;

/**
 * 线程上下文环境
 * @author MickeyMic
 *
 */
public abstract class ContextUtil {
	
	public static final String KEY_USREID = "userId";
	
	private volatile static ThreadLocal<Map<String, Object>> values = new ThreadLocal<Map<String,Object>>();

	public static Object getValue(String key) {
		Map<String, Object> tValues = values.get();
		if (tValues == null)
			return null;
		return tValues.get(key);
	}
	
	public static void setValue(String key, Object value) {
		Map<String, Object> tValues = values.get();
		if (tValues == null) {
			tValues = new HashMap<String, Object>();
			values.set(tValues);
		}
		tValues.put(key, value);
	}
	
	public static String getUserId() {
		return (String) getValue(KEY_USREID);
	}
	
	public static void setUserId(String userId) {
		setValue(KEY_USREID, userId);
	}
}
