// *****************************************************************************************
// part 3 : bt.base.js
// *****************************************************************************************

// bt.base.js
// hap 2012/3/27

window.bt = window.bt || {};

bt.init = function(selector){
	var $ = fn.jQuery;
	if(!$ || bt._inited) return;
	
	bt._inited = true;
	
	// 网站路径， ajax方法使用
	bt.path = fn.hostPath;
	//if(!bt.path) return alert("window['hostPath'] is undefined");
	
	bt.reg = function(widget, cls, opts, paramsDesc){
		//
		if($.isFunction(bt[widget])) bt.regs[cls] = {
			cls: cls,
			type: widget,
			widget: bt[widget],
			opts: opts,
			widgetName: widget,
			paramsDesc: paramsDesc
		};
	};
	bt.regs = {};
	
	// ============================================
	// 私有方法
	
	// 
	bt.gridwindow = function(els, opts){
		
		$(els).hide();
		
		if(opts.grid != undefined){
			$(els).append(opts.grid);
			delete opts.grid;
		};
		
		bt.base(els, $.extend({
			addCls: "fn-gridwindow"
		}, opts));
	};
	
	// 下拉树
	bt.combotree = function(els, opts){
		bt.combo(els, $.extend({
			addCls: "fn-combotree"
		}, opts));
	};
	
	window.comboboxJsonHandler = function(json, ar){
		var ins = this;
		if(!ins || !ins.opts) return;
		
		if(ins._autoRequesting){
			return json;
		};
		
		if($(ins.element).attr("rootIsAll") == "true" && json.length > 0){
			var ids = [];
			for(var i = 1; i < json.length; i++){
				var n = json[i];
				if($.trim(n[ins.opts.valueField])) ids.push(n[ins.opts.valueField]);
			};
			json[0][ins.opts.valueField] = ids.join(ins.opts.valueSplitChar || ",");
		};
		
		return json;
	};
	
	// 下拉框
	bt.combobox = function(els, opts){
		bt.combo(els, $.extend({
			autoSelect: "true",
			addCls: "fn-combobox",
			jsonHandler: "comboboxJsonHandler"
		}, opts));
	};
	
	// 单选组
	bt.radios = function(els, opts){
		bt.base(els, $.extend({
			addCls: "fn-radios"
		}, opts));
	};
	
	// 单选组
	bt.checkboxs = function(els, opts){
		bt.base(els, $.extend({
			addCls: "fn-checkboxs"
		}, opts));
	};
	
	window['onTreeCheck_1'] = function(node){
		var ul = $(this),
			name = ul.attr("name") || "",
			div = $(".tree_f", ul),
			rejectNodeFn = fn.tagFunc(ul.attr("rejectNodeFn")) || function(node, level){ return false; },
			nodes = fn.widget.get(ul).getChecked();
		
		if(!div.length){
			div = $('<div class="tree_f" style="display:none"></div>').appendTo(ul);
			$('<input type="text" >').attr({name:name, value:node.id + node.text}).appendTo(div);
		};
		
		div.html("");
		$.each(nodes || [], function(i, node){
			if(!rejectNodeFn || !rejectNodeFn(node, node.nodeLevel))
				$('<input type="hidden" />').attr({name:name, value:node.id}).appendTo(div);
		});
	};
	// 树
	bt.tree = function(els, opts){
		bt.base(els, $.extend({
			addCls: "fn-tree",
			onCheck: "onTreeCheck_1"
		}, opts));
	};
	
	// 下拉
	bt.combo = function(els, opts){
		bt.base(els, $.extend({
			url: "",
			valueField: "id",
			textField: "name",
			childrenField: "children",
			formatter: ""
		}, opts));
	}; // end fn.combo
	
	// datagrid
	bt.datagrid = function(els, opts){
		
		$(els).hide();
		
		if(opts.thead){
			if(!$(els).find("thead").length){
				$(els).append(opts.thead);
			};
			delete opts.thead;
		};
		
		bt.base(els, $.extend({
			addCls: "fn-datagrid",
			onCheck: "onTreeCheck_1"
		}, opts));
	};
	
	bt.base = function(els, opts){
		
		if(!$(els).length) return;
		
		$(els).each(function(){
			// 标签中的postData属性 > opts中的postData > params中的post
			// 
			var el = $(this),
				opt = $.extend(
					{
						params: [],
						addCls: ""
					}, opts, {
						postData: $.extend(
							{},
							(function(){
								var postData = {};
								$.each(opts.params || [], function(i, n){
									if(n){
										try{
											postData[n] = (el.is("[" + n + "]") ? el.attr(n) : opts[n]) || "";
										}catch(e){};
									};
								});
								return postData;
							})(),
							opts.postData,
							fn.urlStrToObj(el.attr("postData") || "")
						)
					}
				);
			
			// 将postData转换成字符串
			opt.postData= $.param(opt.postData);
			
			// 写入所有属性
			bt.attr(el, opt);
			
			// 写入class
			el.addClass(opt.addCls);
		}); // end $(els).each
	};
	
	// 增加属性， 跳过已有属性
	bt.attr = function(el, attrs){
		el = $(el);
		for(var n in attrs){
			if(!n) continue;
			// 防止覆盖标签中已定义的属性（除postData外）
			if(!el.attr(n) || n.toLowerCase() == "postdata"){
				el.attr(n, attrs[n]);
			};
		};
	};//
	
	
	if(bt.register) bt.register();
	
	// 如果指定了window.fn_initTypes，则只在页面中查找并初始化指定的组件
	var _regs = window.fn_initTypes || (function(){
		var ary = [];
		for(var n in bt.regs){
			ary.push(n);
		};
		return ary;
	})();
	// 兼容数组和字符串
	if(typeof _regs == "string"){
		_regs = [_regs];
	};
	
	var _sel = $(selector).filter(_regs.join(","));
	
	window.fn_initTypes_rely = {};
	
	bt.initialize = function(selector){
		// 初始化
		for(var i = 0, len = _regs.length; i < len; i++){
			var n = _regs[i];
			var cmp = bt.regs[n];
			if(!cmp){ continue; };
			window.fn_initTypes_rely[cmp.widgetName] = cmp.widgetName;
			//
			if(cmp && fn.isFunction(cmp.widget)){
				cmp.widget((selector || _sel).filter(cmp.cls), cmp.opts);
			};
		};
	};
	bt.initialize();
	
}; // end bt.init

