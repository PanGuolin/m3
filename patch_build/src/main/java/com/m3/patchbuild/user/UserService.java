package com.m3.patchbuild.user;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.m3.common.MD5Util;
import com.m3.common.StringUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.DaoUtil;

/**
 * 用户业务接口
 * @author MickeyMic
 *
 */
public class UserService extends BaseService implements IUserService{
	private UserDAO dao = new UserDAO();
	
	public UserService() {
	}

	
	/**
	 * 检查用户口令合并性，如果合法则返回User对象
	 * @param userId 用户ID
	 * @param password 登录口令
	 * @return 用户对象
	 * @throws Exception
	 */
	public User checkUser(String userId, String password) {
		User user = findUser(userId);
		if (user == null || !user.isEnabled())
			return null;
		
		String enPass = MD5Util.getMD5(userId + password);
		return enPass.equals(user.getPassword()) ? user : null;
	}
	
	/**
	 * 查找系统中已存在的用户
	 * @param userId
	 * @return
	 */
	public User findUser(String userId) {
		return (User) DaoUtil.findByBillNo(getBizClass(), "userId", userId);
	}
	
	@Override
	public void saveInfo(User user) {
		if (!StringUtil.isEmpty(user.getPassword()) && user.getPassword().length() != 32) {
			user.setPassword(MD5Util.getMD5(user.getUserId() + user.getPassword()));
		}
		DaoUtil.saveInfo(user);
	}

	public void delete(User user) {
		DaoUtil.delete(user);
	}

	public List<User> findUserByRole(String branch, String role) {
		return dao.findByRole(branch, role);
	}
	
	public List<User> listByUserId(Collection<String> userIds) {
		return dao.listByUserId(userIds);
	}

	public List<User> findFollows(String userId) {
		return dao.findFollows(userId);
	}

	public List<User> findMemebers(String userId) {
		return dao.findMemebers(userId);
	}

	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return User.class;
	}


	@Override
	public void add(User user) throws Exception {
		user.setPassword(MD5Util.getMD5(user.getUserId() + user.getPassword()));
		DaoUtil.saveInfo(user);
	}


	@Override
	public void removeRoles(User user, String branch) {
		Set<UserRole> dels = new HashSet<UserRole>();
		for (UserRole r : user.getRoles()) {
			if (r.getBranch().equals(branch)) {
				dels.add(r);
			}
		}
		user.getRoles().removeAll(dels);
		DaoUtil.deleteAll(dels);
	}

}
