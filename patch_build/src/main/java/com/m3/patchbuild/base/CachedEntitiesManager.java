package com.m3.patchbuild.base;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

/**
 * 缓存实体管理类
 * @author pangl
 *
 */
public class CachedEntitiesManager implements IEntitiesChangeListener{
	
	private static final Logger logger = Logger.getLogger(CachedEntitiesManager.class);
	
	private Map<String, List<?>> allEntities = new HashMap<String, List<?>>();
	
	public List<?> getEntities(String type) {
		
		List<?> list = allEntities.get(type);
		if (list == null) {
			synchronized (CachedEntitiesManager.class) {
				list = allEntities.get(type);
				if (list == null) {
					String serviceName = type + "Service";//默认实现规则
					ICachedEntityService service;
					try {
						service = (ICachedEntityService)
								Class.forName(serviceName).newInstance();
						service.addEntitiesChangeListener(this);
						list = service.load();
						allEntities.put(type, list);
					} catch (Exception e) {
						logger.error("实例化缓存实体服务类时出错", e);
					} 
				}
			}
		}
		return list;
	}

	public void entitiesChanged(String type) {
		allEntities.remove(type);
	}
	
	private CachedEntitiesManager() {
		
	}
	
}
