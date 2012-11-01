/** 
 日期处理
 @namespace 
 @name fn.dateEx
*/
(function($){
	
	var DATE = {
		
		/*
		 按月数来分割日期， 并返回每段日期的开始时间和结束时间
		*/
		splitByMonth: function(start, end, size){
			start = fn.date.get(start);
			end = fn.date.get(end);
			
			if(!start || !end || !size || size < 1){
				return null;
			};
			
			var ary = [];
			var temp = start;
			
			
			if(fn.date.addMonth(temp, size).getTime() > end.getTime()){
				ary.push([start, end]);
			}else{
				while(fn.date.addMonth(temp, size).getTime() < end.getTime()){
					ary.push([temp, fn.date.addSecond(fn.date.addMonth(temp, size), -1)]);
					temp = fn.date.addMonth(temp, size);
				};
				ary.push([temp, end]);
			};
			
			return ary;
		},
		
		/**
		 获取一组字符串时间段的间隔，例如，
		 输入： ["12:00-13:00", "7:00-10:00", "14:00-18:00"]
		 得到： ["10:00-12:00", "13:00-14:00"]
		 @param {Array} timespans 一个时间段字符串数组
		 @return {Array} 返回一个时间段字符串数组
		*/
		timeSpace: function(timespans){
			
			// time to number
			function t2n(time){
				return parseFloat(time.replace(":", "."));
			};
			
			// 把每一个时间段字符串转换成一个小数组
			for(var i = 0; i < timespans.length; i++){
				timespans[i] = timespans[i].split("-");
			};
			
			// 排序
			timespans.sort(function(a,b){
				return t2n(a[0]) > t2n(b[0]);
			});
			
			// 取间隔
			timespans = (function(){
				var ary = [];
				for(var i = 0; i < timespans.length - 1; i++){
					ary.push([timespans[i][1], timespans[i+1][0]]);
				};
				return ary;
			})();
			
			// 把小数组转回成时间段字符串
			for(var i = 0; i < timespans.length; i++){
				timespans[i] = timespans[i].join("-");
			};
			
			return timespans;
		}
		
	}; // end fn.date
	
	$.extend(fn.date = fn.date || {}, DATE); // end fn.date
	
})(fn.jQuery);