
// fn.widget
(function($){
	
	// 基本库单元测试
	fn.reg({
		name: "test/com",
		script: ["{fn}/lib/test/com/com.js"]
	});
	
	// 组件库测试用例
	fn.reg({
		name: "test/widget",
		script: ["{fn}/lib/test/widget/widget.js"]
	});
	
	var globalTest = function(){
		
		module("全局");
	
		test("模块加载测试", function() {
			var ins;
			
			$.each([
				"com/date",
				"com/log",
				"com/money",
				"com/qunit",
				"com/string",
				"com/url",
				"com/juicer",
				"com/image",
				
				"dom",
				"dom/autoHeight",
				"dom/box",
				"dom/position",
				
				"jquery",
				"jquery/1.4.2",
				"jquery/1.7.2",
				"jquery/cookie",
				"jquery/form",
				"jquery/xheditor",
				"jquery/ui",
				"jquery/pager",
				"jquery/print",
				
				"widget/1.3",
				"widget/supcan"
			],function(i,n){
				fn.use(n);
				ok(fn._regs[n] && fn._regs[n].loaded, n);
			});
			
		});
	};
	
	fn.test = function(module){
		if(module){
			// 测试指定模块
			
		}else{
			// 整体测试
			globalTest();
			
			// 每个模块的测试
			fn.use("test/com");
			fn.use("test/widget");
		};
	}; //
	
})(fn.jQuery); // end fn.date.js