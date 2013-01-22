package com.m3.patchbuild.patch.action;

import java.util.Date;

import org.hibernate.Criteria;

import com.m3.common.query.BaseQuery;
import com.m3.common.query.QueryField;
import com.m3.common.query.QueryType;

/**
 * 分支查询条件对象
 * @author pangl
 *
 */
public class PatchQuery extends BaseQuery{
	
	@QueryField(property="branch.uuid")
	private String branch;
	@QueryField(property="builds", type=QueryType.AllLike)
	private String builds;
	@QueryField(property="name", type=QueryType.AllLike)
	private String name;
	@QueryField(property="createTime", type=QueryType.GreateEqual)
	private Date buildStart;
	@QueryField(property="createTime", type=QueryType.LittleEqual)
	private Date buildEnd;

	@Override
	protected void doBeforeQuery(Criteria criteria) {
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getBuilds() {
		return builds;
	}

	public void setBuilds(String builds) {
		this.builds = builds;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBuildStart() {
		return buildStart;
	}

	public void setBuildStart(Date buildStart) {
		this.buildStart = buildStart;
	}

	public Date getBuildEnd() {
		return buildEnd;
	}

	public void setBuildEnd(Date buildEnd) {
		this.buildEnd = buildEnd;
	}
}
