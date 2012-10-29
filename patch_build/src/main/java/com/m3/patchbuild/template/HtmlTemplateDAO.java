package com.m3.patchbuild.template;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.log4j.Logger;

/**
 * 邮件模板DAO对象
 * @author pangl
 *
 */
public class HtmlTemplateDAO {
	
	private static final Logger logger = Logger.getLogger(HtmlTemplateDAO.class);

	public static final String TEMPLATE_DIR = "html_templates";
	
	public static final String FILE_SUFFIX = ".htpl";
	
	private static File root = null;
	 
	static { 
		try {
			String dir = HtmlTemplateDAO.class.getResource("/").getFile();
			root = new File(dir, TEMPLATE_DIR);
		} catch (Throwable t) {
			logger.error("初始化HTML模板文件根目录时出错", t);
		}
	}
	
	
	/**
	 * 根据KEY获取对应的模板内容
	 * @param key
	 * @return 如果模板文件不存在则返回null
	 * @throws FileNotFoundException 
	 */
	public String getTemplate(String key) throws IOException {
		File file = new File(root, key + FILE_SUFFIX);
		if (!file.exists()) {
			throw new FileNotFoundException(file.getAbsolutePath());
		}
		
		InputStreamReader input = new InputStreamReader(new FileInputStream(file));
		BufferedReader reader = new BufferedReader(input);
		StringBuilder sb = new StringBuilder();
		String line;
		while((line = reader.readLine()) != null) {
			sb.append(line + "\r\n");
		}
		return sb.toString();
	}

}
