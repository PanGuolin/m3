package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 重置发布状态Action
 * @author pangl
 *
 */
public class ResetDeployAction extends HandleTaskAction{

	@Override
	protected PackStatus getValidStatus() {
		return PackStatus.publishFail;
	}

	@Override
	protected void fillPack(Pack pack) throws Exception {
		pack.setStatus(PackStatus.pass);
	}

}
