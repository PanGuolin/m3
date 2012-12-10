<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
	<div id="outterDiv" style="width:550px; margin-top:200px;">
		<div id="errorDiv">${tips }</div>
		<s:form action="/user/reqresetpass" theme="simple" id="resetForm">
			<table class="single">
			<tr>
				<td class="r">用户名：</td>
				<td class="l"><input type="text" name="userId" value="${userId}" class="wf required"/></td>
				<td class="r">口令：</td>
				<td class="l"><input type="password" name="password" value="${password}" class="wf required"/></td>
				<td style="width:20px;"></td>
			</tr>
			<tr>
				<td class="r">重置暗号：</td>
				<td colspan="3"><textarea name="comment" class="wf">Sky king cover ground tiger</textarea></td>
				<td></td>
			</tr>
			<tr>
				<td colspan="4" class="r op">
				<a href="${basePath }/user/login.jsp">返回登录</a>
				<input type="submit" value="发送重设请求"/>
				</td>
				<td></td>
			</tr>
			</table>
		</s:form>
	</div>
<%@ include file="/include/footer.jsp" %>