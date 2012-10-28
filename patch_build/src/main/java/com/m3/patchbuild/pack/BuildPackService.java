package com.m3.patchbuild.pack;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.tmatesoft.svn.core.SVNException;

import com.m3.common.ContextUtil;
import com.m3.common.FileUtil;
import com.m3.common.SVNUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.common.service.MailService;
import com.m3.patchbuild.common.service.SVNLogService;
import com.m3.patchbuild.exception.BussException;
import com.m3.patchbuild.exception.CanNotBuildEmptyException;
import com.m3.patchbuild.exception.DependsUnpublishException;
import com.m3.patchbuild.exception.GetSVNFileException;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.exception.NotMainBranchException;
import com.m3.patchbuild.exception.PackExistsException;
import com.m3.patchbuild.patch.PatchInfo;
import com.m3.patchbuild.patch.PatchService;


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
	 * @throws Exception 
	 */
	public static void prepareBuild(BuildPack bp, String[] files) throws BussException {
		if (files == null)
			throw new CanNotBuildEmptyException(bp);
		List<String> list = new ArrayList<String>();
		for (String f : files) {
			f = f.trim();
			if (f.length() == 0) continue;
			if (!list.add(f))
				list.add(f);
		}
		if (list.isEmpty())
			throw new CanNotBuildEmptyException(bp);
		files = (String[])list.toArray(new String[list.size()]);

		BuildPack oldPack = BuildPackService.find(bp.getBranch().getBranch(), bp.getBuildNo());
		if (oldPack != null) {
			BuildPackStatus status = oldPack.getStatus();
			if (!BuildPackStatus.buildFail.equals(status) && 
					!BuildPackStatus.checkFail.equals(status) &&
					!BuildPackStatus.testFail.equals(status)  && 
					!BuildPackStatus.builded.equals(status) &&
					!BuildPackStatus.request.equals(status)) {
				throw new PackExistsException(bp, oldPack);
			}
			if (BuildPackStatus.builded.equals(status) && 
					oldPack.getRequester() != null &&
					!oldPack.getRequester().equals(bp.getRequester())) {
				throw new PackExistsException(bp, oldPack);
			}
			bp.setUuid(oldPack.getUuid());
		}
		
		BuildBranch branch = bp.getBranch();
		if (branch.getUuid() == null) {
			branch = BuildBranchService.getBranch(bp.getBranch().getBranch());
			bp.setBranch(branch);
		}
		
		//下载SVN中的文件
		//File svnRoot = new File(branch.getWorkspace(), BuildBranch.DIR_SVN);
		File bpRoot = new File(bp.getWSRoot(), BuildBranch.DIR_SVN);
		FileUtil.emptyDir(bpRoot);
		//FileUtils fu = FileUtils.getFileUtils();
		try {
			SVNUtil.getFile(branch.getSvnUrl(), branch.getSvnUser(), branch.getSvnPassword(), bpRoot, files);
			SVNLogService.fillBuildPack(bp, files);
//			for (String path : files) {
//				File source = new File(svnRoot, path);
//				File dest = new File(bpRoot, path);
//				fu.copyFile(source, dest);
//			}
		} catch (Exception ex) {
			throw new GetSVNFileException(ex);
		}
		bp.setRequester(ContextUtil.getUserId());
		bp.setRequestTime(new Date());
		bp.setStatus(BuildPackStatus.request);
		dao.saveInfo(bp);
		BuildService.add(bp);
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
	public static void builded(BuildPack bp) {
		save(bp);
		MailService.sendMail(bp);
	}
	
	
	/**
	 * 发布构建包
	 * @param bp
	 * @throws Exception
	 */
	public static void publish(BuildPack bp) throws BussException {
		BuildBranch branch = bp.getBranch();
		if (!StringUtil.isEmpty(branch.getParent()))
			throw new NotMainBranchException(bp);
		if (!BuildPackStatus.pass.equals(bp.getStatus())) {
			throw new IllegalBPStateException(bp, BuildPackStatus.pass);
		}
		//不能发布有依赖（未发布）的构建包
		List<BuildPack> depends = dao.listUnpublishDepends(bp);
		if (depends != null && !depends.isEmpty()) {
			throw new DependsUnpublishException(bp, depends);
		}
		
		PatchInfo info = PatchService.getPatch(branch, (Date)null);
		//如果当天还没有补丁生成，则先生成补丁
		if (info == null) {
			info = PatchService.createPatch(branch);
		}
		
		
	}
	
}
