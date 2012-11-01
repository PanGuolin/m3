
/** @namespace 
  @name fn.money
*/
	
window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	
	// 检查是否已经加载过了
	if(window["fn.money.js"]){
		return;
	}else{
		window["fn.money.js"] = true;
		fn.money = {};
	};
	
	var add, mul, div, toChinese, toDigit, toNumber;
	
	
	
	/* 把货币转换成数字
	* @param {string} obj 要转换的字符串 
	*/
	fn.money.toNumber = toNumber = function(obj){
		if(typeof obj === "number"){
			return obj;
		}else if(typeof obj === "string"){
			obj = obj.replace(/,/g, "");
			obj = obj.replace(/￥/g, "");
			if(!obj){
				return 0;
			}else if(isNaN(obj)){
				return 0;
			};
			return parseFloat(obj);
		}else{
			return 0;
		};
	}; //
	
	/** 
	  加法函数，用来得到精确的加法结果
	  @function
	  @param {Number} arg1 加数
	  @param {Number} arg2 加数
	*/
	fn.money.add = add = function(arg1,arg2){
		arg1 = toNumber(arg1);
		arg2 = toNumber(arg2);
		
		var r1,r2,m;
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2));
		return (arg1*m+arg2*m)/m
	}; // end add
	
	/** 
	  乘法函数，用来得到精确的乘法结果
	  @function
	  @param {Number} arg1 被乘数
	  @param {Number} arg2 乘数
	*/
	fn.money.mul = mul = function(arg1,arg2){
		arg1 = toNumber(arg1);
		arg2 = toNumber(arg2);
		
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{m+=s1.split(".")[1].length}catch(e){};
		try{m+=s2.split(".")[1].length}catch(e){};
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	}; // end mul
	
	/** 
	  除法函数，用来得到精确的除法结果
	  @function
	  @param {Number} arg1 被除数
	  @param {Number} arg2 除数
	*/
	fn.money.div = div = function(arg1,arg2){
		arg1 = toNumber(arg1);
		arg2 = toNumber(arg2);
		
		var t1=0,t2=0,r1,r2;
		try{t1=arg1.toString().split(".")[1].length}catch(e){};
		try{t2=arg2.toString().split(".")[1].length}catch(e){};
		with(Math){
			r1=Number(arg1.toString().replace(".",""));
			r2=Number(arg2.toString().replace(".",""));
			return (r1/r2)*pow(10,t2-t1);
		};
	}; // end div
	
	/** 
	  将数值转换成中文金额(可以处理整数,小数,负数)
	  @function
	  @param {Number|String} money 阿拉伯数字的金额
	*/
	fn.money.toChinese = toChinese = function(n) {
		n = toNumber(n);
		
		var fraction = ['角', '分'];
		var digit = [  
			'零', '壹', '贰', '叁', '肆',  
			'伍', '陆', '柒', '捌', '玖'  
		];  
		var unit = [  
			['元', '万', '亿'],  
			['', '拾', '佰', '仟']  
		];  
		var head = n < 0? '欠': '';  
		n = Math.abs(n);
		var s = '';  
		for (var i = 0; i < fraction.length; i++) {
			// s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
			s += (digit[Math.floor(mul(mul(n,10),Math.pow(10, i))) % 10] + fraction[i]).replace(/零./, '');
		};
		
		s = s || '整';  
		n = Math.floor(n);  
		for (var i = 0; i < unit[0].length && n > 0; i++) {  
			var p = '';  
			for (var j = 0; j < unit[1].length && n > 0; j++) {  
				p = digit[n % 10] + unit[1][j] + p;  
				n = Math.floor(n / 10);  
			}  
			s = p.replace(/(零.)*零$/, '')  
				 .replace(/^$/, '零')  
			  + unit[0][i] + s;  
		};
		
		return head + s.replace(/(零.)*零元/, '元')  
					   .replace(/(零.)+/g, '零')  
					   .replace(/^整$/, '零元整');  
	}; // end toChinese
	
	/** 
	  将中文金额转换成数值(可以处理中文金额 或 阿拉伯数字字符串)
	  @function
	  @param {String} money 中文金额
	*/
	fn.money.toDigit = toDigit = function(n){
		
		// Number
		if(typeof n == "number") return n;
		
		// 
		if(typeof n != "string") return null;
		
		// String
		if(!isNaN(n)) return parseFloat(n);
		
		// Chinese 
		var digit = [  
			'零', '壹', '贰', '叁', '肆',  
			'伍', '陆', '柒', '捌', '玖'  
		];
		var unit = ['万', '亿', '拾', '佰', '仟'];
		var fraction = ['角', '分', '整']; 
		var head = n.charAt(0) == "欠" ? -1 : 1;
		n = n.substr(1);
		
		var ary = n.split("元"),
			_int = ary[0],
			_dec = ary.length > 1 ? ary[1] : "";
		
		// 去除单位	
		for(var i = 0; i < unit.length; i++){
			_int = replace(_int, unit[i], "");
		};
		for(var i = 0; i < fraction.length; i++){
			_dec = replace(_dec, fraction[i], "");
		};
		
		// 替换数字
		for(var i = 0; i < digit.length; i++){
			_int = replace(_int, digit[i], i);
			_dec = replace(_dec, digit[i], i);
		};
		
		function replace(text, s1, s2){
			return text.replace(new RegExp(s1,"gm"), s2);;
		};
		
		return head * (parseFloat(_int + "." + _dec));
	}; // end toDigit
	
	/** 
	  格式化金额
	  @param {Number|String} num 要格式化数字
	  @param {Object} opt 参数集合，可选
	  @param {Int} opt.scale 小数位数， 默认为2， 不足补0
	  @param {String} opt.separator 千位分隔符， 默认为逗号
	*/
	fn.money.format = function(num, opt){
		num = toNumber(num);
		
		opt = $.extend({
			separator: ",",
			scale: 2
		}, opt);
		var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
			scale = Math.pow(10,opt.scale);
		num = fn.money.add(num, 0);
		num = Math.round(num*scale)/scale;
		num = num.toString().replace(re,"$1" + opt.separator);
		
		// 如果小数位大于0
		if(opt.scale > 0){
			num = num.split(".");
			
			if(num.length === 1){
				num.push("");
			};
			
			// 去除小数内的分隔符
			num[1] = num[1].replace(/,/g, "");
			
			// 补足小数位
			while(num[1].length < opt.scale){
				num[1] += "0";
			};
			
			num = num.join(".");
		};
		
		return num
	};
	
	/*
     Luhm校验规则：16位银行卡号（19位通用）:
	 
     1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
     2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
     3.将加法和加上校验位能被 10 整除。
    */
	fn.money.bankcard  = function(bankNum){
		
        var regExp = /^\d+$/;
		
        if(bankNum.length == 0 || bankNum == null){
            return false;
        }else if(regExp.test(bankNum)== false){
            return false;
        }else{
            var lastNum = bankNum.substr(bankNum.length - 1,1),
				firstNum = bankNum.substr(0,bankNum.length - 1),
				array = firstNum.split(""),
				luhmSum = 0;
			
            for(var i = array.length - 1, j = 0; i >= 0; i--, j++){
                var k =parseInt(array[i]);
                if(j % 2 == 0)
                {
                    k = k*2;
                    if(k>10)
                        k = 1 + k % 10;
                    else if(k==10)
                        k = 1;
                }
                luhmSum += k;
            };
			
            var luhmNum =  (parseInt(luhmSum) % 10 == 0) ? 0:parseInt(10 - parseInt(luhmSum) % 10);
			
            if(lastNum != String(luhmNum)){
                return false;
            };
        };
		
		return true;
    }; // end bankcard
	
	fn.money.idcard = function(idCard){
		
		var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
		var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];				// 身份证验证位值.10代表X
		var sum = 0;
		var isValidityBrith = function(year,month,day){
			var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
			if(year.length == 2){
				var temp_year = temp_date.getYear();
			}else if(year.length == 4){
				var temp_year = temp_date.getFullYear();
			}else{
				return false;
			}
			if(temp_year != parseFloat(year)   
				|| temp_date.getMonth() != parseFloat(month) - 1   
				|| temp_date.getDate() != parseFloat(day)){   
				return false;
			}else{
				return true;
			};
		};
		
		idCard = idCard.replace(/ /g, "").replace(/(^\s*)|(\s*$)/g, ""); 
		if(idCard.length == 15){
			var year =  idCard.substring(6,8),
				month = idCard.substring(8,10),
				day = idCard.substring(10,12); 
			
			return isValidityBrith(year,month,day);
		};
		
		if(idCard.length != 18) return false;
		
		var a_idCard = idCard.split("");
		if (a_idCard[17].toLowerCase() == 'x') a_idCard[17] = 10;
		for ( var i = 0; i < 17; i++) {
			sum += Wi[i] * a_idCard[i];
		};
		valCodePosition = sum % 11;			// 得到验证码所在位置
		if (a_idCard[17] != ValideCode[valCodePosition]) return false;
		
		var year =  idCard.substring(6,10),
			month = idCard.substring(10,12),
			day = idCard.substring(12,14);
		
		return isValidityBrith(year,month,day);
	}; // end idcard
	
})(fn.jQuery);
