<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:center;">
	<div>分支【${info.branch.branch }】上的构建包【${info.buildNo}】已经通过【${info.checker }】检查</div>
	<div style="clear:both; margin-top:20px; width:100%; text-align:left">
		<b>构建说明:</b>${info.comments }
	</div>
	<div style="margin-top:20px;">
	<s:form action="handleTask" theme="simple" id="taskForm" namespace="/msg">
		<input type="hidden" name="i" value="${i}"/>
		<input type="hidden" name="t" value="${t}"/>
		<span>请选择测试人员：</span>
		<s:set value="@com.m3.patchbuild.user.UserUtil@listAllTester()" name="testers"/>
		<s:select name="context.tester" multiple="false" list="#testers" listKey="userId" listValue="username + '[' + userId + ']'"/> 
 		<s:submit value="分配测试"/>
	</s:form>
	</div>
</div>
<%@ include file="/include/footer.jsp" %>