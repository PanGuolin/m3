var mainObj = {
	query : function() {
		var queryForm = $('#queryForm');
		$.post(queryForm[0].action + "?jfs=true", queryForm.serialize(), function(data, status) {
			mainObj.data = [];
			$get("#datagrid").loadData(mainObj.data);
			if (status != "success") return;
			if (data.tips) {
				tips = tips.replace("<br/>", "\n");
				alert(tips);
			}
			if (!data.rows.length) return;
			mainObj.data = data;
			$get("#datagrid").loadData(data);
			$('#lastQuery').text("最后更新时间：" + date2str(new Date(),"yyyy年MM月dd日 hh:mm:ss"));
		}, "json");
		return false;
	},
	
	data : {},
	
	createBranch : function() {
		var row = getSelectedRow(true);
		if (!row) return;
		$('#taskWindow').window('open');
		$('#taskWindow').window('refresh', basePath + "/patch/tag?i=" + row.uuid);
	},
};

$().ready(function() {
	appendSubmit('#queryForm', mainObj.query);
	$('#download').click(function(){
		var row = getSelectedRow(true);
		if (row)
			window.location.href= basePath + "/patch/download?uuid=" + row.uuid;
	});
	$('#downEnc').click(function(){
		var row = getSelectedRow(true);
		if (row)
			window.location.href= basePath + "/patch/download?en=true&uuid=" + row.uuid;
	});
	$('#createBranch').click(mainObj.createBranch);
	mainObj.query();
});
