
/**
 * 处理消息
 */
var fnmsg = {
		fetchMsg : function() {$.get("${pageContext.request.contextPath}/msg/fnmsg.action?t=n", fnmsg.handleMsgData, "json");},
			
		handleMsgData : function(data, status) {
			var viewOrDoUrl = "${pageContext.request.contextPath}/msg/viewordo?i=";
			if (status == "success" ) {
				//if (data.unread) $("#unreadmsg").html(data.unread);
				//if (data.undeal) $("#undealmsg").html(data.undeal);
					
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
			fnmsg.fetchMsg();
		}
};
		
$(document).ready(function(){fnmsg.fetchMsg();});