package com.m3.patchbuild.applet;
import java.applet.Applet;

import netscape.javascript.JSObject;

public class InstallPack extends Applet{

	private static final long serialVersionUID = 1L;
	
	public void start() {	  
		JSObject window=JSObject.getWindow(this); // 获取JavaScript窗口句柄，引用当前文档窗口     
		window.eval("alert(\"This alert comes from Java!\")");
	}
	
	public void hello(String hello) {
		JSObject window=JSObject.getWindow(this); // 获取JavaScript窗口句柄，引用当前文档窗口     
		window.eval("alert(\"" + hello + "\")");
	}

}
