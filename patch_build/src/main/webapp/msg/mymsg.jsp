<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ page isELIgnored="false" %>
<%@page import="com.m3.patchbuild.branch.BranchService" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
	<title>补丁构建管理系统 -请求构建</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/com.css" type="text/css" />
	
</head>
<body class="simple"> 
<input type="checkbox"/>仅显示通知消息 <input type="checkbox"/>显示关注消息 
<table class="fn-datagrid" style="display:none;" id="datagrid"
		url="${pageContext.request.contextPath}/msg/fnmsg.action?t=nl"
		pagination="true"
		rownumbers="true" 
		fitColumns="true"
		resizable="true"
		pageSize="6"
		singleSelect="true">
	<thead>
		<tr>
			<th field="subject" width="100" align="center" >消息标题</th>
			<th field="sendTime" width="100" align="center" >发送时间</th>
			<th field="status" width="100" align="center" >状态</th>
			<th field="action" width="50" align="center" 
				formatter="function(r){ return '<a href=#>删除</a>';}"></th>
		</tr>
	</thead>
</table>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
<script src="${pageContext.request.contextPath}/js/fn/fn.js?use=widget"></script>
<%@include file="./fnmsg.jsp" %>
</html>