package com.m3.patchbuild.service;

import com.m3.patchbuild.info.BuildPack;

import junit.framework.TestCase;

public class PublishServiceTest extends TestCase{

	public void test_publish() throws Exception {
		
		BuildPack bp = BuildPackService.find("sp1", "FY-AKS1-01");
		PublishService.publish(bp);
		Thread.sleep(100000);
	}
}
