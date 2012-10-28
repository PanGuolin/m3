package com.m3.patchbuild.common.service;

import org.apache.log4j.Logger;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.common.dao.HtmlTemplateDAO;
import com.m3.patchbuild.common.info.HtmlTemplate;
import com.m3.patchbuild.pack.BuildPack;

/**
 * 邮件模板业务接口
 * @author pangl
 *
 */
public class HtmlTemplateService {
	private static final Logger logger = Logger.getLogger(HtmlTemplateService.class);
	
	public static final String MAIL_SUBJ_REQUEST = "MAIL_SUBJ_REQUEST";//请求构建
	public static final String MAIL_CONT_REQUEST = "MAIL_CONT_REQUEST";//请求构建
	
	public static final String MAIL_SUBJ_CHKF = "MAIL_SUBJ_CHECKFAIL";//检查失败
	public static final String MAIL_CONT_CHKF = "MAIL_CONT_CHECKFAIL";//检查失败
	
	public static final String MAIL_SUBJ_BUILD = "MAIL_SUBJ_BUILD";//构建成功
	public static final String MAIL_CONT_BUILD = "MAIL_CONT_BUILD";//构建成功
	
	public static final String MAIL_SUBJ_BUILDF = "MAIL_SUBJ_BUILDF";//构建失败
	public static final String MAIL_CONT_BUILDF = "MAIL_CONT_BUILDF";//构建失败

	public static final String MAIL_SUBJ_PASS = "MAIL_SUBJ_PASS";//测试通过
	public static final String MAIL_CONT_PASS = "MAIL_CONT_PASS";
	
	public static final String MAIL_SUBJ_TESTFAIL = "MAIL_SUBJ_TESTFAIL";//测试打回
	public static final String MAIL_CONT_TESTFAIL = "MAIL_CONT_TESTFAIL";
	
	public static final String MAIL_SUBJ_TESTING = "MAIL_SUBJ_TESTING";//测试中
	public static final String MAIL_CONT_TESTING = "MAIL_CONT_TESTING";
	
	public static final String MAIL_SUBJ_PUBLISH = "MAIL_SUBJ_PUBLISH";//发布
	public static final String MAIL_CONT_PUBLISH = "MAIL_CONT_PUBLISH";
	
	public static final String MAIL_SUBJ_ASSIGN = "MAIL_SUBJ_ASSIGN"; //分配
	public static final String MAIL_CONT_ASSIGN = "MAIL_CONT_ASSIGN";
	
	
	private static HtmlTemplateDAO dao = new HtmlTemplateDAO();
	
	public static String getTemplate(String type, BuildPack bp) {
		HtmlTemplate temp =  (HtmlTemplate)dao.findByBillNo(BaseDAO.getBillNo("type", type));
		if (temp == null || temp.getContent() == null)
			return type;
		final String prefix = "${BP.";
		int len = prefix.length();
		StringBuilder sb = new StringBuilder(temp.getContent());
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
