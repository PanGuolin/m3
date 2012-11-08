
/**
 * 处理消息
 */
var fnmsg = {
		fetchMsg : function() {$.get(basePath + "/js/fnmsg.action?t=n", fnmsg.handleMsgData, "json");},
			
		handleMsgData : function(data, status) {
			var viewOrDoUrl = basePath + "/msg/viewordo?i=";
			if (status == "success" ) {
				//var sStatus = data.status;
				//if (-1 == sStatus)  {//线程被中断
				//	
				//}
					
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
					if (mymsg && mymsg.refresh) {
						mymsg.refresh();
					}
				}
			}
			fnmsg.fetchMsg();
		}
};
		
$(document).ready(function(){fnmsg.fetchMsg();});