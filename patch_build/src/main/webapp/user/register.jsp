<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
	<div id="outterDiv" style="width:550px; margin-top:200px;">
		<div id="errorDiv">${tips}</div>
		<div id="linkDiv">
			<a href="${basePath}/user/login.jsp">直接登录</a>
			<a href="${basePath}/user/import.jsp">从SVN引入</a></div>
		<div id="titleDiv">注册新用户</div>
		<div id="formDiv">
		<s:form action="/user/register.action" method="POST" theme="simple" id="registerForm">
		<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
			<table class="single">
				<tr>
					<td class="r">登录名: </td>
					<td><input type="text" name="user.userId" value="${user.userId }" class="wf required"/></td>
					<td class="r">真实姓名: </td>
					<td><input type="text" name="user.username" value="${user.username }" class="wf required"/></td>
					<td>&nbsp;&nbsp;</td>
				</tr>
				<tr>
					<td class="r">登录口令: </td>
					<td><input type="password" name="user.password" value="${user.password }" class="wf required"/></td>
					<td class="r">确认口令: </td>
					<td><input type="password" id="confirmPassord" value="${user.password }" class="wf required"/></td>
					<td>&nbsp;&nbsp;</td>
				</tr>
				<tr>
					<td class="r" rowspan="2">角色列表: </td>
					<td style="text-align:left" rowspan="2">
						<select name="roles"  multiple="multiple" class="wf">
						<s:iterator value="@com.m3.patchbuild.user.IUserRole@SYSROLES" id="uRole">
							<option value="${uRole }"><s:property value="uRole"/></option>
						</s:iterator>
						</select>
					</td>
					<td class="r">用户邮箱: </td>
					<td><input type="text" name="user.email" value="${user.email }" class="wf"/></td>
					<td>&nbsp;&nbsp;</td>
				</tr>
				<tr>
					<td class="r">主分支: </td>
					<td><select name="user.mainBranch" class="wf">
						<s:iterator value='branchs' status='st' id='branch'>
						<option value="<s:property value='#branch.branch'/>"> <s:property value='#branch.name'/></option>
						</s:iterator> 
					</select></td>
				</tr>
				<tr>
					<td colspan="4" class="r"><s:submit value="验证并注册" id="registerSubmit"/></td>
					<td>&nbsp;&nbsp;</td>
				</tr>
			</table>	
 		</s:form>
 		</div>
	</div>
<script type="text/javascript" src="${basePath}/js/user/register.js"></script>
<%@ include file="/include/footer.jsp" %>