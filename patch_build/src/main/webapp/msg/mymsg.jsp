<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>

<input type="radio" name="query.nt" class="queryForm" value="0" id="query_nt_v1" checked="checked"/>显示通知消息
<input type="radio" name="query.nt" class="queryForm" value="1" id="query_nt_v2"/>显示关注消息
<input type="checkbox" name="query.stat" class="queryForm" id="query_stat"/>显示已处理消息
<table class="fn-datagrid" style="display:none;" id="datagrid"
		pagination="true"
		rownumbers="true" 
		fitColumns="true"
		resizable="true"
		pageSize="6"
		singleSelect="true"
		pageIndexParam="q.pageIndex"
		pageSizeParam="q.pageSize"
		>
	<thead>
		<tr>
			<th field="subject" width="300" align="center" >消息标题</th>
			<th field="sendTime" width="100" align="center" >发送时间</th>
			<th field="sender" width="100" align="center">发送人</th>
			<th field="recType" width="100" align="center" >消息类型</th>
			<th field="attached" width="100" align="center" formatter="booleanFormater"> 是否有附件</th>
			<th field="action" width="200">操作</th>
		</tr>
	</thead>
</table>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/msg/mymsg.js"></script>
<%@ include file="../include/footer.jsp" %>