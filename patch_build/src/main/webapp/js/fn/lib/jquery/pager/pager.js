/*
* jQuery pager plugin
* Version 1.0 (12/22/2008)
* @requires jQuery v1.2.6 or later
*
* Example at: http://jonpauldavies.github.com/JQuery/Pager/PagerDemo.html
*
* Copyright (c) 2008-2009 Jon Paul Davies
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Read the related blog post and contact the author at http://www.j-dee.com/2008/12/22/jquery-pager-plugin/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage: .pager({ pageIndex: 1, pageCount: 15, onClick: PagerClickTest });
*
* Where pageIndex is the visible page number
*       pageCount is the total number of pages to display
*       onClick is the method to fire when a pager button is clicked.
*
* onClick signiture is PagerClickTest = function(pageclickednumber) 
* Where pageclickednumber is the number of the page clicked in the control.
*
* The included Pager.CSS file is a dependancy but can obviously tweaked to your wishes
* Tested in IE6 IE7 Firefox & Safari. Any browser strangeness, please report.
*/
// 2011.04.19 修改了参数 pagenumber 为 pageIndex ； hap
// 2011.04.19 修改了参数 pagecount 为 pageCount ； hap
// 2011.04.19 修改了参数 buttonClickCallback 为 onClick ； hap
// 2011.04.19 增加了参数 cls（object：元素css类名） ； hap
// 2011.04.19 增加了参数 text（object：自定义按钮文本） 和 showFirstBtn/showLastBtn（bool：是否显示“首页”/“末页”按钮）； hap
// 2011.04.20 增加了参数 btnsCount（number：显示按钮数量） ； hap
// 2011.04.20 增加了参数 pageSize（number：可选，可计算pageCount） ； hap
// 2011.04.20 增加了参数 rowsCount（number：可选，可计算pageCount） ； hap

(function($) {
	
	/*
	函数：填充0字符
	参数：value-需要填充的字符串, length-总长度
	返回：填充后的字符串
	*/
	var zeroize = function(value, length) {
		if (!length) length = 2; 
		
		value = new String(value);
		
		for (var i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		};
		return zeros + value;
	};
	
	/* 根据页面大小和数据量计算分页总数 */
	var getPageCount = function(pageSize, rowsCount){
		var pageCount = rowsCount / pageSize;
			
		if(pageCount%1) pageCount = parseInt(pageCount + 1);
		if(pageCount<1) pageCount = 1;
		
		return pageCount;
	};
	
    $.fn.pager = function(options) {
		
		// 尝试通过 pageSize 和 rowsCount 计算 pageCount
		if(!options.pageCount && 
			typeof options.pageSize == "number" && 
			typeof options.rowsCount == "number")
			options.pageCount = getPageCount(options.pageSize, options.rowsCount);
		
        var opts = $.extend({}, $.fn.pager.defaults, options);
		
        return this.each(function() {
			
			// 2011.04.19 新增自定义css class的功能
			$(this).addClass(opts.cls.pager);
			
        	// empty out the destination element and then render out the pager with the supplied options
			
			// 注意：使用parseInt是必须加上第二个参数 10， 否则转换带前缀0的数字字符串是可能会以其它进制计算
            $(this).empty().append(renderpager(parseInt(opts.pageIndex, 10), parseInt(opts.pageCount, 10), opts.onClick));
            
            // specify correct cursor activity
            $('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
		});
	
		// render and return the pager with the supplied options
		// 2011.04.19 这个函数从$.fn.pager的定义之外挪进来， 因为要访问opts中新增的text属性
		function renderpager(pageIndex, pageCount, onClick) {
	
			// setup $pager to hold render
			var $pager = $('<ul class="pages"></ul>');
	
			// add in the previous and next buttons
			if(opts.showFirstBtn) $pager.append(renderButton(opts.text.first, pageIndex, pageCount, onClick))
			$pager.append(renderButton(opts.text.prev, pageIndex, pageCount, onClick));
			
			// pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases
			// 2011.04.19 增加了自定义分页按钮数
			var endPoint = pageIndex + (opts.btnsCount % 2 ? parseInt(opts.btnsCount / 2) : (opts.btnsCount / 2 - 1));
			endPoint = opts.btnsCount > endPoint ? opts.btnsCount : endPoint;
			var startPoint = endPoint - opts.btnsCount + 1;
			if (endPoint > pageCount) {
				startPoint = pageCount - opts.btnsCount + 1;
				endPoint = pageCount;
			};
			if (startPoint < 1) {
				startPoint = 1;
			};
			// loop thru visible pages and render buttons
			for (var page = startPoint; page <= endPoint; page++) {
				
				// 2011.04.19 使用新增的zeroize方法， 使个位数的按钮与十位数的按钮宽度相等
				var currentButton = $('<li class="page-number">' + zeroize(page) + '</li>');
	
				page == pageIndex ? currentButton.addClass('pgCurrent') : currentButton.click(function() { onClick(this.firstChild.data); });
				currentButton.appendTo($pager);
			};
	
			// render in the next and last buttons before returning the whole rendered control back.
			$pager.append(renderButton(opts.text.next, pageIndex, pageCount, onClick))
			if(opts.showLastBtn) $pager.append(renderButton(opts.text.last, pageIndex, pageCount, onClick));
	
			return $pager;
		};
	
		// renders and returns a 'specialized' button, ie opts.text.next, 'previous' etc. rather than a page number button属性
		function renderButton(buttonLabel, pageIndex, pageCount, onClick) {
	
			var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');
	
			var destPage = 1;
	
			// work out destination page for required button type
			switch (buttonLabel) {
				case opts.text.first:
					destPage = 1;
					break;
				case opts.text.prev:
					destPage = pageIndex - 1;
					break;
				case opts.text.next:
					destPage = pageIndex + 1;
					break;
				case opts.text.last:
					destPage = pageCount;
					break;
			};
	
			// disable and 'grey' out buttons if not needed.
			if (buttonLabel == opts.text.first || buttonLabel == opts.text.prev) {
				pageIndex <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function() { onClick(destPage); });
			}
			else {
				pageIndex >= pageCount ? $Button.addClass('pgEmpty') : $Button.click(function() { onClick(destPage); });
			};
	
			return $Button;
		};
    };

    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the next version
	// 2011.04.19 更改了 pagenumber为pageIndex， pageCount为pageCount洁
	// 2011.04.19 增加了 text, cls, showFirstBtn, showLastBtn
	// 2011.04.20 增加了 pageSize, rowsCount
    $.fn.pager.defaults = {
        pageIndex: 1, // 当前页码
		btnsCount: 9, // 显示按钮数
		
        pageCount: 1, // 总页数。 可以只传入pageCount，或者同时传入pageSize和rowsCount以计算pageCount
		// rowsCount, // 数据条
		// pageSize, // 每页显示的数据条数
		
		cls: {
			pager: "pager"
		},
		text: {
			first: "|&lt;",
			prev: "<<",
			next: ">>",
			last: "&gt;|"
		},
		// 是否显示首页和末页按钮
		showFirstBtn: true,
		showLastBtn: true
    };

})(jQuery);