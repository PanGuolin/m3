package com.m3.common;

/**
 * 字符串处理工具类
 * @author MickeyMic
 *
 */
public abstract class StringUtil {

	/**
	 * 判断字符串是否为空字符串
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}
}
