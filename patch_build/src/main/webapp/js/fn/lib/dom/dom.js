/** 
 DOM处理
 @namespace 
 @name fn.dom
*/

window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	
	var DOM = {
	
		/** 获取浏览器可视范围宽度 */
		clientWidth: function(){
			var _rootEl = document.compatMode=="CSS1Compat" ? document.documentElement : document.body;
			return _rootEl.clientWidth;
		},
		
		/** 获取浏览器可视范围高度 */
		clientHeight: function(){
			var _rootEl = document.compatMode=="CSS1Compat" ? document.documentElement : document.body;
			return _rootEl.clientHeight;
		},
		
		// 获取px数值
		// 如果不能转换成number则返回原值（必须）
		px2number: function(s){
			s = (s || "").toString().replace(/(px|\s)/g, "");
			if(isNaN(s)){
				return s;
			}else{
				return parseFloat(s);
			};
		},
		
		// 获取元素的内部宽度（不包括边框和补白）
		insideWidth: function(elem){
			elem = $(elem);
			if(!elem.length) return 0;
			var w = elem.innerWidth();
			var pl = DOM.px2number(elem.css("padding-left"));
			var pr = DOM.px2number(elem.css("padding-right"));
			return w - pl - pr;
		},
		
		// 获取元素的内部高度（不包括边框和补白）
		insideHeight: function(elem){
			elem = $(elem);
			if(!elem.length) return 0;
			var w = elem.innerHeight();
			var pt = DOM.px2number(elem.css("padding-top"));
			var pb = DOM.px2number(elem.css("padding-bottom"));
			return w - pt - pb;
		},
		
		/** 
		 设置dom居中 
		 @param {boolean} parent 是否相对于父节点居中，如果为否则相对于window居中
		*/
		center: function(target, parent) {
			target = $(target);
			if (parent) {
				parent = target.parent();
			} else {
				parent = window;
			}
			target.css({
				"position": "absolute",
				"top": ((($(parent).height() - target.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
				"left": ((($(parent).width() - target.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
			});
			return target;
		},
		
		style: function(elem, name){
			elem = $(elem);
			var style = elem.attr("style") || "";
			
			if(style){
				style = style.split(";");
				$.each(style, function(i,n){
					n = $.trim(n).split(":");
					if($.trim(n[1]) === name){
						return $.trim(n[2]);
					};
				});
			};
			
			return null;
		}
		
	}; // end DOM
	
	$.extend(fn.dom = fn.dom || {}, DOM);
	
	// =========兼容旧版fn===========
	
	/** 兼容旧版本 @ignore */
	fn.clientWidth = DOM.clientWidth;
	
	/** 兼容旧版本 @ignore */
	fn.clientHeight = DOM.clientHeight;
	
})(fn.jQuery);