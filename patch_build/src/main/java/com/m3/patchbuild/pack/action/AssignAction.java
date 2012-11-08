package com.m3.patchbuild.pack.action;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 将构建包任务分配给测试人员进行测试
 * @author pangl
 *
 */
public class AssignAction extends HandleTaskAction {

	private String t = null; //测试人员
	
	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}

	@Override
	protected PackStatus getValidStatus() {
		return PackStatus.checked;
	}

	@Override
	protected void fillPack(Pack pack) throws Exception {
		pack.setAssigner(ContextUtil.getUserId());
		pack.setAssignTime(new Date());
		pack.setStatus(PackStatus.assigned);
		pack.setTester(t);
	}

	@Override
	protected void validPack(Pack pack) throws Exception {
		if (StringUtil.isEmpty(t)) {
			throw new Exception("必须指定测试人员");
		}
	}
	
	
}
