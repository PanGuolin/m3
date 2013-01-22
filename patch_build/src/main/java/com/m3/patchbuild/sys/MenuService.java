package com.m3.patchbuild.sys;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

/**
 * 菜单服务
 * @author pangl
 *
 */
public class MenuService extends BaseCacheService implements IMenuService{
	private static Comparator<Menu> menuComparator  = new Comparator<Menu>() {
		@Override
		public int compare(Menu o1, Menu o2) {
			return o1.getIndex() - o2.getIndex();
		}
	};
	

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return Menu.class;
	}
	
	public List<Menu> getMenu(Menu top, Collection<Role> roles) {
		List<Menu> list = new ArrayList<Menu>();
		if (top == null) {
			for (IBussInfo info : allDatas.values()) {
				Menu menu = (Menu)info;
				if (menu.getParent() == null && checkRole(menu.getFunction(), roles)) {
					list.add(menu);
				}
			}
		} else {
			for (IBussInfo info : allDatas.values()) {
				Menu menu = (Menu)info;
				if (top.equals(menu.getParent()) && checkRole(menu.getFunction(), roles)) {
					list.add(menu);
				}
			}
		}
		
		Collections.sort(list, menuComparator);
		return list;
	}
	
	private static boolean checkRole(Function function, Collection<Role> targetColl) {
		Set<Role> ownColl = function.getRoles();
		if (ownColl.isEmpty())
			return true;
		for (Role o : ownColl) {
			if (targetColl.contains(o))
				return true;
		}
		return false;
	}

	@Override
	public Menu findByFunction(Function funct) {
		if (funct == null) return null;
		for (IBussInfo info : allDatas.values()) {
			Menu menu = (Menu)info;
			if (funct.equals(menu.getFunction())) {
				return menu;
			}
		}
		return null;
	}

}
