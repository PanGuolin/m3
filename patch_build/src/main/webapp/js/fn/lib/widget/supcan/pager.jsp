<%@ page language="java" contentType="text/xml; charset=utf-8" pageEncoding="utf-8"%><%@ page import="java.lang.*,java.util.*" %><%	
	String path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+ request.getRequestURI();
    path = path.replace("pager.jsp", "");
    
	StringBuffer xmlStr = new StringBuffer();
	xmlStr.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
	xmlStr.append("<freeform>");
	xmlStr.append("  <Properties bgColor=\"white\" />");
	xmlStr.append("  <Fonts>");
	xmlStr.append("    <Font facename=\"consolas\" italic=\"1\" />");
	xmlStr.append("  </Fonts>");
	xmlStr.append("  <Objects>");	
	xmlStr.append("    <Img  x1=\"0\" x2=\"100%\" y1=\"-100%\" y2=\"100%\" pathID=\"path1\" src=\"" + path + "css/res/pagerback.png\" arrange=\"stretch\" />");	
	xmlStr.append("    <Rect x1=\"0\" x2=\"100%\" y1=\"-100%\" y2=\"100%\" pathID=\"path1\" pathBorder=\"thick=1;color=#377d8d\" thick=\"0\" />");	
	xmlStr.append("    <pager id=\"ID0\" x1=\"100\" y=\"0\" x2=\"99%\" height=\"100%\" textColor=\"#0799B7\" PageRowsList=\"1,10,20,50,100,999999\" pageRows=\"20\" />");	
	xmlStr.append("    <input id=\"IDRefresh\" type=\"button\" tip=\"刷新\" x1=\"20\" y1=\"12\" width=\"20\" height=\"20\" icon=\"" + path + "css/res/prop.bmp\" style=\"flat,transparent,noMouseHover\" />");	
	xmlStr.append("    <input id=\"IDPrint\" type=\"button\" tip=\"打印预览\" x1=\"50\" y1=\"12\" width=\"20\" height=\"20\" icon=\"" + path + "css/res/prtsetup.bmp\" style=\"flat,transparent,noMouseHover\" />");	
	xmlStr.append("    <line x=\"10\" y=\"0\" width=\"0\" height=\"38\" thick=\"0\" />");	
	xmlStr.append("  </Objects>");
	xmlStr.append("  <paths>");
	xmlStr.append("    <path id=\"path1\">");
	xmlStr.append("      <Rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" round=\"30\" />");
	xmlStr.append("    </path>");	
	xmlStr.append("  </paths>");		
	xmlStr.append("</freeform>");	
	
	response.getWriter().write(xmlStr.toString());   
	response.flushBuffer();
%>