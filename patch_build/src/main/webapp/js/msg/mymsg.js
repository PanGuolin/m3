var mymsg = {
	refresh : function() {
		var url = basePath + "/msg/fnmsg.action?t=nl";
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
				action += "&nbsp; &nbsp;<a href='#' onclick=''>处理</a>";
			} else {
				action += "&nbsp; &nbsp;<a href='#' onclick=''>忽略</a>";
			}
			row.action = action;
		}
		$get("#datagrid").loadData(data);
	}
};
	
$().ready(function() {
	$(".queryForm").change(mymsg.refresh);
	$(mymsg.refresh());
});
		
function booleanFormater(value, row, index) {
	return value ? "是" : "否";
}