package com.m3.patchbuild.pack.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.common.info.SVNLog;
import com.m3.patchbuild.common.service.SVNLogService;
import com.m3.patchbuild.pack.BuildPack;
import com.m3.patchbuild.pack.BuildPackService;

/**
 * 新增构建包，步骤1,根据构建包查找相应的构建文件
 * @author MickeyMic
 *
 */
public class AddBuildAction extends BaseAction{
	
	private BuildPack pack = null;//构建包信息
	
//	private String build = null; //是否构建
	
	private String find = null; //查找
	
	private String files = null; //文件列表

	@Override
	protected String doExecute() throws Exception {
		
		if (find != null) {
			String keywords = pack.getKeywords();
			if (StringUtil.isEmpty(keywords)) {
				keywords = pack.getBuildNo();
			}
			BuildBranch branch = BuildBranchService.getBranch(pack.getBranch().getBranch());
			List<SVNLog> logs = SVNLogService.listByKeyword(branch, keywords);
			List<String> list = new ArrayList<String>();
			for (SVNLog log : logs) {
				String path = log.getPath().trim();
				if (path.indexOf('.') == 0) continue;
				if (!list.contains(path)) {
					list.add(path);
				}
			}
			Collections.sort(list);
			StringBuilder sb = new StringBuilder();
			for (String s : list) {
				sb.append(s + ";\n");
			}
			this.files = sb.toString();
		} else {
			if (StringUtil.isEmpty(files)) {
				setTips("不能构建空的包");
				return ERROR;
			}
			BuildPackService.prepareBuild(pack, files.split(";"));
		}
		return SUCCESS;
	}

	public BuildPack getPack() {
		return pack;
	}

	public void setPack(BuildPack pack) {
		this.pack = pack;
	}

//	public void setBuild(String build) {
//		this.build = build;
//	}


	public void setFind(String find) {
		this.find = find;
	}

	public String getFiles() {
		return files;
	}

	public void setFiles(String files) {
		this.files = files;
	}

}
