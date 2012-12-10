<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div class="queryBar">&nbsp;&nbsp;</div>
<div class="tips">${tips}</div>
<s:form action="relation" theme="simple" id="relationForm" namespace="/user">
<table class="dataTable" style="width:100%">
	<caption>我关注的用户列表</caption>
	<tr>
	<s:iterator value="followable" status='st' id='user'> 
		<td class="pl l"><input type="checkbox" name="follow" value="${user.uuid }"/>${user.username }[${user.userId }]</td>
		<s:if test="(#st.index+1) % 5==0">
		</tr>
		<tr>
		</s:if>
	</s:iterator>
	</tr> 
</table>
<input type="hidden" id="followers" name="followers" value="${followers}"/>
<hr/>
<s:if test="memberable != null">
<table class="dataTable">
<caption>我负责的用户</caption>
	<tr>
	<s:iterator value="memberable" status='st' id='user'>
		<td class='pl'><input type="checkbox" name="member" value="${user.uuid }"/>${user.username }[${user.userId }]</td>
		<s:if test="(#st.index+1) % 5==0">
		</tr>
		<tr>
		</s:if>
	</s:iterator> 
	</tr>
</table>
<input type="hidden" id="members" name="members" value="${members}"/>
</s:if>
<input type="button" value="保存关系" id="save"/>
</s:form>
<script type="text/javascript" src="${basePath}/js/user/relation.js"></script>
<%@ include file="/include/footer.jsp" %>