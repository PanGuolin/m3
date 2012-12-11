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
	<script type="text/javascript" src="${basePath}/js/fn/fn.js?use=widget"></script>
	<script type="text/javascript" src="${basePath}/js/include/header.js"></script>
</head>
<body>
<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
<div id="headerDiv">
	<div id="welcome">欢迎 <b>
		<a title="点击进行用户修改" href="${basePath}/user/userinfo">${userBean.username}[${userBean.userId }]</a>!</b>&nbsp;&nbsp;当前分支： 
		<select style="line-height:20px; height:20px;" name="user.mainBranch" selValue="${currentBranch.branch}" id="currentBranch">
			<s:iterator value='@com.m3.patchbuild.branch.BranchUtil@listAllBranch()' status='st' id='branch'>
			<option value="<s:property value='#branch.branch'/>"> <s:property value='#branch.name'/></option>
			</s:iterator> 
		</select>
	</div>
	<div id="menu">
		<a href="${basePath}/msg/mymsg.jsp"><span class="corner"></span>我的消息</a>
		<a href="${basePath}/pack/listpack.jsp"><span class="corner"></span>构建包列表</a>
		<a href="${basePath}/patch/listpatch.jsp"><span class="corner"></span>补丁列表</a>
<%-- 		<a href="${basePath}/pack/addbuild.jsp"><span class="corner"></span>增加构建</a> --%>
		<a href="${basePath}/user/relation"><span class="corner"></span>我的关系</a>
<%-- 		<a href="${basePath}/user/userinfo"><span class="corner"></span>我的信息</a> --%>
	</div>
	<div id="menubar">
		<a href="${basePath}/user/logout">退出系统</a>
		<img src="${basePath}/images/patch_small.png"/>
	</div>
</div>
<div id="bodyDiv">
