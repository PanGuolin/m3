<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:left;">
	<div>你在【${info.branch.branch }】上提交的构建包【${info.buildNo}】检查失败，请根据失败原因进行修复并重新提交构建</div>
	<div style="clear:both; margin:10px auto;">
		<b>失败原因：</b><br/>
		<span class="pl">${info.failReason}</span>
	</div>
</div>
<div style="width:100%; text-align:center;"><a href="${basePath }/pack/addBuild?find=true&i=${i}">重新构建</a></div>
<%@ include file="../include/footer.jsp" %>