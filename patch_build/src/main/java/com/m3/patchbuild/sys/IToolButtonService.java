package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.IService;

public interface IToolButtonService extends IService{

	List<ToolButton> getToolButtons(Menu menu);

}
