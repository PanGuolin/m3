package com.m3.patchbuild.common.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;

import com.m3.common.SVNUtil;
import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.common.dao.SVNLogDAO;
import com.m3.patchbuild.common.info.SVNLog;
import com.m3.patchbuild.pack.BuildPack;

/**
 * SVN日志服务类
 * @author MickeyMic
 *
 */
public class SVNLogService {
	private static final Logger logger = Logger.getLogger(SVNLog.class);
	
	private static SVNLogDAO dao = new SVNLogDAO();
	
	
	/**
	 * 将SVN日志信息更新到本地数据库
	 * @param branch
	 * @param keywords
	 * @return
	 * @throws SVNException
	 */
	public static void updateLog(BuildBranch branch) throws SVNException {
		long maxRevision = dao.getMaxRevision(branch);
		long ts = System.currentTimeMillis();
		Set<SVNLogEntry> newLogs = SVNUtil.getSVNLogEntry(branch.getSvnUrl(), branch.getSvnUser(), 
				branch.getSvnPassword(), maxRevision);
		
		//保存最新的SVN日志到本地
		if (newLogs.size() > 0) {
			List<SVNLog> list = new ArrayList<SVNLog>();
			for (SVNLogEntry nl : newLogs) {
				if (nl.getRevision() == maxRevision)
					continue;
				Map<String, SVNLogEntryPath> map = nl.getChangedPaths();
				for (String url : map.keySet()) {
					SVNLogEntryPath path = map.get(url);
					SVNLog log = new SVNLog();
					log.setBranch(branch.getBranch());
					log.setAuthor(nl.getAuthor());
					log.setModifyTime(nl.getDate());
					log.setLogMessage(nl.getMessage());
					log.setRevision(nl.getRevision());
					log.setFileType(path.getKind().toString());
					log.setModifyType(path.getType());
					log.setPath(branch.trimUrl(path.getPath()));
					list.add(log);
				}
			}
			logger.info("有 " + list.size() + "条SVN日志需要更新,起始版本：" + maxRevision + " ，查询费时 " + (System.currentTimeMillis() - ts) + "ms");
			if (list.size() > 0) {
				ts = System.currentTimeMillis();
				dao.saveBatch(list);
				logger.info("保存日志到数据库完成，费时 " + (System.currentTimeMillis() - ts) + "ms");
			}
		}
	}

	/**
	 * 根据关键字查找所有SVN日志信息
	 * @param keywords
	 * @return
	 * @throws SVNException 
	 */
	public static List<SVNLog> listByKeyword(BuildBranch branch, String keywords) throws SVNException {
		updateLog(branch);
		return dao.findByKeywords(branch, keywords);
	}
	
	/**
	 * 更新构建包中的文件版本
	 * @param pack
	 * @throws SVNException 
	 */
	public static void fillBuildPack(BuildPack pack, String[] files) throws SVNException {
		updateLog(pack.getBranch());
		dao.fillBuildPack(pack, files);
	}
}
