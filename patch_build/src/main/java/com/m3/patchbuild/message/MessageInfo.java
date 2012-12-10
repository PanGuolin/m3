package com.m3.patchbuild.message;

import java.util.Collection;
import java.util.HashSet;

import com.m3.patchbuild.IBussInfo;

public class MessageInfo {
	
	private Collection<String> receivers;
	private Collection<String> notifiers;
	private IBussInfo info = null;
	private String sender = ".System";
	private String subject;
	private String content;
	public Collection<String> getReceivers() {
		return receivers;
	}
	public void setReceivers(Collection<String> receivers) {
		this.receivers = receivers;
	}
	public Collection<String> getNotifiers() {
		return notifiers;
	}
	public void addNotifier(String userId) {
		if (this.notifiers == null)
			notifiers = new HashSet<String>();
		notifiers.add(userId);
	}
	
	public void addNotifiers(Collection<String> userIds) {
		if (this.notifiers == null)
			notifiers = new HashSet<String>();
		notifiers.addAll(userIds);
	}
	
	public void addReceiver(String userId) {
		if (this.receivers == null)
			receivers = new HashSet<String>();
		receivers.add(userId);
	}
	public void addReceivers(Collection<String> userIds) {
		if (this.receivers == null)
			receivers = new HashSet<String>();
		receivers.addAll(userIds);
	}
	
	public void setNotifiers(Collection<String> notifiers) {
		this.notifiers = notifiers;
	}
	public IBussInfo getBussInfo() {
		return info;
	}
	public void setInfo(IBussInfo info) {
		this.info = info;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
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
}
