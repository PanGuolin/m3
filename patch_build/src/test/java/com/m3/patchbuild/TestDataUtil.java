package com.m3.patchbuild;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;
import com.m3.patchbuild.svn.SVNLog;
import com.m3.patchbuild.svn.SVNLogService;

/**
 * 测试数据工具类
 * @author MickeyMic
 *
 */
public abstract class TestDataUtil {
	public static final String BRANCH = "sp1";
	
	public static Pack initBuilPack(String buildNo) throws SVNException {
		
		Branch branch = initBranch();
		PackService packService = (PackService)BussFactory.getService(Pack.class);
		Pack bp = packService.find(branch.getBranch(), buildNo);
		if (bp != null)
			return bp;
		
		bp = new Pack();
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
		packService.save(bp);
		return bp;
	}
	
	public static Branch initBranch() {
		Branch branch = BranchService.getBranch("sp1");
		if (branch == null)
			branch = new Branch();
		branch.setBranch("sp1");
		branch.setName("sp1分支");
		branch.setVersion("SP10.03.yyMMddsp1");
		branch.setSvnPassword("pangl1q");
		branch.setSvnUser("pangl");
		branch.setSvnUrl("https://svn.bytter.com/svn/v101/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setSvnRoot("/v10.2二季度产品维护/工程过程/实现与测试/branches/v10.3_20120720_sp1/");
		branch.setWorkspace("d:/patch_build/sp1");
		BranchService.saveBranch(branch);
		return branch;
	}

}
