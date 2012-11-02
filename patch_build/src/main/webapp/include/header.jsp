<%@page language="java" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<%pageContext.setAttribute("basePath", request.getContextPath());%>
<html>
<head>
	<title>补丁构建管理系统</title>
	<link rel="stylesheet" href="${basePath}/css/base.css" type="text/css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
</head>
<body>