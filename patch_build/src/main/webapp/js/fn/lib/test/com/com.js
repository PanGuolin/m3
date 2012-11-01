
// fn.date.js
(function(){
	module("fn.date.js")
		
	var date = new Date(1999,08,09,09,09,09);
	
	test("fn.date.get(obj) ", function() {
		
		// 返回值类型
		ok(fn.date.get(new Date()).constructor == Date, "测试参数： 无");
		
		ok(fn.date.get(date).constructor == Date, "测试参数： {Date}");
		
		ok(fn.date.get("1999-9-9").constructor == Date, "测试参数： {String}");
		
		ok(fn.date.get(date.getTime()).constructor == Date, "测试参数： {Number}");
		
		ok(fn.date.get("1999-9-9 09:09:9").getTime() == date.getTime(), '测试指定日期：fn.date.get("1999-9-9 09:09:9")');
		//
	});
	
	test("fn.date.format(date, fmt) ", function() { 
		
		ok(fn.date.format() === "", "测试参数： 无");
		
		ok(fn.date.format(date).length == 10, "测试参数： {Date}");
		
		ok(fn.date.format("1999-9-09") === "1999-09-09", "测试参数： {String}");
		
		ok(fn.date.format("1999-9-09", "yyyy年mm月dd日h时m分s秒").length == 20, "测试参数： {String}, {String}");
		
	});
})(); // end fn.date.js


// fn.string.js
(function(){
	var s = "12三456";
	
	module("fn.string.js");
	
	test("fn.string.byteLen(s) ", function() {
		ok(fn.string.byteLen(s) == 7, '计算含有中文的字符串长度');
	});
	
	test("fn.string.byteSub(s, len, tail) ", function() {
		ok(fn.string.byteSub(s, 3) == "12", '测试： len小于字符串长度');
		
		ok(fn.string.byteSub(s, 10) == s, '测试： len大于字符串长度');
		
		ok(fn.string.byteSub(s, 5, "..") == "12..", '测试： 用tail替换最后2个字符');
		
	});
	
})(); // end fn.string.js
		