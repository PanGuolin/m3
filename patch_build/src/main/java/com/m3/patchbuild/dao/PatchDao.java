package com.m3.patchbuild.dao;

import com.m3.patchbuild.info.PatchInfo;
/**
 * 补丁信息DAO对象
 * @author pangl
 *
 */
public class PatchDao extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return PatchInfo.class;
	}

}
