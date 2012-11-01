package com.m3.patchbuild;

/**
 * 查询顺序对象
 * @author pangl
 *
 */
public class QOrder {
	private boolean desc = false; //是否降序
	private String propertyName = null; //排列属性名称
	
	QOrder(String propertyName, boolean desc) {
		this.propertyName = propertyName;
		this.desc = desc;
	}

	public boolean isDesc() {
		return desc;
	}

	public void setDesc(boolean desc) {
		this.desc = desc;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	

}
