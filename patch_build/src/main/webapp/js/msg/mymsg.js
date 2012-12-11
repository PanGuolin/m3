var mainObj = {
	query : function() {return doDataQuery();},
	
	//处理任务
	doTask : function() {
		var row = getSelectedRow(true);
		if (!row || !row.uuid)
			return;
		if (row.recievers[0].sendType == 1) {
			alert("关注消息没有关联任务！");
			return;
		}
		var url = basePath + "/msg/handle?jfs=true&t=pm&i=" + row.uuid;
		$.get(url, function(data, status) {
			if (status != "success") {
				return;
			}
			if (data.tips)alert(data.tips);
			if (data.pageMode) {
				if (data.pageMode == "mode_iw") {
					$('#taskWindow').window('open');
					$('#taskWindow').window('refresh', basePath + data.pageUrl);
				} else {
					location.href = basePath + data.pageUrl;
				}
			}
		}, "json");
	},
	viewOperator : function() {
		var row = getSelectedRow(true);
		if (!row || !row.uuid)
			return;
		var uuid = row.uuid;
		var url =  basePath + "/msg/fnmsg.action?jfs=true&t=qo&i=" + uuid;
		$.get(url, function(data, status){
			var msg = "";
			if (status != "success") {
				alert("执行失败！");
				return;
			}
			if (data.tips) alert(data.tips);
			if (!data.rows || !data.rows.length) {
				msg = "没有找到相应执行人，可能消息已过期";
			} else {
				msg = "当前消息处理用户列表：<br/>";
				for (var i=0; i<data.rows.length; i++) {
					msg += data.rows[i].userName + "[" + data.rows[i].userId + "]，&nbsp;&nbsp;";
				}
			}
			$msg(msg, {title:"消息处理人"});
		}, "json");
	}
};
	
$().ready(function() {
	$("#queryForm INPUT").change(mainObj.query);
	mainObj.query();
	$('#viewDetail').click(function() {
		var row = getSelectedRow(true);
		if (row && row.content) {
			$msg(row.content, {width:400});
		}
	});
	$('#handleTask').click(mainObj.doTask);
	$('#viewOp').click(mainObj.viewOperator);
	$('#ignore').click(function(){
		var row = getSelectedRow(true);
		if (row && row.uuid) {
			if (row.recievers[0].sendType == 0) {
				alert("无法忽略任务消息！");
				return;
			}
			var url =  basePath + "/msg/fnmsg.action?jfs=true&t=ig&i=" + row.uuid;
			$.get(url, mainObj.query, "json");
		}
	});
	
});
		

function messageType(value, row, index) {
	return value[0].sendType == 0 ? "通知" : "抄送";
}
