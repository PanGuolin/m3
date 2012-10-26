package com.m3.patchbuild.dao;

import org.hibernate.criterion.Restrictions;

import com.m3.patchbuild.info.HtmlTemplate;

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
