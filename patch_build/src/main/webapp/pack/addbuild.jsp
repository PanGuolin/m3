<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@page import="com.m3.patchbuild.branch.BranchService" %>
<%@ include file="../include/header.jsp" %>

	<div id="outterDiv">
		<div id="errorDiv">${tips}</div>
		<s:form action="/pack/addBuild.action" method="POST" theme="simple">
			<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
			<table style="width:100%">
				<tr>
					<td class="r">请选择构建分支:</td>
					<td><s:select name="pack.branch.branch" multiple="false" list="#branchs" listKey="branch" listValue="name"/> </td>
					<td class="r">构建号:</td>
					<td><s:textfield name="pack.buildNo"/></td>
					<td class="r">关键字(用分号连接):</td>
					<td><s:textfield name="pack.keywords" style="width:300px"/></td>
				</tr>
				<tr>
					<td class="r" colspan="6"><s:submit value="查找文件" name="find"/></td>
				</tr>
				<tr>
					<td colspan="6">待构建的文件列表:</td>
				</tr>
				<tr>
					<td colspan="6"><s:textarea name="files" style="width:100%; height:400px;"/></td>
				</tr>
				<tr>
					<td colspan="6" class="r"><s:submit value="提交构建" name="build"/></td>
				</tr>
			</table>
 		</s:form>
	</div>
	
<%@ include file="../include/footer.jsp"%>