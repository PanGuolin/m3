package com.m3.patchbuild.message;

import java.io.IOException;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.pack.Pack;

/**
 * 邮件模板业务接口
 * @author pangl
 *
 */
public class HtmlTemplateService {
	private static final Logger logger = Logger.getLogger(HtmlTemplateService.class);
	
	private static HtmlTemplateDAO dao = new HtmlTemplateDAO();
	
	/**
	 * 根据关键字及上下文环境返回具体的值
	 * @param key
	 * @param context
	 * @return
	 */
	public static String getValue(String key, Map<String, Object> context) {
		String temp;
		try {
			temp = dao.getTemplate(key);
		} catch (IOException e) {
			logger.error("没有配置相应的模板", e);
			return key;
		}
		return BeanUtil.parseString(temp, context);
	}
	
	public static String getTemplate(String type, Pack bp) {
		String content;
		try {
			content = dao.getTemplate(type);
		} catch (IOException e) {
			logger.error("读取模板信息时出错", e);
			return type;
		}
		
		final String prefix = "${BP.";
		int len = prefix.length();
		StringBuilder sb = new StringBuilder(content);
		int start = sb.indexOf(prefix);
		while(start != -1) {
			int end = sb.indexOf("}", start + len);
			if (end == -1) {
				break;
			}
			String exp = sb.substring(start+len, end);
			Object value = null;
			try {
				value = BeanUtil.getProperty(bp, exp);
			} catch (Exception e) {//忽略错误
				logger.error("解析表达式时出错", e);
			}
			if (value == null)
				value = "";
			sb.replace(start, end+1, value.toString());
			start = sb.indexOf(prefix, start + value.toString().length());
		}
		return sb.toString();
	}
	
	
}
