<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div class="c">
构建包${info.buildNo } -[${info.branch.branch }] 发布失败<br/>
</div>
<div class="l">
<b>失败原因：</b><br/>
${info.failReason }
</div>
<br/>
<s:form action="/message/handle">
	<input type="hidden" name="i" value="${i}"/>
	<input type="hidden" name="t" value="${t}"/>
	<input type="hidden" name="context.uuid" value="${i }"/>
	<input type="submit" value="重置发布状态"/>
</s:form>
<%@ include file="/include/footer.jsp" %>