package com.m3.common;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.logging.Level;

import org.apache.log4j.Logger;
import org.tmatesoft.svn.core.SVNCommitInfo;
import org.tmatesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.SVNDirEntry;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;
import org.tmatesoft.svn.core.SVNNodeKind;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.auth.ISVNAuthenticationManager;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.wc.DefaultSVNOptions;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNCopyClient;
import org.tmatesoft.svn.core.wc.SVNCopySource;
import org.tmatesoft.svn.core.wc.SVNRevision;
import org.tmatesoft.svn.core.wc.SVNUpdateClient;
import org.tmatesoft.svn.core.wc.SVNWCUtil;
import org.tmatesoft.svn.util.ISVNDebugLog;
import org.tmatesoft.svn.util.SVNLogType;

import com.byttersoft.patchbuild.beans.ChangedSVNFiles;
import com.byttersoft.patchbuild.beans.RepositoryInfo;
import com.byttersoft.patchbuild.service.BuildReposManager;

/**
 * SVN工具类 
 * @author pangl
 *
 */
public abstract class SVNUtil {
	private static final Logger logger = Logger.getLogger(SVNUtil.class);
	static {
		System.setProperty("svnkit.http.sslProtocols", "SSLv3");
	}
	
	/**
	 * 检查用户名与密码是否正确
	 * @param branchName 分支名称
	 * @param user 用户名
	 * @param password 密码 
	 * @return 
	 */
	public static boolean checkLogin(String svnUrl, String user, String password) {
		DAVRepositoryFactory.setup();
		SVNRepository repository; 
		try {
			repository = SVNRepositoryFactory.create(SVNURL.parseURIDecoded(svnUrl));
			ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(user, password);
			repository.setAuthenticationManager(authManager);
			repository.testConnection();
			return true;
		} catch (SVNException e) {
			logger.error("登录SVN时出错", e);
			return false;
		}
	}
	
	/**
	 * 列出SVN中分支的所有项目
	 * @param branchName
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static String[] listSVNProjects(String svnUrl, String user, String password) {
		
		Set<String> set = new TreeSet<String>();
		try {
			DAVRepositoryFactory.setup();
			SVNRepository repository = SVNRepositoryFactory.create(SVNURL.parseURIDecoded(svnUrl));
			ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(user, password);
			repository.setAuthenticationManager(authManager);
			
			Collection entries = repository.getDir("", -1 , null , (Collection) null );
	        Iterator iterator = entries.iterator( );
	        while ( iterator.hasNext( ) ) {
	            SVNDirEntry entry = ( SVNDirEntry ) iterator.next( );
	            if ( entry.getKind() == SVNNodeKind.DIR ) {
	            	String name = entry.getName();
	            	if (!name.startsWith("."))
	            		set.add(name);
	            }
	        }
		} catch (SVNException e) {
			logger.error(e.getMessage(), e);
		}
		return (String[])set.toArray(new String[set.size()]);
	}
	
	
	/**
	 * 
	 * @return
	 * @throws SVNException 
	 */
	@SuppressWarnings({ "rawtypes" })
	public static Set<SVNLogEntry> getSVNLogEntry(String svnUrl, String user, String password, long startRevision) throws SVNException {
		DAVRepositoryFactory.setup();
		SVNRepository repository = SVNRepositoryFactory.create(SVNURL.parseURIDecoded(svnUrl));
		ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(user, password);
		repository.setAuthenticationManager(authManager);
		long endRevision = -1; //FROM HEAD
		
		Set<SVNLogEntry> set = new HashSet<SVNLogEntry>();
		
		Collection logEntries = repository.log(new String[] { "" }, null, startRevision, endRevision, true, true);
		for ( Iterator entries = logEntries.iterator( ); entries.hasNext( ); ) {
            SVNLogEntry logEntry = (SVNLogEntry) entries.next( );
           	set.add(logEntry);
		}
		return set;
	}
	
