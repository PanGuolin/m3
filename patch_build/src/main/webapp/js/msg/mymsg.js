var mymsg = {
	refresh : function() {
		var url = basePath + "/js/fnmsg.action?t=nl";
		if ($("#query_nt_v1").is(":checked")) {
			url += "&q.nt=0";
		} else {
			url += "&q.nt=1";
		}
		if($("#query_stat").is(":checked")) {
			url += "&q.status=1";
		}
		$.get(url, mymsg.handleMsgData, "json");
	},
	
	data : {},
	
	handleMsgData : function(data, status) {
		if (status != "success" || !data.rows.length) {
			mymsg.data = undefined;
			$get("#datagrid").loadData([]);
			return;
		}
		mymsg.data = data;
		var isTo = $("#query_nt_v1").is(":checked");
		var recType = isTo ? "通知" : "关注";
		var rows = data["rows"];
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			row.recType = recType;
			var action = "";
			action += "<a href='#' onclick='$msg(mymsg.data.rows[" + i + "].detail.content, {width:400});'>显示内容</a>";
			if (isTo) {
				action += "&nbsp; &nbsp;<a href='#' onclick='mymsg.doTask(" + i + ")'>处理</a>";
			} else {
				action += "&nbsp; &nbsp;<a href='#' onclick='mymsg.ignore(" + i + ")'>忽略</a>";
			}
			action += "&nbsp; &nbsp;<a href='#' onclick='mymsg.checkOperators(" + i + ")'>当前操作人</a>";
			row.action = action;
		}
		$get("#datagrid").loadData(data);
	},
	
	checkOperators : function(index) {
		var uuid = mymsg.data.rows[index].uuid;
		var url =  basePath + "/js/fnmsg.action?t=qo&i=" + uuid;
		$.get(url, mymsg.showOperators, "json");
	}, 
	
	showOperators : function(data, status) {
		var msg = "";
		if (status != "success" || !data.rows.length) {
			msg = "没有找到相应执行人，可能消息已过期";
		} else {
			msg = "当前消息处理用户列表：<br/>";
			for (var i=0; i<data.rows.length; i++) {
				msg += data.rows[i].userName + "[" + data.rows[i].userId + "]，&nbsp;&nbsp;";
			}
		}
		$msg(msg, {title:"消息处理人"});
	},
	//忽略消息
	ignore : function(index) {
		var uuid = mymsg.data.rows[index].uuid;
		var url =  basePath + "/js/fnmsg.action?t=ig&i=" + uuid;
		$.get(url, mymsg.refresh, "json");
	},
	//处理任务
	doTask : function(index) {
		var uuid = mymsg.data.rows[index].uuid;
		var url = basePath + "/js/handle?t=pm&i=" + uuid;
		$.get(url, mymsg.openWin, "html");
		//$('#taskWindow').window('refresh', url);
		//$('#taskWindow').window({content:'sss0'});
		//$('#taskWindow').window('open');
	},
	openWin : function(data, status) {
		if (status != "success") {
			return;
		}
		var temp = $("#tempDiv").html(data);
		var url = basePath + "/js/handle?t=pc&i=" + temp.find('#uuid').text();
		var mode = temp.find('#modetype').text();
		if (mode == "mode_iw") {
			
			$('#taskWindow').window('open');
			$('#taskWindow').window('refresh', url);
			//alert($('#taskWindow').window('body').html());
		} else {
			location.href = url;
		}
	},
	winLoaded : function() {
		var subms = $('#taskWindow').window('body').find('form');
		if (subms.length) {
			subms.ajaxForm(function() {
				$('#taskWindow').window('close');
				mymsg.refresh();
			});
		}
	}
};
	
$().ready(function() {
	$(".queryForm").change(mymsg.refresh);
	$(mymsg.refresh());
});
		
function booleanFormater(value, row, index) {
	return value ? "是" : "否";
}

