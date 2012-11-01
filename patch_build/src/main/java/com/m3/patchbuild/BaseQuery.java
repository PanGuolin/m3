package com.m3.patchbuild;

import java.util.ArrayList;
import java.util.List;

/**
 * 查询条件基础类
 * @author pangl
 *
 */
public class BaseQuery {

	private int pageIndex = -1;
	private int pageSize = -1;
	private List<QOrder> orders = new ArrayList<QOrder>();
	
	
	public int getPageIndex() {
		return pageIndex;
	}
	public BaseQuery setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
		return this;
	}
	
	public int getPageSize() {
		return pageSize;
	}
	
	public BaseQuery setPageSize(int pageSize) {
		this.pageSize = pageSize;
		return this;
	}
	
	public BaseQuery ascOrder(String propertyName) {
		orders.add(new QOrder(propertyName, false));
		return this;
	}
	
	public BaseQuery descOrder(String propertyName) {
		orders.add(new QOrder(propertyName, true));
		return this;
	}
	
	public List<QOrder> getOrders() {
		return orders;
	}
}
