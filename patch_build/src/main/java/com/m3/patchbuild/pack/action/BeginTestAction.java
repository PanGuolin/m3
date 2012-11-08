package com.m3.patchbuild.pack.action;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 开始测试一个构建包
 * @author pangl
 *
 */
public class BeginTestAction extends HandleTaskAction{
	
	@Override
	protected PackStatus getValidStatus() {
		return PackStatus.assigned;
	}

	@Override
	protected void fillPack(Pack pack) throws Exception {
		pack.setStatus(PackStatus.testing);
		pack.setTestTime(new Date());
	}

	@Override
	protected void validPack(Pack pack) throws Exception {
		if (ContextUtil.getUserId().equals(pack.getTester())) {
			throw new Exception("你没有权限对该构建包进行测试");
		}
	}
	
	
	
}
