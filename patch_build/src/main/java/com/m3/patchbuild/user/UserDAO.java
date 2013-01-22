package com.m3.patchbuild.user;

import java.util.Collection;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 用户DAO对象
 * @author pangl
 *
 */
public class UserDAO extends BaseDAO {

	public UserDAO() {
		super(User.class);
	}

	public List<User> listAllUser() {
		return (List<User>)super.list(null);
	}

	
	@SuppressWarnings("unchecked")
	public List<User> findByRole(String branch, String role) {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("select {user.*} from PB_User user inner join User_UserRole role " +
							" on user.uuid = role.userId and role.roleId = :role");
			if (branch != null)
				sb.append(" and role.branch = :branch");
			Query query = HibernateUtil.openSession()
					.createSQLQuery(sb.toString())
					.addEntity("user", User.class)
					.setParameter("role", role);
			if (branch != null)
				query.setParameter("branch", branch);
			return query.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<User> listByUserId(Collection<String> userIds) {
		try {
			return HibernateUtil.openSession()
					.createCriteria(bizClass)
					.add(Restrictions.in("userId", userIds))
					.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	@SuppressWarnings("unchecked")
	public List<User> findFollows(String userId) {
		try {
			return HibernateUtil.openSession()
					.createQuery("from User u where :userId=any(select f.userId from u.followers f)")
					//.createQuery("from User u left join fetch followers f where f.userId=:userId")
					.setParameter("userId", userId)
					.list();
					//.createCriteria(getInfoClass())
					//.add(Restrictions.eq("follows", userId))
					//.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}

	@SuppressWarnings("unchecked")
	public List<User> findMemebers(String userId) {
		try {
			return HibernateUtil.openSession()
					.createQuery("from User u where :userId=any(select s.userId from u.superiors s)")
					//.createQuery("from User u left join fetch followers f where f.userId=:userId")
					.setParameter("userId", userId)
					.list();
					//.createCriteria(getInfoClass())
					//.add(Restrictions.eq("follows", userId))
					//.list();
		} finally {
			HibernateUtil.closeSession();
		}
	}
}
