<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div class="queryBar"></div>
<div class="tips">${tips}</div>
<s:form action="userinfo" theme="simple" id="userForm" namespace="/user">
<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
<input type="hidden" name="jfs" value="true"/>
<input type="hidden" name="user.uuid" value="${user.uuid }"/>
<table class="layoutTable btl">
	<caption>我的个人信息</caption>
	<tr>
		<td class="r">用户ID：</td>
		<td class="l">${user.userId}</td>
		<td class="r">用户密码：</td>
		<td class="l"><input type="password" name="user.password" class="wf"/></td>
		<td style="width:20px;">&nbsp;</td>
	</tr>
	<tr>
		<td class="r">用户姓名：</td>
		<td class="l"><input type="text" name="user.username" value="${user.username }" class="wf required"/></td>
		<td class="r">邮件地址：</td>
		<td class="l"><input type="text" name="user.email" value="${user.email }" class="wf"/></td>
		<td></td>
	</tr>
	<tr>
		<tr>
			<td class="r">主分支：</td>
			<td><select name="user.mainBranch" class="wf" selValue="${user.mainBranch}">
				<s:iterator value='branchs' status='st' id='branch'>
				<option value="<s:property value='#branch.branch'/>"> <s:property value='#branch.name'/></option>
				</s:iterator> 
			</select></td>
		</tr>
		<td class="r">拥有角色：</td>
		<td class="l" colspan="5">
			<s:iterator value="@com.m3.patchbuild.sys.RoleUtil@listAssignable()" id="uRole">
				<input type="checkbox" name="roles" value="${uRole.code}"/><s:property value="#uRole.name"/>
			</s:iterator>
		</td>
		<td></td>
	</tr>
</table>
<div class="wf c"><input type="submit" value="修改我的信息"/></div>
</s:form>
<script type="text/javascript" src="${basePath}/js/user/userinfo.js"></script>
<%@ include file="/include/footer.jsp" %>
<script>
	fn.use("jquery/form");
	var roles = '<s:iterator value="roles" id="uRole"><s:property value="#uRole"/>;</s:iterator>';
	$().ready(function() {userinfoObj.init(roles);});
</script>