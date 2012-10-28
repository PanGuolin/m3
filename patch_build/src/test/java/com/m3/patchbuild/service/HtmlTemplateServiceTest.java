package com.m3.patchbuild.service;

import junit.framework.TestCase;

import com.m3.patchbuild.branch.BuildBranch;
import com.m3.patchbuild.branch.BuildBranchService;
import com.m3.patchbuild.common.service.HtmlTemplateService;
import com.m3.patchbuild.pack.BuildPack;
import com.m3.patchbuild.pack.BuildPackService;

/**
 * Test for HtmlTemplateService
 * @author pangl
 *
 */
public class HtmlTemplateServiceTest extends TestCase {

	public void test_getTemplate() throws Exception {
		BuildBranch branch = BuildBranchService.getBranch("sp1");
		System.out.println(branch.getName());
		BuildPack bp = BuildPackService.find("sp1", "FY-AKS1-01");
		String value = HtmlTemplateService.getTemplate(HtmlTemplateService.MAIL_CONT_BUILD, bp);
		System.out.println(value);
	}
}
