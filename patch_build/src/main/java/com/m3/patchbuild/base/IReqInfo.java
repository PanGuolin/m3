package com.m3.patchbuild.base;

import java.util.Date;

import com.m3.patchbuild.user.User;

/**
 * IReqInfo 表示一个请求单据对象
 * @author pangl
 *
 */

public interface IReqInfo {
	
	/**
	 * 创建时间
	 * @return
	 */
	Date getCreateTime();
	
	/**
	 * 处理时间
	 * @return
	 */
	Date getHandleTime();
	
	/**
	 * 处理用户
	 * @return
	 */
	User getHandleUser();
	
	/**
	 * 请求用户
	 * @return
	 */
	User getRequester();
	
	/**
	 * 处理结果
	 * @return
	 */
	boolean isAccepted();
	
	/**
	 * 处理备注
	 * @return
	 */
	String getComment();
}
