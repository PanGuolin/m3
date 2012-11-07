<%@page language="java" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<%pageContext.setAttribute("basePath", request.getContextPath());%>
<html>
<head>
	<title>补丁构建管理系统</title>
	<script type="text/javascript">var basePath = "${basePath}";</script>
	
	<link rel="stylesheet" href="${basePath}/css/base.css" type="text/css" />
	<link rel="stylesheet" href="${basePath}/css/header.css" type="text/css" />
	<script type="text/javascript" src="${basePath}/js/jquery.js"></script>
	<script type="text/javascript" src="${basePath}/js/include/header.js"></script>
</head>
<body>
<div id="headerDiv">
	<div id="welcome">欢迎 <b>${userBean.username}</b> !你有<span id="undealmsg">0</span>条未处理任务消息和<span id="unreadmsg">0</span>条未读关注消息</div>
	<div id="menu">
		<a href="${basePath}/msg/mymsg.jsp" id="btn_listpatch"><span class="corner"></span>我的消息</a>
		<a href="${basePath}/manage/listbuild.jsp" id="btn_listbuild"><span class="corner"></span>构建包列表</a>
		<a href="${basePath}/manage/showbuildlog.jsp" id="btn_showbuildlog"><span class="corner"></span>构建日志</a>
		<a href="${basePath}/pack/addbuild.jsp" id="btn_addbuild"><span class="corner"></span>增加构建</a>
		<a href="${basePath}/manage/listbuildfiles.jsp" id="btn_listbuildfiles"><span class="corner"></span>文件查询</a>
		<a href="${basePath}/index.jsp" id="btn_index">	<span class="corner"></span>切换用户</a>
	</div>
	<div id="menubar">
		<a href="${basePath}/user/logout">退出系统</a>
		<img src="${basePath}/images/patch_small.png"/>
	</div>
</div>
<div id="bodyDiv">
