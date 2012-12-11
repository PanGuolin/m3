<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
	<div id="outterDiv" style="width:250px; margin-top:200px;">
		<div id="errorDiv">${tips}</div>
		<div id="linkDiv">
			<a href="${pageContext.request.contextPath}/user/register.jsp">申请注册</a>
			<a href="${pageContext.request.contextPath}/user/import.jsp">从SVN引入用户</a>
			<a href="${basePath }/user/resetpass.jsp">重设密码</a>
		</div>
		<div id="titleDiv">欢迎使用补丁构建系统</div>
		<div id="formDiv">
		<s:form action="login" theme="simple" id="loginForm" namespace="/user">
			<table class="single">
			<tr>
				<td class="r">用户名：</td>
				<td class="l"><input type="text" name="username" value="${username}" class="wf"/></td>
				<td></td>
			</tr>
			<tr>
				<td class="r">口令：</td>
				<td class="l"><input type="password" name="password" value="${password}" class="wf"/></td>
				<td></td>
			</tr>
			<tr>
				<td class="r"></td>
				<td class="l"><input type="checkbox" name="storeCookie" value="true"/>保存我的信息</td>
				<td></td>
			</tr>
			<tr>
				<td colspan="3" class="r op">
					<input type="submit" value="登录"/>
				</td>
			<tr>
			</table>
		</s:form>
 		</div>
	</div>
<%@ include file="/include/footer.jsp" %>