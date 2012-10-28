package com.m3.patchbuild.common.dao;

import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.common.info.HtmlTemplate;

/**
 * 邮件模板DAO对象
 * @author pangl
 *
 */
public class HtmlTemplateDAO extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return HtmlTemplate.class;
	}

}
