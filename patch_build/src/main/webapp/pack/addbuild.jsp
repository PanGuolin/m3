<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ include file="../include/header.jsp" %>
<div class="queryBar">&nbsp;&nbsp;</div>
	<div id="outterDiv" style="margin-top:10px;">
		<div id="errorDiv">${tips}</div>
		<div class="pl" style="margin-bottom:10px;">构建分支：<b>${currentBranch.name}[${currentBranch.branch}]</b></div>
		<s:form action="addBuild" method="POST" theme="simple" namespace="/pack">
			<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
			<table style="width:100%">
				<tr>
					<td class="r">构建号:</td>
					<td class="pl"><input type="text" name="pack.buildNo" value="${pack.buildNo }" class="wf required"/></td>
					<td class="r">关键字(用分号连接):</td>
					<td class="pl"><input type="text" name="pack.keywords" value="${pack.keywords }" class="wf"/></td>
					<td><s:submit value="查找文件" name="find"/></td>
				</tr>
			</table>
			<table style="width:100%; margin-top:10px;">
				<tr>
					<td class="pl">待构建的文件列表:<span class="cmt">可以在列表中自由添加、修改或删除。各文件路径以分号连接</span></td>
				</tr>
				<tr>
					<td><s:textarea name="files" style="width:100%; height:300px;"/></td>
				</tr>
				<tr>
					<td class="pl">补丁描述:<span class="cmt pl">请详细描述补丁修复的功能</span></td>
				</tr>
				<tr>
					<td><s:textarea name="pack.comments" style="width:100%; height:50px;"/></td>
				</tr>
				<tr>
					<td class="pl">发布JAR包:<span class="cmt pl">需要在补丁中包含依赖的JAR包。多个JAR包用分号连接</span></td>
				</tr>
				<tr>
					<td><s:textarea name="pack.libfiles" style="width:100%; height:50px;"/></td>
				</tr>
				<tr>
					<td class="r"><s:submit value="提交构建" name="build"/></td>
				</tr>
			</table>
 		</s:form>
	</div>
	
<%@ include file="../include/footer.jsp"%>
<script type="text/javascript" src="${basePath}/js/pack/addbuild.js"></script>