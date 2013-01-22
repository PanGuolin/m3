package com.m3.patchbuild.pack;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.DaoUtil;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.IBranchService;
import com.m3.patchbuild.exception.BussException;
import com.m3.patchbuild.exception.CanNotBuildEmptyException;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.exception.PackExistsException;
import com.m3.patchbuild.pack.action.PackQuery;
import com.m3.patchbuild.patch.PublishService;


/**
 * 构建包Service对象
 * @author MickeyMic
 *
 */
public class PackService extends BaseService implements IPackService {
	
	private static final Logger logger = Logger.getLogger(PackService.class);

	private PackDAO dao = new PackDAO();
	public PackService() {
	}

	public PackDAO getDao() {
		return dao;
	}
	
	/**
	 * 保存对象
	 * @param bp
	 */
	public void saveInfo(Pack pack) {
		final int maxLen = 400;
		if (pack.getComments() != null && pack.getComments().length() > maxLen)
			pack.setComments(pack.getComments().substring(0, maxLen));
		DaoUtil.saveInfo(pack);
	}
	
	public void cancel(Pack pack) {
		getDao().removeDependOn(pack);
		DaoUtil.delete(pack);
	}
	
	/**
	 * 准备构建，获取相应的文件并记录版本信息
	 * @param bp
	 * @throws Exception 
	 */
	public void prepareBuild(Pack pack, Set<String> files) throws BussException {
		if (files == null || files.isEmpty())
			throw new CanNotBuildEmptyException(pack);
		
		Pack oldPack = find(pack.getBranch().getBranch(), pack.getBuildNo());
		if (oldPack != null) {
			PackStatus status = oldPack.getStatus();
			if (!PackStatus.buildFail.equals(status) && 
					!PackStatus.checkFail.equals(status) &&
					!PackStatus.testFail.equals(status)  && 
					!PackStatus.builded.equals(status) &&
					!PackStatus.request.equals(status)) {
				throw new PackExistsException(pack, oldPack);
			}
			if (PackStatus.builded.equals(status) && 
					oldPack.getRequester() != null &&
					!oldPack.getRequester().equals(ContextUtil.getUserId())) {
				throw new PackExistsException(pack, oldPack);
			}
			oldPack.setLibfiles(pack.getLibfiles());
			getDao().clearBuildFiles(oldPack);
			pack.setUuid(oldPack.getUuid());
			pack = oldPack;
			//((IMessageService)BussFactory.getService(Message.class)).expiredByBussInfo(pack);
		}
		
		pack.setRequester(ContextUtil.getUserId());
		pack.setRequestTime(new Date());
		pack.setStatus(PackStatus.request);
		pack.getDepends().clear();
		getDao().removeDependOn(pack);
		if (pack.getBranch().getUuid() == null) {
			Branch branch = ((IBranchService)BussFactory.getService(Branch.class)).getBranch(pack.getBranch().getBranch());
			pack.setBranch(branch);
		}
		for (String file : files) {
			BuildFile bf = new BuildFile();
			bf.setUrl(file);
			pack.getBuildFiles().add(bf);
		}
		DaoUtil.saveInfo(pack);
		DaoUtil.commit();
		BuildService.add(pack);
	}
	
	/**
	 * 查找对象
	 * @param branch
	 * @param buildNo
	 * @return
	 * @throws SVNException
	 */
	public Pack find(String branch, String buildNo) {
		return (Pack) DaoUtil.findByBillNo(getBizClass(),
				new String[]{"branch.branch", "buildNo"}, new Object[]{branch, buildNo});
	}
	
	public void delete(Pack bp) {
		DaoUtil.delete(bp);
	}

	/**
	 * 列出所有待构建(检查通过)的构建包信息
	 * @return
	 */
	public List<Pack> listByStatus(PackStatus status) {
		return getDao().listByStatus(status);
	}
	
	/**
	 * 发布构建包
	 * @param bp
	 * @throws Exception
	 */
	public void publish(Pack pack) throws BussException {
		PublishService.publish(pack.getUuid());
	}

	public List<Pack> listByStatus(Collection<PackStatus> slist) {
		return getDao().listByStatus(slist);
	}

	/**
	 * 列出所有 已测试通过的构建包
	 * @param branch
	 * @param pass
	 * @return
	 */
	public List<Pack> listByStatus(String branch, PackStatus status) {
		return getDao().listByStatus(branch, status);
	}

