package com.m3.common.query;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.m3.common.BeanUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.IBussInfo;

/**
 * 基础查询对象类
 * 用于处理查询类到具体hibernate查询功能的转换
 * @author pangl
 *
 */
public abstract class BaseQuery implements IQuery{
	private static final Logger logger = Logger.getLogger(BaseQuery.class);
	
	private int pageIndex = -1;
	private int pageSize = -1;
	private List<QueryOrder> orders = new ArrayList<QueryOrder>();
	
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
		orders.add(new QueryOrder(propertyName, false));
		return this;
	}
	
	public BaseQuery descOrder(String propertyName) {
		orders.add(new QueryOrder(propertyName, true));
		return this;
	}
	
	public List<QueryOrder> getOrders() {
		return orders;
	}
	public long getTotalSize() {
		return totalSize;
	}
	public void setTotalSize(long totalSize) {
		this.totalSize = totalSize;
	}
	
	public void beforeQuery(Criteria criter, boolean fetchCount) {
		Field[] fields = getClass().getDeclaredFields();
		for (Field f : fields) {
			QueryField ann = f.getAnnotation(QueryField.class);
			if (ann == null)
				continue;
			String propertyName = ann.property();
			if (StringUtil.isEmpty(propertyName))
				propertyName = f.getName();
//			int subIndex = propertyName.indexOf(".");
//			if (subIndex != -1) {
//				criter.add(Restrictions.)
//				String sub = propertyName.substring(0, subIndex);
//				propertyName = propertyName.substring(subIndex+1);
//				Criteria subCriteria = criter.createCriteria(sub);
//				setRestriction(subCriteria, f, propertyName, ann);
//			} else {
				setRestriction(criter, f, propertyName, ann);
//			}
		}
		
		doBeforeQuery(criter);
		
		if (fetchCount) {
			criter.setProjection(Projections.rowCount()).uniqueResult();
		} else {
			if (getPageIndex() > 0 && getPageSize() > 0) {
				criter.setFirstResult((getPageIndex()-1) * getPageSize())
					.setMaxResults(getPageSize());
			}
			for (QueryOrder order : orders) {
				if (order.isDesc())
					criter.addOrder(Order.desc(order.getPropertyName()));
				else
					criter.addOrder(Order.asc(order.getPropertyName()));
			}
		}
	}
	
	private void setRestriction(Criteria criter, Field f, String propertyName, QueryField ann) {
		Object value;
		try {
			value = BeanUtil.getValue(this, f.getName());
		} catch (Exception e) {
			logger.error("获取对象属性时出错", e);
			return;
		}
		if (value instanceof String) {
			String s = ((String)value).trim();
			value = s.length() == 0 ? null : s;
		}
		if (!ann.acceptNull()) {
			if (value == null) return;
		} else if (value == null) {
			criter.add(Restrictions.isNull(propertyName));
			return;
		}
		if (value != null) {
			Class<? extends IBussInfo> propertyClass = ann.propertyClass();
			if (IBussInfo.class != propertyClass) {
				try {
					IBussInfo info = propertyClass.newInstance();
					info.setUuid((String)value);
					value = info;
				} catch (Exception e) {
					logger.error("初始化子对象时出错", e);
					return;
				} 
			}
		}
		
		
		switch(ann.type()) {
		case Equal:
			criter.add(Restrictions.eq(propertyName, value));break;
		case AllLike:
			criter.add(Restrictions.like(propertyName, (String)value, MatchMode.ANYWHERE));break;
		case LeftLike:
			criter.add(Restrictions.like(propertyName, (String)value, MatchMode.START));break;
		case RightLike:
			criter.add(Restrictions.like(propertyName, (String)value, MatchMode.END));break;
		case Greate:
			criter.add(Restrictions.gt(propertyName, value));break;
		case GreateEqual:
			criter.add(Restrictions.ge(propertyName, value));break;
		case Little:
			criter.add(Restrictions.lt(propertyName, value));break;
		case LittleEqual:
			criter.add(Restrictions.le(propertyName, value));break;
			default: throw new IllegalStateException("un handle QueryType " + ann.type());
		}
		
	}
	
	protected abstract void doBeforeQuery(Criteria criteria);
}
