package com.m3.patchbuild.user;

import java.util.List;
import java.util.Set;

import com.m3.common.MD5Util;
import com.m3.common.StringUtil;
import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BaseDAO;

/**
 * 用户业务接口
 * @author MickeyMic
 *
 */
public class UserService extends AbstractService{
	
	public UserService() {
		super(new UserDAO());
	}

	protected UserDAO getDao() {
		return (UserDAO)super.getDao();
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
		if (user == null)
			return user;
		String enPass = MD5Util.getMD5(userId + password);
		return enPass.equals(user.getPassword()) ? user : null;
	}
	
	/**
	 * 查找系统中已存在的用户
	 * @param userId
	 * @return
	 */
	public User findUser(String userId) {
		return (User) getDao().findByBillNo(BaseDAO.getBillNo("userId", userId));
	}
	
	public void save(User user) throws Exception {
		if (!StringUtil.isEmpty(user.getPassword()) && user.getPassword().length() != 32) {
			user.setPassword(MD5Util.getMD5(user.getUserId() + user.getPassword()));
		}
		getDao().saveInfo(user);
		
	}

	public void delete(User user) {
		getDao().delete(user);
	}

	public List<User> findUserByRole(String role) {
		return getDao().findByRole(role);
	}
	
	public List<User> listByUserId(Set<String> userIds) {
		return getDao().listByUserId(userIds);
	}

}
