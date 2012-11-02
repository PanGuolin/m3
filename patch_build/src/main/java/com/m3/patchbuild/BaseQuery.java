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
	
	private long totalSize = 0; //查询结果总数量
	
	
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
	public long getTotalSize() {
		return totalSize;
	}
	public void setTotalSize(long totalSize) {
		this.totalSize = totalSize;
	}
	
}
