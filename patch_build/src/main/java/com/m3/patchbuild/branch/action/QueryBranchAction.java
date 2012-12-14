package com.m3.patchbuild.branch.action;

import com.m3.patchbuild.base.action.BaseQueryAction;
import com.m3.patchbuild.branch.Branch;

public class QueryBranchAction extends BaseQueryAction {

	public QueryBranchAction() {
		super(new BranchQuery(), Branch.class);
	}
}
