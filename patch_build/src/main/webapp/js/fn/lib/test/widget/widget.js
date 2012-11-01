
// fn.widget
(function($){
	module("widget/1.3");
	
	fn.use("widget/1.3", function(){
		
		var div = $('<div />').css({position: "absolute", right: "9999px"}).appendTo("body");
		
		test("combobox", function() { 
			
			var ins;
			
			
			// 创建input
			ins = $('<input class="fn-combobox"/>').attr({
				data: '1=a&2=b&3=c',
				appendData: '4=d',
				value: '4'
			}).appendTo(div);
			
			fn.widget.initialize(ins);
			
			// 检查变量
			ok(!!window.$combobox, "检查变量： window.$combobox");
			
			// 创建控件
			ins = $combobox(ins);
			ok(!!ins, "创建控件");
			
			// 测试基本功能
			ok(ins.getText() == "d", "测试：data属性、 insertData属性、 value属性、 getText()方法");
			
			// 清除元素和变量
			//$(ins.element).next().remove();
			//$(ins.element).remove();
			//ins = undefined;
		});
		
		
		
		test("bankcard", function() { 
			
			var ins;
			
			// 创建input
			ins = $('<input class="fn-bankcard"/>').attr({
				value: '6222024000000855946'
			}).appendTo(div);
			
			fn.widget.initialize(ins);
			
			// 检查变量
			ok(!!window.$bankcard, "检查变量： window.$bankcard");
			
			// 创建控件
			ins = $bankcard(ins);
			ok(!!ins, "创建控件");
			
			// 检查tip
			ins.element.focus();
			ok(ins.tip.filter(":visible").length === 1, "输入框得到焦点， 显示tip");
			
			//console.log(ins.tip.html());
			var txt = ins.tip.text().replace(/\D/g, "");
			ok(txt == "6222024000000855946", "tip.text() == 6222024000000855946");
			
			// 检查tip
			ins.element.blur();
			ok(ins.tip.filter(":visible").length === 0, "输入框失去焦点， 隐藏tip");
		});
	
	});
	
	module("widget/supcan");
	
	test("supcan", function() {
		
		var ins,
			div = $('<div />').css({position: "absolute", right: "9999px"}).appendTo("body");
		
		fn.use("widget/supcan");
		
		// 检查变量
		ok(!!window.supcan, "supcan.js加载成功");
		
		/*
		var tl = 
			'<div class="treelist" id="t1234" ' +
			'	builder="{fn}/lib/test/widget/supcan/builder.xml" '+
			'   url="{fn}/lib/test/widget/supcan/data.txt" ' +
			'   bBar="{fn}/lib/test/widget/supcan/pager.xml" ' +
			'	autoLoad="true" isRemoteSort="false" autoHeight="true" ' +
			'	style="position:relative;width:100%;height:500px;">'
			'</div>';
		tl = $(tl).appendTo(div);
		
		tl = $treelist(tl, {
			onAfterLoad: function(){
				var data = tl.getData();
				ok(data, "加载数据成功:" + fn.string.json(data));
				start();
			}
		}); // end $treelist
		
		ok(tl, "表格初始化成功");
		*/
	});
	
	
})(fn.jQuery); // end fn.date.js
