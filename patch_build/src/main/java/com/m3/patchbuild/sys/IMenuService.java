package com.m3.patchbuild.sys;

import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 菜单服务对象
 * @author pangl
 *
 */
public interface IMenuService extends IService{

	/**
	 * 获取指定菜单下的子菜单列表
	 * @param top 如果为null则表示获取最顶级菜单
	 * @return
	 */
	public List<Menu> getMenu(Menu top);

	public Menu findByFunction(Function funct);
}
