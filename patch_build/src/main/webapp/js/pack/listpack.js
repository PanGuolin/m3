var mainObj = {

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
	query : function() {return doDataQuery();},
	
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
		appendSubmit('#queryForm', mainObj.query);
		mainObj.query();
	},
};
	
$().ready(mainObj.init);
