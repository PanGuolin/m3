package com.m3.patchbuild.aop.handler;

import java.util.ArrayList;
import java.util.List;

import org.jdom.Element;
import org.jdom.Namespace;

import com.m3.patchbuild.aop.IExecuteArguments;

public class MessageExecuteArguments implements IExecuteArguments{
	
	private final String[] recievers;
	private final String[] notifiers;
	private final String subject;
	private final String content;
	
	/**
	 * <arguments> 
	 *  <recievers>
	 *  	<participant><type>script</type><expr>${_P0.requester}</expr></participant>
	 *  </recievers>
	 * 	<notifiers>
	 * 		<participant><type>script</type><expr>${_P0.requester}</expr></participant>
	 * 	</notifiers>
	 * 	<subject><![CDATA[您的角色变更已处理：${_P0.accepted}]]></subject>
	 * 	<content><![CDATA[您的角色变更已处理，处理结果:${_P0.accepted}]]></content>
	 * </arguments>
	 * @param argEl
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public MessageExecuteArguments(Element argEl) {
		Namespace ns = argEl.getNamespace();
		List<Element> els = argEl.getChildren("reciever", ns);
		if (els != null) {
			List<String> list = new ArrayList<String>();
			for (Element el : els) {
				list.add(el.getTextTrim());
			}
			this.recievers = (String[])list.toArray(new String[list.size()]);
		} else {
			this.recievers = null;
		}
		els = argEl.getChildren("notifier", ns);
		if (els != null) {
			List<String> list = new ArrayList<String>();
			for (Element el : els) {
				list.add(el.getTextTrim());
			}
			this.notifiers = (String[])list.toArray(new String[list.size()]);
		} else {
			this.notifiers = null;
		}
		subject = argEl.getChildTextTrim("subject", ns);
		content = argEl.getChildTextTrim("content", ns);
	}
	
	public String[] getRecievers() {
		return recievers;
	}


	public String[] getNotifiers() {
		return notifiers;
	}


	public String getSubject() {
		return subject;
	}


	public String getContent() {
		return content;
	}


	@Override
	public String toString() {
		return subject;
	}
}
