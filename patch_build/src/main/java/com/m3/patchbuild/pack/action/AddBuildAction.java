package com.m3.patchbuild.pack.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.svn.ISVNLogService;
import com.m3.patchbuild.svn.SVNLog;

/**
 * 新增构建包，步骤1,根据构建包查找相应的构建文件
 * @author MickeyMic
 *
 */
public class AddBuildAction extends BaseAction{
	
	private Pack pack = null;//构建包信息
	
	private String find = null; //查找
	
	private String files = null; //文件列表
	
	private String i = null; //重新构建的UUID

	@Override
	protected String doExecute() throws Exception {
		if (i != null) {
			pack = (Pack) ((IPackService)BussFactory.getService(Pack.class)).findByUuid(i);
			if (pack != null) {
				String[] fs = pack.getFilePaths();
				List<String> list = new ArrayList<String>();
				list.addAll(Arrays.asList(fs));
				Collections.sort(list);
				files = "";
				for (String f : list) {
					files += f + ";\n"; 
				}
				return INPUT;
			}
		}
		
		if (find != null) {
			String keywords = pack.getKeywords();
			if (StringUtil.isEmpty(keywords)) {
				keywords = pack.getBuildNo();
			}
			Branch branch = ContextUtil.getCurrentBranch();
			ISVNLogService logService = (ISVNLogService)BussFactory.getService(SVNLog.class);
			List<SVNLog> logs = logService.listByKeyword(branch, keywords);
			
			StringBuffer cmt = new StringBuffer();
			if (pack.getComments() != null)
				cmt.append(pack.getComments());
			List<String> list = new ArrayList<String>();
			for (SVNLog log : logs) {
				String path = log.getPath().trim();
				if (path.indexOf('.') == 0) continue;
				if (!list.contains(path)) {
					list.add(path);
				}
				String msg = log.getLogMessage();
				if (!StringUtil.isEmpty(msg) && cmt.indexOf(msg) == -1) {
					cmt.append(";" + msg);
				}
			}
			pack.setComments(cmt.toString());
			if (list.isEmpty()) {
				this.files = "";
				setTips("没有找到相关的文件，请重新设置关键字或手工录入");
				return INPUT;
			}
			Collections.sort(list);
			StringBuilder sb = new StringBuilder();
			for (String s : list) {
				sb.append(s + ";\n");
			}
			this.files = sb.toString();
			return INPUT;
		} else {
			if (StringUtil.isEmpty(files)) {
				setTips("不能构建空的包");
				return INPUT;
			}
			Set<String> set = new HashSet<String>();
			for (String s : files.split(";")) {
				s = s.trim();
				if (s.length() == 0)
					continue;
				set.add(s);
			}
			pack.setRequester(ContextUtil.getUserId());
			pack.setBranch(ContextUtil.getCurrentBranch());
			((IPackService)BussFactory.getService(Pack.class)).prepareBuild(pack, set);
			return SUCCESS;
		}
		
	}

	public Pack getPack() {
		return pack;
	}

	public void setPack(Pack pack) {
		this.pack = pack;
	}

	public void setFind(String find) {
		this.find = find;
	}

	public String getFiles() {
		return files;
	}

	public void setFiles(String files) {
		this.files = files;
	}

	public String getI() {
		return i;
	}

	public void setI(String i) {
		this.i = i;
	}
	
}
