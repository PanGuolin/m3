package com.m3.patchbuild;

/**
 * 系统参数
 * @author pangl
 *
 */
public abstract class SysParam {
	
	public static final String LIB_ROOT_URL_KEY = "lib_root_url";

	/**
	 * 获取依赖的JAR包存放的地址
	 */
	public static String getLibRootURL() {
		String url = System.getProperty(LIB_ROOT_URL_KEY);
		return url == null ? "http://wiki.bytter.com/nexus/service/local/repositories/thirdparty/content/" : url;
	}
}
