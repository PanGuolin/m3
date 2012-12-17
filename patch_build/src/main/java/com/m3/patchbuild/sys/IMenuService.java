package com.m3.patchbuild.sys;

import java.util.Collection;
import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 菜单服务对象
 * @author pangl
 *
 */
public interface IMenuService extends IService{

	/**
	 * 获取角色集合有权限的，指定菜单下的子菜单列表
	 * @param top 如果为null则表示获取最顶级菜单
	 * @param roles 指定的角色集合
	 * @return
	 */
	public List<Menu> getMenu(Menu top, Collection<Role> roles);

	public Menu findByFunction(Function funct);
}
