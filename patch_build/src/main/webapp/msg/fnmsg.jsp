<%@page language="java" pageEncoding="UTF-8"%>
    <script src="${pageContext.request.contextPath}/js/fn/fn.js?use=widget"></script>
	<script type="text/javascript">
		function fetchMsg() {	$.get("${pageContext.request.contextPath}/msg/fnmsg.action?t=n", handleMsgData, "json");	}
		function handleMsgData(data, status) {
			if (status == "success" ) {
				var msgObj = data["message"];
				if (msgObj) {
					var content = msgObj["content"];
					$msg(content,{
					    position: 'right bottom',
					    width: 300
					});
				}
			}
			fetchMsg();
		}
		$(document).ready(function(){fetchMsg();});
	</script>