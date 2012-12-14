<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<s:form>
	<table class="layoutTable" colClass="r pl;wfsub required">
		<tr>
			<td>父分支：</td>
			<td><input type="branch.parent"/></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>编码：</td>
			<td><input type="text" name="branch.branch"/></td>
			<td>名称：</td>
			<td><input type="text" name="branch.name"/></td>
			<td>版本号：</td>
			<td><input type="text" name="branch.version"/></td>
			<td style="width:20px;"></td>
		</tr>
		<tr>
			<td>SVN地址：</td>
			<td colspan="5"><input type="text" name="branch.svnUrl"/></td>
			<td></td>
		</tr>
		<tr>
			<td>SVN根路径：</td>
			<td colspan="5"><input type="text" name="branch.svnRoot"/></td>
			<td></td>
		</tr>
		<tr>
			<td>SVN分支路径：</td>
			<td colspan="5"><input type="text" name="branch.svnTagRoot"/></td>
			<td></td>
		</tr>
		<tr>
			<td>SVN用户：</td>
			<td><input type="text" name="branch.svnUser"/></td>
			<td>登录密码：</td>
			<td><input type="password" name="branch.svnPassword"/></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>工作路径：</td>
			<td colspan="5"><input type="text" name="branch.workspace"/></td>
			<td></td>
		</tr>
	</table>
	<div class="c mt"><input type="submit" value="增加"/></div>
</s:form>
<%@ include file="/include/footer.jsp" %>