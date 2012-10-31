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
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
</head>
<body class="simple"> 
	<div id="outterDiv">
		<div id="errorDiv">${tips}</div>
		<s:form action="/pack/addBuild.action" method="POST" theme="simple"> 
			<s:set value="@com.m3.patchbuild.branch.BuildBranchService@listAllBranch()" name="branchs"/>
			<table>
				<tr>
					<td class="r">请选择构建分支:</td>
					<td><s:select name="pack.branch.branch" multiple="false" list="#branchs" listKey="branch" listValue="name"/> </td>
					<td class="r">构建号:</td>
					<td><s:textfield name="pack.buildNo"/></td>
					<td class="r">关键字(用分号连接):</td>
					<td><s:textfield name="pack.keywords" style="width:300px"/></td>
				</tr>
				<tr>
					<td class="r" colspan="6"><s:submit value="查找文件" name="find"/></td>
				</tr>
				<tr>
					<td colspan="6">待构建的文件列表:</td>
				</tr>
				<tr>
					<td colspan="6"><s:textarea name="files" style="width:100%; height:300px;"/></td>
				</tr>
				<tr>
					<td colspan="6" class="r"><s:submit value="提交构建" name="build"/></td>
				</tr>
			</table>
 		</s:form>
	</div>
	
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/showmessages.css" type="text/css" />
	<div id="messageTitle"><div>你有新消息</div></div>
	<div id="messageDiv"></div>
	<div id="messageContent"></div>
	<script type="text/javascript">
	
	function fetchMsg() {
		$.get("${pageContext.request.contextPath}/msg/fnmsg.action", handleMsgData, "json");
	}
	
	function handleMsgData(data, status) {
		if (status != "success" || !data.ids.length) {
			hideMsg();
		}
  		var ids = data.ids.split(";");
  		$("#messageTitle>div").text("你有" + ids.length + "条新消息");
  		var htm = "";
  		for (var i=0; i<ids.length; i++) {
  			if (i > 10) break;
  			var dt = data[ids[i]];
  			htm += "<div class='subj'><a href='#'>" + dt.subject.substring(8) + "</a></div><div class='op'><a href='#' tips='忽略'>X</a></div>";
		}
		$("#messageContent").html(htm);
		$("#messageTitle").show();
		$("#messageTitle").click(function(){
  			$("#messageContent").toggle();
  			fetchMsg();
		});
		
	}
	
	function hideMsg() {
		$("#messageTitle").hide();
  		$("#messageDiv").hide();
  		$("#messageContent").hide();
	}
	function showMsg() {
		$("#messageTitle").show();
  		$("#messageDiv").show();
  		$("#messageContent").show();
	}
	
	$(document).ready(function(){
		fetchMsg();
		setInterval("fetchMsg()",5000);
	});
	</script>
</body>
</html>