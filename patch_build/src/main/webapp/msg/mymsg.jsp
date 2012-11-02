<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>

<input type="radio" name="query.nt" class="queryForm" value="0" id="query_nt_v1"/>显示通知消息
<input type="radio" name="query.nt" class="queryForm" value="1" id="query_nt_v1"/>显示关注消息
<input type="checkbox" name="query.stat" class="queryForm" id="query_stat"/>显示已处理消息
<table class="fn-datagrid" style="display:none;" id="datagrid"
		url="${pageContext.request.contextPath}/msg/fnmsg.action?t=nl"
		pagination="true"
		rownumbers="true" 
		fitColumns="true"
		resizable="true"
		pageSize="6"
		singleSelect="true"
		pageIndexParam="query.pageIndex"
		pageSizeParam="query.pageSize"
		>
	<thead>
		<tr>
			<th field="subject" width="300" align="center" >消息标题</th>
			<th field="sendTime" width="100" align="center" >发送时间</th>
			<th field="sender" width="100" align="center">发送人</th>
			<th field="status" width="100" align="center" >状态</th>
			<th field="attached" width="100" align="center" formatter="booleanFormater"> 是否有附件</th>
			<th field="action" width="50" align="center" 
				formatter="function(r){ return '<a href=#>删除</a>';}"></th>
		</tr>
	</thead>
</table>
<script type="text/javascript">
	$().ready(function() {
		$(".queryForm").change(refresh);
	});
	
	function refresh() {
		var url = "${pageContext.request.contextPath}/msg/fnmsg.action?t=nl";
		if ($("#query_nt_v1").is(":checked")) {
			url += "&query.nt=0";
		} else {
			url += "&query.nt=1";
		}
		if($("#query_stat").is(":checked")) {
			url += "&query.status=1"
		}
		$get("#datagrid").reload(url, {}, true);
	}
		
	function booleanFormater(value, row, index) {
		return value == "true" ? "是" : "否";
	}
</script>
<%@ include file="./fnmsg.jsp" %>
<%@ include file="../include/footer.jsp" %>