package com.m3.patchbuild.branch.action;

import java.util.List;

import org.hibernate.Criteria;

import com.m3.common.query.BaseQuery;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.pack.Pack;

public class BranchQuery extends BaseQuery{
	
	@Override
	protected void doBeforeQuery(Criteria criteria) {
		
	}
	
}
