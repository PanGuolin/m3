package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 工具按钮功能接口
 * @author pangl
 *
 */
public interface IToolButtonService extends IService{

	List<ToolButton> getToolButtons(Menu menu);

}
