package com.m3.patchbuild.pack.action;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 测试人员开始测试
 * @author pangl
 *
 */
public class StartTestAction extends HandleTaskAction {

	@Override
	protected PackStatus getValidStatus() {
		return PackStatus.assigned;
	}

	@Override
	protected void fillPack(Pack pack) throws Exception {
		pack.setTestTime(new Date());
		pack.setStatus(PackStatus.testing);
	}

	@Override
	protected void validPack(Pack pack) throws Exception {
		if (!pack.getTester().equals(ContextUtil.getUserId())) {
			throw new Exception("当前用户没有权限对包" + pack.getBuildNo() + "进行测试");
		}
	}
	
	

}
