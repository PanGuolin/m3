package com.m3.patchbuild.sys.action;

import java.io.ByteArrayInputStream;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 产生随机图片的Action
 * @author pangl
 *
 */
public class RandomImageAction extends ActionSupport{  
	private static final long serialVersionUID = 1L;
	private String key = "rand";
    private ByteArrayInputStream inputStream;  
    
    public String execute() throws Exception{
    	final int maxNum = 1000000;
    	String text = String.valueOf((int)(Math.random()*maxNum));
    	ActionContext.getContext().getSession().put(key, text);
    	byte[] bs = ValidateUtil.getImageData(text);
    	inputStream = new ByteArrayInputStream(bs);  
        return SUCCESS;  
    } 
    
    public ByteArrayInputStream getInputStream() {  
        return inputStream;  
    }

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}  
}  