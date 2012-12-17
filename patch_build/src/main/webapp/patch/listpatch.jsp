<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div id="queryDiv">
	<s:form action="query" theme="simple" id="queryForm" namespace="/patch">
	<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
	<table>
		<tr>
			<td class="h">所属分支：</td>
			<td><select name="q.branch" selValue="${currentBranch.uuid}">
				<option value=""></option>
				<s:iterator value='branchs' status='st' id='branch'>
				<option value="<s:property value='#branch.uuid'/>"> <s:property value='#branch.name'/></option>
				</s:iterator> 
			</select></td>
			<td class="h">补丁号：</td>
			<td><input type="text" name="q.name"/></td>
			<td class="h">包含构建号：</td>
			<td><input type="text" name="q.builds" style="width:120px;"/></td>
			<td class="h">制作时间：</td>
			<td><input type="text" class="fn-date" name="q.buildStart"/></td>
			<td class="h">到：</td>
			<td><input type="text" class="fn-date" name="q.buildEnd"/></td>
			<td><input type="submit" value="查询"/></td>
		</tr>
	</table>
	</s:form>
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
		url="${basePath}/patch/query"
		>
	<thead>
		<tr>
			<th field="branch.branch" width="50">分支</th>
			<th field="name" 		width="150">补丁名称</th>
			<th field="lastModify" 	width="100"	align="right" formatter="formatTime">最后修改时间</th>
			<th field="createTime" 	width="100" align="right" formatter="formatTime">制作时间</th>
			<th field="md5"			width="200">MD5</th>
			<th field="builds" 		width="300"	align="left">构建包列表</th>
		</tr>
	</thead>
</table>
<div id="taskWindow" class="easyui-window" title="任务处理" data-options="iconCls:'icon-save'" style="width:400px;height:300px;"> 
</div>
<script type="text/javascript" src="${basePath}/js/patch/listpatch.js"></script>
<%@ include file="/include/footer.jsp" %>
