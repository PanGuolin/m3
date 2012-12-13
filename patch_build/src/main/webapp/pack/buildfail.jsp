<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div style="text-align:center; margin-top:20px;">
	<div>你在【${info.branch.branch }】上提交的构建包【${info.buildNo}】构建失败，请检查日志并重新提交构建
		<span style="margin-left:20px;"><a id="rebuild" href="#">重新构建</a></span>
	</div>
	<div style="text-align:left; width:960px; clear:both; margin:0 auto;">
		构建日志：<br/>
		<textarea style="width:100%;margin-top:10px; height:500px;" disabled="disabled">${info.buildLog}
		</textarea>
	</div>
</div>
<script>
	var url = "${basePath }/pack/addBuild?i=${info.uuid}";
	$("#rebuild").attr("href", encodeURI(url));
</script>
<%@ include file="/include/footer.jsp" %>