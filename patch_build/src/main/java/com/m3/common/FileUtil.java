package com.m3.common;

import java.io.File;

/**
 * 文件相关工具类
 * @author pangl
 *
 */
public abstract class FileUtil {

	/**
	 * 清空文件夹，如果文件夹不存在则创建
	 * @param dir
	 */
	public static void emptyDir(File dir) {
		
		if (!dir.exists() || !dir.isDirectory()) {
			dir.mkdirs();
			return;
		}
		File[] files = dir.listFiles();
		for (File f : files) {
			deleteFile(f);
		}
	}
	
	/**
	 * 删除一个文件或目录
	 * @param file
	 */
	public static void deleteFile(File file) {
		if (file.isFile()) {
			file.delete();
		} else {
			File[] files = file.listFiles();
			for (File f : files) {
				deleteFile(f);
			}
			file.delete();
		}
	}
}
