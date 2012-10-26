package com.m3.patchbuild.service;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.tmatesoft.svn.core.SVNException;

import com.m3.common.FileUtil;
import com.m3.common.SVNUtil;
import com.m3.patchbuild.dao.BuildPackDAO;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.BuildPackStatus;
import com.m3.patchbuild.info.CheckInfo;


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
	private static void save(BuildPack bp) {
		dao.saveInfo(bp);
	}
	
	/**
	 * 准备构建，获取相应的文件并记录版本信息
	 * @param bp
	 * @throws Exception 
	 */
	public static void prepareBuild(BuildPack bp) throws Exception {
		String[] paths = bp.getFilePaths();
		BuildBranch bBranch = bp.getBranch();
		//下载SVN中的文件
		File svnRoot = new File(bp.getWSRoot(), BuildBranch.DIR_SVN);
		FileUtil.emptyDir(svnRoot);
		SVNUtil.getFile(bBranch.getSvnUrl(), bBranch.getSvnUser(), bBranch.getSvnPassword(), svnRoot, paths);
		SVNLogService.fillBuildPack(bp);
		bp.setStatus(BuildPackStatus.request);
		dao.saveInfo(bp);
		//保存成功后发邮件通知
		MailService.sendMail(bp);
	}
	
	/**
	 * 设计人员检查构建信息
	 * @param bp
	 * @param info
	 * @throws Exception
	 */
	public static void check(BuildPack bp, CheckInfo info) throws Exception {
		bp.setChecker(info.getUser());
		bp.setCheckTime(new Date());
		bp.setStatus(info.isPass() ? BuildPackStatus.checked : BuildPackStatus.checkFail);
		bp.setFailReason(info.isPass() ? "" : info.getMessage());
		save(bp);
		MailService.sendMail(bp);
		BuildService.add(bp);
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

	/**
	 * 列出所有待构建(检查通过)的构建包信息
	 * @return
	 */
	public static List<BuildPack> listByStatus(BuildPackStatus status) {
		return dao.listByStatus(status);
	}

	/**
	 * 构建包已经构建的处理
	 * @param bp
	 * @throws Exception 
	 */
	public static void builded(BuildPack bp) throws Exception {
		save(bp);
		MailService.sendMail(bp);
	}
	
}
