package com.m3.patchbuild.aop.handler;

import java.util.ArrayList;
import java.util.List;

import org.jdom.Element;
import org.jdom.Namespace;

import com.m3.patchbuild.aop.IExecuteArguments;

public class PermissionArguments implements IExecuteArguments{
	
	private final String[] accepts;
	
	/**
	 * <arguments> 
	 *  <accept>#role(admin);${_P0.request}</accept>
	 * </arguments>
	 * @param argEl
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public PermissionArguments(Element argEl) {
		Namespace ns = argEl.getNamespace();
		List<Element> els = argEl.getChildren("accept", ns);
		if (els != null) {
			List<String> list = new ArrayList<String>();
			for (Element el : els) {
				String[] scrs = el.getTextTrim().split(";");
				for (String s : scrs) {
					s = s.trim();
					if (s.length() > 0) list.add(s);
				}
			}
			this.accepts = (String[])list.toArray(new String[list.size()]);
		} else {
			this.accepts = null;
		}
	}

	public String[] getAccepts() {
		return accepts;
	}
	
	
}

