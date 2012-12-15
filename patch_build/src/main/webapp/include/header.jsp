<%@page language="java" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<%pageContext.setAttribute("basePath", request.getContextPath());%>
<html>
<head>
	<title>补丁构建管理系统</title>
	<script type="text/javascript">var basePath = "${basePath}"; var menuPath = "${menuPath}";</script>
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
	   <s:iterator value="#session.myMenus.keys" id="menu">
	   <a href="${basePath}${menu.function.url}" id="menu_${menu.id}"><span class="corner"></span><s:property value="#menu.name"/></a>  
	   </s:iterator>  
	</div>
	<div id="menubar">
		<a href="${basePath}/user/logout">退出系统</a>
		<img src="${basePath}/images/patch_small.png"/>
	</div>
</div>
<div id="bodyDiv">
