<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<style>td.r{text-align:right;}</style>
<div style="width:100%; text-align:center">
<s:form action="/user/handleRegisterReq" theme="simple">
	<input type="hidden" name="req.uuid" value="${req.uuid }"/>
	用户${req.userId }申请注册，是否同意？<br/>
	<table class="dataTable">
		<tr>
			<td width="80px" class="r">用户ID：</td>
			<td>${user.userId}</td>
		</tr>
		<tr>
			<td class="r">用户名：</td>
			<td>${user.username}</td>
		</tr>
		<tr>
			<td class="r">Email：</td>
			<td>${user.email }</td>
		</tr>
		<tr>
			<td class="r">角色列表：</td>
			<td style="text-align:left">
			<s:iterator value="user.roles" id="uRole">
				<input type="checkbox" name="roles" value="${uRole}" checked="checked"/><s:property value="uRole"/><br/>
			</s:iterator>
			</td>
		</tr>
		<tr>
			<td class="r">申请日期：</td>
			<td>${req.createTime }</td>
		</tr>
		<tr>
			<td colspan="2" style="text-align:center;">
				<input type="radio" name="req.accepted" value="true" checked="checked"/>同意
				<input type="radio" name="req.accepted" value="false"/>不同意
				<input type="submit" value="确定"/>
			</td>
		</tr>
	</table>
	<br/>
	
</s:form>
</div>
<%@ include file="/include/footer.jsp" %>