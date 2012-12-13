<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
	<div id="outterDiv" style="width:350px; margin-top:200px;">
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
				<td class="cmt pl">请输入用户名</td>
			</tr>
			<tr>
				<td class="r">口令：</td>
				<td class="l"><input type="password" name="password" value="${password}" class="wf"/></td>
				<td class="cmt pl">请输入登录口令</td>
			</tr>
			<tr>
				<td class="r">验证码：</td>
				<td class="l"><input type="text" name="code" class="wf"/></td>
				<td class="cmt pl">请输入下面图片的验证码</td>
			</tr>
			<tr>
				<td class="r"></td>
				<td class="l"><img src="${basePath }/sys/randImg?key=loginCode" onclick="this.src=this.src" title="点击切换验证码"/></td>
				<td><input type="checkbox" name="storeCookie" value="true"/>在本机保存我的信息</td>
			</tr>
			<tr>
				<td class="r"></td>
				<td class="l"></td>
				<td><input type="submit" value="登录"/></td>
			</tr>
			</table>
		</s:form>
 		</div>
	</div>
<%@ include file="/include/footer.jsp" %>