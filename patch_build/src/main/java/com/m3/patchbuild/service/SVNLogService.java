package com.m3.patchbuild.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;

import com.m3.common.SVNUtil;
import com.m3.patchbuild.dao.SVNLogDAO;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.SVNLog;

/**
 * SVN日志服务类
 * @author MickeyMic
 *
 */
public class SVNLogService {
	private static final Logger logger = Logger.getLogger(SVNLog.class);
	
	private static SVNLogDAO dao = new SVNLogDAO();

	/**
	 * 根据关键字查找所有SVN日志信息
	 * @param keywords
	 * @return
	 * @throws SVNException 
	 */
	public static List<SVNLog> listByKeyword(String branch, String keywords) throws SVNException {
		BuildBranch bBranch = BuildBranchService.getBranch(branch);
		if (bBranch == null)
			return new ArrayList<SVNLog>();
		SVNLog maxLog = dao.getMaxRevision(branch);
		long maxRevision = maxLog == null ? 0L : maxLog.getRevision();
		long ts = System.currentTimeMillis();
		Set<SVNLogEntry> newLogs = SVNUtil.getSVNLogEntry(bBranch.getSvnUrl(), bBranch.getSvnUser(), 
				bBranch.getSvnPassword(), maxRevision);
		
		//保存最新的SVN日志到本地
		if (newLogs.size() > 0) {
			List<SVNLog> list = new ArrayList<SVNLog>();
			for (SVNLogEntry nl : newLogs) {
				Map<String, SVNLogEntryPath> map = nl.getChangedPaths();
				for (String url : map.keySet()) {
					SVNLogEntryPath path = map.get(url);
					SVNLog log = new SVNLog();
					log.setBranch(branch);
					log.setAuthor(nl.getAuthor());
					log.setModifyTime(nl.getDate());
					log.setLogMessage(nl.getMessage());
					log.setRevision(nl.getRevision());
					log.setFileType(path.getKind().toString());
					log.setModifyType(path.getType());
					log.setPath(path.getPath());
					list.add(log);
				}
			}
			dao.saveBatch(list);
			logger.info("update " + list.size() + " svn logs from " + maxRevision
					+ " cost " + (System.currentTimeMillis() - ts) + "ms");
		}
		
		return dao.findByKeywords(branch, keywords);
	}
}
