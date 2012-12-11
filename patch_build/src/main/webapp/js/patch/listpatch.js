var mainObj = {
	query : function() {return doDataQuery();},
	
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
