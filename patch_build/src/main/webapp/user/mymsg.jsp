<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>

	<table id="list2"></table>
	<div id="pager2"></div>
	<script>
	jQuery("#list2").jqGrid({
   	url:'${basePath}/msg/fnmsg',
	datatype: "json",
   	colNames:['消息主题','发送日期', '业务类别', '业务ID','类型','消息状态','消息内容'],
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
