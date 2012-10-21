package com.m3.patchbuild.dao;

import java.util.List;

import com.m3.patchbuild.info.User;

public class UserDAO extends BaseDAO {

	@SuppressWarnings("unchecked")
	public List<User> listAllUser() {
		return (List<User>)super.listAll();
	}

	@Override
	protected Class<?> getInfoClass() {
		return User.class;
	}
}
