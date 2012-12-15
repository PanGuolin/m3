
/**
 * 处理消息
 */
var headerObj = {
		init : function() {
			$('#currentBranch').change(function() {
				$.get(basePath + "/sys/changeBranch?jfs=true&branch=" + $(this).val(), function(data, status) {
					if (status != "success" ) {alert("请求错误!"); return;}
					if (!data) return;
					if (data.tips) alert(data.tips);
					window.location.reload();
				}, "json");
			});
			headerObj.fetchMsg();
		},
		fetchMsg : function() {
			$.get(basePath + "/msg/fnmsg.action?jfs=true&t=n", function(data, status) {
				if (status == "success" ) {
					if (!data) return;
					if (data.status == "-1") {//用户未登录,则不再继续请求
						return;
					}
					if (data.tips) alert(data.tips);
					var msgObj = data.message;
					if (msgObj && msgObj.subject) {
						var content = msgObj.content + "<br/>接收时间: " + msgObj.sendTime;
						$msg(content,{
							title: msgObj.subject,
							position: 'right bottom',
							width: 300
						});
						if (mainObj && mainObj.query) {
							mainObj.query();
						}
					}
					headerObj.fetchMsg();
				}
			}, "json");
		},
};
		
$(document).ready(headerObj.init);

function formatTime(value, row, index) {
	if (value) {
		value = value + "";
		return value.substring(5, 10) + " " + value.substring(11, 16);
	}
	return value;
}

function formatStatus(value, row, index) {
	var isFail = false;
	var title = value;
	switch(value) {
		case "builded": 	title="已构建";		break;
		case "buildFail": 	title="构建失败";	isFail = true; break;
		case "checked": 	title="检查通过";	break;
		case "checkFail": 	title="检查不通过";	isFail = true; break;
		case "init": 		title="初始化";		break;
		case "pass": 		title="测试通过";	break;
		case "published": 	title="已发布";		break;
		case "request": 	title="请求构建";	break;
		case "testFail": 	title="测试打回";	isFail = true; break;
		case "testing": 	title="正在测试";	break;
		case "publishFail": title="发布失败";	isFail = true; break;
		case "assigned":	title="已分配";		break;
	}
	if (isFail)
		title = "<span style='color:red'>" + title + "</span>";
	return title;
}