	/**
	 * 列出指定UUID的构建包
	 * @param asList
	 * @return
	 */
	public List<Pack> listByUuids(Collection<String> uuids) {
		return getDao().listByUuids(uuids);
	}

	public void clearBuildFiles(Pack bp) {
		getDao().clearBuildFiles(bp);
	}

	/**
	 * 根据条件查询Pack信息
	 * @param q
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Pack> query(PackQuery q) {
		return (List<Pack>) getDao().list(q);
	}

	/**
	 * 列出所有在指定日期前发布的构建包
	 * @param time
	 * @return
	 */
	public List<Pack> listPublished(Branch branch, Date time) {
		return getDao().listPublished(branch, time);
		
	}

	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return Pack.class;
	}

	@Override
	public void handle(IBussInfo info, Object context) {
		Pack pack = (Pack)info;
		PackHandleContext hContext = (PackHandleContext)context;
		if (hContext.getOldStatus() != null && !hContext.getOldStatus().equals(pack.getStatus())) {
			IllegalBPStateException ex = new IllegalBPStateException(pack, hContext.getOldStatus());
			logger.error("构建处理失败", ex);
			return;
		}
		
		switch(pack.getStatus()) {
			case request: //构建成功或失败
				//构建成功，设置依赖关系
				if (hContext.isFailed()) {
					pack.setFailReason(hContext.getFailReason());
					pack.setStatus(PackStatus.buildFail);
				} else {
					pack.setStatus(PackStatus.builded);
					setDepends(pack);
				}
				pack.setBuildTime(new Date());
				break;
			case builded: //设计师检查
				pack.setChecker(ContextUtil.getUserId());
				pack.setCheckTime(new Date());
				if (!StringUtil.isEmpty(hContext.getFailReason())) {
					pack.setFailReason(hContext.getFailReason());
					pack.setStatus(PackStatus.checkFail);
				} else {
					pack.setFailReason(null);
					pack.setStatus(PackStatus.checked);
					if (!StringUtil.isEmpty(pack.getTester())) {
						pack.setStatus(PackStatus.assigned);
					}
				}
				break;
			case checked://分配
				if (StringUtil.isEmpty(hContext.getTester())) {
					throw new RuntimeException("必须指定测试员");
				}
				pack.setAssigner(ContextUtil.getUserId());
				pack.setAssignTime(new Date());
				pack.setStatus(PackStatus.assigned);
				pack.setTester(hContext.getTester());
				break;
			case assigned: //开始测试
				pack.setTester(ContextUtil.getUserId());
				pack.setStatus(PackStatus.testing);
				pack.setTestTime(new Date());
				break;
			case testing: //反馈测试结果
				if (!StringUtil.isEmpty(hContext.getFailReason())) {
					pack.setStatus(PackStatus.testFail);
					pack.setFailReason(hContext.getFailReason());
				} else {
					pack.setStatus(PackStatus.pass);
					pack.setPassTime(new Date());
				}
				break;
			case publishFail: //重置发布状态
				pack.setStatus(PackStatus.pass);
				break;
			case pass://发布
				if (hContext.isFailed()) {
					pack.setStatus(PackStatus.publishFail);
					pack.setFailReason(hContext.getFailReason());
				} else {
					pack.setStatus(PackStatus.published);
					pack.setPatch(hContext.getPatchNo());
					//getDao().removeDependOn(pack);
				}
				pack.setDeployer(hContext.getDeployer());
				pack.setDeployTime(new Date());
				break;
				default: throw new IllegalStateException();
		}
		switch(pack.getStatus()) {
			case request:
			case checkFail:
			case published:
			case testFail:
				getDao().removeDependOn(pack);
				break;
			default: break;
		}
		saveInfo(pack);
	}

	@Override
	public PackHandleContext newContext() {
		return new PackHandleContext();
	}
	
	/**
	 * 设置对其它构建包的依赖关系 
	 * @param pak
	 */
	private void setDepends(Pack bp) {
		List<Pack> deps = getDao().findDepends(bp);
		for (Pack pk : deps) {
			if (!pk.getUuid().equals(bp.getUuid())) {
				switch (pk.getStatus()) {
				case assigned:
				case builded:
				case checked:
				case pass:
				case testing:
				case publishFail:
					bp.getDepends().add(pk);
					break;
				case buildFail:
				case checkFail:
				case init:
				case published:
				case request:
				case testFail:break;
				default:
					break;
				}
			}
		}
	}
		
}
