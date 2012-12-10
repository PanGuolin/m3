package com.m3.patchbuild;

import junit.framework.TestCase;

import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.pack.IPackService;

/**
 * test case for BussFacotry
 * @author pangl
 *
 */
public class BussFactoryTest extends TestCase {

	public void test_common() throws Exception {
		IService service = BussFactory.getService("pack");
		assertEquals(IPackService.class, service.getClass());
	}
}
