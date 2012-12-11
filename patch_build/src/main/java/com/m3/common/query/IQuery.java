package com.m3.common.query;

import java.util.List;

import org.hibernate.Criteria;

public interface IQuery {
	
	/**
	 * 获取当前分页索引
	 * @return
	 */
	public int getPageIndex();
	
	/**
	 * 设置当前分页索引
	 * @param pageIndex
	 * @return
	 */
	public IQuery setPageIndex(int pageIndex);
	
	/**
	 * 获取总页面大小
	 * @return
	 */
	public int getPageSize();
	
	/**
	 * 设置总页面大小
	 * @param pageSize
	 * @return
	 */
	public IQuery setPageSize(int pageSize);
	
	/**
	 * 升序排列
	 * @param propertyName
	 * @return
	 */
	public IQuery ascOrder(String propertyName);
	
	/**
	 * 降序排列
	 * @param propertyName
	 * @return
	 */
	public IQuery descOrder(String propertyName);
	
	/**
	 * 获取排序列表
	 * @return
	 */
	public List<QueryOrder> getOrders();
	
	/**
	 * 获取总数据数量
	 * @return
	 */
	public long getTotalSize();
	
	/**
	 * 设置总数据数量
	 * @param totalSize
	 */
	public void setTotalSize(long totalSize);
	
	/**
	 * 执行查询之前设置的条件
	 * @param criter
	 * @throws Exception
	 */
	public void beforeQuery(Criteria criter, boolean fetchCount);

}
