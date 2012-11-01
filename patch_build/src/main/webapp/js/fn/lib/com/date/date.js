/** 
 日期处理
 @namespace 
 @name fn.date
*/
	
window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	
	var DATE = {
		
		/** 
		 尝试把对象（日期/数字/字符串）转换成日期对象，如果是日期则返回原值， 如果不能转换日期则返回null
		 @param {Date|Number|String} obj 要转换的对象
		*/
		get: function(obj){
			if(!obj){
				return null;
			}else if(obj.constructor == Date){
				return obj;
			}else if(obj.constructor == Number){
				var dt = new Date();
				dt.setTime(obj);
				return dt;
			}else if(obj.constructor == String){
				var dt = new Date(obj.replace(/(-|\.)/g, "\/"));
				return dt;
			}else{
				return null;
			}
		},
		
		/** 
		 把日期对象格式化成字符串
		 @param {Date|Number|String} date 要转换的日期对象，如果是数字或字符串会被自动转换成日期再格式化
		 @param {String} format 格式化的模板，默认为：yyyy-mm-dd
		 @example alert(fn.date.format(new Date), "yyyy年mm月dd日")
		*/
		format: function(date, fmt) {
			
			date = DATE.get(date);
			if(!date) return "";
			if(date.constructor != Date) return date;
			
			var Re = /s{1,4}|m{1,4}|h{1,4}|d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g;
			
			var d = date.getDate(),
				mm = date.getMonth(),
				y = date.getFullYear(),
				h = date.getHours(),
				m = date.getMinutes(),
				s = date.getSeconds(),
				flags = {
					s:    zeropad(s),
					m:    zeropad(m),
					h:    zeropad(h),
					dd:   zeropad(d),
					mm:   zeropad(mm + 1),
					yy:   String(y).slice(2),
					yyyy: y
				};
			
			fmt = fmt || "yyyy-mm-dd";
			var ret = fmt.replace(Re, function ($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
 
			function zeropad(val, len) {
				val = '' + val;
				len = len || 2;
				while (val.length < len) { val = "0" + val; }
				return val;
			}
			
			// a small trick to handle special characters
			return ret;
		}, // end format
		
		/*
		 比较两个时间的大小， 返回值是一个数字（时间转换为毫秒数之差）
		 @param {Date} dt1 要比较的时间
		 @param {Date} dt2 要比较的时间
		 @returns {Number|Null} 返回一个数字，等于null表示比较失败，等于0表示两时间相等，大于0表示第一个时间较大， 反之表示第一个时间较小
		*/
		compare: function(dt1, dt2){
			dt1 = DATE.get(dt1);
			dt2 = DATE.get(dt2);
			
			if(!dt1 || !dt2){
				return null;
			}else{
				return dt1.getTime() - dt2.getTime();
			};
		}, // end compare
		
		/*
		 日期增加指定分钟数
		*/
		addSecond: function(date, size){
			date = DATE.get(date);
			if(!date){
				return null;
			};
			var d = date.getTime() + 1000*size;
			return new Date(d);
		},
		
		/*
		 日期增加指定天数
		*/
		addDay: function(date, size){
			date = DATE.get(date);
			if(!date){
				return null;
			};
			var d = date.getTime() + 86400000*size;
			return new Date(d);
		},
		
		/*
		 月份增加指定月数
		*/
		addMonth: function(date, size){
			date = DATE.get(date);
			if(!date){
				return null;
			};
			var m = date.getFullYear()*12 + date.getMonth() + size;
			return new Date(parseInt(m/12), Math.round(m%12), date.getDate());
		}
	}; // end DATE
	
	$.extend(fn.date = fn.date || {}, DATE); // end fn.date
	
	
	// =========兼容旧版fn===========
	
	/** 兼容旧版本 @ignore */
	fn.dateStr = DATE.format;
	
})(fn.jQuery);