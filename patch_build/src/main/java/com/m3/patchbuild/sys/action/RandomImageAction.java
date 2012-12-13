package com.m3.patchbuild.sys.action;

import java.io.ByteArrayInputStream;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class RandomImageAction extends ActionSupport{  
	private static final long serialVersionUID = 1L;
	private String key = "rand";
    private ByteArrayInputStream inputStream;  
    
    public String execute() throws Exception{ 
    	String text = String.valueOf((int)(Math.random()*1000000));
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