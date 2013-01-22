package com.m3.patchbuild.patch.action;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.patch.IPatchService;
import com.m3.patchbuild.patch.Patch;
import com.m3.patchbuild.svn.ISVNLogService;
import com.m3.patchbuild.svn.SVNLog;
import com.m3.patchbuild.svn.SVNUtil;
import com.m3.patchbuild.svn.TagFileInfo;

/**
 * 根据补丁创建子分支Action
 * @author pangl
 *
 */
public class CreateBranchAction extends BaseAction{
	private static final Logger logger = Logger.getLogger(CreateBranchAction.class);
	
	private Map<String, Object> dataMap = new HashMap<String, Object>();

	private String i = null; //补丁uuid
	private String branchUrl = null; //创建的分支地址
	
	@Override
	protected String doExecute() throws Exception {
		if (branchUrl == null) {
			Patch patch = valid();
			branchUrl = patch.getBranch().getSvnTagRoot();
			String url = branchUrl;
			if (url != null) {
				url = url.replaceAll("/tags/", "/branches/");
			}
			if (!url.endsWith("/"))
				url += "/";
			url += patch.getName();
			this.branchUrl = url;
			return "next";
		} else {
			final Patch patch = valid();
			Thread thread = new Thread("create sub branch" + branchUrl) {
				@Override
				public void run() {
					try {
						createBranch(patch);
						//msgService.sendNotifyMessage(userId, "分支已创建", "分支：" + branchUrl + "已成功创建！", patch, null);
					} catch (Exception e) {
						logger.error("创建分支错误");
						//msgService.sendNotifyMessage(userId, "分支创建错误", "分支：" + branchUrl + "创建错误！" + e.getMessage(), patch, null);
					}
				}
			};
			thread.start();
			dataMap.put("branchName", branchUrl);
			return SUCCESS;
		}
	}
	
	private Patch valid() throws Exception {
		IPatchService patchService = (IPatchService)BussFactory.getService(Patch.class);
		Patch patch = (Patch) patchService.findByUuid(i);
		Calendar cur = Calendar.getInstance();
		cur.set(cur.get(Calendar.YEAR), cur.get(Calendar.MONTH), cur.get(Calendar.DAY_OF_MONTH));
		cur.add(Calendar.DAY_OF_YEAR, -1);
		Calendar cre = Calendar.getInstance();
		cre.setTime(patch.getCreateTime());
		cre.set(cre.get(Calendar.YEAR), cre.get(Calendar.MONTH), cre.get(Calendar.DAY_OF_MONTH));
		if (cur.before(cre)) {
			throw new Exception("无法创建未发布的补丁");
		}
		return patch;
	}
		
	private void createBranch(Patch patch) throws Exception {
		
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		Map<String, TagFileInfo> tagFiles = new HashMap<String, TagFileInfo>();
		List<Pack> packs = packService.listPublished(patch.getBranch(), patch.getLastModify());
		for (Pack pack : packs) {
			for (BuildFile f : pack.getBuildFiles()) {
				TagFileInfo of = tagFiles.get(f.getUrl());
				if (of != null && of.getRevision() >= f.getRevision())
					continue;
				of = of == null ? new TagFileInfo() : of;
				of.setPath(f.getUrl());
				of.setRevision(f.getRevision());
				tagFiles.put(f.getUrl(), of);
			}
		}
		ISVNLogService logService = (ISVNLogService)BussFactory.getService(SVNLog.class);
		List<Object[]> logs = logService.listBaseVersion(patch.getBranch());
		for (Object[] log : logs) {
			if (!tagFiles.containsKey(log[0])) {
				TagFileInfo info = new TagFileInfo();
				info.setPath((String) log[0]);
				info.setRevision((Long) log[1]);
				tagFiles.put(info.getPath(), info);
			}
		}
		SVNUtil.createBranch(patch.getBranch(), tagFiles.values(), branchUrl, " create by patch build system at " + new Date());
	}
	public Map<String, Object> getDataMap() {
		return dataMap;
	}
	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
	public String getI() {
		return i;
	}
	public void setI(String i) {
		this.i = i;
	}
	public String getBranchUrl() {
		return branchUrl;
	}
	public void setBranchUrl(String branchUrl) {
		this.branchUrl = branchUrl;
	}
	

	
}
