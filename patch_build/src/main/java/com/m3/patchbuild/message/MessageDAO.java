package com.m3.patchbuild.message;

import com.m3.patchbuild.BaseDAO;

/**
 * 消息DAO
 * @author MickeyMic
 *
 */
public class MessageDAO extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return Message.class;
	}

}
