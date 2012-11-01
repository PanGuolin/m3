// *****************************************************************************************
// part 4 : bt.widget.js
// *****************************************************************************************
window.bt = window.bt || {};

bt.register = function(selector){
	
	var $ = fn.jQuery;
	if(!$) return;
	
	// ============================================
	// 配置

	/** 
	 * 每个组件包含此属性
	 * interceptorClassName:业务数据拦截器类名称（实现com.byttersoft.json.strategy.IDataInterceptor接口或继承com.byttersoft.bc.comp.base.BaseDataInterceptor），用于在转换成业务组件json数据前对原始业务数据的处理
	 *
	 **/
	var baseParams = ["interceptorClassName"];
	
	/**
	 * 业务组件基本数据类型
	 * list：适用于为列表集合的数据感应组件.如下拉列表、多选组、单选组
	 * tree：适用于为树形列表集合的数据感应组件。如：下拉树列表、树
	 * table：适用于表格数据感应组件。如：datagrid等。--暂未用
	 */
	var bcType = {"list":"list", "tree":"tree", "table":"table"};
	var bcProp = {
		url: bt.path+"buscomp/bizComp.do?method=reqBizCompData",
		params: fn.merge(baseParams, ["bcClassName"])
	};  
	
	/** 下拉树单位属性 **/
	var corpProp = {
			url: bt.path + "buscomp/btCorp.do?method=reqBtCorpTreeData",
			params: fn.merge(baseParams, ["isAllCorp", "syscode", "optype", "rootTitle", "rootValNotEmpty"]),
			valueField: "id",
			textField: "corpName",
			childrenField: "children",
			matchFields: "corpCode,corpName",
			autoRequest: "true",
			editable: "true", 
			formatter: "function(r){ return (r['corpCode'] ? '(' + r['corpCode'] + ')' : '') + r['corpName']; }",
			rejectNodeFn: "function(node,level){ return level < 1; }"
	};
	
	/**
	 * 单位-下拉树。支持服务端联想输入
	 * 参数：isAllCorp-是否全部单位（为true时syscode、optype参数无效）；syscode-系统代码；optype-操作类型；rootTitle-根节点（非业务数据）名称（可选）；rootValNotEmpty-根节点（非业务数据）值是否为非空值，默认为false,若为true，则根节点值为-1（兼容老程序）
	 * bean属性参考com.byttersoft.buscomp.bean.CorpInfo
	 */
	bt.reg("combotree", ".bbc-corp-combotree", corpProp, {
		"isAllCorp": "是否全部单位（为true时syscode、optype参数无效）", 
		"syscode": "系统代码", 
		"optype": "操作类型", 
		"rootTitle": "根节点（非业务数据）名称（可选）", 
		"rootValNotEmpty": "根节点（非业务数据）值是否为非空值，默认为false,若为true，则根节点值为-1（兼容老程序）"
	});
	
	/**
	 * 说明见.bbc-corp-combotree
	 * 
	 */
	bt.reg("combotree", ".bus-bt-corp-combotree", $.extend({}, corpProp, { 
		rootValNotEmpty: true
	}),{
		"isAllCorp": "是否全部单位（为true时syscode、optype参数无效）", 
		"syscode": "系统代码", 
		"optype": "操作类型", 
		"rootTitle": "根节点（非业务数据）名称（可选）", 
		"rootValNotEmpty": "根节点（非业务数据）值是否为非空值，默认为false,若为true，则根节点值为-1（兼容老程序）"
	});  
	
	/**
	 * 单位-普通树
	 * 参数、 bean属性参考<单位-下拉树>bus-bt-corp-combotree
	 */
	bt.reg("tree", ".bus-bt-corp-tree", {
		url: bt.path + "buscomp/btCorp.do?method=reqBtCorpTreeData",
		params: fn.merge(baseParams, ["isAllCorp", "syscode", "optype", "rootTitle"]),
		valueField: "id",
		textField: "corpName",
		childrenField: "children",
		formatter: "function(r){ return (r['corpCode'] ? '(' + r['corpCode'] + ')' : '') + r['corpName']; }",
		rejectNodeFn: "function(node,level){ return level < 1; }"//默认不显示所有节点（根节点）
	});
	 
	/**
	 * 单位网点-普通树，高亮显示网点节点
	 * 参数、 bean属性参考<单位-下拉树>bus-bt-corp-combotree
	 */
	bt.reg("tree", ".bus-bt-corp-highlightnet-tree", {
		url: bt.path + "buscomp/btCorp.do?method=reqBtCorpTreeData",
		params: fn.merge(baseParams, ["isAllCorp", "syscode", "optype", "rootTitle"]),
		valueField: "id",
		textField: "corpName",
		childrenField: "children",
		formatter: "corpHighlightNetTreeFormatter"
	});
	window.corpHighlightNetTreeFormatter = function(r){
		return fn.format('{0}{1}{2}', 
			r['corpCode'] && '(' + r['corpCode'] + ')' || '',
			r['corpName'],
			r['net'] && '<span style="color:red;">（网点）</span>' || ''
		);
	};
	 
	/**
	 * 单位网点-下拉框,valueField的值为单位id属性名称。支持服务端联想输入
	 * 参数：isAllNet-是否全部全部（为true时syscode、optype参数无效）；syscode-系统代码；optype-操作类型；rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.CorpInfo
	 */
	bt.reg("combobox", ".bus-bt-corpnet-combobox", {
		url: bt.path + "buscomp/btCorp.do?method=reqBtCorpNetData",
		params: fn.merge(baseParams, ["isAllNet", "syscode", "optype"]),
		valueField: "id",
		textField: "corpName", 
		matchFields: "corpCode,corpName",
		autoRequest: "true",
		editable: "true",
		formatter: "function(r){ return (r['corpCode'] ? '(' + r['corpCode'] + ')' : '') + r['corpName']; }"
	});
	 
	/**
	 * 网点-下拉选择框--网点代码和单位名称对应网点代码和网点名称。。支持服务端联想输入
	 * 参数：isAllNet-是否全部网点（为true时syscode、optype参数无效）；syscode-系统代码；optype-操作类型；rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.CorpInfo
	 */
	bt.reg("combobox", ".bus-bt-net-combobox", {
		url: bt.path + "buscomp/btCorp.do?method=reqBtCorpNetData",
		params: fn.merge(baseParams, ["isAllNet", "syscode", "optype"]),
		valueField: "netCode",
		textField: "corpName", 
		matchFields: "netCode,corpName",
		autoRequest: "true",
		editable: "true",
		formatter: "function(r){ return (r['netCode'] ? '(' + r['netCode'] + ')' : '') + r['corpName']; }"
	});
	 
	/**
	 * 网点-多选组--网点代码和单位名称对应网点代码和网点名称。
	 * 参数：参数：isAllNet-是否全部网点（为true时syscode、optype参数无效）；syscode-系统代码；optype-操作类型；rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.CorpInfo
	 */
	bt.reg("checkboxs", ".bbc-btnet-checkboxs", {
		url: bt.path + "buscomp/btCorp.do?method=reqBtCorpNetData",
		params: fn.merge(baseParams, ["isAllNet", "syscode", "optype"]),
		valueField: "netCode",
		textField: "corpName"
	});
	 
	/**
	 * 币别-单选组。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtCurrency
	 */
	bt.reg("radios", ".bus-bt-currency-radios", {
		url: bt.path + "buscomp/currency.do?method=reqCurrencyData",
		params: baseParams, 
		valueField: "curCode",
		textField: "curName"
	});
	
	/**
	 * 币别-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtCurrency
	 */
	bt.reg("combobox", ".bus-bt-currency-combobox", {
		url: bt.path + "buscomp/currency.do?method=reqCurrencyData",
		params: baseParams, 
		valueField: "curCode",
		textField: "curName"
	});
	 
	/**
	 * 币别-多选组。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtCurrency
	 */
	bt.reg("checkboxs", ".bus-bt-currency-checkboxs", {
		url: bt.path + "buscomp/currency.do?method=reqCurrencyData",
		params: baseParams, 
		valueField: "curCode",
		textField: "curName"
	});
	 
	/**
	 * 记账科目-普通树。
	 * 参数：rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.FcSubjectInfo
	 */
	bt.reg("tree", ".bus-bt-subject-tree", {
		url: bt.path + "buscomp/fcSubject.do?method=reqFcSubjectTreeData",
		params: fn.merge(baseParams, ["rootTitle"]),
		valueField: "subjectCode",
		textField: "subjectName",
		childrenField: "children", 
		formatter: "function(row){ return (!row['subjectCode'] ? '' : ('(' + row['subjectCode'] + ')')) + row['subjectName']; }",
		// 取值时排除前两级节点
		rejectNodeFn: "function(node,level){ return level < 2;}" 
	});
	 
	/**
	 * 科目-下拉树。支持服务端联想输入
	 * 参数：rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.FcSubjectInfo
	 */
	bt.reg("combotree", ".bus-bt-subject-combotree", {
		url: bt.path + "buscomp/fcSubject.do?method=reqFcSubjectTreeData",
		params: fn.merge(baseParams, ["rootTitle"]),
		valueField: "subjectCode",
		textField: "subjectName",
		childrenField: "children",
		matchFields: "subjectCode,subjectName",
		autoRequest: "true",
		editable: "true",
		formatter: "function(row){ return (!row['subjectCode'] ? '' : ('(' + row['subjectCode'] + ')')) + row['subjectName']; }",
		// 取值时排除前两级节点
		rejectNodeFn: "function(node,level){ return level < 2;}" 
	});
	
	/**
	 * 开户行组件属性定义
	 */
	var btBankProp = {
		url: bt.path + "buscomp/btBank.do?method=reqBtBankData",
		params: fn.merge(baseParams, ["needUserFilter"]),  
		valueField: "bankCode",
		textField: "bankName"
	};
	/**
	 * 开户行（用户管理银行）-下拉框。支持服务端联想输入
	 * 参数：needUserFilter-是否支持用户过虑，默认是
	 * 联动参数名（linkParam）：bankType
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtBank
	 */
	bt.reg("combobox", ".bus-bt-bank-user-combobox", $.extend({}, btBankProp, { 
		needUserFilter: "true",
		autoRequest:"true"
	}));
	
	/**
	 * 开户行-多选组。据银行类别查找开户行
	 * 参数：needUserFilter-是否支持用户过虑，默认否
	 * 联动参数名（linkParam）：bankType
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtBank
	 */
	bt.reg("checkboxs", ".bus-bt-bank-checkboxs",  $.extend({}, btBankProp, { 
		needUserFilter: "false"
	}));
	
	/**
	 * 开户行-下拉框。可替代bus-bt-bank-user-combobox
	 * 参数：needUserFilter-是否支持用户过虑，默认否
	 * 联动参数名（linkParam）：bankType
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtBank
	 */
	bt.reg("combobox", ".bus-bt-bank-combobox",  $.extend({}, btBankProp, { 
		needUserFilter: "false",
		autoRequest:"true"
	}));
	 
	/**
	 * 账户（收支）属性-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BisAccType
	 */
	bt.reg("combobox", ".bus-bt-bisAccType-combobox", {
		url: bt.path + "buscomp/bisAccType.do?method=reqBisAccTypeData",
		params: baseParams, 
		valueField: "acc_type",
		textField: "property"
	});
	 
	/**
	 * 账户（收支）属性-多选组。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BisAccType
	 */
    bt.reg("checkboxs", ".bus-bt-bisAccType-checkboxs", {
		url: bt.path + "buscomp/bisAccType.do?method=reqBisAccTypeData",
		params: baseParams, 
		valueField: "acc_type",
		textField: "property"
	});
	
    /**
	 * 银行类别-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtBankType 
	 */
	bt.reg("combobox", ".bus-bt-bankType-combobox", {
		url: bt.path + "buscomp/btBankType.do?method=reqBtBankTypeData",
		params: baseParams, 
		valueField: "bankType",
		textField: "typeName"
	});
	
	 /**
	 * 银行类别-多选组。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtBankType 
	 */
	bt.reg("checkboxs", ".bus-bt-bankType-checkboxs", {
		url: bt.path + "buscomp/btBankType.do?method=reqBtBankTypeData",
		params: baseParams, 
		valueField: "bankType",
		textField: "typeName"
	}); 
 
	/**
	 * 账户类别（开户种类）-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.FcAccType 
	 */
	bt.reg("combobox", ".bus-bt-fcAccType-combobox", {
		url: bt.path + "buscomp/fcAccType.do?method=reqFcAccTypeData",
		params: baseParams, 
		valueField: "accTypeCode",
		textField: "accTypeName"
	});
 
	/**
	 * 内部账号-多选组。
	 * 参数：corpIds-单位id（两个以上使用逗号分割）
	 * bean属性参考com.byttersoft.buscomp.bean.FcAccInfo 
	 */
	bt.reg("checkboxs", ".bus-bt-fcAcc-checkboxs", {
		url: bt.path + "buscomp/fcAcc.do?method=reqFcAccDataByCorpIds",
		params: fn.merge(baseParams, ["corpIds"]),
		valueField: "blnctrAcc",
		textField: "blnctrAcc"
	});
	
	/** 明细授权-内部账号下拉框
	 * 参数(required)：corpIds-单位（多个单位逗号分割）；accTypeCode-帐户开户种类代码
	 * bean属性参考com.byttersoft.buscomp.bean.FcAccInfo
	 */
	bt.reg("combobox", ".bus-bt-dtl_fcAcc-combobox", {
		url: bt.path + "buscomp/fcAcc.do?method=reqDtlFcAccData",
		params: fn.merge(baseParams, ["corpIds","accTypeCode"]),
		valueField: "blnctrAcc",
		textField: "blnctrAcc",
		autoRequest: "true",
		editable: "true",
		formatter: "function(r){ return r['blnctrAcc']+(r['accState'] =='D' ? '(已注销)' : ''); }"
	});
	
	/** 余额授权-内部账号下拉框
	 * 参数(required)：corpIds-单位（多个单位逗号分割）；accTypeCode-帐户开户种类代码
	 * bean属性参考com.byttersoft.buscomp.bean.FcAccInfo
	 */
	bt.reg("combobox", ".bus-bt-bal_fcAcc-combobox", {
		url: bt.path + "buscomp/fcAcc.do?method=reqBalFcAccData",
		params: fn.merge(baseParams, ["corpIds","accTypeCode"]),
		valueField: "blnctrAcc",
		textField: "blnctrAcc",
		autoRequest: "true",
		editable: "true",
		formatter: "function(r){ return r['blnctrAcc']+(r['accState'] =='D' ? '(已注销)' : ''); }"
	});
	
	/** 转账授权-内部账号下拉框
	 * 参数(required)：corpIds-单位（多个单位逗号分割）；accTypeCode-帐户开户种类代码
	 * bean属性参考com.byttersoft.buscomp.bean.FcAccInfo
	 */
	bt.reg("combobox", ".bus-bt-exg_fcAcc-combobox", {
		url: bt.path + "buscomp/fcAcc.do?method=reqExgFcAccData",
		params: fn.merge(baseParams, ["corpIds","accTypeCode"]),
		valueField: "blnctrAcc",
		textField: "text",
		autoRequest: "true",
		editable: "true",
		formatter: "function(r){ return r['text'] ? r['text'] : r['blnctrAcc']+(r['accState'] =='D' ? '(已注销)' : ''); }"
	});
	
	/**
	 * 用途-下拉框。
	 * 参数：corpId-单位id(required)
	 * bean属性参考com.byttersoft.persistence.admin.entity.NisPurpose 
	 */
	bt.reg("combobox", ".bus-bt-nisPurpose-combobox", {
		url: bt.path + "buscomp/nisPurpose.do?method=reqNisPurposeData",
		params: fn.merge(baseParams, ["corpId"]),
		valueField: "purpose",
		textField: "purpose"
	});
	
	/**
	 * 区域-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtArea
	 */
	bt.reg("combobox", ".bus-bt-area-combobox", {
		url: bt.path + "buscomp/btArea.do?method=reqBtAreaData",
		params: baseParams, 
		valueField: "area_code",
		textField: "area_name"
	});
	
	/**
	 * 行业-下拉框。
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.BtVocation
	 */
	bt.reg("combobox", ".bus-bt-vocation-combobox", {
		url: bt.path + "buscomp/btVocation.do?method=reqBtVocationData",
		params: baseParams, 
		valueField: "vocation_code",
		textField: "vocation_name"
	});
	
	/**
	 * 省-下拉框。可设置属性linkage绑定市控件
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.Province
	 */
	bt.reg("combobox", ".bus-bt-province-combobox", {
		url: bt.path + "buscomp/province.do?method=reqProvinceData",
		params: baseParams, 
		valueField: "province",
		textField: "province",
		matchFields: "brief_name_pin,all_name_pin",
		autoRequest: "true"
	});
	
	/**
	 * 市-下拉框。获取指定省的市地区数据，需要在省下拉框（bus-bt-province-combobox）设置属性linkage绑定市控件
	 * 参数：无
	 * bean属性参考com.byttersoft.persistence.admin.entity.City
	 */
	bt.reg("combobox", ".bus-bt-city-combobox", {
		url: bt.path + "buscomp/province.do?method=reqCityDataByProvince",
		params: baseParams, 
		valueField: "city",
		textField: "city"
	});
	
	/**
	* 往来单位弹出选择窗口
	*/
	bt.reg("gridwindow", ".external_corp_gridwindow", {
		url: bt.path + "buscomp/customer.do?method=reqCustomerData",
		width: 750,
		height: 500,
		queryLabelText: '单位/账号/简码：',
		queryFieldName: 'externalCorp',
		queryButtonText: '查询',
		okButtonText: '确定',
		cancelButtonText: '取消',
		title: "选择",
		postData: {hap:4},
		params: fn.merge(baseParams, ["corpId", "customerTypeCode"]),
		grid: 
			'<table pagination="true"' +
			'		rownumbers="true"' +
			'		fitColumns="false"' +
			'		resizable="true"' +
			'		singleSelect="true">' +
			'	<thead>' +
			'		<tr>' +
			'			<th field="abbreviate" width="50" align="center">简码</th>' +
			'			<th field="externalCorp" width="100" align="center" >单位名称</th>' +
			'			<th field="externalAcc" width="100" align="center" >账号</th>' +
			'			<th field="bank" width="100" align="center" >开户行</th>' +
			'			<th field="provinceCode" width="50" align="center" >所在省</th>' +
			'			<th field="city" width="50" align="center" >所在市</th>' +
			'			<th field="linkMan" width="60" align="center" >联系人</th>' +
			'			<th field="tel" width="50" align="center" >电话</th>' +
			'			<th field="fax" width="50" align="center" >传真</th>' +
			'			<th field="ppaysysbankcode" width="50" align="center" >银行行号</th>' +
			'		</tr>' +
			'	</thead>' +
			'</table>'
	});
	
	
	/**预算科目属性 **/ 
	var budgetItemProp = {
		url: bcProp.url + "&bcType=" + bcType.tree,
		params: fn.merge(bcProp.params, ["corpId", "bizCode", "rootTitle"]),
		bcClassName: "com.byttersoft.bc.comp.act.BudgetItemBc",
		childrenField: "children",
		valueField: "code",
		textField: "name",
		rootTitle: "所有预算科目",
		formatter: "function(row){ return (!row['code'] ? '' : ('(' + row['code'] + ')')) + row['name']; }",
		// 取值时排除前1级节点--对rootIsAll属性为true时有效
		rejectNodeFn: "function(node,level){ return level < 1;}" 
	};
	
	/**
	 * 预算科目-普通树。
	 * 参数：corpId-单位id，bizCode-业务预算科目代码，过虑只显示指定科目代码的节点及其所有子节点，rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.BudgetItemInfo
	 */
	bt.reg("tree", ".bbc-budgetItem-tree", budgetItemProp);
	 
	/**
	 * 预算科目-下拉树。支持服务端联想输入
	 * 参数：corpId-单位id，rootTitle-根节点名称（可选）
	 * bean属性参考com.byttersoft.buscomp.bean.BudgetItemInfo
	 */
	bt.reg("combotree", ".bbc-budgetItem-combotree", $.extend({}, budgetItemProp, {  
		matchFields: "code,name",//联想输入文本与指定matchFields任一值相等时则自动选中所属项
		autoRequest: "true"
	}));
	
	/**========================================================================================
	 * 自定义业务组件定义入口
	 * 需指定业务组件实现类名称，分三大类业务组件，常用第1、2两种，如下：
	 * 1、列表业务组件基础类：com.byttersoft.bc.comp.base.BaseListBizComp 适用于为列表集合的数据感应组件.如下拉列表、多选组、单选组
	 * 2、树形列表业务组件基础类：com.byttersoft.bc.comp.base.BaseTreeBizComp 适用于为树形列表集合的数据感应组件。如：下拉树列表、树
	 * 3、表格业务组件基础类：com.byttersoft.bc.comp.base.BaseTableBizComp 适用于表格数据感应组件。如：datagrid等。--暂未用
	 * 用户继承实现以上业务组件基础类。
	 * 几个必须参数：bcClassName、valueField、textField。
	 * 可据实际需求增加一些辅助参数如autoRequest、formatter等（具体见相关组件的参数说明）。
	 * 用法如：<input name="curCode" class="bbc-base-combobox" valueField="curCode" textField="curName" bcClassName="test.bc.MyListBizComp"/>
	 * ========================================================================================
	 */
	/**
	 * 自定义下拉框业务组件标签
	 * 参数：bcClassName-具体的业务组件实现类名称，即继承实现列表（非表格）业务组件基础类（com.byttersoft.bc.comp.base.BaseListBizComp）
	 * 需指定valueField和textField的属性值
	 */
	bt.reg("combobox", ".bbc-base-combobox", $.extend({}, bcProp, {  
		url: bcProp.url + "&bcType=" + bcType.list
	}));
 
	/**
	 * 自定义单选组业务组件标签
	 * 参数：bcClassName-具体的业务组件实现类名称，即继承实现列表（非表格）业务组件基础类（com.byttersoft.bc.comp.base.BaseListBizComp）
	 * 需指定valueField和textField的属性值
	 */
	bt.reg("radios", ".bbc-base-radios", $.extend({}, bcProp, {
		url: bcProp.url + "&bcType=" + bcType.list
	}));
	
	/**
	 * 自定义多选组业务组件标签
	 * 参数：bcClassName-具体的业务组件实现类名称，即继承实现列表（非表格）业务组件基础类（com.byttersoft.bc.comp.base.BaseListBizComp）
	 * 需指定valueField和textField的属性值
	 */
	bt.reg("checkboxs", ".bbc-base-checkboxs", $.extend({}, bcProp, {
		url: bcProp.url + "&bcType=" + bcType.list
	}));
	
	/**
	 * 自定义树业务组件标签
	 * 参数：bcClassName-具体的业务组件实现类名称，即继承实现树业务组件基础类（com.byttersoft.bc.comp.base.BaseTreeBizComp）
	 * 需指定valueField和textField的属性值
	 */
	bt.reg("tree", ".bbc-base-tree", $.extend({}, bcProp, {
		url: bcProp.url + "&bcType=" + bcType.tree
	}));
	
	/**
	 * 自定义下拉树业务组件标签
	 * 参数：bcClassName-具体的业务组件实现类名称，即继承实现树业务组件基础类（com.byttersoft.bc.comp.base.BaseTreeBizComp）
	 * 需指定valueField和textField的属性值
	 */
	bt.reg("combotree", ".bbc-base-combotree", $.extend({}, bcProp, {
		url: bcProp.url + "&bcType=" + bcType.tree
	})); 
	
	// 配置结束
	
}; // end bt.register