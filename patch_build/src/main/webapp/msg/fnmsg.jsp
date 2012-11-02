<%@page language="java" pageEncoding="UTF-8"%>
    <script src="${pageContext.request.contextPath}/js/fn/fn.js?use=widget"></script>
	<script type="text/javascript">
		function fetchMsg() {	$.get("${pageContext.request.contextPath}/msg/fnmsg.action?t=n", handleMsgData, "json");	}
		function handleMsgData(data, status) {
			var viewOrDoUrl = "${pageContext.request.contextPath}/msg/viewordo?i=";
			if (status == "success" ) {
				var msgObj = data["message"];
				if (msgObj) {
					var content="接收时间: " + msgObj["sendTime"] 
						+ "<br/><a href='" + viewOrDoUrl + msgObj["uuid"] + "' style='display:block;float:right;'>开始处理</a>";
					var subject = msgObj["subject"];
					if (msgObj["detail"] && msgObj["detail"]["content"])
						content = msgObj["detail"]["content"] + "<br/>" + content;
					$msg(content,{
						title: subject,
					    position: 'right bottom',
					    width: 300
					});
				}
			}
			fetchMsg();
		}
		$(document).ready(function(){fetchMsg();});
	</script>