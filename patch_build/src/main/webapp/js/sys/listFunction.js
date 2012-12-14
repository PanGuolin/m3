var mainObj = {
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
		$('#viewBuildLog').click(function(){openUrlOfSelected("/pack/viewBuildLog?uuid=");});
	},
};
	
$().ready(mainObj.init);


function formatFunctType(value, row, index) {
	return value == 0 ? "Action" : "JSP";
}

function formatFunctRoles(value, row, index) {
	if (!value.length)
		return value;
	var str = "";
	for (var i=0; i<value.length; i++) {
		if (i > 0) str += ",";
		str += value[i].name;
	}
	return str;
}