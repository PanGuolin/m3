package com.m3.patchbuild;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.SVNLog;
import com.m3.patchbuild.service.BuildBranchService;
import com.m3.patchbuild.service.BuildPackService;
import com.m3.patchbuild.service.SVNLogService;

/**
 * 测试数据工具类
 * @author MickeyMic
 *
 */
public abstract class TestDataUtil {
	public static final String BRANCH = "sp1";
	
	public static BuildPack initBuilPack(String buildNo) throws SVNException {
		
		BuildBranch branch = initBranch();
		BuildPack bp = BuildPackService.find(branch.getBranch(), buildNo);
		if (bp != null)
			return bp;
		
		bp = new BuildPack();
		bp.setBranch(branch);
		bp.setBuildNo(buildNo);
		bp.setRequester("developer");
		List<SVNLog> logs = SVNLogService.listByKeyword(branch, buildNo);
		Set<String> set = new HashSet<String>();
		for (SVNLog log : logs) {
			if (set.contains(log.getPath()))
				continue;
			set.add(log.getPath());
			BuildFile file = new BuildFile();
			file.setUrl(log.getPath());
			bp.getBuildFiles().add(file);
		}
		bp.setKeywords(buildNo);
		BuildPackService.save(bp);
		return bp;
	}
	
	public static BuildBranch initBranch() {
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		if (branch == null)
			branch = new BuildBranch();
		branch.setBranch("sp1");
		branch.setName("sp1分支");
		branch.setVersion("SP10.03.yyMMddsp1");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/v101/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setSvnRoot("/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setWorkspace("d:/patch_build/sp1");
		BuildBranchService.saveBranch(branch);
		return branch;
	}

}
