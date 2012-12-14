<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>
<div class="subMenuBar">
	<a >项目维护</a>
	<a >系统功能维护</a>
	<a >功能权限维护</a>
</div>
<div class="queryDiv" style="display:block">
	<s:form action="queryBranch" theme="simple" id="queryForm" namespace="/sys">
	<table>
		<tr>
			<td class="h">编码：</td>
			<td><input type="text"/></td>
			<td class="h">名称：</td>
			<td><input type="text"/></td>
			<td class="h">路径：</td>
			<td><input type="text" name="q.buildNo"/></td>
			<td class="h">类型</td>
			<td><select>
				<option value=""></option>
				<option value="0">Action</option>
				<option value="1">JSP</option>
			</select></td>
			<td><input type="submit" value="查询"/></td>
		</tr>
	</table>
	</s:form>
</div>
<div class="queryBar" title="点击隐藏/显示查询表单"><img src="${basePath }/images/up.png"/><img src="${basePath }/images/down.png"/></div>
<div class="toolBar">
	<img id="addBranch" 		src="${basePath}/images/tb/add.png" 		title="新增分支"/>
</div>

<table class="fn-datagrid" style="display:none;" id="datagrid"
		pagination="true"
		rownumbers="true" 
		fitColumns="false"
		resizable="true"
		pageSize="30"
		singleSelect="true"
		pageIndexParam="q.pageIndex"
		pageSizeParam="q.pageSize"
		autoLoad="false"
		url="${basePath }/sys/queryBranch"
		>
	<thead>
		<tr>
			<th field="branch"	width="100">编码</th>
			<th field="name" 	width="100">名称</th>
			<th field="parent" 	width="100">父分支</th>
			<th field="svnUrl" 	width="400">SVN地址</th>
			<th field="version"	width="200">版本号</th>
			<th field="workspace"	width="200">工作目录</th>
			<th field="baseTime"	width="200">基线时间</th>
			<th field="createTime"	width="200">创建时间</th>
			<th field="createUser"	width="200">创建用户</th>
		</tr>
	</thead>
</table>
<div id="taskWindow" class="easyui-window" title="新增构建分支" data-options="iconCls:'icon-save'" style="width:750px;height:300px;"></div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sys/listBranch.js"></script>
<%@ include file="/include/footer.jsp" %>