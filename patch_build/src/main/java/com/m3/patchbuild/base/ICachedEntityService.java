package com.m3.patchbuild.base;

import java.util.List;

/**
 * 可缓存的实体服务对象
 * @author pangl
 *
 */
public interface ICachedEntityService {
	
	/**
	 * 加载所有实体
	 * @return
	 */
	List<?> load();
	
	void addEntitiesChangeListener(IEntitiesChangeListener listener);

	String getType();
}
