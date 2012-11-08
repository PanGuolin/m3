<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:center;">
确认开始测试分支【${pack.branch.branch }】上的构建包【${pack.buildNo}】？
<div style="text-align:left; clear:both; margin-top:20px; margin-left:20px;">
构建申请人：${pack.requester }<br/>
任务分配人：${pack.assigner }<br/>
</div>
<form action="${basePath }/pack/starttest.action" method="POST">
<input type="hidden" value="${pack.uuid}" name="i"/>
<input type="submit" value="确认"/>
</form>
</div>
<%@ include file="../include/footer.jsp" %>