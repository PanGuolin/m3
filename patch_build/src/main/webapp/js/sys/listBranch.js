var mainObj = {
	/**
	 * 查询
	 * @returns {Boolean}
	 */
	query : function() {return doDataQuery();},
	
	addBranch : function() {
		$('#taskWindow').window('open');
		$('#taskWindow').window('refresh', basePath + "/sys/addBranch.jsp");
	},
	
	init : function() {
		$('#addBranch').click(mainObj.addBranch);
	},
};
	
$().ready(mainObj.init);


function formatFunctType(value, row, index) {
	return value == 0 ? "Action" : "JSP";
}