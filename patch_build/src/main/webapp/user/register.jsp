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
		<div id="linkDiv"><a href="${pageContext.request.contextPath}/user/import.jsp">从SVN引入</a></div>
		<div id="titleDiv">注册新用户</div>
		<div id="formDiv">
		<s:form action="/user/register.action" method="POST" theme="simple">
			<table style="width:100%">
				<tr>
					<td>登录名: </td>
					<td><s:textfield name="user.userId"/></td>
				</tr>
				<tr>
					<td>登录口令: </td>
					<td><s:password name="user.password"/></td>
				</tr>
				<tr>
					<td>真实姓名: </td>
					<td><s:textfield name="user.username"/></td>
				</tr>
				<tr>
					<td>用户邮箱: </td>
					<td><s:textfield name="user.email"/></td>
				</tr>
				<tr>
					<td>角色列表: </td>
					<td style="text-align:left">
						<s:iterator value="@com.m3.patchbuild.user.UserRole@SYSROLES" id="role">
							<input type="checkbox" name="role" value="${role}"/><s:property value="role"/><br/>
						</s:iterator>
					</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:right"><s:submit value="验证并注册"/></td>
				</tr>
			</table>	
 		</s:form>
 		</div>
	</div>
</body>
</html>