package com.m3.patchbuild.branch.action;

import com.m3.patchbuild.base.action.BaseQueryAction;
import com.m3.patchbuild.branch.Branch;

/**
 * 分支查询Action
 * @author pangl
 *
 */
public class QueryBranchAction extends BaseQueryAction {

	public QueryBranchAction() {
		super(new BranchQuery(), Branch.class);
	}
}
