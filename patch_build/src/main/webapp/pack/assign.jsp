<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div style="text-align:center;">
	<div>分支【${pack.branch.branch }】上的构建包【${pack.buildNo}】已经通过【${pack.checker }】检查，请安排测试人员进行测试</div>
	<div style="margin-top:20px;">
	<s:form action="/pack/assign" method="POST" theme="simple"> 
		<span>请选择测试人员：</span>
		<s:set value="@com.m3.patchbuild.user.UserUtil@listAllTester()" name="testers"/>
		<s:select name="t" multiple="false" list="#testers" listKey="userId" listValue="username + '[' + userId + ']'"/> 
		<input type="hidden" name="i" value="${pack.uuid}"/>
 		<s:submit value="分配测试"/>
 	</s:form>
	</div>
</div>
<%@ include file="../include/footer.jsp" %>