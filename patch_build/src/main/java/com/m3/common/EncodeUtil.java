package com.m3.common;

import java.net.InetAddress;
import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * 加密解密工具类
 * @author pangl
 *
 */
public abstract class EncodeUtil {
	
	/**
	 * 加密字符串
	 * @param text
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String encrypt(String text, String key) throws Exception {
        key = initKey(key);  
        byte[] inputData = text.getBytes();  
        inputData = encrypt(inputData, key);
        return encryptBASE64(inputData).trim();
	}
	
	public static String encrypt(String text) throws Exception{
		InetAddress addr = InetAddress.getLocalHost();
		return encrypt(text, addr.getHostAddress());
	}
	
	/**
	 * 解密字符串
	 * @param text
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String decrypt(String text, String key) throws Exception {
		key = initKey(key).trim();
		byte[] inputData = decryptBASE64(text);
		byte[] outputData = decrypt(inputData, key);  
        return new String(outputData);  
	}
	
	public static String decrypt(String text) throws Exception{
		InetAddress addr = InetAddress.getLocalHost();
		return decrypt(text, addr.getHostAddress());
	}
	
	
	/** 
     * ALGORITHM 算法 <br> 
     * 可替换为以下任意一种算法，同时key值的size相应改变。 
     *  
     * <pre> 
     * DES                  key size must be equal to 56 
     * DESede(TripleDES)    key size must be equal to 112 or 168 
     * AES                  key size must be equal to 128, 192 or 256,but 192 and 256 bits may not be available 
     * Blowfish             key size must be multiple of 8, and can only range from 32 to 448 (inclusive) 
     * RC2                  key size must be between 40 and 1024 bits 
     * RC4(ARCFOUR)         key size must be between 40 and 1024 bits 
     * </pre> 
     *  
     * 在Key toKey(byte[] key)方法中使用下述代码 
     * <code>SecretKey secretKey = new SecretKeySpec(key, ALGORITHM);</code> 替换 
     * <code> 
     * DESKeySpec dks = new DESKeySpec(key); 
     * SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM); 
     * SecretKey secretKey = keyFactory.generateSecret(dks); 
     * </code> 
     */  
    private static final String ALGORITHM = "DES";  
 
  
    /** 
     * 转换密钥<br> 
     *  
     * @param key 
     * @return 
     * @throws Exception 
     */  
    private static Key toKey(byte[] key) throws Exception {  
        DESKeySpec dks = new DESKeySpec(key);  
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM);  
        SecretKey secretKey = keyFactory.generateSecret(dks);  
        return secretKey;  
    }  
  
    /** 
     * 解密 
     *  
     * @param data 
     * @param key 
     * @return 
     * @throws Exception 
     */  
    private static byte[] decrypt(byte[] data, String key) throws Exception {  
        Key k = toKey(decryptBASE64(key));  
  
        Cipher cipher = Cipher.getInstance(ALGORITHM);  
        cipher.init(Cipher.DECRYPT_MODE, k);  
        return cipher.doFinal(data);  
    }  
  
    /** 
     * 加密 
     *  
     * @param data 
     * @param key 
     * @return 
     * @throws Exception 
     */  
    private static byte[] encrypt(byte[] data, String key) throws Exception {  
        Key k = toKey(decryptBASE64(key));  
        Cipher cipher = Cipher.getInstance(ALGORITHM);  
        cipher.init(Cipher.ENCRYPT_MODE, k);  
        return cipher.doFinal(data);  
    }  
  
    /** 
     * 生成密钥 
     *  
     * @return 
     * @throws Exception 
     */  
    public static String initKey() throws Exception {  
        return initKey(null);  
    }  
  
    /** 
     * 生成密钥 
     *  
     * @param seed 
     * @return 
     * @throws Exception 
     */  
    private static String initKey(String seed) throws Exception {  
        SecureRandom secureRandom = null;  
  
        if (seed != null) {  
            secureRandom = new SecureRandom(decryptBASE64(seed));  
        } else {  
            secureRandom = new SecureRandom();  
        }  
  
        KeyGenerator kg = KeyGenerator.getInstance(ALGORITHM);  
        kg.init(secureRandom);  
  
        SecretKey secretKey = kg.generateKey();  
  
        return encryptBASE64(secretKey.getEncoded());  
    }  
    
    /** 
     * BASE64解密 
     *  
     * @param key 
     * @return 
     * @throws Exception 
     */  
    private static byte[] decryptBASE64(String key) throws Exception {  
        return (new BASE64Decoder()).decodeBuffer(key);  
    }  
      
    /** 
     * BASE64加密 
     *  
     * @param key 
     * @return 
     * @throws Exception 
     */  
    private static String encryptBASE64(byte[] key) throws Exception {  
        return (new BASE64Encoder()).encodeBuffer(key);  
    }  
}
