<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
	
<div id="outterDiv" style="margin-top:200px; width:550px;">
	<div id="errorDiv">${tips}</div>
	<div id="linkDiv">
		<a href="${pageContext.request.contextPath}/user/register.jsp">向管理员申请注册</a>
		<a href="${basePath}/user/login.jsp">直接登录</a>
	</div>
	<div id="titleDiv">从SVN引入新用户</div>
	<div id="formDiv">
		<s:form action="importFromSvn" method="POST" theme="simple" id="importForm" namespace="/user">
			<table style="width:100%;" class="layoutTable">
				<tr>
					<td class="r">代码分支：</td>
					<td><s:select name="branch" label="请选择SVN分支" multiple="false" list="#branchs" listKey="branch" listValue="name"/> </td>
					<td></td>
					<td></td>
					<td style="width:20px;"></td>
				</tr>
				<tr>
					<td class="r">登录名：</td>
					<td><input type="text" name="user.userId" value="${user.userId }" class="wf required"/></td>	
					<td class="r">登录口令：</td>
					<td><input type="password" name="user.password" value="${user.password }" class="wf required"/></td>
					<td></td>
				</tr>
				<tr>
					<td class="r">真实姓名：</td>
					<td><input type="text" name="user.username" value="${user.username }" class="wf required"/></td>	
					<td class="r">用户邮箱：</td>
					<td><input type="text" name="user.email" value="${user.email }" class="wf"/></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="4" class="r"><input type="submit" value="验证并注册"/></td>
					<td></td>
				</tr>
			</table> 
 		</s:form>
 	</div>
</div>
<%@ include file="/include/footer.jsp" %>