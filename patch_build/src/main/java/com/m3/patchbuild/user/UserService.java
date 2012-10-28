package com.m3.patchbuild.user;

import java.util.List;

import com.m3.common.MD5Util;
import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseDAO;

/**
 * 用户业务接口
 * @author MickeyMic
 *
 */
public class UserService {
	private static UserDAO dao = new UserDAO();
	
	/**
	 * 检查用户口令合并性，如果合法则返回User对象
	 * @param userId 用户ID
	 * @param password 登录口令
	 * @return 用户对象
	 * @throws Exception
	 */
	public static User checkUser(String userId, String password) {
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
	public static User findUser(String userId) {
		return (User) dao.findByBillNo(BaseDAO.getBillNo("userId", userId));
	}
	
	public static void save(User user) throws Exception {
		if (!user.isSVNUser() && !StringUtil.isEmpty(user.getPassword())) {
			user.setPassword(MD5Util.getMD5(user.getUserId() + user.getPassword()));
		}
		dao.saveInfo(user);
		
	}

	public static void delete(User user) {
		dao.delete(user);
	}

	public static List<User> findUser(UserRoleEnum role) {
		return dao.findByRole(role);
	}

}
