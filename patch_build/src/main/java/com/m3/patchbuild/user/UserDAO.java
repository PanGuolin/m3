package com.m3.patchbuild.user;

import java.util.List;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

public class UserDAO extends BaseDAO {

	@SuppressWarnings("unchecked")
	public List<User> listAllUser() {
		return (List<User>)super.listAll();
	}

	@Override
	protected Class<?> getInfoClass() {
		return User.class;
	}

	@SuppressWarnings("unchecked")
	public List<User> findByRole(UserRoleEnum role) {
		try {
			return HibernateUtil.openSession()
					.createSQLQuery("select {user.*} from PB_User user left join PB_UserRole role on user.uuid = role.Useruuid and role.roles = :role")
					.addEntity("user", User.class)
					.setParameter("role", role.name())
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
