package com.m3.patchbuild.user;

import java.util.Collection;
import java.util.List;

import com.m3.patchbuild.base.IService;

/**
 * 用户服务接口
 * @author pangl
 *
 */
public interface IUserService extends IService{

	/**
	 * 检查用户口令合并性，如果合法则返回User对象
	 * @param userId 用户ID
	 * @param password 登录口令
	 * @return 用户对象
	 * @throws Exception
	 */
	public User checkUser(String userId, String password);
	
	/**
	 * 查找系统中已存在的用户
	 * @param userId
	 * @return
	 */
	public User findUser(String userId);
	
	public void saveInfo(User user);
	
	public void add(User user) throws Exception;
	
	public void removeRoles(User user, String branch);

	public List<User> findUserByRole(String branch, String role);
	
	public List<User> listByUserId(Collection<String> userIds);

	public List<User> findFollows(String userId);

	public List<User> findMemebers(String userId);
}
