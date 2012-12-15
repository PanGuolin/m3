package com.m3.patchbuild.sys;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

public class ToolButtonService extends BaseCacheService implements IToolButtonService{

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return ToolButton.class;
	}

}
