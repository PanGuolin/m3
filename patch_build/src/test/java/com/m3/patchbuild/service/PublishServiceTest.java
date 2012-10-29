package com.m3.patchbuild.service;

import junit.framework.TestCase;

import com.m3.patchbuild.TestDataUtil;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.patch.PublishService;

public class PublishServiceTest extends TestCase{

	public void test_publish() throws Exception {
		Pack bp = TestDataUtil.initBuilPack("FY-AKS1-01");
		PublishService.publish(bp);
		Thread.sleep(10000);
	}
}
