package com.m3.patchbuild.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import junit.framework.TestCase;

import com.m3.common.HibernateUtil;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.branch.BranchService;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.CheckInfo;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.svn.ISVNLogService;
import com.m3.patchbuild.svn.SVNLog;

public class BuildServiceTest extends TestCase{

	String branchNo = "sp1";
	String buildNo = "FY-AKS1-01";
	String keyword = "FY-AKS1-01";
	
	public void test_build() throws Exception{
		HibernateUtil.openSession();
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		try {
			Pack bp = packService.find(branchNo, buildNo);
			if (bp == null) {
				bp = new Pack();
			}
			BranchService branchService = (BranchService)BussFactory.getService(Branch.class);
			Branch branch = branchService.getBranch(branchNo);
			bp.setBranch(branch);
			bp.setBuildNo(buildNo);
			bp.setRequester("developer");
			List<SVNLog> logs = ((ISVNLogService)BussFactory.getService(SVNLog.class)).listByKeyword(branch, keyword);
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
			packService.prepareBuild(bp, set);
			
			CheckInfo info = new CheckInfo();
			info.setMessage("测试检查");
			info.setPass(true);
			info.setUser("designer");
		} finally {
			HibernateUtil.closeSession();
		}
		Thread.sleep(100000);
	}
}
