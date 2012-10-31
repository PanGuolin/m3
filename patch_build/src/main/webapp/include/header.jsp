<%@page language="java" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<%pageContext.setAttribute("basePath", request.getContextPath());%>
<html>
<head>
	<title>补丁构建管理系统 -用户注册</title>
	<link rel="stylesheet" href="${basePath}/css/simple.css" type="text/css" />
	<link rel="stylesheet" type="text/css" media="screen" href="${basePath}/css/ui.jqgrid.css" />
	<script type="text/javascript" src="${basePath}/js/jquery.js"></script>
	<script type="text/javascript" src="${basePath}/js/grid.locale-cn.js"></script>
	<script type="text/javascript" src="${basePath}/js/jquery.jqGrid.min.js"></script>
</head>
<body>