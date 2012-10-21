package com.m3.patchbuild.service;

import com.m3.common.MD5Util;
import com.m3.common.SVNUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.dao.UserDAO;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.User;

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
	public static User getUser(String userId, String password) {
		User user = (User) dao.findByNo(userId);
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
		return (User) dao.findByNo(userId);
	}
	
	/**
	 * 尝试在SVN上登录用户
	 * @param userId
	 * @param password
	 * @param branch
	 * @return 是否登录成功
	 */
	private static boolean loginSVN(String userId, String password, String branch) {
		BuildBranch bBranch = BuildBranchService.getBranch(branch);
		if (bBranch == null)
			return false;
		if (SVNUtil.checkLogin(bBranch.getSvnUrl(), userId, password)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	public static void createUser(User user) throws Exception {
		if (!user.isSVNUser() && !StringUtil.isEmpty(user.getPassword())) {
			user.setPassword(MD5Util.getMD5(user.getUserId() + user.getPassword()));
		}
		dao.saveInfo(user);
		
	}

}
