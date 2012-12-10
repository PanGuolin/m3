<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="width:100%; text-align:center">
<s:form action="/message/handle" theme="simple" id="taskForm">
	<input type="hidden" name="i" value="${i}"/>
	<input type="hidden" name="t" value="${t}"/>
	用户${info.requester.userId }申请重置密码，是否同意？<br/><br/>
	<table class="layoutTable btl">
		<tr>
			<td class="r">请求客户端：</td>
			<td class="l">${info.clientAddr }</td>
		</tr>
		<tr>
			<td class="r">请求说明：</td>
			<td class="l">${info.comment}</td>
		</tr>
	</table>
	
	<div style="margin-top:20px; width:100%; text-align:center;">
		<table style="margin:0 auto">
			<tr>
				<td>是否同意：</td>
				<td><select class="required" name="context.accepted">
					<option></option>
					<option value="true">同意</option>
					<option value="false">不同意</option>
				</select></td>
				<td><input type="submit" value="确定提交"/></td>
			</tr>
		</table>
	</div>
</s:form> 
</div>
<%@ include file="/include/footer.jsp" %> 