// 静态demo辅助显示模块

(function($){
	
	// 处理demo显示
	var _showWidgetDemo = function(){
		
		// 模拟数据填充combobox、combotree、tree、checkboxs、radios、datagrid
		$("input[class], ul[class], table[class]").each(function(){
			var ins = $get(this);
			
			if(!ins || !ins.load || !ins.opts){
				return;
			};
			
			if(ins.plugin == "fwb_datagrid"){
				ins.hideLoadingMsg();
				var cols = ins.opts.columns[0],
					data = {total: 100, rows: []};
				for(var i = 0; i < 12; i++){
					var row = {};
					for(var j = 0; j < cols.length; j++){
						row[cols[j].field] = (cols[j].title || "测试数据") + i;
					};
					data.rows.push(row);
				};
				ins.load(data);
			}else if(ins.opts.valueField && ins.opts.textField){
				var data = [];
				for(var i = 1; i < 6; i++){
					var n = {};
					n[ins.opts.valueField] = n[ins.opts.textField] = "测试数据" + i;
					data.push(n);
				};
				if(ins.opts.childrenField){ 
					data[0][ins.opts.childrenField] = [];
					for(var i = 1; i < 3; i++){
						var n = {};
						n[ins.opts.valueField] = n[ins.opts.textField] = "测试数据1" + i;
						data[0][ins.opts.childrenField].push(n);
					};
				};
				ins.load(data);
			};
		});
		
		// 显示api连接
		var helpTip = $('<div style="font-size:12px; color:#333; padding:10px; background:#FFF; border:#369 solid 2px; position: absolute; top: 20px; right: 20px; z-index: 999; width: 265px; line-height:2em;">这是一个包含<strong>拜特业务组件</strong>的静态DEMO页面，你可以点击这里<a href="http://wiki.bytter.com/fn_demo/" target="_blank" style="color:#369">查看使用说明</a></div>').appendTo("body");
		
	}; // end showWidgetDemo
	

	var x = setTimeout(function(){
		if(fn.widget && fn.widget._inited){ 
			jQuery(_showWidgetDemo);
			clearTimeout(x);
		};
	}, 1000);
	
})(fn.jQuery);