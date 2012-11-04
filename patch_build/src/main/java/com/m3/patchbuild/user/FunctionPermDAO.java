package com.m3.patchbuild.user;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 功能权限DAO
 * @author pangl
 *
 */
@SuppressWarnings("unchecked")
public class FunctionPermDAO extends BaseDAO{
	
	@Override
	protected Class<?> getInfoClass() {
		return FunctionPerm.class;
	}

	/**
	 * 列出拥有某功能权限的所有角色
	 * @param permNo
	 * @return
	 */
	
	public List<String> listRoleByPerm(String permCode) {
		try { 
			return HibernateUtil.openSession().createSQLQuery(
					"select r.roleName from SYS_RolePermission r left join SYS_FunctionPerm f on r.permCode = f.code where r.permCode=:permCode")
					.setParameter("permCode", permCode)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	public List<String> listRoleByUrl(String url) {
		try { 
			return HibernateUtil.openSession().createSQLQuery(
					"select r.roleName from SYS_RolePermission r left join SYS_FunctionPerm f on r.permCode = f.code where f.info=:info")
					.setParameter("info", url)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	public List<String> listRoleByPath(String path) {
		try { 
			return HibernateUtil.openSession().createSQLQuery(
					"select r.roleName from SYS_RolePermission r left join SYS_FunctionPerm f on r.permCode = f.code where f.info=:info")
					.setParameter("info", path)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

}
