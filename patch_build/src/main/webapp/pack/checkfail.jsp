<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div style="text-align:center;">
	<div>你在【${pack.branch.branch }】上提交的构建包【${pack.buildNo}】检查失败，请根据失败原因并重新提交构建
		<span style="margin-left:20px;"><a id="rebuild" href="#">重新构建</a></span>
	</div>
	<div style="text-align:left; width:960px; clear:both; margin:0 auto;">
		失败原因：<br/>
		<textarea style="width:100%;margin-top:10px; height:300px;" disabled="disabled">${pack.failReason}
		</textarea>
	</div>
</div>
<script>
	var url = "${basePath }/pack/addBuild?find=true&pack.branch.branch=${pack.branch.branch}&pack.buildNo=${pack.buildNo}&pack.keywords=${pack.keywords}";
	$("#rebuild").attr("href", encodeURI(url));
</script>
<%@ include file="../include/footer.jsp" %>