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
	<script type="text/javascript" src="${basePath}/js/fn/fn.js?use=widget"></script>
	<link rel="stylesheet" href="${basePath}/css/base.css" type="text/css" />
</head>
<body style="text-align:left;">