package com.m3.patchbuild.dao;

import java.lang.reflect.Field;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.m3.patchbuild.info.BillNO;


/**
 * DAO抽象类
 * @author MickeyMic
 *
 */
public abstract class BaseDAO {
	
	/**
	 * 批量处理大小
	 */
	protected int batch_size = 20;
	
	protected abstract Class<?> getInfoClass();

	/**
	 * 查找所有的业务对象
	 * @return
	 */
	public List<?> listAll() {
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass()).list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 根据单据编号查找相应的单据
	 * @param billNO
	 * @return
	 */
	public Object findByNo(String billNO) {
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.eq(getBillNoProperty(), billNO))
					.uniqueResult();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	protected String billNoProperty = null;
	/**
	 * 返回单据编号的属性名称
	 * @return
	 */
	protected String getBillNoProperty() {
		if (billNoProperty == null) {
			Class<?> cls = getInfoClass();
			Field[] fs = cls.getDeclaredFields();
			for (Field f : fs) {
				if (f.getAnnotation(BillNO.class) != null) {
					billNoProperty = f.getName();
				}
			}
		}
		if (billNoProperty == null) {
			throw new RuntimeException("实体类" + getInfoClass() + " 没有定义BillNo属性");
		}
		return billNoProperty;
	}
	
	/**
	 * 保存一个业务对象
	 * @param info
	 */
	public void saveInfo(Object info) {
		try {
			HibernateUtil.openSession().saveOrUpdate(info);		
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			HibernateUtil.closeSession();
		}
	}
	
	/**
	 * 批量保存
	 * @param infos
	 */
	public void saveBatch(List<?> infos) {
		if(infos == null || infos.size() == 0)
			return;
		if (batch_size < 1)
			batch_size = 1;
		try {
			Session session = HibernateUtil.openSession();
			for (int i=0; i<infos.size(); i++) {
				session.saveOrUpdate(infos.get(i));
				if (i % batch_size == 0) {
					session.flush();
					session.clear();
					//HibernateUtil.commit();
				}
			}
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public void delete(Object info) {
		try {
			HibernateUtil.openSession().delete(info);
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
