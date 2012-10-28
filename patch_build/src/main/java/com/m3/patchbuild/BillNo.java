package com.m3.patchbuild;

import java.util.HashMap;
import java.util.Map;

/**
 * 业务编码对象
 * 
 * @author pangl
 * 
 */
public class BillNo {

	private Map<String, Object> props = new HashMap<String, Object>();

	BillNo(String key, Object value) {
		props.put(key, value);
	}

	public BillNo setValue(String key, Object value) {
		props.put(key, value);
		return this;
	}
	
	public Map<String, Object> getProps() {
		return props;
	}

}
