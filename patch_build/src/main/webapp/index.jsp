<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ page isELIgnored="false" %>

<!doctype html>
<html>
<head>
	<title>拜特构建管理系统</title>
	<style>
		#outterDiv {width:300px;margin-left:auto;margin-right:auto; margin-top:200px;}
		#titleDiv {background:#369; line-height:30px; text-align:left;color:#FFF;font-weight:bold; }
		#formDiv {border:1px solid #69C;}
		#linkDiv {text-align:right; margin-bottom:3px;}
		#linkDiv a { text-decoration:none;}
        body{ text-align:center; font-size: 14px; margin:10px 0;}
	</style>
</head>
<body> 
	<div id="outterDiv">
		<div id="linkDiv"><font color="red">${tips}</font> <a href="${pageContext.request.contextPath}/user/importfromsvn.jsp">从SVN引入用户</a></div>
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