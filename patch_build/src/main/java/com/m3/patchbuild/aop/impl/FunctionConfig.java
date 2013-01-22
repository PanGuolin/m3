package com.m3.patchbuild.aop.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jdom.Element;

import com.m3.common.StringUtil;

/**
 * AOP Function配置信息
 * @author pangl
 *
 */
public final class FunctionConfig {
	
	private final String methodName;
	private final Class<?>[] paramTypes;
	private final List<HandlerConfig> handlers = new ArrayList<HandlerConfig>();
	private final int infoIndex;
	
	/**
	 *  <function method="saveInfo(com.m3.patchbuild.IBussInfo)">
              <handler class="com.m3.patchbuild.message.aop.MessageHandler" condition="'${_P0.handleTime}' == 'null'">
                <arguments>
                    <reciever>#role(admin)</reciever>
                    <nofifier>${_P0.requester}</nofifier>
                    <subject><![CDATA[密码重置:${_P0.requester.userId}]]></subject>
        			<content><![CDATA[用户:${_P0.requester.userId}申请密码重置，请审批。]]></content>
                </arguments>
            </handler>
         </function>
	 * @param el
	 * @throws ClassNotFoundException 
	 */ 
	@SuppressWarnings("unchecked")
	public FunctionConfig(Element el) throws ClassNotFoundException {
		String methodExp = el.getAttributeValue("method", el.getNamespace());
		int sIndex = methodExp.indexOf('(');
		if (sIndex != -1) {
			methodName = methodExp.substring(0, sIndex).trim();
			String paramExp = methodExp.substring(sIndex + 1, methodExp.length()-1).trim();
			String[] params = paramExp.split(",");
			paramTypes = new Class<?>[params.length];
			for (int i=0; i<paramTypes.length; i++) {
				paramTypes[i] = Class.forName(params[i].trim());
			}
		} else {
			methodName = methodExp;
			paramTypes = null;
		}
		List<Element> handlerEls = el.getChildren("handler", el.getNamespace());
		if (handlerEls != null) {
			for (Element hEl : handlerEls) {
				handlers.add(new HandlerConfig(hEl));
			}
		}
		String index = el.getAttributeValue("infoIndex", el.getNamespace());
		if (!StringUtil.isEmpty(index)) {
			this.infoIndex = Integer.parseInt(index);
		} else {
			this.infoIndex = 0;
		}
	}

	public String getMethodName() {
		return methodName;
	}

	public Class<?>[] getParamTypes() {
		return paramTypes;
	}

	public List<HandlerConfig> getHandlers() {
		return handlers;
	}

	public int getInfoIndex() {
		return infoIndex;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((handlers == null) ? 0 : handlers.hashCode());
		result = prime * result + infoIndex;
		result = prime * result
				+ ((methodName == null) ? 0 : methodName.hashCode());
		result = prime * result + Arrays.hashCode(paramTypes);
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
		FunctionConfig other = (FunctionConfig) obj;
		if (handlers == null) {
			if (other.handlers != null)
				return false;
		} else if (!handlers.equals(other.handlers))
			return false;
		if (infoIndex != other.infoIndex)
			return false;
		if (methodName == null) {
			if (other.methodName != null)
				return false;
		} else if (!methodName.equals(other.methodName))
			return false;
		if (!Arrays.equals(paramTypes, other.paramTypes))
			return false;
		return true;
	}
	
	
	
//	private boolean arrayEquals(Object[] array1, Object[] array2) {
//		if (array1 == array2) return true;
//		if (array1 == null) return array2 == null;
//		if (array1.length != array2.length) return false;
//		for (int i=0; i<array1.length; i++) {
//			if (!array1[i].equals(array2[i]))
//				return false;
//		}
//		return true;
//	}

	void join(FunctionConfig function) {
		List<HandlerConfig> nHandlers = function.getHandlers();
		if (nHandlers == null || nHandlers.isEmpty())
			return;
		for (HandlerConfig conf : nHandlers) {
			int index = handlers.indexOf(conf);
			if (index == -1) {
				handlers.add(conf);
			} 
		}
	}
	
//	private boolean listEquals(List<?> list1, List<?> list2) {
//		if (list1 == list2) return true;
//		if (list1 == null) return list2 == null;
//		if (list1.size() != list2.size()) return false;
//		for (int i=0; i<list1.size(); i++) {
//			if (list1.get(i) == null) {
//				if (list2.get(i) != null)
//					return false;
//			}
//			if (!list1.get(i).equals(list2.get(i))) {
//				return false;
//			}
//		}
//		return true;
//	}
	
	
}
