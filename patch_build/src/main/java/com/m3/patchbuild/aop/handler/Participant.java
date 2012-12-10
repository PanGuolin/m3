package com.m3.patchbuild.aop.handler;

import org.jdom.Element;
import org.jdom.Namespace;

public class Participant {
	
	public static final String TYPE_ROLE = "role";
	public static final String TYPE_RELATION = "relation";
	public static final String TYPE_SCRIPT = "script"; 
	
	private String type; //用户类型
	private String expr; //用户表达式
	
	public Participant(Element partEl, Namespace ns) {
		this.type = partEl.getChildTextTrim("type", ns);
		this.expr = partEl.getChildTextTrim("expr", ns);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExpr() {
		return expr;
	}

	public void setExpr(String expr) {
		this.expr = expr;
	}
}
