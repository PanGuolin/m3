package com.m3.patchbuild.sys.action;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.m3.common.query.BaseQuery;
import com.m3.common.query.QueryField;
import com.m3.common.query.QueryType;

/**
 * 功能查询条件对象
 * @author pangl
 *
 */
public class FunctionQuery extends BaseQuery{
	
	@QueryField(type=QueryType.AllLike)
	private String code;
	
	@QueryField(type=QueryType.AllLike)
	private String name;
	
	@QueryField(type=QueryType.AllLike)
	private String info;
	
	private int type = -1;
	
	@Override
	protected void doBeforeQuery(Criteria criteria) {
		if (type != -1) {
			criteria.add(Restrictions.eq("type", type));
		}
		
	}



	public String getCode() {
		return code;
	}



	public void setCode(String code) {
		this.code = code;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getInfo() {
		return info;
	}



	public void setInfo(String info) {
		this.info = info;
	}



	public int getType() {
		return type;
	}



	public void setType(int type) {
		this.type = type;
	}

}
