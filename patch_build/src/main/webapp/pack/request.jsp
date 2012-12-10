<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<div style="text-align:center;">
	<div>构建包【${info.buildNo}】构建处于异常状态，请重新提交构建</div><br/>
	<s:form action="/pack/reset" theme="simple">
		<input type="hidden" name="i" value="${info.uuid }"/>
		<div class="op">
			<a href="#" id="rebuild">重新构建</a>
			<a href="#" id="cancel">取消构建包</a>
		</div>
	</s:form>
</div>
<script>
	var url = "${basePath }/pack/addBuild?i=${info.uuid}";
	$("#rebuild").attr("href", encodeURI(url));
</script>
<%@ include file="/include/footer.jsp" %>