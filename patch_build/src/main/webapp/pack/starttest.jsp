<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:center;">
确认开始测试分支【${info.branch.branch }】上的构建包【${info.buildNo}】？
<div style="text-align:left; clear:both; margin-top:20px; margin-left:20px;">
构建申请人：${info.requester }<br/>
任务分配人：${info.assigner }<br/>
构建说明：${info.comments }<br/>
</div>
	<s:form action="handleTask" theme="simple" id="taskForm" namespace="/message">
		<input type="hidden" name="i" value="${i}"/>
		<input type="hidden" name="t" value="${t}"/>
		<input type="hidden" name="context.uuid" value="${i}"/>
 		<s:submit value="开始测试"/>
	</s:form>
</div>
<%@ include file="/include/footer.jsp" %>