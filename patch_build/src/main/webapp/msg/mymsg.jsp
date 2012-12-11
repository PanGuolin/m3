<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>
<div>${tips }</div>
<div class="queryDiv" style="display:block;">
<!-- <div class="fn-queryModule"> -->
	<s:form action="query" theme="simple" id="queryForm" namespace="/msg">
	<input type="hidden" name="t" value="nl"/>
	<input type="hidden" name="jfs" value="true"/>
	<table>
		<tr>
			<td><input type="radio" name="q.recieveType" value="0" checked="checked" id="isTo"/></td>
			<td>显示通知消息</td>
			<td><input type="radio" name="q.recieveType" value="1"/></td>
			<td>显示关注消息</td>
		</tr>
	</table>
	</s:form>
<!-- </div> -->
</div>
<div class="queryBar" title="点击隐藏/显示查询表单"><img src="${basePath }/images/up.png"/><img src="${basePath }/images/down.png"/></div>
<div class="toolBar">
	<img id="viewDetail"	src="${basePath}/images/tb/detail.png" 		title="显示消息内容"/>
	<img id="handleTask" 	src="${basePath}/images/tb/task.png" 		title="处理任务"/>
	<img id="viewOp" 		src="${basePath}/images/tb/users.png" 		title="查看操作人"/>
	<img id="ignore" 		src="${basePath}/images/tb/trash.png" 		title="忽略消息"/>
</div>

<table class="fn-datagrid" style="display:none;" id="datagrid"
		pagination="true"
		rownumbers="true" 
		fitColumns="true"
		resizable="true"
		pageSize="6"
		singleSelect="true"
		pageIndexParam="q.pageIndex"
		pageSizeParam="q.pageSize"
		autoLoad="false"
		url="${basePath}/msg/query"
		>
	<thead>
		<tr>
			<th field="subject" 	width="300" align="left" >消息标题</th>
			<th field="sendTime" 	width="100" align="center" formatter="formatTime">发送时间</th>
			<th field="sender" 		width="100" align="center">发送人</th>
			<th field="recievers" 	width="100" align="center" formatter="messageType">消息类型</th>
			<th field="content"		width="300" align="left">消息内容</th>
		</tr>
	</thead>
</table>
<div id="taskWindow" class="easyui-window" title="任务处理" data-options="iconCls:'icon-save'" style="width:400px;height:300px;"> 
</div>
<div id="tempDiv" style="display:none"></div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/msg/mymsg.js"></script>
<%@ include file="../include/footer.jsp" %>