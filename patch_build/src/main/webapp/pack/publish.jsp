<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div style="text-align:left">
<h1>请确认待发布的包并提交发布</h1>
<s:form action="publish" namespace="/pack">

<table class="dataTable">
	<tr>
		<th>发布</th>
		<th>分支</th>
		<th>构建号</th>
		<th>依赖补丁</th>
		<th>测试人员</th>
		<th class="dateTime">测试通过时间</th>
		<th>申请人</th>
		<th class="dateTime">申请时间</th>
	</tr>
	<s:iterator value="packs" status='st' id='pack'> 
	<tr>
		<td class="c"><input type="checkbox" name="uuids" value="${pack.uuid }" checked="checked"/></td>
		<td>${pack.branch.branch }</td>
		<td>${pack.buildNo }</td>
		<td>${pack.depends }</td>
		<td>${pack.tester }</td>
		<td>${pack.passTime}</td>
		<td>${pack.requester}</td>
		<td>${pack.requestTime }</td>
	</tr>
	</s:iterator>
	<tr>
		<td colspan="8" style="text-align:center;"><input type="submit" value="确认发布"/></td>
	</tr>
</table>
</s:form>
</div>
<%@ include file="../include/footer.jsp" %>