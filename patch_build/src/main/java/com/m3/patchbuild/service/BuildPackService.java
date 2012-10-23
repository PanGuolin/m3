package com.m3.patchbuild.service;

import java.io.File;

import org.tmatesoft.svn.core.SVNException;

import com.m3.common.FileUtil;
import com.m3.common.SVNUtil;
import com.m3.patchbuild.dao.BuildPackDAO;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;


/**
 * 构建包Service对象
 * @author MickeyMic
 *
 */
public class BuildPackService {

	private static BuildPackDAO dao = new BuildPackDAO();
	
	/**
	 * 保存对象
	 * @param bp
	 */
	public static void save(BuildPack bp) {
		dao.saveInfo(bp);
	}
	
	/**
	 * 准备构建，获取相应的文件并记录版本信息
	 * @param bp
	 * @throws SVNException
	 */
	public static void prepareBuild(BuildPack bp) throws SVNException {
		String[] paths = bp.getFilePaths();
		BuildBranch bBranch = bp.getBranch();
		File localRoot = new File(bBranch.getWorkspace(), bp.getBuildNo());
		FileUtil.emptyDir(localRoot);
		SVNUtil.getFile(bBranch.getSvnUrl(), bBranch.getSvnUser(), bBranch.getSvnPassword(), localRoot, paths);
		SVNLogService.fillBuildPack(bp);
		bp.setStatus(BuildPackStatus.request);
		dao.saveInfo(bp);
		
	}
	
	/**
	 * 查找对象
	 * @param branch
	 * @param buildNo
	 * @return
	 * @throws SVNException
	 */
	public static BuildPack find(String branch, String buildNo) {
		return dao.find(branch, buildNo);
	}
	
	public static void delete(BuildPack bp) {
		dao.delete(bp);
		
	}
}
