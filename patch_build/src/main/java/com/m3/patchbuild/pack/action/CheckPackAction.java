package com.m3.patchbuild.pack.action;

import java.util.Date;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 检查构建包动作
 * @author pangl
 *
 */
public class CheckPackAction extends HandleTaskAction{

	private String r = null; //失败原因
	
	public String getR() {
		return r;
	}

	public void setR(String r) {
		this.r = r;
	}

	@Override
	protected PackStatus getValidStatus() {
		return PackStatus.builded;
	}

	@Override
	protected void fillPack(Pack pack) throws Exception {
		pack.setChecker(ContextUtil.getUserId());
		pack.setCheckTime(new Date());
		pack.setFailReason(r);
		if (!StringUtil.isEmpty(r)) {
			pack.setStatus(PackStatus.checkFail);
		} else {//如果之前已经分配过测试人员，则不再进行分配，直接指定给该测试人员
			if (!StringUtil.isEmpty(pack.getTester())) {
				pack.setStatus(PackStatus.assigned);
			} else {
				pack.setStatus(PackStatus.checked);
			}
		}
	}
}

