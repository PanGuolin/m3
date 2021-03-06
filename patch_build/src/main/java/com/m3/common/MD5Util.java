package com.m3.common;

import java.security.MessageDigest;

/**
 * MD5工具类
 * @author pangl
 *
 */
public abstract class MD5Util {
	
	/** 
     * MD5 加密 
     */  
    public static String getMD5(String str) { 
    	final int mask = 0xFF;
    	MessageDigest messageDigest = null;
    	try {
	        messageDigest = MessageDigest.getInstance("MD5");  
	        messageDigest.reset();  
	        messageDigest.update(str.getBytes("UTF-8"));  
    	} catch (Exception ex) {
    		throw new RuntimeException(ex);
    	}
        byte[] byteArray = messageDigest.digest();  
        StringBuffer md5StrBuff = new StringBuffer();  
  
        for (int i = 0; i < byteArray.length; i++) {              
            if (Integer.toHexString(mask & byteArray[i]).length() == 1)  
                md5StrBuff.append("0").append(Integer.toHexString(mask & byteArray[i]));  
            else  
                md5StrBuff.append(Integer.toHexString(mask & byteArray[i]));  
        }  
        return md5StrBuff.toString();  
    } 

}
