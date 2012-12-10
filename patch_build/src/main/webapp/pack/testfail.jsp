<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:center;">
你在【${info.branch.branch }】上提交的构建包【${info.buildNo}】被测试人员${info.tester}打回<br/>
</div>
<div style="text-align:left; margin-top:20px;">打回原因: ${info.failReason}<br/><hr/>
	<table style="width:100%; border:1px solid #ccc; margin-top:20px;">
		<caption>相关BUG：</caption>
		<tr>
			<th class="c">BUG编号</th>
			<th>录入时间</th>
			<th>是否已验证</th>
			<th>BUG描述</th>
		</tr>
		<s:iterator value="info.bugs" status='st' id='bug'> 
		<tr>
			<td>${bug.bugNo }</td>
			<td>${bug.createTime }</td>
			<td>${bug.fixed }</td>
			<td>${bug.comment }</td>
		</tr>
		</s:iterator>
	</table>
</div>
<div style="width:100%; text-align:center; margin-top:20px;"><a id="rebuild" href="#">重新构建</a></div>
<script>
	var url = "${basePath }/pack/addBuild?i=${info.uuid}";
	$("#rebuild").attr("href", encodeURI(url));
</script>
<%@ include file="/include/footer.jsp" %>