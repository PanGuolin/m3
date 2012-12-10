<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<s:form action="/patch/tag" theme="simple">
<input type="hidden" name="i" value="${i }"/>
<table style="width:100%">
	<tr>
		<td class="l">新分支地址:</td>
	</tr>
	<tr>
		<td><textarea name="branchUrl" style="width:95%; height:50px;">${branchUrl }</textarea></td>
	</tr>
	<tr>
		<td class="c"><input type="submit" value="确定创建"/></td>
	</tr>
	<tr>
		<td class="l cmt">提交后请留意系统通知消息</td>
	</tr>
</table>
</s:form>
<%@ include file="/include/footer.jsp" %>