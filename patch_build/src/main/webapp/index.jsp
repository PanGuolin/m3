<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ page isELIgnored="false" %>
<!doctype html>
<html>
<head>
	<title>补丁构建管理系统</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/simple.css" type="text/css" />
</head>
<body class="simple"> 
	<div id="outterDiv">
		<div id="errorDiv">${tips}</div>
		<div id="linkDiv">
			<a href="${pageContext.request.contextPath}/user/register.jsp">申请注册</a>
			<a href="${pageContext.request.contextPath}/user/import.jsp">从SVN引入用户</a>
		</div>
		<div id="titleDiv">欢迎使用补丁构建系统</div>
		<div id="formDiv">
		<s:form action="/user/login.action" method="POST"> 
  			<s:textfield label="用户名" name="username"/>
 			<s:password label="用户口令" name="password" />
 			<s:submit value="登录"/>
 		</s:form>
 		</div>
	</div>
</body>
</html>