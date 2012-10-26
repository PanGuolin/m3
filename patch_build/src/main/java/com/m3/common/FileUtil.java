package com.m3.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

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
	
	/**
	 * 拷贝文件目录中的所有内容到指定目录当中
	 * @param srcDir
	 * @param destDir
	 * @throws IOException 
	 */
	public static void copyChildren(File srcDir, File destDir) throws IOException {
		if (!srcDir.isDirectory() && !srcDir.exists())
			return;
		File[] subs = srcDir.listFiles();
		if (subs == null || subs.length == 0)
			return;
		for (File sub : subs) {
			File destSub = new File(destDir, sub.getName());
			if (sub.isDirectory()) {
				destSub.mkdirs();
				copyChildren(sub, destSub);
			} else {
				copyContent(sub, destSub);
			}
		}
	}
	
	/**
	 * 拷贝文件内容
	 * @param srcFile
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyContent(File srcFile, File destFile) throws IOException {
		final int BUFF_SIZE = 1024;
		BufferedInputStream input = new BufferedInputStream(new FileInputStream(srcFile));
		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(destFile));
		byte[] bs = new byte[BUFF_SIZE];
		int len = 0;
		while((len = input.read(bs)) != -1) {
			out.write(bs, 0, len);
		}
		input.close();
		out.flush();
		out.close();
	}
}
