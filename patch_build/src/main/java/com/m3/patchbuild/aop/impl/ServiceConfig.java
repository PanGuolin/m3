package com.m3.patchbuild.aop.impl;

import java.util.ArrayList;
import java.util.List;

import org.jdom.Element;
import org.jdom.Namespace;

/**
 * AOP Service配置信息
 * @author pangl
 *
 */
public final class ServiceConfig {
	private final String serviceClass;
	private final List<FunctionConfig> functions = new ArrayList<FunctionConfig>();
	/**
	 * <service class="com.m3.patchbuild.user.ChangeRoleReqService">
        <function method="saveInfo(com.m3.patchbuild.IBussInfo)">
            <handler class="com.m3.patchbuild.message.aop.MessageHandler" condition="'${_P0.handleTime}' == 'null'">
                <arguments>
                    <reciever>#role(admin)</reciever>
                    <nofifier>${_P0.requester}</nofifier>
                    <subject><![CDATA[用户申请改变角色：${_P0.requester}]]></subject>
        			<content><![CDATA[用户${_P0.requester}申请改变角色，新角色列表:${_P0.newRoles}]]></content>
                </arguments>
            </handler>
        </function>
        
        <function method="handle(com.m3.patchbuild.IBussInfo, java.lang.Object)">
            <handler class="com.m3.patchbuild.message.aop.MessageHandler">
                <arguments>
                    <nofifier>${_P0.requester}</nofifier>
                    <subject><![CDATA[您的角色变更已处理：${_P0.accepted}]]></subject>
        			<content><![CDATA[您的角色变更已处理，处理结果:${_P0.accepted}]]></content>
                </arguments>
            </handler>
        </function>
    </service>
	 * @param serviceEl
	 * @throws ClassNotFoundException 
	 */
	@SuppressWarnings("unchecked")
	public ServiceConfig(Element el) throws ClassNotFoundException {
		Namespace ns = el.getNamespace();
		serviceClass = el.getAttributeValue("class", ns);
		List<Element> functionEls = el.getChildren("function", ns);
		if (functionEls != null) {
			for(Element functionEl : functionEls) {
				functions.add(new FunctionConfig(functionEl));
			}
		}
	}
	public String getServiceClass() {
		return serviceClass;
	}
	public List<FunctionConfig> getFunctions() {
		return functions;
	}
	
	public void join(ServiceConfig nConfig) {
		if (!serviceClass.equals(nConfig.getServiceClass())) 
			return;
		List<FunctionConfig> nFunctions = nConfig.functions;
		if (nFunctions == null || nFunctions.isEmpty())
			return;
		for (FunctionConfig function : nFunctions) {
			int index = functions.indexOf(function);
			if (index == -1) {
				functions.add(function);
			} else {
				functions.get(index).join(function);
			}
		}
		// TODO Auto-generated method stub
		
	}
}
