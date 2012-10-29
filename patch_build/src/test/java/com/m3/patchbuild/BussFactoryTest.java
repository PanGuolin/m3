package com.m3.patchbuild;

import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.IService;
import com.m3.patchbuild.pack.PackService;

import junit.framework.TestCase;

/**
 * test case for BussFacotry
 * @author pangl
 *
 */
public class BussFactoryTest extends TestCase {

	public void test_common() throws Exception {
		IService service = BussFactory.getService("pack");
		assertEquals(PackService.class, service.getClass());
	}
}
