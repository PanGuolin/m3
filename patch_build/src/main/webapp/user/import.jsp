<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ page isELIgnored="false" %>
<%@page import="com.m3.patchbuild.branch.BranchService" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
	<title>补丁构建管理系统 -用户注册</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/simple.css" type="text/css" />
</head>
<body class="simple"> 
	
	<div id="outterDiv">
		<div id="errorDiv">${tips}</div>
		<div id="linkDiv"><a href="${pageContext.request.contextPath}/user/register.jsp">向管理员申请注册</a></div>
		<div id="titleDiv">注册新用户</div>
		<div id="formDiv">
		<s:form action="/user/importFromSvn.action" method="POST"> 
			<s:set value="@com.m3.patchbuild.branch.BranchService@listAllBranch()" name="branchs"/>
			<s:select name="branch" label="请选择SVN分支" multiple="false" list="#branchs" listKey="branch" listValue="name"/> 
  			<s:textfield label="登录名" name="user.userId"/>
 			<s:password label="登录口令" name="user.password" />
 			<s:textfield label="真实姓名" name="user.username"/>
 			<s:textfield label="用户邮箱" name="user.email"/>
 			<s:submit value="验证并注册"/>
 		</s:form>
 		</div>
	</div>
</body>
</html>