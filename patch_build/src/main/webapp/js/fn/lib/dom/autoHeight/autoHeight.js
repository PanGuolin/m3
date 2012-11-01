/** 
 自动高度
 @namespace 
 @name fn.autoHeight
*/

window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){

	// 获取页面高度
	function bodyHeight(dtd){
		var h = 0, bd = $(document.body);
		
		// 计算dtd信息
		var dtd = window._dtd || (function(){
			var docType = (
					document.body.parentNode && 
					document.body.parentNode.parentNode && 
					document.body.parentNode.parentNode.firstChild && 
					document.body.parentNode.parentNode.firstChild.nodeValue || ""
				).toLowerCase(),
				xhtml = docType.indexOf("xhtml") > -1;
			
			window._dtd = {
				string : docType,                                             // dtd声明
				noType : docType.indexOf("-//w3c//dtd") < 0,                  // dtd类型未指定
				html4_strict : !xhtml && docType.indexOf("strict") > -1,      // dtd类型： html4/strict
				html4_loose : !xhtml && docType.indexOf("loose") > -1,        // dtd类型：html4/loose
				html4_frameset : !xhtml && docType.indexOf("frameset") > -1,  // dtd类型：html4/frameset
				xhtml : xhtml                                                 // dtd类型：xhtml
			};
			
			window._dtd.ltHtml4Strict = window._dtd.noType || (               // dtd小于等于html4 strict
				!window._dtd.xhtml &&
				!window._dtd.html4_loose && 
				!window._dtd.html4_strict && 
				!window._dtd.html4_frameset
			);
			
			return window._dtd;
		})();
		
		// 如果是IE
		// 如果声明dtd或者dtd的版本低于html4_strict 或者 大于html4_strict且浏览器为IE6/7， 则手动计算body子元素总高度
		if(!!window.ActiveXObject && (dtd.ltHtml4Strict || (!dtd.ltHtml4Strict && (!-[1,] && !(!-[1,] && !!document.documentMode))))){
			bd.children().each(function(){
				if(this.style.opacity == 0 || this.style.display == "none" || this.style.position == "absolute") return;
				h += $(this).outerHeight();
			});
		}else{
			// 如果是火狐
			h = bd.height();
		};
		
		h += parseInt(bd.css("margin-top")) || 0;
		h += parseInt(bd.css("margin-bottom")) || 0;
		
		return h;
	};

	function hasScroll(el) {
		//return {y:document.body.scrollHeight>document.body.clientHeight};
		// test targets
		var elems = el ? [el] : [document.documentElement, document.body];
		var scrollX = false, scrollY = false;
		for (var i = 0; i < elems.length; i++) {
			var o = elems[i];
			// test horizontal
			var sl = o.scrollLeft;
			o.scrollLeft += (sl > 0) ? -1 : 1;
			o.scrollLeft !== sl && (scrollX = scrollX || true);
			o.scrollLeft = sl;
			// test vertical
			var st = o.scrollTop;
			o.scrollTop += (st > 0) ? -1 : 1;
			o.scrollTop !== st && (scrollY = scrollY || true);
			o.scrollTop = st;
		};
		// ret
		return {
			x: scrollX,
			y: scrollY
		};
	};
	
	// 微调
	function trim(opt){
		if(hasScroll().y){
			return; 
		};
		for(var i = 0; i < 50; i++){
			var h = opt.getHeight();
			opt.setHeight(h + 3);
			
			if(hasScroll().y){
				opt.setHeight(h);
				if(hasScroll().y){
					opt.setHeight(h - 5);
				};
				break;
			};
		}; // end for
	}; // end function
	
	// autoHeight
	function ah(opt){
		ah.ing = true;
		
		// 先把高度设置为零， 计算出高度差， 再设置新高度
		opt.setHeight(0);
		var h = fn.dom.clientHeight() - bodyHeight();
		if(h > 0){
			opt.setHeight(h - 20);
			
			// 微调， 直到出现滚动条为止
			trim(opt);
		};
		
		ah.ing = false;
	};
	
	var DOM = {
		
		// 判断页面是否出现滚动条
		hasScroll: hasScroll,
		
		// 使元素自适应页面高度（填满页面）
		autoHeight: function(opt){
		
			// 默认参数
			opt = $.extend({
				elem: "",
				step: fn.dom.clientHeight(),
				setHeight: function(h){ $(opt.elem).height(h);},
				getHeight: function(){ return $(opt.elem).height();},
				hide: function(){
					$(opt.elem).hide();
				},
				show: function(){
					$(opt.elem).show();
				}
			}, typeof opt == "string" ? {elem: opt} : opt);
			
			ah(opt);
			
//			$(window).resize(function(){
//				if(!ah.ing) ah(opt);
//			});
		} // end autoHeight
	};
	
	$.extend(fn.dom = fn.dom || {}, DOM);
	
})(fn.jQuery);