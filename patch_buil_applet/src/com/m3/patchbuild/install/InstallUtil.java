package com.m3.patchbuild.install;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;


/**
 * ��װ�����࣬�������߼���UI���з������
 * @author pangl
 *
 */
public abstract class InstallUtil {
	private static final Logger logger = Logger.getLogger(InstallUtil.class.getName());
	public static final String INSTALL_BACK_DIR = "pb/installed";
	
	public static final String DOWNLOAD_DIR = "pb/download";
	
	public static final String INSTALL_TEMP_DIR = "pb/temp";
	
	public static final int DBTYPE_ORACLE = 0;
	
	public static final String ORG_FILE_LIST = "org.list";
	
	public static final String[] DB_SUFFIIES = new String[]{"_orcl.sql"};
	
	/**
	 * ж�������Ѱ�װ�Ĺ�����
	 * @param appRoot
	 * @throws IOException 
	 */
	public static void unstallPacks(File appRoot) throws IOException {
		File installDir = new File(appRoot, INSTALL_BACK_DIR);
		if (!installDir.exists() || !installDir.isDirectory()) {
			return;
		}
		final List<File> subDirs = new ArrayList<File>();
		 installDir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isDirectory())
					subDirs.add(pathname);
				return false;
			}
		});
		
		Collections.sort(subDirs, new Comparator<File>() {
			public int compare(File o1, File o2) {
				return o1.getName().compareTo(o2.getName());
			}
		});
		
		for (File sub : subDirs) {
//			BufferedReader reader = new BufferedReader(new FileReader(new File(sub, ORG_FILE_LIST)));
//			String[] files = reader.readLine().split(";");
//			reader.close();
//			for (String f : files) {
//				new File(appRoot, f).delete();
//				logger.log(Level.INFO, "ɾ���ļ���" + f);
//			}
			File srcDir = new File(sub, "web");
			copyChildren(srcDir, appRoot);
			deleteFile(srcDir);
		}
	}
	
	public static void installPack(File appRoot, File packFile, Connection conn) throws ZipException, IOException, SQLException {
		File downloadDir = new File(appRoot, DOWNLOAD_DIR);
		//File packFile = new File(downloadDir, buildNo + ".zip");
		
		File tempDir = new File(appRoot, INSTALL_TEMP_DIR + "/" + packFile.getName());
		emptyDir(tempDir);
		ZipFile file = new ZipFile(packFile);
		Enumeration<? extends ZipEntry> entries = file.entries();
		while(entries.hasMoreElements()) {
			ZipEntry entry = entries.nextElement();
			File destFile = new File(tempDir, entry.getName());
			if (entry.isDirectory()) {
				destFile.mkdirs();
				continue;
			}
			//if (!destFile.exists())
			//	destFile.getParentFile().mkdirs();
			
			InputStream input = file.getInputStream(entry);
			OutputStream output = new FileOutputStream(destFile);
			byte[] bs = new byte[1024];
			int len;
			while((len = input.read(bs)) != -1) {
				output.write(bs, 0, len);
			}
			input.close();
			output.flush();
			output.close();
			logger.log(Level.INFO, "��ѹ���ļ���" + destFile);
		}
		file.close();
		
		File sqlDir = new File(tempDir, "sql");
		int dbType = 0;
		String dbName = conn.getMetaData().getDatabaseProductName();
		if (dbName.equals("Microsoft SQL Server")) {
			dbType = 1;
		} else if (dbName.equals("Oracle") || dbName.startsWith("DB2")) {
			dbType = 0;
		}
		final String suffix = DB_SUFFIIES[dbType];
		File[] sqlFiles = sqlDir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.getName().toLowerCase().endsWith(suffix)) {
					return true;
				}
				return false;
			}
		});
		
		if (sqlFiles != null) {
			for (File f : sqlFiles) {
				String[] sqls = DBUpdateTool.readSqls(f);
				for (String sql : sqls) {
					try {
						DBUpdateTool.executeSql(conn, sql);
					} catch (SQLException ex) {
						throw ex;
					}
				}
				logger.log(Level.INFO, "ִ��SQL�ű���" + f);
			}
		}
		
		
		File webDir = new File(tempDir, "web");
		List<File> webFiles = new ArrayList<File>();
		listAll(webDir, webFiles);
		int sufLen = webDir.getAbsolutePath().length();
		File backDir = new File(appRoot, INSTALL_BACK_DIR + "/" + System.currentTimeMillis() + "_" + packFile.getName());
		backDir.mkdirs();
		//����
		StringBuilder sb = new StringBuilder();
		for (File f : webFiles) {
			String path = f.getAbsolutePath().substring(sufLen);
			File dest = new File(backDir, path);
			if (f.isFile())
				sb.append(path + ";");
			else {
				dest.mkdirs();
				continue;
			}
			
			File src = new File(appRoot, path);
			if (src.exists())
				copyContent(src, dest);
		}
		FileWriter writer = new FileWriter(new File(backDir, ORG_FILE_LIST));
		writer.write(sb.toString());
		writer.flush();
		writer.close();
		logger.log(Level.INFO, "��¼��Ϣ:" + new File(backDir, ORG_FILE_LIST));
		//����
		for (File f : webFiles) {
			String path = f.getAbsolutePath().substring(sufLen);
			File dest = new File(appRoot, path);
			if (dest.isDirectory()) {
				dest.mkdirs();
			}
			copyContent(f, dest);
		}
	}
	
	/**
	 * �����ļ�Ŀ¼�е��������ݵ�ָ��Ŀ¼����
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
				logger.log(Level.INFO, "����Ŀ¼:" + srcDir + " => " + destSub);
				copyChildren(sub, destSub);
			} else {
				copyContent(sub, destSub);
			}
		}
	}
	
	/**
	 * �����ļ�����
	 * @param srcFile
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyContent(File srcFile, File destFile) throws IOException {
		destFile.getParentFile().mkdirs();
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
		logger.log(Level.INFO, "�����ļ�:" + srcFile + " => " + destFile);
	}

	/**
	 * ɾ��һ���ļ���Ŀ¼
	 * @param file
	 */
	public static void deleteFile(File file) {
		if (file.isFile()) {
			file.delete();
			logger.log(Level.INFO, "ɾ���ļ�:" + file);
		} else {
			File[] files = file.listFiles();
			if (files != null) {
				for (File f : files) {
					deleteFile(f);
				}
			}
			file.delete();
			logger.log(Level.INFO, "ɾ��Ŀ¼:" + file);
		}
	}
	
	public static void listAll(File root, List<File> list) {
		File[] files = root.listFiles();
		for (File f : files) {
			if (f.isFile()) {
				list.add(f);
			} else {
				listAll(f, list);
			}
		}
	}
	
	/**
	 * ����ļ��У�����ļ��в������򴴽�
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
	
	public static File downloadPack(String serverUrl, String sessionid, String appRoot, final String uuid) throws Exception{
		String url = serverUrl + "pack/download?uuid=" + uuid;
		logger.log(Level.INFO, "��ʼ����: " + url);
		File downDir = new File(appRoot, "pb/download");
		if (!downDir.exists() || !downDir.isDirectory())
			downDir.mkdirs();
		//setStatus("��ʼ���ع�������" + uuid);
		URL u=new URL(url);
		HttpURLConnection con=(HttpURLConnection)u.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Cookie", sessionid);
		Map<String, List<String>> headers = con.getHeaderFields();
		List<String> name = headers.get("Content-Disposition");//[attachment;filename="BFS.zip"]
		String fileName = name.get(0);
		if(fileName.indexOf("filename=") != -1) {
			fileName = fileName.substring(fileName.indexOf("filename=") + "filename=".length());
		}
		fileName = fileName.trim();
		if (fileName.startsWith("\""))
			fileName = fileName.substring(1);
		if (fileName.endsWith("\""))
			fileName = fileName.substring(0, fileName.length()-1);
		File toFile = new File(downDir, fileName);
		InputStream in = con.getInputStream();
		FileOutputStream out = new FileOutputStream(toFile);
		byte[] bs = new byte[1024];
		int len;
		while((len = in.read(bs)) != -1) {
			out.write(bs, 0, len);
		}
		in.close();
		out.flush(); 
		out.close();
		//setStatus("�����ļ����:" + toFile.getAbsolutePath());
		return toFile;
	}
	
}
