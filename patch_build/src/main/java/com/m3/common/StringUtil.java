package com.m3.common;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

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
	
	/**
	 * 合并字符集合
	 * @param strs
	 * @param sep
	 * @return
	 */
	public static String join(Collection<String> strs, String sep) {
		if (strs == null) return null;
		if (sep == null)
			sep = ";";
		StringBuilder sb = new StringBuilder();
		for (String str : strs) {
			if (sb.length() > 0)
				sb.append(sep);
			sb.append(str);
		}
		return sb.toString();
	}
	
	public static Set<String> split2Set(String str, String sep) {
		Set<String> set = new HashSet<String>();
		set.addAll(Arrays.asList(str.split(sep)));
		return set;
	}
}
