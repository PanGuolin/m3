var mainObj = {

	data : {},
	
	/**
	 * 查看构建包的当前操作人
	 */
	viewOperators : function() {
		var row = getSelectedRow(true);
		if (!row) return;
		var url =  basePath + "/msg/fnmsg.action?jfs=true&t=qo&b=com.m3.patchbuild.pack.Pack&i=" + row.uuid;
		$.get(url, function(data, status) {
			var msg = "";
			if (status != "success" || !data.rows || !data.rows.length) {
				msg = "没有找到相应执行人，可能构建包已发布";
			} else {
				msg = "当前消息处理用户列表：<br/>";
				for (var i=0; i<data.rows.length; i++) {
					msg += data.rows[i].userName + "[" + data.rows[i].userId + "]，&nbsp;&nbsp;";
				}
			}
			$msg(msg, {title:"消息处理人"});
		}, "json");
	},
	
	/**
	 * 处理构建包的相关任务
	 */
	handleTask : function() {
		var row = getSelectedRow(true);
		if (!row)
			return;
		var url = basePath + "/pack/packTask?jfs=true&i=" + row.uuid;
		$.get(url, function(data, status){
			if (status != "success") {
				return;
			}
			if (data && data.tips) {
				alert(data.tips);
			}
			if (data && data.pageMode) {
				if (data.pageMode == "mode_iw") {
					$('#taskWindow').window('open');
					$('#taskWindow').window('refresh', basePath + data.pageUrl);
				} else {
					location.href = basePath + data.pageUrl;
				}
			}
		}, "json");
	},
	
	/**
	 * 查询
	 * @returns {Boolean}
	 */
	query : function() {
		var queryForm = $('#queryForm');
		$.post(queryForm[0].action + "?jfs=true", queryForm.serialize(), function(data, status) {
			mainObj.data = [];
			$get("#datagrid").loadData(mainObj.data);
			if (status != "success") return;
			if (data.tips) {
				var tips = data.tips.replace("<br/>", "\n");
				alert(tips);
			}
			if (!data.rows.length) return;
			var rows = data["rows"];
			for (var i=0; i<rows.length; i++) {
				var row = rows[i];
				if (row.depends.length) {
					var deps = rows[i].depends;
					var depf = "<span class='op'>";
					for (var j=0; j<deps.length; j++) {
						depf += "<a href=/pack/download?uuid=" + deps[j].uuid + "'>" + deps[j].buildNo + "</a>";
					}
					depf += "</span>";
					row.dependsA = depf;
				}
			}
			mainObj.data = data;
			$get("#datagrid").loadData(data);
			$('#lastQuery').text("最后更新时间：" + date2str(new Date(),"yyyy年MM月dd日 hh:mm:ss"));
		}, "json");
		return false;
	},
	
	init : function() {
		$('#viewOp').click(mainObj.viewOperators);
		$('#handleTask').click(mainObj.handleTask);
		$('#downloadFile').click(function(){
			var row = getSelectedRow(true);
			if (!row) return;
			var url = basePath + "/pack/download?uuid=" + row.uuid;
			window.location.href = url;
		});
		$('#addPack').click(function(){window.location.href=basePath + "/pack/addbuild.jsp";});
		//$('.queryBar').click(function(){$('.queryDiv').toggle('normal');});
		appendSubmit('#queryForm', mainObj.query);
		mainObj.query();
	},
};
	
$().ready(mainObj.init);
