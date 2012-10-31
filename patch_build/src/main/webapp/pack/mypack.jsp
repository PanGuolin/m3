<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>

<div>
	<a href="#">待我处理</a>
	<a href="#">我的关注</a>
	<a href="#">我已处理</a>
	根据条件过滤:
	<select name="condition">
		<option value="branch" type="branch">分支</option>
		<option value="buildNo" type="string">构建号</option>
		<option value="requester" type="string">请求人</option>
		<option value="status" type="pack.status">补丁状态</option>
		<option value="buildTime" type="date">构建时间</option>
	</select>
	<select name="operation">
		<option value="branch">&gt;</option>
		<option value="buildNo">=</option>
		<option value="requester">&lt;</option>
		<option value="status">&gt;=</option>
		<option value="like">包含</option>
	</select>
	<input value="上一周"/>
	<input type="button" value="+"/>
</div>
<table id="dataTable">
	<tr>
		<th>分支</th>
		<th>构建号</th>
		<th>请求人</th>
		<th>构建时间</th>
		<th>检查人</th>
		<th>检查时间</th>
		<th>测试人</th>
		<th>测试时间</th>
		<th>补丁状态</th>
		<th>失败原因</th>
		<th>处理</th>
	</tr>
</table>
<div id="pager2"></div>
<script>
jQuery("#dataTable").jqGrid({
   	url:'server.php?q=2',
	datatype: "json",
   	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
   	colModel:[
   		{name:'id',index:'id', width:55},
   		{name:'invdate',index:'invdate', width:90},
   		{name:'name',index:'name asc, invdate', width:100},
   		{name:'amount',index:'amount', width:80, align:"right"},
   		{name:'tax',index:'tax', width:80, align:"right"},		
   		{name:'total',index:'total', width:80,align:"right"},		
   		{name:'note',index:'note', width:150, sortable:false}		
   	],
   	rowNum:10,
   	rowList:[10,20,30],
   	pager: '#pager2',
   	sortname: 'id',
    viewrecords: true,
    sortorder: "desc",
    caption:"JSON Example"
});


jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
</script>

</body>
</html>
