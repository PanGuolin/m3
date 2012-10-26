package com.m3.common.mail;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;

import javax.mail.Address;
import javax.mail.internet.InternetAddress;

/**
 * 邮件信息
 * 
 * @author pangl
 * 
 */
public class MailInfo {

	private String subject; //邮件主题

	private String content; //邮件正文
	
	private String encoding = "GBK"; //编码
	
	private String contentType = "text/html"; //内容格式
	
	private Set<Address> toAddrs = new HashSet<Address>();  //接收人地址
	
	private Set<Address> ccAddrs = new HashSet<Address>(); //抄送地址
	
	private Set<File> attachments = new HashSet<File>();//附件
	public void addToAddress(String address, String personal) throws UnsupportedEncodingException {
		toAddrs.add(new InternetAddress(address, personal));
	}
	
	public void addCcAddress(String address, String personal) throws UnsupportedEncodingException {
		toAddrs.add(new InternetAddress(address, personal));
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Set<Address> getToAddrs() {
		return toAddrs;
	}

	public Set<Address> getCcAddrs() {
		return ccAddrs;
	}


	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Set<File> getAttachments() {
		return attachments;
	}

	public void setAttachments(Set<File> attachments) {
		this.attachments = attachments;
	}
	
}
