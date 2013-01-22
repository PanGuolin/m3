package com.m3.patchbuild.sys;

import java.util.ArrayList;
import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;
/**
 * 工具按钮服务
 * @author pangl
 *
 */
public class ToolButtonService extends BaseCacheService implements IToolButtonService{

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return ToolButton.class;
	}

	@Override
	public List<ToolButton> getToolButtons(Menu menu) {
		List<ToolButton> tools = new ArrayList<ToolButton>();
		for (IBussInfo info : getAllDatas().values()) {
			ToolButton tool = (ToolButton)info;
			if (tool.getMenu().equals(menu)) {
				tools.add(tool);
			}
		}
		return tools;
	}

}
