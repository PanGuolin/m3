/** 
 字符串处理
 @namespace 
 @name fn.string
*/

window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	
	var STRING = {
	
		/** 
		 * 得到字节长度
		 * @method byteLen
		 * @static
		 * @param {String} s 字符串
		 * @return {number}  返回字节长度
		 */
		byteLen: function(s) {
			return s.replace(/[^\x00-\xff]/g, "--").length;
		},

		/** 
		 * 得到指定字节长度的子字符串
		 * @method subByte
		 * @static
		 * @param {String} s 字符串
		 * @param {number} len 字节长度
		 * @param {string} tail (Optional) 结尾字符串
		 * @return {string}  返回指定字节长度的子字符串
		 */
		byteSub: function(s, len, tail) {
			if (fn.string.byteLen(s) <= len) {return s; }
			tail = tail || '';
			len -= fn.string.byteLen(tail);
			return s.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ") //双字节字符替换成两个
				.substr(0, len) //截取长度
				.replace(/[^\x00-\xff]$/, "") //去掉临界双字节字符
				.replace(/([^\x00-\xff]) /g, "$1") + tail; //还原
		},
		
		/**  
		 * 在拼接正则表达式字符串时，消除原字符串中特殊字符对正则表达式的干扰  
		 * @author:meizz  
		 * @version: 2010/12/16  
		 * @param               {String}        str     被正则表达式字符串保护编码的字符串  
		 * @return              {String}                被保护处理过后的字符串  
		*/
		escapeReg: function(str) {  
			return str.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), "\\\x241");  
		},

		/** 
		 * 将字符串首字母大写
		 */
		capitalize: function(s){
			return s.slice(0,1).toUpperCase() + s.slice(1);
		},

		/** 
		 * 将所有tag标签消除，即去除<tag>，以及</tag>
		 * @method stripTags
		 * @static
		 * @param {String} s 字符串
		 * @return {String} 返回处理后的字符串
		 */
		removeTags: function(s) {
			return s.replace(/<[^>]*>/gi, '');
		},
		
		/*
		 检验字符串是否ip地址
		*/
		isIP: function(str){   
			var ip = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;   
			return ip.test(str);
		}
		
	}; // string
	
	$.extend(fn.string = fn.string || {}, STRING);
	
})(fn.jQuery);