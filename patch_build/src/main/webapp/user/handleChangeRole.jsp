<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<style>td.r{text-align:right;}</style>
<div style="width:100%; text-align:center">
<s:form action="/message/handle" theme="simple" id="taskForm">
	<input type="hidden" name="i" value="${i}"/>
	<input type="hidden" name="t" value="${t}"/>
	用户【${info.requester.userId }】申请修改角色列表，是否同意？
	<table class="dataTable">
		<tr>
			<td class="r">修改分支：</td>
			<td>${info.branch }</td>
		</tr>
		<tr>
			<td class="r" width="100px">原有角色列表：</td>
			<td style="white-space:normal;">
				<s:iterator value="info.requester.roles" id="uRole" status="st">
					<s:if test="#uRole.branch == #session.currentBranch.branch"><s:property value="#uRole.roleId"/>;&nbsp;</s:if>
				</s:iterator>
			</td>
		</tr>
		<tr>
			<td class="r">新角色列表：</td>
			<td>
				<s:iterator value="@com.m3.patchbuild.user.IUserRole@SYSROLES" id="uRole">
					<nobr><input type="checkbox" name="context.roles" value="${uRole}"/><s:property value="#uRole"/></nobr>
				</s:iterator>
			</td>
		</tr>
		<tr>
			<td colspan="2" style="text-align:center;">
				<input type="radio" name="context.accepted" value="true"/>同意
				<input type="radio" name="context.accepted" value="false" checked="checked"/>不同意
			</td>
		</tr>
	</table>
	<div class="wf" style="text-align:center"><input type="submit" value="确定提交"/></div>
	<br/>
</s:form>
</div>
<script type="text/javascript" src="${basePath}/js/user/handleChangeRole.js"></script>
<script>
	var roles = '<s:iterator value="info.roleArray" id="uRole"><s:property value="#uRole"/>;</s:iterator>';
	$().ready(function() {handleChangeRoleObj.init(roles);});
</script>
<%@ include file="/include/footer.jsp" %>