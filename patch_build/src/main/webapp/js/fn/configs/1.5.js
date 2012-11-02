/*
此文件是fn框架内置模块配置文件， 请不要修改此文件

需要增加新模块可以在项目js目录下建立子目录（与fn目录同级）， 并在该目录下建立一个同名js
例如：/js/netbank/netbank.js
如此则建立了一个新的模块， 用fn.use("../netbank")即可在任何引用了fn.js的页面上载入该模块

模块结构：
lib/
	com/
		string/
		date/
		log/
		qunit/
		money/
		url/
		notify/
		juicer/
		image/
	css/
		v103/
	dom/
		autoHeight/
		box/
		position/
	widget/
		1.3/
		1.3/src/
		supcan/
	jquery/
		1.4.2/
		1.7.2/
		cookie/
		xheditor/
		ui/
		form/
		pager/
		print/
	test/
		com/
		widget/
*/

//
if(window.fn) (function($){
	
	// 检查是否已经加载过了
	if(window["fn1.5.config"]){
		return;
	}else{
		window["fn1.5.config"] = true;
	};
	
	// ======== 测试用例 test ==============
	
	// 基本库单元测试
	fn.reg({
		name: "test",
		methods: "fn.test",
		script: ["{fn}/lib/test/test.js"]
	});
	
	// ======== 基本库 com ==============
	
	// 字符串处理
	fn.reg({
		name: "string,com/string",
		namespace: "fn.string",
		methods: ".escapeReg, .byteLen, .byteSub, .capitalize, .removeTags, .isIP",
		script: ["{fn}/lib/com/string/string.js"]
	});
	
	
	// 日期
	fn.reg({
		name: "date,com/date",
		namespace: "fn.date",
		methods: ".get, .format, .compare, .splitByMonth, .addSecond, .addDay, .addMonth",
		script: ["{fn}/lib/com/date/date.js"]
	});
	fn.reg({
		name: "dateEx,com/dateEx",
		namespace: "fn.date",
		methods: ".splitByMonth, .timeSpace",
		script: ["{fn}/lib/com/dateEx/dateEx.js"]
	});
	
	/*
	// 调试工具
	fn.reg({
		name: "log,com/log",
		namespace: "fn.log",
		methods: ".debug, .info, .warn, .error, .show, .hide, .toggle, .clear, .resize, .move, .profile",
		script: [
			"{fn}/lib/com/log/log.js"
		],
		css: [
			"{fn}/lib/com/log/log.css"
		]
	});
	*/
	
	// 调试工具
	fn.reg({
		name: "qunit,com/qunit",
		onLoad: function(){
			var html = 
			[
				'<div id="qunit-div">',
					'<h1 id="qunit-header">QUnit单元测试</h1>',
					'<h2 id="qunit-banner"></h2>',
					'<div id="qunit-testrunner-toolbar"></div>',
					'<h2 id="qunit-userAgent"></h2>',
					'<ol id="qunit-tests"></ol>',
				'</div>'
			].join("");
			QUnit.close = function(){
				$("#qunit-div").remove();
			};
			
			QUnit.close();
			$(html).appendTo("body");
			QUnit.load();
		},
		methods: "test, asyncTest, expect, module, QUnit.init, Qunit.reset",
		script: ["{fn}/lib/com/qunit/qunit.js"],
		css: ["{fn}/lib/com/qunit/qunit.css"]
	});
	
	// money库
	fn.reg({
		name: "money,com/money",
		namespace: "fn.money",
		methods: ".add, .mul, .div, .toChinese, .toDigit, .format, .bankcard, .idcard, .toNumber",
		script: ["{fn}/lib/com/money/money.js"]
	});
	
	
	// URL参数处理
	fn.reg({
		name: "url,com/url",
		namespace: "fn.url",
		methods: ".attr, .segment, .param, .setMode, .setUrl",
		script: ["{fn}/lib/com/url/url.js"]
	});
	
	
	// juicer模板工具
	fn.reg({
		name: "juicer,com/juicer",
		script: ["{fn}/lib/com/juicer/juicer.min.js"]
	});
	
	
	// 图片处理
	fn.reg({
		name: "image,com/image",
		namespace: "fn.image",
		methods: ".preview",
		script: ["{fn}/lib/com/image/image.js"]
	});
	
	
	// ======== 样式库 css ==============
	
	
	// 拜特v10.3默认样式
	fn.reg({
		name: "css/v103",
		css: ["{fn}/../../css/main1.css", "{fn}/lib/css/v103/v103.css"]
	});
	
	
	// 拜特v10.3默认样式
	fn.reg({
		name: "css, css/default",
		css: ["{fn}/lib/css/v103/default.css"]
	});
	
	// ======== 效果库 dom ==============
	
	
	// dom
	fn.reg({
		name: "dom",
		namespace: "fn.dom",
		methods: ".clientWidth, .clientHeight, .center, .insideWidth, .insideHeight, .px2number, .style",
		script: ["{fn}/lib/dom/dom.js"]
	});
	
	fn.reg({
		name: "dom.box,dom/box",
		rely: "css/v103",
		namespace: "fn.dom",
		methods: ".box",
		script: ["{fn}/lib/dom/box/box.js"]
	});
	
	fn.reg({
		name: "dom.autoHeight,dom/autoHeight",
		namespace: "fn.dom",
		methods: ".autoHeight",
		script: ["{fn}/lib/dom/autoHeight/autoHeight.js"]
	});
	
	fn.reg({
		name: "dom.position,dom/position",
		namespace: "fn.dom",
		methods: ".pin",
		script: ["{fn}/lib/dom/position/position.js"]
	});
	
	
	// ======== UI库 ==============
	(function(){
		fn.widget = fn.widget || {};
		fn.widget._targets = fn.widget._targets || "input[class], ul[class], table[class], form[class], div[class]";
		
		window._wSuccess = window._wSuccess || function(callback){
			var reg = this;
			
			if(window._w){
				if(callback){
					if(window._fnIsLoaded){
						if(callback) callback.call(reg);
					}else{
						setTimeout((function(callback, fnStart){
							return function(){
								if(fnStart) fnStart(callback)
							};
						})(callback, window._wSuccess), 50);
					};
				};
				return;
			}else{
				window._w = true;
			};
			
			$(function(){
				window._fnIsLoaded = true;
				window._btIsLoaded = true;
				
				var selector = $(window.fn_initRange || fn.widget._targets, document);
				
				bt.init(selector);
				fn.widget.init(selector);
				
				if(callback) callback.call(reg);
			});
		};
		window._onWidgetSuccess = function(callback){
			
			// 检查是否禁用组件库
			if(window.noFn) return false;
			// 
			if(window._wSuccess) window._wSuccess.call(this, callback);
			
			return false;
		};
	})();
	
	// 业务组件库v1.3
	fn.reg({
		name: "widget",
		success: window._onWidgetSuccess,
		script: [
				"{fn}/lib/widget/1.3/src/01.fn.widget.base.js",
				"{fn}/lib/widget/1.3/src/02.fn.widget.js",
				"{fn}/lib/widget/1.3/src/03.bt.base.js",
				"{fn}/lib/widget/1.3/src/04.bt.widget.js"
		],
		css: ["{fn}/lib/widget/1.3/css/fn.widget.css"],
		async: false
	});
	
	// 硕正表格控件
	fn.reg({
		name: "jquery.supcan,widget/supcan",
		script: ["{fn}/lib/widget/supcan/supcan.js"]
	});
	
	
	// ======== 插件库 jquery ============== 
	
	// jquery
	fn.reg({
		name: "jquery"
	});
	
	fn.reg({
		name: "jquery/1.4.2",
		script: ["{fn}/lib/jquery/1.4.2/1.4.2.js"]
	});
	
	fn.reg({
		name: "jquery/1.7.2",
		script: ["{fn}/lib/jquery/1.7.2/1.7.2.js"]
	});
	
	// jquery.cookie
	fn.reg({
		name: "jquery.cookie,jquery/cookie",
		script: ["{fn}/lib/jquery/cookie/cookie.js"]
	});
	
	// jquery.xheditor在线编辑器
	fn.reg({
		name: "jquery.xheditor,jquery/xheditor",
		script: ["{fn}/lib/jquery/xheditor/xheditor.js"],
		css: [
			"{fn}/lib/jquery/xheditor/css/ui.css",
			"{fn}/lib/jquery/xheditor/css/iframe.css"
		]
	});
	
	// jquery.ui库
	fn.reg({
		name: "jquery.ui,jquery/ui",
		script: [
			"{fn}/lib/jquery/ui/ui.js"
		],
		css: [
			"{fn}/lib/jquery/ui/ui.css",
			"{fn}/lib/jquery/ui/demos.css"
		]
	});
	
	// jquery.form 异步表单
	fn.reg({
		name: "jquery.form,jquery/form",
		namespace: "jQuery.fn",
		methods: ".ajaxForm, .ajaxSubmit, .formSerialize, .fieldSerialize, .fieldValue, .resetForm, .clearForm, .clearFields",
		script: ["{fn}/lib/jquery/form/form.js"]
	});
	
	// jquery.pager分页插件
	fn.reg({
		name: "jquery.pager,jquery/pager",
		script: ["{fn}/lib/jquery/pager/pager.js"],
		css: ["{fn}/lib/jquery/pager/pager.css"]
	});
	
	// jquery.print打印插件
	fn.reg({
		name: "print,jquery/print",
		methods: "fn.print, fn.print.preview",
		script: ["{fn}/lib/jquery/print/print.js"],
		css: ["{fn}/lib/jquery/print/print.css"]
	});
	
	// jquery.easyui 1.2.4
	fn.reg({
		rely: "jquery/1.4.2",
		name: "easyui,jquery/easyui,jquery/easyui/1.2.4",
		script: ["{fn}/lib/jquery/easyui/1.2.4/easyui.min.js", 
			"{fn}/lib/jquery/easyui/1.2.4/locale/easyui-lang-zh_CN.js"],
		css: ["{fn}/lib/jquery/easyui/1.2.4/themes/self/easyui.css"]
	});
	
	
})(fn.jQuery);