package com.m3.patchbuild.applet;
import java.applet.Applet;
import java.io.File;

import netscape.javascript.JSObject;

public class InstallPack extends Applet{

	private static final long serialVersionUID = 1L;
	
	public void start() {	  
		JSObject window=JSObject.getWindow(this); // ��ȡJavaScript���ھ�������õ�ǰ�ĵ�����     
		window.eval("alert(\"This alert comes from Java!\")");
	}
	
	public void hello(String hello) {
		JSObject window=JSObject.getWindow(this); // ��ȡJavaScript���ھ�������õ�ǰ�ĵ�����     
		window.eval("alert(\"" + hello + "\")");
	}
	
	private String webdir;
	public void setWebDir(String webdir) {
		JSObject window=JSObject.getWindow(this); 
		File file = new File(webdir);
		File[] fs = file.listFiles();
		for (File f : fs) {
			window.eval("alert('" + f.getAbsolutePath() + "')");
		}
		this.webdir = webdir;
		
		
	}
	
	

}