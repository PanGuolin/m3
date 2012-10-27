package com.m3.patchbuild.service;

import junit.framework.TestCase;

import com.m3.patchbuild.TestDataUtil;
import com.m3.patchbuild.info.BuildPack;

public class PublishServiceTest extends TestCase{

	public void test_publish() throws Exception {
		BuildPack bp = TestDataUtil.initBuilPack("FY-AKS1-01");
		PublishService.publish(bp);
		Thread.sleep(10000000);
	}
}