	/**
	 * 获取所有被修改过的（新增的或修改的）文件路径列表
	 * @param svnUrl
	 * @param user
	 * @param pswd
	 * @param logPattern
	 * @return
	 * @throws SVNException 
	 */
	@SuppressWarnings({ "rawtypes" })
	public static ChangedSVNFiles listChangedFiles(String branch, String[] modules, String[] logPatterns) throws SVNException {
		
		RepositoryInfo repos = BuildReposManager.getByName(branch);
		if (modules== null || modules.length == 0)
			modules = repos.getProjects();
		List<String> list = new ArrayList<String>();
		for (String s : modules) {
			if (!"sql".equalsIgnoreCase(s)) {
				list.add(repos.getSvnRoot() + s + "/");
			}
		}
		modules = (String[])list.toArray(new String[list.size()]);
		
		DAVRepositoryFactory.setup();
		SVNURL svnURL = SVNURL.parseURIDecoded(repos.getSvnUrl());
		SVNRepository repository = SVNRepositoryFactory.create(svnURL);
		ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(repos.getSvnUser(), repos.getSvnPassword());
		repository.setAuthenticationManager(authManager);
		long startRevision = 0;
		long endRevision = -1; //FROM HEAD
		
		int preLen = repos.getSvnRoot().length();
		Set<String> set = new HashSet<String>();
		Set<String> logs = new HashSet<String>();
		
		Collection logEntries = repository.log(modules, null, startRevision, endRevision, true, true);
		for ( Iterator entries = logEntries.iterator( ); entries.hasNext( ); ) {
            SVNLogEntry logEntry = (SVNLogEntry) entries.next( );
            String logMsg = logEntry.getMessage();
            if (logMsg == null)
            	continue;
            //System.out.println(logMsg);
            for (String pattern : logPatterns) {
            	if (logMsg.indexOf(pattern) != -1) {
            		 if (logEntry.getChangedPaths().size() > 0 ) {
            			 logs.add(logMsg);
                    	 Set changedPathsSet = logEntry.getChangedPaths().keySet();
                         for (Iterator changedPaths = changedPathsSet.iterator(); changedPaths.hasNext(); ) {
                             SVNLogEntryPath entryPath = (SVNLogEntryPath ) logEntry.getChangedPaths().get(changedPaths.next());
                             if (entryPath.getType() == 'D' ||
                            		 entryPath.getKind() == SVNNodeKind.DIR) {
                            	 continue;
                             }
                             String path = entryPath.getPath();
                             set.add(path.substring(preLen));
                         }
                    }
            		break;
            	}
            }
		}
		String[] paths = (String[])set.toArray(new String[set.size()]);
		StringBuilder sb = new StringBuilder();
		for (String log : logs) {
			sb.append(log + "\r\n");
		}
		return new ChangedSVNFiles(paths, sb.toString());
	}
	
	public static void getFile(String svnRoot, String user, String password, File rootDir, String[] paths) throws SVNException {
		if (paths == null || paths.length == 0)
			return;
		long ts = System.currentTimeMillis();
		DAVRepositoryFactory.setup();
		DefaultSVNOptions options = SVNWCUtil.createDefaultOptions(new File("."), true);
		SVNClientManager manager = SVNClientManager.newInstance(options, user, password);
		SVNUpdateClient client = manager.getUpdateClient();
		client.setDebugLog(new ISVNDebugLog() {
			
			public void logSevere(SVNLogType logType, Throwable th) {

				
			}
			
			public void logSevere(SVNLogType logType, String message) {
				System.out.println("===============" + message);
				// TODO Auto-generated method stub
				
			}
			
			public void logFinest(SVNLogType logType, String message) {
				System.out.println("===============" + message);
				
			}
			
			public void logFinest(SVNLogType logType, Throwable th) {
				// TODO Auto-generated method stub
				
			}
			
			public void logFiner(SVNLogType logType, String message) {
				System.out.println("===============" + message);
				
			}
			
			public void logFiner(SVNLogType logType, Throwable th) {
				
			}
			
			public void logFine(SVNLogType logType, String message) {
				System.out.println("===============" + message);
				
			}
			
			public void logFine(SVNLogType logType, Throwable th) {
				// TODO Auto-generated method stub
				
			}
			
			public void logError(SVNLogType logType, Throwable th) {
				// TODO Auto-generated method stub
				
			}
			
			public void logError(SVNLogType logType, String message) {
				System.out.println("===============" + message);
				
			}
			
			public void log(SVNLogType logType, String message, byte[] data) {
				System.out.println("===============" + message);
				
			}
			
			public void log(SVNLogType logType, String message, Level logLevel) {
				System.out.println("===============" + message);
				
			}
			
			public void log(SVNLogType logType, Throwable th, Level logLevel) {
				// TODO Auto-generated method stub
				
			}
			
			public void flushStream(Object stream) {
				// TODO Auto-generated method stub
				
			}
			
			public OutputStream createOutputLogStream() {
				// TODO Auto-generated method stub
				return null;
			}
			
			public OutputStream createLogStream(SVNLogType logType, OutputStream os) {
				// TODO Auto-generated method stub
				return null;
			}
			
			public InputStream createLogStream(SVNLogType logType, InputStream is) {
				// TODO Auto-generated method stub
				return null;
			}
			
			public OutputStream createInputLogStream() {
				// TODO Auto-generated method stub
				return null;
			}
		});
		rootDir.mkdirs();
		
		List<File> exists = new ArrayList<File>();
		for (String path : paths) {
			File file = new File(rootDir, path);
			if (!file.exists()) {
				file.getParentFile().mkdirs();
			} else {
				exists.add(file);
				continue;
			}
			SVNURL svnURL = SVNURL.parseURIDecoded(svnRoot + path);
			
			client.doExport(svnURL, file.getParentFile(), SVNRevision.HEAD, SVNRevision.HEAD, null, true, SVNDepth.FILES);
		}
		if (!exists.isEmpty())
			client.doUpdate(exists.toArray(new File[exists.size()]), SVNRevision.HEAD, SVNDepth.FILES, true, true);
		logger.info("export " + paths.length + " file to " + rootDir + " cost " + (System.currentTimeMillis() - ts) + "ms");
	}
	
