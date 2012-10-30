package com.m3.patchbuild.pack;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.tmatesoft.svn.core.SVNException;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.exception.BussException;
import com.m3.patchbuild.exception.CanNotBuildEmptyException;
import com.m3.patchbuild.exception.DependsUnpublishException;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.exception.NotMainBranchException;
import com.m3.patchbuild.exception.PackExistsException;
import com.m3.patchbuild.message.Message;
import com.m3.patchbuild.message.MessageService;
import com.m3.patchbuild.patch.Patch;
import com.m3.patchbuild.patch.PatchService;


/**
 * 构建包Service对象
 * @author MickeyMic
 *
 */
public class PackService extends AbstractService {

	public PackService() {
		super(new PackDAO());
	}

	public PackDAO getDao() {
		return (PackDAO)super.getDao();
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
	public void prepareBuild(Pack bp, Set<String> files) throws BussException {
		if (files == null || files.isEmpty())
			throw new CanNotBuildEmptyException(bp);
		
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
			//bp.setUuid(oldPack.getUuid());
			bp = oldPack;
		}
		
		bp.setRequester(ContextUtil.getUserId());
		bp.setRequestTime(new Date());
		bp.setStatus(PackStatus.request);
		if (bp.getBranch().getUuid() == null) {
			Branch branch = ((BranchService)BussFactory.getService(Branch.class)).getBranch(bp.getBranch().getBranch());
			bp.setBranch(branch);
		}
		getDao().saveInfo(bp);
		BaseDAO.commit();
		BuildService.add(bp, files);
		//保存成功后发邮件通知
		//((MessageService)BussFactory.getService(Message.class)).statusChanged(bp);
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
		((MessageService)BussFactory.getService(Message.class)).statusChanged(bp);
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
		((MessageService)BussFactory.getService(Message.class)).statusChanged(bp);
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
