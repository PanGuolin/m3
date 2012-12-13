package com.m3.patchbuild.sys.action;

import org.hibernate.Criteria;

import com.m3.common.query.BaseQuery;
import com.m3.common.query.QueryField;
import com.m3.common.query.QueryType;

public class FunctionQuery extends BaseQuery{
	
	@QueryField(type=QueryType.AllLike)
	private String code;
	
	@QueryField(type=QueryType.AllLike)
	private String name;
	
	@QueryField(type=QueryType.AllLike)
	private String info;
	
	@QueryField(type=QueryType.Equal)
	private int type;
	
	@Override
	protected void doBeforeQuery(Criteria criteria) {
		
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