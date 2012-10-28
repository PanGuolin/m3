package com.m3.patchbuild.patch;

import com.m3.patchbuild.BaseDAO;
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
