package com.m3.common;

import junit.framework.TestCase;

public class EncodeUtilTest extends TestCase{

	public void test_des() throws Exception {
		String key = "SDFLK*&!@(*&1)";
		String value = "testpaswd";
		
		String encode = EncodeUtil.encrypt(value, key);
		System.out.println(encode);
		assertEquals("Qy00ePHFeZBV+99PGyel+g==", encode);
		
		String decode = EncodeUtil.decrypt(encode, key);
		assertEquals(decode, value);
		
		
		encode = EncodeUtil.encrypt(value);
		System.out.println(encode);
		assertEquals("U7dUBfG9poSo/o7ZHI0bvw==", encode);
		
		decode = EncodeUtil.decrypt(encode);
		assertEquals(decode, value);
		
		
		
	}
	
	public void test_des2() throws Exception {
		String value = "patch_build@3mickey";
		
		String encode = EncodeUtil.encrypt(value);
		System.out.println(encode);
		assertEquals("8J+K/8Z3myDXD1A6Rb5Mx7Oa4KdSvrlZ", encode);
		
		String decode = EncodeUtil.decrypt(encode);
		assertEquals(decode, value);
	}
}
