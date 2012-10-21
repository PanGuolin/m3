package com.m3.patchbuild.dao;

import java.util.List;

import com.m3.patchbuild.info.BuildBranch;

/**
 * 补丁分支DAO对象
 * @author MickeyMic
 *
 */
public class BuildBranchDAO extends BaseDAO{

	@SuppressWarnings("unchecked")
	public List<BuildBranch> listAllBranch() {
		return (List<BuildBranch>)super.listAll();
	}

	@Override
	protected Class<?> getInfoClass() {
		return BuildBranch.class;
	}
}