	/**
	 * 检出或更新指定工程
	 * @param branch 分支名称
	 * @param user 登录用户名
	 * @param password 登录密码
	 * @param module 模块名称
	 * @param rootDir 本地SVN根目
	 * @throws SVNException
	 */
	public static void checkOutModule(String branch, String module) throws SVNException {
		
		RepositoryInfo repos = BuildReposManager.getByName(branch);
		DAVRepositoryFactory.setup();
		DefaultSVNOptions options = SVNWCUtil.createDefaultOptions(new File("."), true);
		SVNClientManager manager = SVNClientManager.newInstance(options, repos.getSvnUser(), repos.getSvnPassword());
		SVNUpdateClient client = manager.getUpdateClient();
		//if (logger != null)
		//	client.setEventHandler(logger);
		
		File toDir = new File(repos.getSvnWorkspace(), module);
		client.getDebugLog().createLogStream(SVNLogType.CLIENT, System.out);
		if (new File(toDir, ".svn").exists()) {
			client.doUpdate(toDir, SVNRevision.HEAD, SVNDepth.INFINITY, false, false);
		} else { 
			String svnUrl = BuildReposManager.getByName(branch).getSvnUrl();
			client.doCheckout(SVNURL.parseURIDecoded(svnUrl + module), toDir, 
				SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, false);
		}
		
	}
	
	
	
	/**
	 * 给某几个工程的最新版本打上标记
	 * @param snvName svn名称
	 * @param user 登录用户名
	 * @param pwd 登录密码
	 * @param projects 待打tag工程列表
	 * @param tagName 标记名称
	 * @param message 打标记时的消息
	 * @throws SVNException 
	 */
	public static void tagProjects(String snvName, String user, String pwd, String[] projects, 
			String tagName, String message) 
			throws Exception {
		RepositoryInfo info = BuildReposManager.getByName(snvName);
		
		assert info != null;
		assert projects != null;
		if (projects.length == 0)
			return;
		if (tagName.startsWith("/"))
			tagName = tagName.substring(1);
		if (!tagName.endsWith("/"))
			tagName += "/";
		if (message == null)
			message = "";
		
		DAVRepositoryFactory.setup();
		SVNRepository repository = SVNRepositoryFactory.create(SVNURL.parseURIDecoded(info.getSvnUrl()));
		ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(user, pwd);
		repository.setAuthenticationManager(authManager);
		
		DefaultSVNOptions options = SVNWCUtil.createDefaultOptions(new File("."), true);
		SVNClientManager manager = SVNClientManager.newInstance(options, user, pwd);
		SVNCopyClient client = manager.getCopyClient();
		
		for (String project : projects) {
			String dstUrl = info.getTagUrl() + tagName + project;
			SVNURL sUrl = SVNURL.parseURIDecoded(info.getSvnUrl() + project);
			SVNURL dst = SVNURL.parseURIDecoded(dstUrl);
			SVNCopySource source = new  SVNCopySource(SVNRevision.HEAD, SVNRevision.HEAD, sUrl);
			SVNCommitInfo commitInfo = client.doCopy(new SVNCopySource[]{source},
					dst, false, true, false, message , null);
			System.out.println("tag:" + dstUrl);
			System.out.println(commitInfo);
		}
	}
}
