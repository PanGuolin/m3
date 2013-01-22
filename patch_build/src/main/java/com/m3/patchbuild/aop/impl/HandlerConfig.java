package com.m3.patchbuild.aop.impl;

import org.jdom.Element;
import org.jdom.Namespace;

import com.m3.common.StringUtil;
import com.m3.patchbuild.aop.AOPUtil;
import com.m3.patchbuild.aop.IExecuteArguments;
import com.m3.patchbuild.msgflow.AdviceType;

/**
 * AOP处理类配置信息
 * @author pangl
 *
 */
public final class HandlerConfig {
	
	private final String condition;
	private final String handlerClz;
	private final AdviceType type;
	private final IExecuteArguments args;
	
	/**
	 * <handler class="com.m3.patchbuild.message.aop.MessageHandler" condition="'${_P0.handleTime}' == 'null'">
            <arguments>
                <reciever>#role(admin)</reciever>
                <nofifier>${_P0.requester}</nofifier>
                <subject><![CDATA[密码重置:${_P0.requester.userId}]]></subject>
    			<content><![CDATA[用户:${_P0.requester.userId}申请密码重置，请审批。]]></content>
            </arguments>
        </handler>
	 * @param el
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	public HandlerConfig(Element el) {
		Namespace ns = el.getNamespace();
		condition = el.getAttributeValue("condition", ns);
		handlerClz = el.getAttributeValue("class", ns);
		String t = el.getAttributeValue("advice", ns);
		type = StringUtil.isEmpty(t) ? AdviceType.afterR : AdviceType.valueOf(t);
		Element argEl = el.getChild("arguments", ns);
		args = argEl == null ? null :  AOPUtil.getHandler(handlerClz).readArguments(argEl);
	}

	public String getCondition() {
		return condition;
	}

	public String getHandlerClz() {
		return handlerClz;
	}

	public AdviceType getType() {
		return type;
	}

	public IExecuteArguments getArgs() {
		return args;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((args == null) ? 0 : args.hashCode());
		result = prime * result
				+ ((condition == null) ? 0 : condition.hashCode());
		result = prime * result
				+ ((handlerClz == null) ? 0 : handlerClz.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HandlerConfig other = (HandlerConfig) obj;
		if (args == null) {
			if (other.args != null)
				return false;
		} else if (!args.equals(other.args))
			return false;
		if (condition == null) {
			if (other.condition != null)
				return false;
		} else if (!condition.equals(other.condition))
			return false;
		if (handlerClz == null) {
			if (other.handlerClz != null)
				return false;
		} else if (!handlerClz.equals(other.handlerClz))
			return false;
		if (type != other.type)
			return false;
		return true;
	}
}
