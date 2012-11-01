package com.m3.patchbuild.user;

import java.util.List;
import java.util.Set;

import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

@SuppressWarnings("unchecked")
public class UserDAO extends BaseDAO {

	public List<User> listAllUser() {
		return (List<User>)super.list(null);
	}

	@Override
	protected Class<?> getInfoClass() {
		return User.class;
	}
	
	public List<User> findByRole(String role) {
		try {
			return HibernateUtil.openSession()
					.createSQLQuery("select {user.*} from PB_User user inner join PB_UserRole role on user.uuid = role.Useruuid and role.roles = :role")
					.addEntity("user", User.class)
					.setParameter("role", role)
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	public List<User> listByUserId(Set<String> userIds) {
		try {
			return HibernateUtil.openSession()
					.createCriteria(getInfoClass())
					.add(Restrictions.in("userId", userIds))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
