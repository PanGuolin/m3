package com.m3.patchbuild.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.info.BuildBranch;
import com.m3.patchbuild.info.BuildFile;
import com.m3.patchbuild.info.BuildPack;
import com.m3.patchbuild.info.CheckInfo;
import com.m3.patchbuild.info.SVNLog;

import junit.framework.TestCase;

public class BuildServiceTest extends TestCase{

	String branchNo = "sp1";
	String buildNo = "FY-AKS1-01";
	String keyword = "FY-AKS1-01";
	
	public void test_build() throws Exception{
		BuildService.startMonitor();
		
		HibernateUtil.openSession();
		try {
			BuildPack bp = BuildPackService.find(branchNo, buildNo);
			if (bp != null) {
				BuildPackService.delete(bp);
			}
			bp = new BuildPack();
			BuildBranch branch = BuildBranchService.getBranch(branchNo);
			bp.setBranch(branch);
			bp.setBuildNo(buildNo);
			bp.setRequester("developer");
			List<SVNLog> logs = SVNLogService.listByKeyword(branch, keyword);
			Set<String> set = new HashSet<String>();
			for (SVNLog log : logs) {
				if (set.contains(log.getPath()))
					continue;
				set.add(log.getPath());
				BuildFile file = new BuildFile();
				file.setUrl(log.getPath());
				bp.getBuildFiles().add(file);
			}
			bp.setKeywords(keyword);
			BuildPackService.prepareBuild(bp);
			
			CheckInfo info = new CheckInfo();
			info.setMessage("测试检查");
			info.setPass(true);
			info.setUser("designer");
			BuildPackService.check(bp, info);
		} finally {
			HibernateUtil.closeSession();
		}
		Thread.sleep(100000);
	}
}
