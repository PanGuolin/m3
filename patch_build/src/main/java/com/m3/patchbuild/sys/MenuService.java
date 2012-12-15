package com.m3.patchbuild.sys;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseCacheService;

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
	
	public List<Menu> getMenu(Menu top) {
		List<Menu> list = new ArrayList<Menu>();
		if (top == null) {
			for (IBussInfo info : allDatas.values()) {
				Menu menu = (Menu)info;
				if (menu.getParent() == null) {
					list.add(menu);
				}
			}
		} else {
			for (IBussInfo info : allDatas.values()) {
				Menu menu = (Menu)info;
				if (top.equals(menu.getParent())) {
					list.add(menu);
				}
			}
		}
		
		Collections.sort(list, menuComparator);
		return list;
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
