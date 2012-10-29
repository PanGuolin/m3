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
import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.exception.BussException;
import com.m3.patchbuild.exception.CanNotBuildEmptyException;
import com.m3.patchbuild.exception.DependsUnpublishException;
import com.m3.patchbuild.exception.GetSVNFileException;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.exception.NotMainBranchException;
import com.m3.patchbuild.exception.PackExistsException;
import com.m3.patchbuild.message.MailService;
import com.m3.patchbuild.patch.Patch;
import com.m3.patchbuild.patch.PatchService;
import com.m3.patchbuild.svn.SVNLogService;


/**
 * 构建包Service对象
 * @author MickeyMic
 *
 */
public class PackService extends AbstractService {

	public PackService() {
		super(new BuildPackDAO());
	}

	public BuildPackDAO getDao() {
		return (BuildPackDAO)super.getDao();
	}
	
	/**
	 * 保存对象
	 * @param bp
	 */
	public void save(Pack bp) {
		getDao().saveInfo(bp);
	}
	
	/**
	 * 准备构建，获取相应的文件并记录版本信息
	 * @param bp
	 * @throws Exception 
	 */
	public void prepareBuild(Pack bp, String[] files) throws BussException {
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

		Pack oldPack = find(bp.getBranch().getBranch(), bp.getBuildNo());
		if (oldPack != null) {
			PackStatus status = oldPack.getStatus();
			if (!PackStatus.buildFail.equals(status) && 
					!PackStatus.checkFail.equals(status) &&
					!PackStatus.testFail.equals(status)  && 
					!PackStatus.builded.equals(status) &&
					!PackStatus.request.equals(status)) {
				throw new PackExistsException(bp, oldPack);
			}
			if (PackStatus.builded.equals(status) && 
					oldPack.getRequester() != null &&
					!oldPack.getRequester().equals(ContextUtil.getUserId())) {
				throw new PackExistsException(bp, oldPack);
			}
			bp.setUuid(oldPack.getUuid());
		}
		
		Branch branch = bp.getBranch();
		if (branch.getUuid() == null) {
			branch = BuildBranchService.getBranch(bp.getBranch().getBranch());
			bp.setBranch(branch);
		}
		
		//下载SVN中的文件
		//File svnRoot = new File(branch.getWorkspace(), BuildBranch.DIR_SVN);
		File bpRoot = new File(bp.getWSRoot(), Branch.DIR_SVN);
		FileUtil.emptyDir(bpRoot);
		try {
			SVNUtil.getFile(branch.getSvnUrl(), branch.getSvnUser(), branch.getSvnPassword(), bpRoot, files);
			SVNLogService.fillBuildPack(bp, files);
		} catch (Exception ex) {
			throw new GetSVNFileException(ex);
		}
		bp.setRequester(ContextUtil.getUserId());
		bp.setRequestTime(new Date());
		bp.setStatus(PackStatus.request);
		getDao().saveInfo(bp);
		BaseDAO.commit();
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
	public void check(Pack bp, CheckInfo info) throws Exception {
		bp.setChecker(info.getUser());
		bp.setCheckTime(new Date());
		bp.setStatus(info.isPass() ? PackStatus.checked : PackStatus.checkFail);
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
	public Pack find(String branch, String buildNo) {
		return getDao().find(branch, buildNo);
	}
	
	public void delete(Pack bp) {
		getDao().delete(bp);
	}

	/**
	 * 列出所有待构建(检查通过)的构建包信息
	 * @return
	 */
	public List<Pack> listByStatus(PackStatus status) {
		return getDao().listByStatus(status);
	}

	/**
	 * 构建包已经构建的处理
	 * @param bp
	 * @throws Exception 
	 */
	public void builded(Pack bp) {
		save(bp);
		MailService.sendMail(bp);
	}
	
	
	/**
	 * 发布构建包
	 * @param bp
	 * @throws Exception
	 */
	public void publish(Pack bp) throws BussException {
		Branch branch = bp.getBranch();
		if (!StringUtil.isEmpty(branch.getParent()))
			throw new NotMainBranchException(bp);
		if (!PackStatus.pass.equals(bp.getStatus())) {
			throw new IllegalBPStateException(bp, PackStatus.pass);
		}
		//不能发布有依赖（未发布）的构建包
		List<Pack> depends = getDao().listUnpublishDepends(bp);
		if (depends != null && !depends.isEmpty()) {
			throw new DependsUnpublishException(bp, depends);
		}
		
		PatchService patchService = ((PatchService)BussFactory.getService(Patch.class));
		Patch info = patchService.getPatch(branch, (Date)null);
		//如果当天还没有补丁生成，则先生成补丁
		if (info == null) {
			info = patchService.createPatch(branch);
		}
	}
	
}
