package com.m3.patchbuild.sys.action;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;

/**
 * 改变当前分支Action
 * @author pangl
 *
 */
public class ChangeBranchAction extends BaseAction{
	
	private String branch;

	@Override
	protected String doExecute() throws Exception {
		if (branch == null) {
			setTips("必须指定切换的分支");
			return SUCCESS;
		}
		IBranchService bService = (IBranchService)BussFactory.getService(Branch.class);
		Branch br = bService.getBranch(branch);
		if (br == null) {
			setTips("指定的分支不存在");
			return SUCCESS;
		}
		ContextUtil.setBranch(br);
		//setTips("分支切换成功，当前分支：" + br.getName() + "[" + br.getBranch() + "]");
		return SUCCESS;
		
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}
	
	

}
