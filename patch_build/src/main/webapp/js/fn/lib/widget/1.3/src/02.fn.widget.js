// *****************************************************************************************
// part 2 : fn.widget.js
// *****************************************************************************************
// fn.widget.js


fn.widget = fn.widget || {};
	
if(fn.widgetBase){
	fn.widgetBase();
};

//=====================================================================
/// p1 - 插件部分
//=====================================================================

/// plugins: draggable
// update: 2011/12/30
(function($){
	$.fn.draggable2 = function(opt){
		return this.each(function(){
			(function(target, opt){
				var s = {
					handler: $(opt.handler, target).length ? $(opt.handler, target) : $(target),
					target: $(target),
					follow: $(opt.follow),
					scrollTop: $(document).scrollTop()
				};
				
				s.handler.css({"cursor" : "move"});
				// 
				if(s.target.css("position") != "fixed"){
					s.target.css({"position": "absolute"});
				};
				
				s.handler.mousedown(function(e){
					s._isMD = true;
					// 记录目标元素的初始位置
					s.o = s.target.position();
					s.e = e;
					// 记录跟随元素的初始位置
					s.follow.each(function(){
						$(this).data("pos", $(this).offset());
					});
				});
				
				$(document).mouseup(function(){
					s._isMD = false;
				}).mousemove(function(e){
					if(!s._isMD) return;
					// 更改目标元素的位置
					s.target.css({
						left: s.o.left - s.e.pageX + e.pageX,
						top: s.o.top - s.e.pageY + e.pageY - (s.target.css("position") == "fixed" ? $(window).scrollTop() : 0)
					}); //
					var top = s.o.top - s.e.pageY + e.pageY - $(window).scrollTop();
					//$("body").append("<li>" + top + "=" + s.o.top + " - " + s.e.pageY + " + " + e.pageY + " + " + $(window).scrollTop() + "</li>");
					// 更改跟随元素的位置
					s.follow.each(function(){
						var o = $(this).data("pos");
						$(this).css({
							left: o.left - s.e.pageX + e.pageX,
							top: o.top - s.e.pageY + e.pageY
						}); //
					});
				});
			})(this, opt || {});
		});// end this.each
	};
})(fn.jQuery); // end $.fn.draggable


/// plugins: bgiframe
// update: 
(function($){
	// 在所有浏览器中启用防穿透功能（防止axtivex控件穿透问题）
	$.fn.bgiframe = (1 || $.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
		s = $.extend({
			top     : 'auto', // auto == .currentStyle.borderTopWidth
			left    : 'auto', // auto == .currentStyle.borderLeftWidth
			width   : 'auto', // auto == offsetWidth
			height  : 'auto', // auto == offsetHeight
			opacity : true,
			src     : 'javascript:;'
		}, s);
		
		var html = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="'+s.src+'"'+
					   'style="display:block;position:absolute;z-index:-1;'+
						   (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
						   'top:'+(s.top=='auto'?'expression(((parseInt((this.parentNode.currentStyle || {}).borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
						   'left:'+(s.left=='auto'?'expression(((parseInt((this.parentNode.currentStyle || {}).borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
						   'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
						   'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
					'"/>';
		return this.each(function() {
			if ( $(this).children('iframe.bgiframe').length === 0 ){
				$(html).prependTo(this);
			};
			//this.insertBefore( document.createElement(html), this.firstChild );
		});
	} : function() { return this; });
	
	// old alias
	$.fn.bgIframe = $.fn.bgiframe;
	
	function prop(n) {
		return n && n.constructor === Number ? n + 'px' : n;
	}
})(fn.jQuery); // end $.fn.bgiframe



/* histroy插件 */
/// plugins: histroy 2012.03.14
/**
 * @license 
 * jquery Tools 1.2.6 History "Back button for AJAX apps"
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/history.html
 * 
 * Since: Mar 2010
 * Date:  
 */
(function($) {
		
	var hash, iframe, links, inited;		
	
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.fwb_history = {
	
		init: function(els) {
			
			if (inited) { return; }
			
			// IE
			if ($.browser.msie && $.browser.version < '8') {
				
				// create iframe that is constantly checked for hash changes
				if (!iframe) {
					iframe = $("<iframe/>").attr("src", "javascript:false;").hide().get(0);
					$("body").prepend(iframe);
									
					setInterval(function() {
						var idoc = iframe.contentWindow.document, 
							 h = idoc.location.hash;
					
						if (hash !== h) {						
							$(window).trigger("hash", h);
						}
					}, 100);
					
					setIframeLocation(location.hash || '#');
				}

				
			// other browsers scans for location.hash changes directly without iframe hack
			} else { 
				setInterval(function() {
					var h = location.hash;
					if (h !== hash) {
						$(window).trigger("hash", h);
					}						
				}, 100);
			}

			links = !links ? els : links.add(els);
			
			els.click(function(e) {
				var href = $(this).attr("href");
				if (iframe) { setIframeLocation(href); }
				
				// handle non-anchor links
				if (href.slice(0, 1) != "#") {
					location.href = "#" + href;
					return e.preventDefault();		
				}
				
			}); 
			
			inited = true;
		}	
	};  
	

	function setIframeLocation(h) {
		if (h) {
			var doc = iframe.contentWindow.document;
			doc.open().close();	
			doc.location.hash = h;
		}
	} 
		 
	// global histroy change listener
	$(window).bind("hash", function(e, h)  { 
		if (h) {
			links.filter(function() {
			  var href = $(this).attr("href");
			  return href == h || href == h.replace("#", ""); 
			}).trigger("history", [h]);	
		} else {
			links.eq(0).trigger("history", [h]);	
		}

		hash = h;

	});
		
	
	$.fn.fwb_history = function(fn) {
			
		$.tools.fwb_history.init(this);

		return this.bind("history", fn);		
	};	
		
})(fn.jQuery); 


/* tabs 插件 */
/// plugins: tabs 2012.01.09
/**
 * @license 
 * jquery Tools 1.2.6 Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 *
 * Since: November 2008
 * Date:  
 */  
;(function($) {
		
	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.fwb_tabs = {
		
		conf: {
			tabs: 'a',
			current: 'current',
			onBeforeClick: null,
			onClick: null, 
			effect: 'default',
			initialIndex: 0,			
			event: 'click',
			rotate: false,
			
      // slide effect
      slideUpSpeed: 400,
      slideDownSpeed: 400,
			
			// 1.2
			history: false
		},
		
		addEffect: function(name, fn) {
			effects[name] = fn;
		}
		
	};
	
	var effects = {
		
		// simple "toggle" effect
		'default': function(i, done) {
			var panel = this.getPanes().hide().eq(i).show(),
				tab = this.getTabs().eq(i),
				href = tab.attr("href"),
				noiframe = tab.attr("noiframe") == "true";
				
			if(href && (href.indexOf(".") > -1 || href.indexOf("/") > -1)){
				if(tab.attr("loaded") == "true"){
					return done.call();
				}else{
					tab.attr("loaded", "true");
				};
				
				if(noiframe){
					panel.load(href, done);
				}else{
					var iframe = $('<iframe src="' + href + '" frameborder="0" style="width:100%;overflow:auto;overflow-x:hidden;"></iframe>');
					panel.html(iframe);
					var height = panel.height() > 400 ? panel.height() : 400;
					iframe.height(height);
					done.call();
				};
				
			}else{
				done.call();
			};
		}, 
		
		/*
			configuration:
				- fadeOutSpeed (positive value does "crossfading")
				- fadeInSpeed
		*/
		fade: function(i, done) {		
			
			var conf = this.getConf(),
				 speed = conf.fadeOutSpeed,
				 panes = this.getPanes();
			
			if (speed) {
				panes.fadeOut(speed);	
			} else {
				panes.hide();	
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);	
		},
		
		// for basic accordions
		slide: function(i, done) {
		  var conf = this.getConf();
		  
			this.getPanes().slideUp(conf.slideUpSpeed);
			this.getPanes().eq(i).slideDown(conf.slideDownSpeed, done);			 
		}, 

		/**
		 * AJAX effect
		 */
		ajax: function(i, done)  {			
			this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done);	
		}		
	};   	
	
	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	*/
	
	var animating, 
	  	w;
	 
	$.tools.fwb_tabs.addEffect("horizontal", function(i, done) {
	  if (animating) return;    // don't allow other animations
	  
	  var nextPane = this.getPanes().eq(i),
	      currentPane = this.getCurrentPane();
	      
		// store original width of a pane into memory
		w || ( w = this.getPanes().eq(0).width() );
		animating = true;
		
		nextPane.show(); // hidden by default
		
		// animate current pane's width to zero
    // animate next pane's width at the same time for smooth animation
    currentPane.animate({width: 0}, {
      step: function(now){
        nextPane.css("width", w-now);
      },
      complete: function(){
        $(this).hide();
        done.call();
        animating = false;
     }
    });
    // Dirty hack...  onLoad, currentPant will be empty and nextPane will be the first pane
    // If this is the case, manually run callback since the animation never occured, and reset animating
    if (!currentPane.length){ 
      done.call(); 
      animating = false;
    }
	});	

	
	function Tabs(root, paneSelector, conf) {
		
		var self = this, 
			 trigger = root.add(this),
			 tabs = root.find(conf.tabs),
			 panes = paneSelector.jquery ? paneSelector : root.children(paneSelector),			 
			 current;
			 
		
		// make sure tabs and panes are found
		if (!tabs.length)  { tabs = root.children(); }
		if (!panes.length) { panes = root.parent().find(paneSelector); }
		if (!panes.length) { panes = $(paneSelector); }
		
		
		// public methods
		$.extend(this, {				
			click: function(i, e) {
			  
				var tab = tabs.eq(i);
				
				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}
								
				if (conf.rotate) {
					var last = tabs.length -1; 
					if (i < 0) { return self.click(last, e); }
					if (i > last) { return self.click(0, e); }						
				}
				
				if (!tab.length) {
					if (current >= 0) { return self; }
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}				
				
				// current tab is being clicked
				if (i === current) { return self; }
				
				// possibility to cancel click action				
				e = e || $.Event();
				e.type = "onBeforeClick";
				trigger.trigger(e, [i]);				
				if (e.isDefaultPrevented()) { return; }

				// call the effect
				effects[conf.effect].call(self, i, function() {
					current = i;
					// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [i]);
				});			
				
				// default behaviour
				tabs.removeClass(conf.current);	
				tab.addClass(conf.current);				
				
				return self;
			},
			
			getConf: function() {
				return conf;	
			},

			getTabs: function() {
				return tabs;	
			},
			
			getPanes: function() {
				return panes;	
			},
			
			getCurrentPane: function() {
				return panes.eq(current);	
			},
			
			getCurrentTab: function() {
				return tabs.eq(current);	
			},
			
			getIndex: function() {
				return current;	
			}, 
			
			next: function() {
				return self.click(current + 1);
			},
			
			prev: function() {
				return self.click(current - 1);	
			},
			
			destroy: function() {
				tabs.unbind(conf.event).removeClass(conf.current);
				panes.find("a[href^=#]").unbind("click.T"); 
				return self;
			}
		
		});

		// callbacks	
		$.each("onBeforeClick,onClick".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) {
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;	
			};
		});
	
		
		if (conf.history && $.fn.fwb_history) {
			$.tools.fwb_history.init(tabs);
			conf.event = 'history';
		}	
		
		// setup click actions for each tab
		tabs.each(function(i) {
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});			
		});
		
		// cross tab anchor link
		panes.find("a[href^=#]").bind("click.T", function(e) {
			self.click($(this).attr("href"), e);		
		}); 
		
		// open initial tab
		if (location.hash && conf.tabs == "a" && root.find("[href=" +location.hash+ "]").length) {
			self.click(location.hash);

		} else {
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		}				
		
	}
	
	
	// jquery plugin implementation
	$.fn.fwb_tabs = function(paneSelector, conf) {
		
		// return existing instance
		var el = this.data("fwb_tabs");
		if (el) { 
			el.destroy();	
			this.removeData("fwb_tabs");
		}

		if ($.isFunction(conf)) {
			conf = {onBeforeClick: conf};
		}
		
		// setup conf
		conf = $.extend({}, $.tools.fwb_tabs.conf, conf);		
		
		
		this.each(function() {				
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("fwb_tabs", el); 
		});		
		
		return conf.api ? el: this;		
	};		
		
}) (fn.jQuery); 




/* 日期插件 */
/// plugins: date 2012.01.16
/**
 * @license                                     
 * jquery Tools 1.2.6 Dateinput - <input type="date" /> for humans
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/form/dateinput/
 *
 * Since: Mar 2010
 * Date:  
 */
(function($, undefined) {	
		
	/* TODO: 
		 preserve today highlighted
	*/
	
	var instances = [], 
		 tool, 
		 
		 // h=72, j=74, k=75, l=76, down=40, left=37, up=38, right=39
		 KEYS = [75, 76, 38, 39, 74, 72, 40, 37],
		 LABELS = {};
	
	tool = $.fwb_dateinput = {
		
		conf: { 
			format: 'yyyy-mm-dd',
			selectors: false,
			yearRange: [-5, 5],
			lang: 'zh',
			offset: [0, 0],
			speed: 0,
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			min: undefined,
			max: undefined,
			trigger: 0,
			toggle: 0,
			editable: 0,
			
			css: {
				
				prefix: 'fwb_cal',
				input: 'fwb_date',
				
				// ids
				root: 0,
				head: 0,
				title: 0, 
				prev: 0,
				next: 0,
				month: 0,
				year: 0, 
				days: 0,
				
				body: 0,
				weeks: 0,
				today: 0,		
				current: 0,
				
				// classnames
				week: 0, 
				off: 0,
				sunday: 0,
				focus: 0,
				disabled: 0,
				trigger: 0
			}  
		},
		
		localize: function(language, labels) {
			$.each(labels, function(key, val) {
				labels[key] = val.split(",");		
			});
			LABELS[language] = labels;	
		}
		
	};
	
	tool.localize("en", {
		months: 		 'January,February,March,April,May,June,July,August,September,October,November,December', 
		shortMonths: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',  
		days: 		 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', 
		shortDays: 	 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'	  
	});

	
//{{{ private functions
		

	// @return amount of days in certain month
	function dayAm(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}
 
	function zeropad(val, len) {
		val = '' + val;
		len = len || 2;
		while (val.length < len) { val = "0" + val; }
		return val;
	}  
	
	// thanks: http://stevenlevithan.com/assets/misc/date.format.js 
	var Re = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, tmpTag = $("<a/>");
	
	function format(date, fmt, lang) {
		
	  var d = date.getDate(),
			D = date.getDay(),
			m = date.getMonth(),
			y = date.getFullYear(),

			flags = {
				d:    d,
				dd:   zeropad(d),
				ddd:  LABELS[lang].shortDays[D],
				dddd: LABELS[lang].days[D],
				m:    m + 1,
				mm:   zeropad(m + 1),
				mmm:  LABELS[lang].shortMonths[m],
				mmmm: LABELS[lang].months[m],
				yy:   String(y).slice(2),
				yyyy: y
			};

		var ret = fmt.replace(Re, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
		
		// a small trick to handle special characters
		return tmpTag.html(ret).html();
		
	}
	
	function integer(val) {
		return parseInt(val, 10);	
	} 

	function isSameDay(d1, d2)  {
		return d1.getFullYear() === d2.getFullYear() && 
			d1.getMonth() == d2.getMonth() &&
			d1.getDate() == d2.getDate(); 
	}

	function parseDate(val) {
		
		if (val === undefined) { return; }
		if (val.constructor == Date) { return val; } 
		
		if (typeof val == 'string') {
			
			// rfc3339?
			var els = val.split("-");		
			if (els.length == 3) {
				return new Date(integer(els[0]), integer(els[1]) -1, integer(els[2]));
			}	
			
			// invalid offset
			if ( !(/^-?\d+$/).test(val) ) { return; }
			
			// convert to integer
			val = integer(val);
		}
		
		var date = new Date;
		date.setDate(date.getDate() + val);
		return date; 
	}
	
//}}}
		 
	
	function Dateinput(input, conf)  { 

		// variables
		var self = this,  
			 now = new Date,
			 yearNow = now.getFullYear(),
			 css = conf.css,
			 labels = LABELS[conf.lang],
			 root = $("#" + css.root),
			 title = root.find("#" + css.title),
			 trigger,
			 pm, nm, 
			 currYear, currMonth, currDay,
			 value = input.attr("data-value") || conf.value || input.val(), 
			 min = input.attr("min") || conf.min,  
			 max = input.attr("max") || conf.max,
			 opened,
			 original;

		// zero min is not undefined 	 
		if (min === 0) { min = "0"; }
		
		// use sane values for value, min & max		
		value = parseDate(value) || now;  
		
		min   = parseDate(min || new Date(yearNow + conf.yearRange[0], 1, 1));
		max   = parseDate(max || new Date( yearNow + conf.yearRange[1]+ 1, 1, -1));
		
		// check that language exists
		if (!labels) { throw "Dateinput: invalid language: " + conf.lang; }
		
		// Replace built-in date input: NOTE: input.attr("type", "text") throws exception by the browser
		if (input.attr("type") == 'date') {
			var original = input.clone(),
          def = original.wrap("<div/>").parent().html(),
          clone = $(def.replace(/type/i, "type=text data-orig-type"));
          
			if (conf.value) clone.val(conf.value);   // jquery 1.6.2 val(undefined) will clear val()
			
			input.replaceWith(clone);
			input = clone;
		}
		
		input.addClass(css.input);
		
		var fire = input.add(self);
			 
		// construct layout
		if (!root.length) {
			
			// root
			root = $('<div><div><a/><div/><a/></div><div><div/><div/></div></div>')
				.hide().css({position: 'absolute'}).attr("id", css.root);			
						
			// elements
			root.children()
				.eq(0).attr("id", css.head).end() 
				.eq(1).attr("id", css.body).children()
					.eq(0).attr("id", css.days).end()
					.eq(1).attr("id", css.weeks).end().end().end()
				.find("a").eq(0).attr("id", css.prev).end().eq(1).attr("id", css.next);		 				  
			
			// title
			title = root.find("#" + css.head).find("div").attr("id", css.title);
			
			// year & month selectors
			if (conf.selectors) {				
				var monthSelector = $("<select/>").attr("id", css.month),
					 yearSelector = $("<select/>").attr("id", css.year);				
				title.html(monthSelector.add(yearSelector));
			}						
			
			// day titles
			var days = root.find("#" + css.days); 
			
			// days of the week
			for (var d = 0; d < 7; d++) { 
				days.append($("<span/>").text(labels.shortDays[(d + conf.firstDay) % 7]));
			}
			
			$("body").append(root);
		}	
		
				
		// trigger icon
		if (conf.trigger) {
			trigger = $("<a/>").attr("href", "#").addClass(css.trigger).click(function(e)  {
				conf.toggle ? self.toggle() : self.show();
				return e.preventDefault();
			}).insertAfter(input);	
		}
		
		
		// layout elements
		var weeks = root.find("#" + css.weeks);
		yearSelector = root.find("#" + css.year);
		monthSelector = root.find("#" + css.month);
			 
		
//{{{ pick
			 			 
		function select(date, conf, e) {  
			
			// current value
			value 	 = date;
			currYear  = date.getFullYear();
			currMonth = date.getMonth();
			currDay	 = date.getDate();				
			
			
			// beforChange
			e = e || $.Event("api");
			e.type = "beforeChange";
			
			fire.trigger(e, [date]);
			if (e.isDefaultPrevented()) { return; }
			
			// formatting			
			input.val(format(date, conf.format, conf.lang));
			
      // change
			e.type = "change";
			fire.trigger(e);
              
			// store value into input
			input.data("date", date);
			input.trigger("blur"); // hap add 2012/3/13 触发验证
			
			self.hide(e); 
		}
//}}}
		
		
//{{{ onShow

		function onShow(ev) {
			
			ev.type = "onShow";
			fire.trigger(ev);
			
			$(document).bind("keydown.d", function(e) {
					
				if (e.ctrlKey) { return true; }				
				var key = e.keyCode;			 
				
				// backspace clears the value
				if (key == 8) {
					input.val("");
					return self.hide(e);	
				}
				
				// esc or tab key
				if (key == 27 || key == 9) { return self.hide(e); }						
					
				if ($(KEYS).index(key) >= 0) {
					
					if (!opened) { 
						self.show(e); 
						return e.preventDefault();
					} 
					
					var days = $("#" + css.weeks + " a"), 
						 el = $("." + css.focus),
						 index = days.index(el);
					 
					el.removeClass(css.focus);
					
					if (key == 74 || key == 40) { index += 7; }
					else if (key == 75 || key == 38) { index -= 7; }							
					else if (key == 76 || key == 39) { index += 1; }
					else if (key == 72 || key == 37) { index -= 1; }
					
					
					if (index > 41) {
						 self.addMonth();
						 el = $("#" + css.weeks + " a:eq(" + (index-42) + ")");
					} else if (index < 0) {
						 self.addMonth(-1);
						 el = $("#" + css.weeks + " a:eq(" + (index+42) + ")");
					} else {
						 el = days.eq(index);
					}
					
					el.addClass(css.focus);
					return e.preventDefault();
					
				}
			 
				// pageUp / pageDown
				if (key == 34) { return self.addMonth(); }
				if (key == 33) { return self.addMonth(-1); }
				
				// home
				if (key == 36) { return self.today(); }
				
				// enter
				if (key == 13) {
					if (!$(e.target).is("select")) {
						$("." + css.focus).click();
					}
				}
				
				return $([16, 17, 18, 9]).index(key) >= 0;  				
			});
			
			
			// click outside dateinput
			$(document).bind("click.d", function(e) {					
				var el = e.target;
				
				if (!$(el).parents("#" + css.root).length && el != input[0] && (!trigger || el != trigger[0])) {
					self.hide(e);
				}
				
			}); 
		}
//}}}


		$.extend(self, {

      
			/**
			*   @public
			*   Show the calendar
			*/					
			show: function(e) {
				
				if (input.attr("readonly") || input.attr("disabled") || opened) { return; }
				
				// onBeforeShow
				e = e || $.Event();
				e.type = "onBeforeShow";
				fire.trigger(e);
				if (e.isDefaultPrevented()) { return; }
			
				$.each(instances, function() {
					this.hide();	
				});
				
				opened = true;
				
				// month selectors
				monthSelector.unbind("change").change(function() {
					self.setValue(yearSelector.val(), $(this).val());		
				});
				
				// year selectors
				yearSelector.unbind("change").change(function() {
					self.setValue($(this).val(), monthSelector.val());		
				});
				
				// prev / next month
				pm = root.find("#" + css.prev).unbind("click").click(function(e) {
					if (!pm.hasClass(css.disabled)) {	

					  self.addMonth(-1);
					}
					return false;
				});
				
				nm = root.find("#" + css.next).unbind("click").click(function(e) {
					if (!nm.hasClass(css.disabled)) {
						self.addMonth();
					}
					return false;
				});	 
				
				// set date
				self.setValue(value);				 
				
				// show calendar
				var pos = input.offset();

				// iPad position fix
				if (/iPad/i.test(navigator.userAgent)) {
					pos.top -= $(window).scrollTop();
				}
				
				root.css({ 
					top: pos.top + input.outerHeight({margins: true}) + conf.offset[0], 
					left: pos.left + conf.offset[1] 
				});
				
				if (conf.speed) {
					root.show(conf.speed, function() {
						onShow(e);			
					});	
				} else {
					root.show();
					onShow(e);
				}
				
				
				// [fn-2012.09]修复fn-date控件被穿透bug
				var rootDiv = $("#fwb_calroot");
				if(rootDiv.length){
					rootDiv.bgiframe({height:rootDiv.height(), width:rootDiv.width()});
				};
				
				return self;
			}, 

      /**
      *   @public
      *
      *   Set the value of the dateinput
      */
			setValue: function(year, month, day)  {
				
				var date = integer(month) >= -1 ? new Date(integer(year), integer(month), integer(day == undefined || isNaN(day) ? 1 : day)) : 
					year || value;				

				if (date < min) { date = min; }
				else if (date > max) { date = max; }

				// date given as ISO string
				// hap 2012.07.04
				// 这句会导致选年时日期不正确
				//if (typeof year == 'string') { date = parseDate(year); }
				
				year = date.getFullYear();
				month = date.getMonth();
				day = date.getDate(); 
				
				
				// roll year & month
				if (month == -1) {
					month = 11;
					year--;
				} else if (month == 12) {
					month = 0;
					year++;
				} 
				
				if (!opened) { 
					select(date, conf);
					return self; 
				} 				
				
				currMonth = month;
				currYear = year;
				currDay = day;
				
				// variables
				var tmp = new Date(year, month, 1 - conf.firstDay), begin = tmp.getDay(),
					 days = dayAm(year, month),
					 prevDays = dayAm(year, month - 1),
					 week;	 
				
				// selectors
				if (conf.selectors) { 
					
					// month selectors
					monthSelector.empty();
					$.each(labels.months, function(i, m) {					
						if (min < new Date(year, i + 1, 1) && max > new Date(year, i, 0)) {
							monthSelector.append($("<option/>").html(m).attr("value", i));
						}
					});
					
					// year selectors
					yearSelector.empty();		
					var yearNow = now.getFullYear();
					
					for (var i = yearNow + conf.yearRange[0];  i < yearNow + conf.yearRange[1]; i++) {
						if (min < new Date(i + 1, 0, 1) && max > new Date(i, 0, 0)) {
							yearSelector.append($("<option/>").text(i));
						}
					}		
					
					monthSelector.val(month);
					yearSelector.val(year);
					
				// title
				} else {
					title.html(labels.months[month] + " " + year);	
				} 	   
					 
				// populate weeks
				weeks.empty();				
				pm.add(nm).removeClass(css.disabled); 
				
				// !begin === "sunday"
				for (var j = !begin ? -7 : 0, a, num; j < (!begin ? 35 : 42); j++) { 
					
					a = $("<a/>");
					
					if (j % 7 === 0) {
						week = $("<div/>").addClass(css.week);
						weeks.append(week);			
					}					
					
					if (j < begin)  { 
						a.addClass(css.off); 
						num = prevDays - begin + j + 1;
						date = new Date(year, month-1, num);
						
					} else if (j >= begin + days)  {
						a.addClass(css.off);	
						num = j - days - begin + 1;
						date = new Date(year, month+1, num);
						
					} else  { 
						num = j - begin + 1;
						date = new Date(year, month, num);  
						
						// current date
						if (isSameDay(value, date)) {
							a.attr("id", css.current).addClass(css.focus);
							
						// today
						} else if (isSameDay(now, date)) {
							a.attr("id", css.today);
						}	 
					}
					
					// disabled
					if (min && date < min) {
						a.add(pm).addClass(css.disabled);						
					}
					
					if (max && date > max) {
						a.add(nm).addClass(css.disabled);						
					}
					
					a.attr("href", "#" + num).text(num).data("date", date);					
					
					week.append(a);
				}
				
				// date picking					
				weeks.find("a").click(function(e) {
					var el = $(this); 
					if (!el.hasClass(css.disabled)) {  
						$("#" + css.current).removeAttr("id");
						el.attr("id", css.current);	 
						select(el.data("date"), conf, e);
					}
					return false;
				});

				// sunday
				if (css.sunday) {
					weeks.find(css.week).each(function() {
						var beg = conf.firstDay ? 7 - conf.firstDay : 0;
						$(this).children().slice(beg, beg + 1).addClass(css.sunday);		
					});	
				} 
				
				return self;
			}, 
	//}}}
	
			setMin: function(val, fit) {
				min = parseDate(val);
				if (fit && value < min) { self.setValue(min); }
				return self;
			},
		
			setMax: function(val, fit) {
				max = parseDate(val);
				if (fit && value > max) { self.setValue(max); }
				return self;
			}, 
			
			today: function() {
				return self.setValue(now);	
			},
			
			addDay: function(amount) {
				return this.setValue(currYear, currMonth, currDay + (amount || 1));		
			},
			
			addMonth: function(amount) {
			  var targetMonth        = currMonth + (amount || 1),
            daysInTargetMonth  = dayAm(currYear, targetMonth),
            targetDay          = currDay <= daysInTargetMonth ? currDay : daysInTargetMonth;
       
        return this.setValue(currYear, targetMonth, targetDay);
			},
			
			addYear: function(amount) {
				return this.setValue(currYear + (amount || 1), currMonth, currDay);	
			},						
			
			destroy: function() {
				input.add(document).unbind("click.d").unbind("keydown.d");
				root.add(trigger).remove();
				input.removeData("fwb_dateinput").removeClass(css.input);
				if (original)  { input.replaceWith(original); }
			},
			
			hide: function(e) {				 
				
				if (opened) {  
					
					// onHide 
					e = $.Event();
					e.type = "onHide";
					fire.trigger(e);
					
					$(document).unbind("click.d").unbind("keydown.d");
					
					// cancelled ?
					if (e.isDefaultPrevented()) { return; }
					
					// do the hide
					root.hide();
					opened = false;
				}
				
				return self;
			},
			
			toggle: function(){
			  return self.isOpen() ? self.hide() : self.show();
			},
			
			getConf: function() {
				return conf;	
			},
			
			getInput: function() {
				return input;	
			},
			
			getCalendar: function() {
				return root;	
			},
			
			getValue: function(dateFormat) {
				return dateFormat ? format(value, dateFormat, conf.lang) : value;	
			},
			
			isOpen: function() {
				return opened;	
			}
			
		}); 
		
		(function(){
			var name = "change";
			
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, function(){
					conf[name].call(this, self.getValue());
				});	
			}
			
			// API methods				
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		})();
		
		// callbacks	
		$.each(['onBeforeShow','onShow','onHide'], function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods				
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});

		if (!conf.editable) {
			
			// show dateinput & assign keyboard shortcuts
			input.bind("focus.d click.d", self.show).keydown(function(e) {
	
				var key = e.keyCode;
		
				// open dateinput with navigation keyw
				if (!opened &&  $(KEYS).index(key) >= 0) {
					self.show(e);
					return e.preventDefault();
				} 
				
				// allow tab
				return e.shiftKey || e.ctrlKey || e.altKey || key == 9 ? true : e.preventDefault();   
				
			});
		}
		
		// initial value 		
		if (parseDate(input.val())) {
			select(value, conf);
		}
		
	} 
	
	$.expr[':'].date = function(el) {
		var type = el.getAttribute("type");
		return type && type == 'date' || !!$(el).data("fwb_dateinput");
	};
	
	
	$.fn.fwb_dateinput = function(conf) {   
		
		// already instantiated
		if (this.data("fwb_dateinput")) { return this; } 
		
		// configuration
		conf = $.extend(true, {}, tool.conf, conf);		
		
		// CSS prefix
		$.each(conf.css, function(key, val) {
			if (!val && key != 'prefix') { 
				conf.css[key] = (conf.css.prefix || '') + (val || key);
			}
		});		
	
		var els;
		
		this.each(function() {									
			var el = new Dateinput($(this), conf);
			instances.push(el);
			var input = el.getInput().data("fwb_dateinput", el);
			els = els ? els.add(input) : input;	
		});		
	
		return els ? els : this;		
	}; 
	
	
	// the zh localization
	$.fwb_dateinput.localize("",  {
	   months:        '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
	   shortMonths:   '1,2,3,4,5,6,7,8,9,10,11,12',
	   days:          '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
	   shortDays:     '日,一,二,三,四,五,六'
	});
	
	// the zh localization
	$.fwb_dateinput.localize("zh",  {
	   months:        '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
	   shortMonths:   '1,2,3,4,5,6,7,8,9,10,11,12',
	   days:          '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
	   shortDays:     '日,一,二,三,四,五,六'
	});
	
}) (fn.jQuery);


/* 数字和金额插件 */
/// plugins: formatcurrency 2012.01.30

// jquery fwb_formatCurrency plugin... see http://code.google.com/p/jquery-formatcurrency/
(function($) {
	// JavaScript I wrote to limit what types of input are allowed to be keyed into a textbox
	var allowedSpecialCharKeyCodes = [46,8,37,39,35,36,9];
	var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
	var commaKeyCode = [188];
	var decimalKeyCode = [190,110];
	
	
	window.fwb_numbersOnly = function(event) {
		var legalKeyCode =
			(!event.shiftKey && !event.ctrlKey && !event.altKey)
				&&
			($.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
				||
			$.inArray(event.keyCode, numberKeyCodes) >= 0);
	
		if (legalKeyCode === false)
			event.preventDefault();
	};
	
	window.fwb_numbersAndCommasOnly = function(event) {
		var legalKeyCode =
			(!event.shiftKey && !event.ctrlKey && !event.altKey)
				&&
			($.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
				||
			$.inArray(event.keyCode, numberKeyCodes) >= 0
				||
			$.inArray(event.keyCode, commaKeyCode) >= 0);
	
		if (legalKeyCode === false)
			event.preventDefault();
	};
	
	window.fwb_decimalsOnly = function(event) {
		var legalKeyCode =
			(!event.shiftKey && !event.ctrlKey && !event.altKey)
				&&
			($.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
				||
			$.inArray(event.keyCode, numberKeyCodes) >= 0
				||
			$.inArray(event.keyCode, commaKeyCode) >= 0
				||
			$.inArray(event.keyCode, decimalKeyCode) >= 0);
	
		if (legalKeyCode === false)
			event.preventDefault();
	};
	
	window.fwb_currenciesOnly = function(event) {
		var legalKeyCode =
			(!event.shiftKey && !event.ctrlKey && !event.altKey)
				&&
			($.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
				||
			$.inArray(event.keyCode, numberKeyCodes) >= 0
				||
			$.inArray(event.keyCode, commaKeyCode) >= 0
				||
			$.inArray(event.keyCode, decimalKeyCode) >= 0);
	
		// Allow for $
		if (!legalKeyCode && event.shiftKey && event.keyCode == 52)
			legalKeyCode = true;
	
		if (legalKeyCode === false)
			event.preventDefault();
	};
	
	$.fwb_formatCurrency = {};
	$.fwb_formatCurrency.regions = [];
	$.fwb_formatCurrency.regions[""] = {
		symbol: "￥",
		format: "%s%n",
		negativeFormat: "(%s%n)",
		decimalSymbol: ".",
		separator: ",",
		noSeparator: false
	};
	$.fn.fwb_formatCurrency = function(destination, settings) {
		if (arguments.length == 1 && typeof destination !== "string") {
			settings = destination;
			destination = false;
		}
		var defaults = {
			name: "fwb_formatCurrency",
			colorize: false,
			region: "",
			global: true,
			scale: 2,
			defaultValue: 0,
			eventOnDecimalsEntered: false
		};
		defaults = $.extend(defaults, $.fwb_formatCurrency.regions[""]);
		settings = $.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		return this.each(function() {
			$this = $(this);
			var num = "0";
			num = $this[$this.is("input, select, textarea") ? "val": "html"]();
			if (num.search("\\(") >= 0) {
				num = "-" + num;
			}
			if (num === ""){
				num = settings.defaultValue;
			}else if(num === "-" && settings.scale === -1) {
				return;
			}
			if (isNaN(num)) {
				num = num.replace(settings.regex, "");
				if (num === "" || (num === "-" && settings.scale === -1)) {
					return;
				}
				if (settings.decimalSymbol != ".") {
					num = num.replace(settings.decimalSymbol, ".");
				}
				if (isNaN(num)) {
					num = "0";
				}
			};
			var numParts = String(num).split(".");
			var isPositive = (num == Math.abs(num));
			var hasDecimals = (numParts.length > 1);
			var decimals = (hasDecimals ? numParts[1].toString() : "0");

			var originalDecimals = decimals;
			num = Math.abs(numParts[0]);
			num = isNaN(num) ? 0: num;
			if (settings.scale >= 0) {
				decimals = parseFloat("1." + decimals);
				decimals = decimals.toFixed(settings.scale);
				if (decimals.substring(0, 1) == "2") {
					num = Number(num) + 1;
				}
				decimals = decimals.substring(2);
			}
			num = String(num);
			if (!settings.noSeparator) {
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3);
				 i++) {
					num = num.substring(0, num.length - (4 * i + 3)) + settings.separator + num.substring(num.length - (4 * i + 3));
				}
			}
			if ((hasDecimals && settings.scale == -1) || settings.scale > 0) {
				num += settings.decimalSymbol + decimals;
			}
			var format = isPositive ? settings.format: settings.negativeFormat;
			var money = format.replace(/%s/g, settings.symbol);
			money = money.replace(/%n/g, num);
			var $destination = $([]);
			if (!destination) {
				$destination = $this;
			} else {
				$destination = $(destination);
			}
			$destination[$destination.is("input, select, textarea") ? "val": "html"](money);
			if (hasDecimals && settings.eventOnDecimalsEntered && originalDecimals.length > settings.scale) {
				$destination.trigger("decimalsEntered", originalDecimals);
			}
			if (settings.colorize) {
				$destination.css("color", isPositive ? "black": "red");
			}
		})
	};
	$.fn.fwb_toNumber = function(settings) {
		var defaults = $.extend({
			name: "fwb_toNumber",
			region: "",
			global: true,
			scale: -1 // -1为不限制位数
		},
		$.fwb_formatCurrency.regions[""]);
		settings = $.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		return this.each(function() {
			var method = $(this).is("input, select, textarea") ? "val": "html";
			var val = $(this)[method]().replace("(", "(-").replace(settings.regex, "");
			if(val != "" && !isNaN(val)){
				if(settings.scale > 0){ 
					val = parseFloat(val).toFixed(settings.scale);
				}else if(settings.scale == 0){
					val = parseInt(val);
				}else{
					val = parseFloat(val);	
				}
			};
			$(this)[method](val);
		})
	};
	$.fn.fwb_asNumber = function(settings) {
		var defaults = $.extend({
			name: "fwb_asNumber",
			region: "",
			parse: true,
			parseType: "Float",
			global: true
		},
		$.fwb_formatCurrency.regions[""]);
		settings = $.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		settings.parseType = validateParseType(settings.parseType);
		var method = $(this).is("input, select, textarea") ? "val": "html";
		var num = $(this)[method]();
		num = num ? num: "";
		num = num.replace("(", "(-");
		num = num.replace(settings.regex, "");
		if (!settings.parse) {
			return num;
		}
		if (num.length == 0) {
			num = "0";
		}
		if (settings.decimalSymbol != ".") {
			num = num.replace(settings.decimalSymbol, ".");
		}
		return window["parse" + settings.parseType](num);
	};
	function getRegionOrCulture(region) {
		var regionInfo = $.fwb_formatCurrency.regions[region];
		if (regionInfo) {
			return regionInfo;
		} else {
			if (/(\w+)-(\w+)/g.test(region)) {
				var culture = region.replace(/(\w+)-(\w+)/g, "$1");
				return $.fwb_formatCurrency.regions[culture];
			}
		}
		return null;
	}
	function validateParseType(parseType) {
		switch (parseType.toLowerCase()) {
		case "int":
			return "Int";
		case "float":
			return "Float";
		default:
			throw "invalid parseType"
		}
	}
	function generateRegex(settings) {
		if (settings.symbol === "") {
			return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
		} else {
			var symbol = settings.symbol.replace("$", "\\$").replace(".", "\\.");
			return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
		}
	}
})(fn.jQuery);


//=====================================================================
/// p2 - 用于widget的fn扩展
//=====================================================================

(function($){
	if(window["fn.widget.js"]) return;
	window["fn.widget.js"] = "done";
	
	//----------------------------
	// 扩展fn
	//----------------------------
	
	// 把 aa=1&bb=2 格式的字符串转换成 [{ aa: "1", bb: "2" }] 格式的对象的数组
	fn.urlStrToObjAry = function(str, val, text){
		var ary = [], ar1 = (str || "").split("&");
		for(var i = 0; i < ar1.length; i++){
			var ar2 = ar1[i].split("=");
			if(ar2.length == 2){
				var obj = {};
				if(val) obj[val] = ar2[0];
				if(text && text != val) obj[text] = ar2[1];
				obj["_TEXT"] = ar2[1];
				ary.push(obj);
			};
		};
		return ary;
	};
	
	fn.getAttrFuncSet = function(el, funcNames){
		var funcSet = {};
		for(var i = 0; i < funcNames.length; i++){
			var func = fn.tagFunc(el.attr(funcNames[i]));
			if(func) funcSet[funcNames[i]] = func;
		};
		return funcSet;
	};
	
	
	
	// 数据适配
	fn.treeDataAdapter = function(json, valueField, textField, childrenField, level, callback){
		var njson = [];
		
		// 给数据增加一个_level属性， 默认从0开始
		level = level || 0;
		
		$.each(json, function(i, n){
			var data = $.extend({}, n);
			n["id"] = n[valueField] || n["id"]  || "";
			if(callback) callback(n, level);
			n["text"] = n[textField] || n["text"]  || "";
			n["children"] = n[childrenField] ? fn.treeDataAdapter(n[childrenField], valueField, textField, childrenField, level + 1, callback) : [];
			n["nodeLevel"] = level;
			n["data"] = data.data || data; // hap 2012/3/19
			njson.push(n);
		});
		
		return njson;
	}; // 
	
	// 数据适配
	fn.treeToAry = function(json, childrenField){
		
		if(!json || !$.isArray(json) || !json.length) return [];
		
		var njson = [];
		
		$.each(json, function(i, n){
			njson.push(n);
			var c = fn.treeToAry(n[childrenField] || [], childrenField); 
			if(c.length) $.merge(njson, c);
		});
		
		return njson;
	}; // 
	
	
	// 绑定fwb函数
	fn.fwbMethods = function(ins, type, methods){
		methods = methods || type;
		
		for(var i = 0; i < methods.length; i++){
			
			var sp = methods[i].split(":");
			var name = $.trim(sp[0]);
			var realName = sp.length > 1 ? $.trim(sp[1]) : name;
			
			ins.methods[name] = (function(realName){
				return function(){
					var args = [realName];
					$.merge(args, arguments);
					
					var ret = ins.element[ins.plugin].apply(ins.element, args);
					
					// 根据参数返回执行结果或者ins本身
					return ret === ins.element ? ins : ret;
				};
			})(name);
		}; // end for
	}; // end fwbMethods()
	
	
	// 绑定fwb函数2， 适用jquery.tools插件
	fn.fwbToolsMethods = function(ins, type, methods){
		
		for(var i = 0; i < methods.length; i++){
			
			var sp = methods[i].split(":");
			var name = $.trim(sp[0]);
			var realName = sp.length > 1 ? $.trim(sp[1]) : name;
			
			ins.methods[name] = (function(ins, realName){
				return function(){
					var api = ins.element.data(ins.plugin);
					// 根据参数返回执行结果或者ins本身
					if(type == "get"){
						return api[realName].apply(ins.element, arguments);
					}else{
						api[realName].apply(ins.element, arguments);
						return ins;
					};
				};
			})(ins, realName);
		}; // end for
	}; // end fwbToolsMethods()
	
	//
	fn.fwb = function(ins, callback){
		for(var i = 0; i < fn.fwb._list.length; i++){
			var n = fn.fwb._list[i];
			if(n.element.get(0) == ins.element.get(0)){
				ins = n;
				return ins;
			};
		};
		fn.fwb._list.push(ins);
		if($.isFunction(callback)) callback(ins);
		return ins;
	}; // end fwb
	fn.fwb._list = [];
	
	
	//----------------------------
	// 扩展fn结束
	//----------------------------
})(fn.jQuery);
	

//=====================================================================
/// p3 - 各种基类
//=====================================================================

(function($){
	
	//----------------------------
	// ajax控件
	// URL、显示字段、值字段、post数据、insert数据、append数据、jsonHandler
	// 需要的基类：无
	// 需要的方法：ins.loadData
	// 提供的方法：ins.reload
	//----------------------------
	/// base - ajaxBase
	fn.ajaxBase = {
		
		// 初始化
		_ajaxInit: function(){
			var ins = this,
				el = ins.element,
				attr = ins.opts;
			
			// 读取属性
			ins.opts = $.extend({
				val: el.attr("value") || "",
				data: fn.string.str2var(el.attr("data")),
				valueSplitChar: el.attr("separator") || el.attr("separator") || el.attr("valueSplitChar") || ",", 
				textField: el.attr("textField") || "_txt",
				valueField: el.attr("valueField") || "_val",
				postData: fn.urlStrToObj(el.attr("postData") || ""),
				insertData: el.attr("insertData") || "",
				appendData: el.attr("appendData") || "",
				jsonHandler: fn.tagFunc(el.attr("jsonHandler")),
				cache: el.attr("cache") != "false",
				sort: el.attr("sort") || "",
				order: el.attr("order") || "",
				autoLoad: el.attr("autoLoad") != "false",
				async: el.attr("async") != "false"
			}, ins.opts);
			
			// url 作为独立属性
			$.extend(ins, {
				url: el.attr("url") || "",
				onFirstLoad: fn.tagFunc(el.attr("onFirstLoad")) || fn.tagFunc(el.attr("onNextLoad"))
			});
			
			// 本地数据
			(function(data){
				// 
				if(typeof data == "string"){
					// 从"1=a&2=b"格式获取
					if(data.indexOf("=") > -1){
						data = fn.string.url2ary(data, ins.opts.valueField, ins.opts.textField);
					};
				};
				// 存储
				ins.opts.data = data = fn.isArray(data) ? data : [];
			})(ins.opts.data);
			
			// 读取要追加数据
			ins.opts.insertData = fn.urlStrToObjAry(ins.opts.insertData, ins.opts.valueField, ins.opts.textField);
			ins.opts.appendData = fn.urlStrToObjAry(ins.opts.appendData, ins.opts.valueField, ins.opts.textField);
			
			// 向本地data追加数据
			if(ins.opts.data) {
				ins.opts.data = fn.merge([], ins.opts.insertData, ins.opts.data, ins.opts.appendData);
			};
			
			ins._data = ins.opts.data;
		}, // end _ajaxInit
			
		// 发送ajax请求， 并对返回值进行处理，然后回调
		// ins.opt{ postData, insertData, appendData, jsonHandler}
		_post: function(/*string*/ url, /*object*/ param, callback, noInsertData){
			
			var ins = this, id, postData = {};
			
			if(ins.opts.sort) postData.sort = ins.opts.sort;
			if(ins.opts.order) postData.order = ins.opts.order;
			
			for(var n in param){
				if(param[n]) postData[n] = param[n];
			};
			
			id = url + "&" + $.param(postData || {});
			
			// 尝试读取缓存
			if(id && ins.opts.cache){
				
				ins._lastRequestTime = new Date();
				
				var cache = fn.ajaxBase.cache[id];
				if(cache){
					ins._success(cache, noInsertData, callback);
					return;
				}else if(fn.ajaxBase.requestHistory[id]){
					// hap add 2012/4/25 ， 改良缓存机制， 将缓存的时机从接收到响应时提前到发出请求时
					var waitCache = function(){
						setTimeout((function(ins, id, cache, noInsertData, callback, url, postData){
							return function(){
								if(fn.ajaxBase.cache[id]){
									ins._success(fn.ajaxBase.cache[id], noInsertData, callback);
								}else{
									// 超时时间10秒
									if(!ins._lastRequestTime){
										waitCache();
									}else{
										var last = ins._lastRequestTime.getTime();
										var now = (new Date()).getTime();
										if(now - last > 10*1000 || fn.ajaxBase.requestHistory[id] == "error"){
											error("服务器端报错或者返回的数据格式不正确", url, ins, postData);
										}else if(fn.ajaxBase.requestHistory[id] == "sending"){
											waitCache();
										};
									};
								};
							};
						})(ins, id, cache, noInsertData, callback, url, postData),10);
					};
					waitCache();
					return;
				}else{
					fn.ajaxBase.requestHistory[id] = "sending";
				}; // end if
			};
			
			// 获取数据
			if(url){
				$.ajax({
					//url: url,
					url: fn.isLocal ? (function(url){
							if(url.indexOf("?") == -1){ url += "?"; };
							if(url.charAt(url.length - 1) != "&"){ url += "&"; };
							url += fn.param(postData);
							return url;
						})(url) : url, // DO 
					data: decodeURIComponent(fn.param(postData)),
					dataType: "text",
					cache: false,
					async: ins.opts.async,
					//type: "post", 
					type: fn.isLocal ? "get" : "post",// DO
					success: (function(noInsertData, ins){
						return function(ret){
							
							function err(msg){
								error(msg, url, ins, postData);
							};
							
							try{
								window.___temp = "";
								eval("window.___temp = " + ret);
								if(window.___temp){
									ret = window.___temp;
								}else{
									return err(ret);
								};
							}catch(e){
								return err(ret);
							};
							
							// 原始json， ins.getJson()方法使用
							ins._json = ret;
							
							// hap 2011.12.1 添加，异常处理
							if(!ret) return error("服务器没有返回数据", url, ins, postData);
							
							if(ret.rows != undefined){
								
							}else{
								if(ret.success == false) return error((ret.msg + (ret.exception ? ("<br/>" + ret.exception) : "")) || "未知错误", url, ins, postData);
								
								if(ret.data != undefined){
									ret = ret.data;
								};
							};
							
							fn.ajaxBase.cache[id] = ret; // 记录缓存
							ins._success(ret, noInsertData, callback);
						}
					})(noInsertData, ins),
					// hap 2011.12.1 添加，异常处理
					error: (function(ins,id){
						return function(){
							fn.ajaxBase.requestHistory[id] = "error";
							error("服务器端报错或者返回的数据格式不正确", this.url, ins, postData);
						}
					})(ins,id)
				}); // end ajax
			}else{
				ins._success([], noInsertData, callback);
			}; // end if
			
			function error(msg, url, ins, postData){
				if(fn.ignoreError) return;
				
				var _linkStyle = (!window.ActiveXObject || document.documentMode ?'white-space:nowrap' : ''); // IE89,FF,Chrome 下强制url不换行，并且设置宽度为auto
				
				// 把post值存到hidden中
				var _hiddens = [];
				for(var n in postData){
					_hiddens.push('<input type="hidden" name="' + n + '" value="' + postData[n] + '">');
				};
				
				var _onclick = ' onclick="$(this).parent().parent().submit(); return false;" ';
				postData = $.param(postData);
				
				var el = ins.element,
					elName = el.attr("id") || el.attr("name") || el.attr("class");
					
				if(elName = el.attr("id")){
					elName = 'id为"' + elName + '"';
				}else if(elName = el.attr("name")){
					elName = 'name为"' + elName + '"';
				}else if(elName = el.attr("class")){
					elName = 'class为"' + elName + '"';
				}; 
				
				var _html = 
					'<form id="msg_form_386" method="post" style="margin:0" action="' + url + '" target="_blank">' + _hiddens.join(" ") + 
					'  <style>#msg_form_386 p{ margin: 5px 0 1px 0;}</style>'+
					(msg ? '<p>错误提示： <span style="color: red;">' + msg + '</span></p>' : "") +
					(postData ? '  <p>post 数据： ' + postData + '</p>' : "") +
					'  <p>报错页面： ' + url + 
					'     <a href="'+url+'" ' + _onclick + ' target="_blank" style="'+ _linkStyle +';">点击查看</a>'+
					'  </p>' +
					
					'</form>';
				
				$msg(_html, {
					time:0, 
					position: "right bottom",
					title: elName + "的控件发生错误", 
					width: 400,  // IE89,FF,Chrome 下强制url不换行，并且设置宽度为auto
					type:"msg"
				});
			};
			
		}, // end _post
		
		_success: function(ret, noInsertData, callback){
			var ins = this;
			
			// 前后追加数据
			if(!noInsertData && $.isArray(ret)){
				ret = fn.merge([], ins.opts.insertData, ret, ins.opts.appendData);
			};
			
			if($.isFunction(callback)) callback(ret);
		},
		
		getJson: function(){
			var ins = this;
			return ins._json;
		},
		
		
		
		load: function(json){
			
			var ins = this;
			
			json = json || ins._data;
			
			if(typeof json == "string"){
				return ins.reload.apply(ins, arguments);
			};
			
			// 处理json
			if($.isFunction(ins.opts.jsonHandler))
				json = ins.opts.jsonHandler.call(ins, json);
			
			if($.isFunction(ins.beforeReload)){
				ins.beforeReload(json);
			};
			
			ins._data = json;
			ins.loadData(json);
			
			if($.isFunction(ins.afterReload)){
				ins.afterReload(json);
			};
			
			// hap 2011.12.1 新增
			if($.isFunction(ins.onFirstLoad)){
				ins.onFirstLoad.call(ins);
				ins.onFirstLoad = null;
			};
			
			// 触发联动
			// hap 2012/3/1
			if(ins.opts.onLinkage) ins.opts.onLinkage.apply(ins);
			
			// hap 2011.12.1 新增
			if($.isFunction(ins.onNextLoad)){
				ins.onNextLoad.call(ins);
				ins.onNextLoad = null;
			};
		},
		
		// 重新加载数据
		reload: function(url, postData, keep, callback){
			var ins = this;
			url = url || ins.url;
			
			if(url){
				// 加载远程数据
				postData = fn.paramExtend($.extend({}, ins.opts.postData), postData);
				if(keep) ins.opts.postData = postData;
				
				ins._post(url, postData, _load);
			}else if(ins._data){
				// 加载本地数据
				_load(ins._data);
			};
			
			function _load(json){
				ins.load(json);
				callback && callback(json);
			};
			
			return ins;
		}, // reload
		
		onFirstLoad: null
		// 最后更新
		
	}; // end fn.ajaxBase
	fn.ajaxBase.cache = {};
	fn.ajaxBase.requestHistory = {};
	
	//----------------------------
	// 下拉控件： 
	// 自动选择、自动请求、自动匹配字段、自动请求过滤规则
	// 需要的基类：fn.ajaxBase
	// 需要的方法：ins{clear, loadData, setText, [beforeReload]}
	// 提供的方法：
	//----------------------------
	/// base - comboBase
	fn.comboBase = {
		
		// 初始化
		_comboInit: function(){
			var ins = this,
				el = ins.element,
				attr;
			
			// 读取属性
			attr = ins.opts = $.extend({
				autoSelect: el.attr("autoSelect") != "false", // 自动选中，默认为true
				autoRequest: el.attr("autoRequest") == "true",
				autoRequestTime: parseInt(el.attr("autoRequestTime") || 600),
				autoRequestField: el.attr("autoRequestField") || el.attr("textField") || "",
				matchFields: el.attr("matchFields") || "",
				emptyValue: "", // 暂不允许使用此参数
				autoRequestFliterReg: el.attr("autoRequestFliterReg") || /\([^)]*\)/g
			}, ins.opts);
			
			// autoRequest为true时，editable自动为ture
			if(ins.opts.autoRequest == true){
				ins.opts.editable = true;
			};
			
			// 匹配字段
			if(!attr.matchFields){
				attr.matchFields = [attr.textField];
			}else{
				attr.matchFields = attr.matchFields.split(",");
			};
			
			// 自动请求
			ins.opts.onInputChange = !attr.autoRequest ? null : (function(ins){
				
				return function(text){
					
					ins.textbox().parent().find(".fwb_combo-arrow").one("click", (function(ins){
						return function(){
							var vals = ins.getValues();
							ins.reload().setValues(vals);
							ins.showPanel();
						};
					})(ins));
					
					var attr = ins.opts;
					var postText = text.replace(attr.autoRequestFliterReg, "");
					
					// 如果输入文本未变， 无操作
					if(text == ins.textbox().data("settext")){
						return;
					};
			
					var postData = $.extend({}, ins.opts.postData);
					postData[attr.autoRequestField] = postText;
					
					ins._autoRequesting = true;
					
					ins._post(ins.url, postData, function(ret){

						if(!$.isArray(ret)) return;
						
						// 前后追加数据
						//ret = fn.merge(attr.insertData, ret, attr.appendData);
						
						// 处理json
						if($.isFunction(attr.jsonHandler))
							ret = attr.jsonHandler.call(ins, ret, true);
						
						if($.isFunction(ins.beforeReload)){
							ins.beforeReload(ret);
						};
						
						ins._data = ret;
						// 加载数据，清空选中值，显示下拉框，选中匹配的值
						if(ins.clear) ins.clear();
						ins.loadData(ret).setText(text);
						
						// 打开或关闭
						ins[ret.length && text ? "showPanel" : "showPanel"]();
						
						
						// 触发联动
						// hap 2012/3/1
						if(ins.opts.onLinkage) ins.opts.onLinkage.apply(ins);
						
						ins._autoRequesting = false;
						
						// 选中第一个完全匹配的节点
						// 遍历所有节点的匹配属性， 如果属性值不为空且与postText相同的话
						if(postText) (function(){
							
							//return ins._checkInput(true);
							//if(ins.opts.multiple) return;
							
							var vals = [];
							
							ret = fn.treeToAry(ret, ins.opts.childrenField);
							for(var i = 0; i < ret.length; i++){
								var m = ret[i];
								for(var j = 0; j < attr.matchFields.length; j++){
									var n = attr.matchFields[j];
									if(m[n] == postText && m[attr.valueField]){
										if(ins.opts.multiple){
											vals.push(m[attr.valueField]);
										}else{
											ins.select(m[attr.valueField]);
											return;
										};
									}; // end if
								}; // end for
							}; // end for
							
							if(vals.length){
								ins.setValues(vals);
								return;
							};
							
							if(ins.opts.freeInput){
								ins.textbox().parent().find(":hidden").val(postText);
							}else{
								ins.textbox().parent().find(":hidden").val("");
							};
						})();
					}, 'noInsertData'); // end ins._post()
				}; // end return function(text){}
			})(ins); // end ins.opts.onInputChange
		}, // end _comboInit
		
		// 重置
		reset: function(){
			var ins = this,
				el = ins.element;
			
			setTimeout(function(){
				ins.reload();
				ins.select(ins.opts.val);
			}, 1);
		}
		
	}; //end fn.comboBase
	
	//----------------------------
	// 联动控件
	// 联动目标、post参数
	// 需要的基类：fn.ajaxBase
	// 需要的方法：ins.onSelect
	// 被关联对象需要的方法：ins.reload
	// 提供的方法： 无
	//----------------------------
	/// base - linkageBase
	fn.linkageBase = {
		
		_linkageInit: function(){
			var ins = this,
				el = ins.element;
			//
			
			// 读取属性
			ins.opts = $.extend({
				linkage: el.attr("linkage") || "",
				bylinkage: el.attr("bylinkage") == "true",
				linkField: el.attr("linkField") || ins.opts.valueField || "",
				linkParam: el.attr("linkParam") || el.attr("linkField") || ins.opts.valueField || "", //2012.01.03新增属性
				linkEvent: ins.opts.linkEvent || el.attr("linkEvent") || "onSelect",
				linkQuiet: el.attr("linkQuiet") == "true" // 如果linkQuiet为true， 则不主动触发被联动控件的刷新
				
			}, ins.opts);
			
			ins.onLinkage = fn.tagFunc(el.attr("onLinkage")) || function($linkage, lkPostData){
				if($linkage.reload && !ins.opts.linkQuiet) $linkage.reload(null, null);
			};
			
			//ins.onLinkage 
			// 处理关联下拉框（联动）
			if(ins.opts.linkage && $(ins.opts.linkage).length && ins.opts.linkField){
				
				ins.opts.onLinkage = (function(){
					return function(){
						var ins = this;
						var args = arguments;
						$(ins.opts.linkage).each(function(i, elem){
							
							var $linkage = fn.widget.get(elem);
							
							if($linkage){
								var lkPostData = ins._getLinkData.apply(ins, args);
								$.extend($linkage.opts.postData, lkPostData);
								ins.onLinkage.call(ins, $linkage, lkPostData);
							};
							
						});
					}
				}).apply(ins);
				var temp = ins.opts[ins.opts.linkEvent];
				
				// 同时触发联动事件和用户指定的事件
				ins.opts[ins.opts.linkEvent] = (function(temp){
					return function(){
						if($.isFunction(temp)){
							temp.apply(ins, arguments);
						};
						ins.opts.onLinkage.apply(ins, arguments);
					};
				})(temp);
			};
		},
		
		// 
		_getLinkData: function(v){
			// 必须重写
		}
	}; // end fn.linkageBase
	
	//----------------------------
	// 树控件
	// 需要的基类：fn.ajaxBase
	// 需要的方法：无
	// 提供的方法：ins.beforeReload
	//----------------------------
	/// base - treeBase
	fn.treeBase = {
		
		_treeInit: function(){
			var ins = this,
				el = ins.element;
			//
			
			// 读取属性
			ins.opts = $.extend({
				childrenField: el.attr("childrenField") || "children",
				rootIsAll: el.attr("rootIsAll") == "true", 
				rejectNodeFn: fn.tagFunc(el.attr("rejectNodeFn")) || function(n, l){ }
			}, ins.opts);
			
		},
		
		beforeReload: function(json){
			var ins = this;
			
			var ids = [],
				isAll = json.length == 1;
			//
			json = fn.treeDataAdapter(json, ins.opts.valueField, ins.opts.textField, ins.opts.childrenField, 0, isAll && ins.opts.rootIsAll ? function(n, l){
				// 节点不被排除， 且id不为空
				if(!ins.opts.rejectNodeFn(n, l) && $.trim(n[ins.opts.valueField])) ids.push(n[ins.opts.valueField]);
			} : null);
			
			// 如果下拉框是多选的或者all的值是空，不处理rootIsAll
			if(isAll && ins.opts.rootIsAll && ids.length){
				if(ins.opts.multiple){
					//json[0].id = "";
				}else{
					var allVals = ids.join(ins.opts.valueSplitChar || ",");
					if(allVals){
						json[0].id = allVals;
					};
				}
			}
		}
	}; // end fn.treeBase
	
	
	//----------------------------
	// 验证
	// 需要的基类：
	// 需要的方法：无
	// 提供的方法：
	//----------------------------
	/// base - validBase
	fn.validBase = {
		
		_validInit: function(opt){
			var ins = this,
				opt = opt || {};
				
			$.extend(ins.opts, {
				required: false, // 去除easyui自带的验证功能
				validType: null // 去除easyui自带的验证功能	
			});
		}, // end 
		
		copyAttrs: function(src, des){
			var attrs = ["required","min","max","groupreq"];
			$.each(attrs, function(i,n){
				var attr = src.attr(n);
				if(attr){
					src.removeAttr(n);
					$(des).attr(n, attr);	
				}
			});
		}
	}; // end fn.treeBase
	
	
	
	//----------------------------
	// 自动设置尺寸
	// 需要的基类：
	// 需要的方法：无
	// 提供的方法：
	//----------------------------
	/// base - resizeBase
	fn.resizeBase = {
		
		_resizeInit: function(opts){
			var ins = this;
			$.extend(ins.opts, fn.tagAttrs(ins.element, "width,height"), opts);
			// 尺寸参数
			ins.opts.width = ins.width = ins.opts.width || fn.dom.style(ins.element, "width") || "auto";
			ins.opts.height = ins.height = ins.opts.height || fn.dom.style(ins.element, "height") || "auto";
		},
		
		// 自动设置表格大小
		autoResize: function(){
			var ins = this;
			
			// 在autoResize之后的100毫秒内禁止再autoResize
			// 避免因为bug引起不断调整大小
			var now = new Date().getTime();
			if(ins._last_autoResize && (now - ins._last_autoResize < 100)){
				return;
			};
			
			// 绑定
			if(!ins.autoResizeBind){
				ins.autoResizeBind = true;
				ins.autoResize.waiting = 0;
				
				ins.panel = ins.getPanel();
				ins.parent = ins.panel ? ins.panel.parent().parent() : null;
				$(window).resize((function(ins){
					return function(){
						ins.autoResize();
					};
				})(ins));
			};
			
			if(!ins.parent || !ins.parent.length){
				return ins;
			};
			
			// 延时触发
			ins.autoResize.waiting++;
			setTimeout((function(ins){
				return function(){
					ins.autoResize.waiting--;
					if(ins.autoResize.waiting === 0){
						doResize(ins);
					};
					
					// 在autoResize之后的100毫秒内禁止再autoResize
					// 避免因为bug引起不断调整大小
					ins._last_autoResize = new Date().getTime();
				};
			})(ins), 200);
			
			function doResize(ins){
				var size = {},
					opts = ins.opts,
					
					// 取得父对象宽度
					maxWidth = fn.dom.insideWidth(ins.parent),
					
					// 取得父对象高度
					maxHeight = (function(){
						ins.panel.parent().hide(); // 必须先把表格隐藏， 才能测得父对象的实际高度； 如果该高度为0则视为auto， 取窗口高度；
						var h = fn.dom.px2number(ins.parent.css("height")) || "auto";
						ins.panel.parent().show();
						if(!isNaN(h)){
							return fn.dom.insideHeight(ins.parent);
						}else{
							return fn.dom.clientHeight() - 10;
						};
					})();
				
				// 自动宽度
				var w = fn.dom.px2number(ins.width);
				if(!isNaN(w)){
					size.width = parseFloat(w);
				}else if(w === "" || w === "auto" || w === "100%"){
					size.width = maxWidth;
				}else if(w && w.indexOf && w.indexOf("%")){
					size.width = maxWidth * (parseFloat(w.replace("%"))/100);
				};
				
				
				// 自动宽度
				var h = fn.dom.px2number(ins.height);
				if(!isNaN(h)){
					size.height = parseFloat(h);
					
				}else if(h === "fill"){
					var tbTop = ins.parent.offset().top;
					var h = fn.dom.clientHeight() - tbTop;
					if(h < 200) h = 200;
					ins.parent.height(h - 10);
					size.height = fn.dom.insideHeight(ins.parent);
					
				}else if(h === "" || h === "auto"){
					size.height = ins.opts.height;
					
				}else if(h && h.indexOf && h.indexOf("%")){
					size.height = maxHeight * (parseFloat(h.replace("%"))/100);
				};
				
				// 设置
				if(size.width != undefined || size.height != undefined){
					ins.resize(size);
				};
			}; // end doResize
			
			return ins;
		}
	}; // end fn.treeBase
	
	
})(fn.jQuery);
	

//=====================================================================
/// p4 - fn.widget控件
//=====================================================================

(function($){
	
	/// 注册控件
	fn.widget.reg = function(plugins){
		if(fn.isArray(plugins)){
			$.each(plugins, function(i,n){
				 _reg(n);
			});
		}else{
			 _reg(plugins);
		};
		function _reg(plugin){
			fn.widget.plugins.push(plugin);
			window["$" + plugin] = fn.widget[plugin];
		};
	};
	fn.widget.plugins = [];
	
	/// 在不知道对象是何种类型的组件的情况下， 获取它的ins
	window.$get = fn.widget.get = function(elem){
		elem = $(elem);
		for(var n in fn.widget){
			if(n == "get") continue;
			// 根据class来找
			if(elem.hasClass("fn-" + n)){
				return fn.widget[n](elem);
			}
		}
	};
	
	//----------------------------
	// 组件 - 下拉框
	// 继承: fn.ajaxBase, fn.comboBase, fn.linkageBase
	//----------------------------
	/// widget.combobox
	fn.widget.combobox = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_combobox",
				element: el,
				opts: opt || {},
				methods: {}
			};
		//
		;return fn.fwb(ins, function(ins){
			
			// 包装方法
			fn.fwbMethods(ins, ["resize", "showPanel", "hidePanel", "disable", "enable", "clear", "setText", "setValue", "setValues", "loadData", "select", "unselect","options", "panel", "textbox","getText", "getValues", "getValue", "getData"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.comboBase,
				fn.linkageBase,
				fn.validBase,
				fn.widget.combobox.methods
			);
			
			ins.init();
			
			// 调用基类方法
			ins._ajaxInit();
			ins._comboInit();
			ins._linkageInit();
			//ins._validInit();
			
			// hap add 2012/10/24
			// 延迟加载初始化
			if(ins.opts.lazyLoad){
				ins.element.addClass("fn-combo-lazyLoad");
				// 显示值
				if(ins.opts.lazyText){
					var offset = ins.element.offset();
					ins.lazyTextDiv = $('<input type="text" class="fn-combo-lazyLoad-text" \>').val(ins.opts.lazyText).insertAfter(ins.element).css({
						position: "absolute",
						left: offset.left + 1,
						top: offset.top + 1,
						width: ins.element.width() - 23
					});
				};
				
				function init2(){
					if(ins.lazyTextDiv){
						ins.lazyTextDiv.remove();
					};
					ins.init2();
					setTimeout(function(){
						ins.showPanel();
					},10);
				};
				if(ins.lazyTextDiv){
					ins.lazyTextDiv.one("click", init2);
				};
				ins.element.one("click", init2);
			}else{
				ins.init2();
			};
		});
	}; // end fn.widget.combobox
	
	
	// combobox方法
	fn.widget.combobox.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
			
			//
			$.extend(ins.opts, {
				checkbox: ((el.attr("multiple") || "").toString() == "true") || 
							((el.attr("checkbox") || "").toString() == "true"),
				width: el.attr("inputWidth") || el.width() || 173,
				editable: el.attr("editable") != "false"
			}, fn.tagAttrs(ins.element, "formatter,onSelect,onChange,onLoadSuccess,onUnselect,onShowPanel,freeInput,lazyLoad,lazyText"), ins.opts);
			
			ins.opts.multiple = ins.opts.checkbox;
		},
		
		// 初始化，第二阶段
		init2: function(){
			
			var ins = this,
				el = ins.element;
			
			// 允许多选又允许自由输入， 在点选时强制把无效的值清空
			if(ins.opts.editable && ins.opts.multiple && ins.opts.freeInput){
				ins.opts._onItemClick = (function(ins){
					return function(){
						var data = ins.getData(),
							text = ins.textbox().val(),
							formatter = ins.opts.formatter || function(row){ return row[ins.opts.textField];};
						
						// 将text分割， 过滤掉不属于列表中的元素， 然后重新setValues
						var texts = text.split(",");
						var rtexts = [], 
							rvals = [];
						for(var i = 0; i < data.length; i++){
							var rText = formatter.call(ins.element, data[i]), 
								rValue = data[i][ins.opts.valueField];
							
							if(fn.inArray(rText, texts) > -1){
								rtexts.push(rText);
								rvals.push(rValue);
							};
						};
						if(rtexts.join(",") != text){
							ins.setValues(rvals);
						};
					};
				}).call(null, ins);
			}; // end if
			
			// 初始化
			el.removeAttr("url")[ins.plugin](ins.opts).attr("url", ins.url);
			el.removeAttr("required"); // 初始化后如果不删除此属性，在支持HTML5的浏览器中表单将无法提交
			
			
			// 新增freeInput参数（默认为false）：该参数为false时不允许输入下拉列表中不存在的数据
			var textbox = ins.textbox().get(0);
			
			if(ins.opts.editable) ins.textbox().click((function(ins){
				
				return function(){
					$(this).data("settext", this.value);
				};
				
			}).call(textbox, ins)).blur((function(ins){
				
				return function(){
					function waitAutoRequest(callback){
						if(!ins.textbox().data("autoRequesting")){
							setTimeout(callback, 200);
						}else{
							setTimeout(function(){
								waitAutoRequest(callback);
							}, 60);
						};
					};
					// 等autoRequest过去之后执行输入检查
					waitAutoRequest(function(){
						ins._checkInput();
					});
				};
			}).call(textbox, ins));
			
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			// 如果有url， 且未被关联到其他控件（被关联到而不是关联到），则主动加载数据
			if(!ins.opts.bylinkage) ins.reload();
		}, // end init2
		
		_checkInput: function(){
			var ins = this,
				data = ins.getData(),
				text = ins.textbox().val(),
				formatter = ins.opts.formatter || 
							function(row){ return row[ins.opts.textField];};
			
			// 如果输入文本为空， 清空
			if(!text){
				ins.setValues("").clear();
				return;
			};
			
			// 如果无数据（可能是autoRequest）， 清空
			if(!ins.opts.freeInput && (!$.isArray(data) || !data.length)){
				ins.setValues("").reload();
				return;
			};
			
			// 如果输入文本未变， 无操作
			if($.trim(text) == $(this).data("settext")){
				return;
			};
			
			// 将text分割， 过滤掉不属于列表中的元素， 然后重新setValues
			var texts = text.split(",");
			var rtexts = [], 
				rvals = [];
			for(var i = 0; i < data.length; i++){
				var rText = data[i]["_TEXT"] || formatter.call(ins.element, data[i]), 
					rValue = data[i][ins.opts.valueField];
				
				if(texts.length > 5){
					if(rText == $.trim(text) || rValue == $.trim(text)){
						rtexts.push(rText);
						rvals.push(rValue);
						break;
					};
				}else{
					if(fn.inArray(rText, texts) > -1 && fn.inArray(rText, rtexts) < 0){
						rtexts.push(rText);
						rvals.push(rValue);
					};
				}; //
				
			};
			
			if(texts.length > 5) return;
			
			// 
			if($.trim(rtexts.join(",")) == $.trim(text)){
				ins.clear().setValues(rvals);
				// 预防某项的value为空的情况
				if(!rvals.join("")) ins.setText(text);
			}else{
				if(ins.opts.freeInput){
					ins.clear().setValue(text).setText(text);
					ins.textbox().data("settext", text);
				}else{
					ins.setValues("").clear();
				};
			};
			// 结束
		}, // end _checkInput
		
		// 重新加载后触发
		afterReload: function(ret, clear){
			var ins = this;
			
			// 如果没有数据就清空
			if(!$.isArray(ret) || !ret.length){
				return ins.clear();
			};
			 
			
			// 检查是否需要强制清除
			if(clear){
				// 触发被关联控件的刷新
				if(ret.length && ins.select) ins.select(ret[0][ins.opts.valueField]);
				if(ret.length && ins.unselect) ins.unselect(ret[0][ins.opts.valueField]);
				// 
				return ins.clear();
			};
			
			// 检查是否存在默认值
			if(ins.opts.val) {
				if(ins.opts.multiple){
					// 多选用check
					var vals = ins.opts.val.split(",");
					ins.setValues(vals);
				}else{
					// 单选用select
					for(var i = 0, len = ret.length; i < len; i++){
						var val = ret[i][ins.opts.valueField];
						if(val == ins.opts.val) return ins.select(ins.opts.val);
					};
				};
				
			}else{
				// 如果 autoSelect == true， 选中第一项
				var firstVal = ret[0][ins.opts.valueField];
				if(firstVal != undefined && ins.opts.autoSelect){
					ins.select(firstVal);
					return;
				};
			};
			
			
			// 数据加载完成后， 如果text为空且用户设置了emptyValue则setValue为emptyValue
			if(!ins.getText() && ins.opts.emptyValue){
				ins.setValue(ins.opts.emptyValue);
			};
		},
		
		// 针对combobox
		_getLinkData: function(v){
			var ins = this;
			
			var lkPostData = {};
			if(v && ins.opts.linkParam && v[ins.opts.linkField]){ 
				lkPostData[ins.opts.linkParam] = v[ins.opts.linkField]; // 自动判断v是否Object对象
			}else{
				//lkPostData[ins.opts.linkParam] = "";
			};
			
			return lkPostData;
		}
	}; // end fn.widget.combobox.methods
	
	//----------------------------
	// 组件 - 树
	//----------------------------
	/// widget.tree
	fn.widget.tree = function(elem, opt){
		
		var el = $(elem),
			ins = {
				plugin: "fwb_tree",
				element: el,
				opts: opt || {},
				methods: {}
			};
		//
		;return fn.fwb(ins, function(ins){
			
			// 包装方法
			fn.fwbMethods(ins, ["loadData", "select", "check", "uncheck", "collapse", "expand", "collapseAll", "expandAll", "expandTo", "append", "toggle", "insert", "remove", "update", "enableDnd", "disableDnd", "beginEdit", "endEdit", "cancelEdit", "options", "getNode", "getData", "getRoot", "getRoots", "getParent", "getChildren", "getChecked", "getSelected", "isLeaf", "find", "pop"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.treeBase,
				fn.linkageBase,
				fn.widget.tree.methods
			);
			
			ins.init();
			
			// 调用基类方法
			ins._ajaxInit();
			ins._treeInit();
			ins._linkageInit();
			// 
			ins.init2();
		});
	}; // end fn.widget.tree
	
	// tree方法
	fn.widget.tree.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
			
			//
			$.extend(ins.opts, {
				showBorder: el.attr("showBorder") != "false",
				rejectNodeFn: fn.tagFunc(el.attr("rejectNodeFn")) || function(n, l){ },
				funcs: ["formatter", "onSelect", "onLoadSuccess",  "rejectNodeFn", "onClick", "onDblClick", "onBeforeLoad", "onLoadError", "onBeforeExpand", "onExpand", "onBeforeCollapse", "onCollapse", "onCheck", "onBeforeSelect", "onContextMenu"],
				checkbox: ((el.attr("multiple") || "").toString() == "true") || 
							((el.attr("checkbox") || "").toString() == "true")
			}, ins.opts);
			
			if(ins.opts.showBorder) el.addClass("fwb_tree-border");
			
			if(ins.opts.checkbox){ 
				ins.opts.linkEvent = "onCheck";
			}else{
				ins.opts.linkEvent = "onSelect";
			};
			
			// 处理函数
			ins.opts = $.extend(ins.opts, fn.getAttrFuncSet(el, ins.opts.funcs));
		},
		
		// 初始化，第二阶段
		init2: function(){

			var ins = this,
				el = ins.element;
			
			// 初始化
			el.removeAttr("url").show()[ins.plugin](ins.opts).attr("url", ins.url);
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			if(ins.url) ins.reload();
		},
		
		afterReload: function(json, clear){
			var ins = this;
			// 如果没有指定默认值， 则选中第一项
			if(!clear && json.length && !ins.opts.val){
				var roots = ins.getRoots();
				if(roots && roots.length) ins.select(roots[0].target);
			};
		},
		
		// 针对tree
		_getLinkData: function(v){
			var ins = this;
			var lkPostData = {};
			
			// 根据联动事件的不同采用不同的取值方式
			if(ins.opts.linkEvent == "onSelect" && v){
				lkPostData[ins.opts.linkParam] = v.data ? v.data[ins.opts.linkField] : v.id;
			}else if(ins.opts.linkEvent == "onCheck"){
				var vals = ins.getChecked();
				for(var i = 0; i < vals.length; i++){
					vals[i] = vals[i].data ? vals[i].data[ins.opts.linkField] : vals[i].id;
				};
				lkPostData[ins.opts.linkParam] = vals.join(",");
			};
			return lkPostData;
		}
	}; // end fn.widget.tree.methods
	
	
	
	//----------------------------
	// 组件 - 树表格
	//----------------------------
	/// widget.treegrid
	fn.widget.treegrid = function(elem, opt){
		
		var el = $(elem),
			ins = {
				plugin: "fwb_treegrid",
				element: el,
				opts: $.extend({cache: false}, opt),
				methods: {}
			};
		//
		;return fn.fwb(ins, function(ins){
			
			// 包装方法
			fn.fwbMethods(ins, ["resize", "load","reload","loadData","reloadFooter","loading","loaded","fitColumns","fixColumnSize","fixRowHeight","clearSelections", "select", "unselect", "selectAll", "unselectAll", "collapse", "expand", "collapseAll", "expandAll", "expandTo", "toggle", "append", "remove", "refresh", "options", "getData","getPanel","getPager","getColumnFields","getColumnOption", "getRoot", "getRoots", "getParent", "getChildren", "getSelected", "getSelections", "find"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.treeBase,
				fn.linkageBase,
				fn.resizeBase,
				//fn.gridBase,
				fn.widget.treegrid.methods
			);
			
			ins.init();
			
			// 调用基类方法
			ins._ajaxInit();
			ins._treeInit();
			ins._linkageInit();
			ins._resizeInit();
			// 
			ins.init2();
		});
	}; // end fn.widget.tree
	
	// tree方法
	fn.widget.treegrid.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
			
			//
			$.extend(ins.opts, {
				showBorder: el.attr("showBorder") != "false",
				funcs: ["formatter", "onSelect", "onLoadSuccess",  "rejectNodeFn", "onClick", "onDblClick", "onBeforeLoad", "onLoadError", "onBeforeExpand", "onExpand", "onBeforeCollapse", "onCollapse", "onCheck", "onBeforeSelect", "onContextMenu"]
			}, fn.tagAttrs(el, "frozenColumns"), ins.opts);
			
			// 处理函数
			ins.opts = $.extend(ins.opts, fn.getAttrFuncSet(el, ins.opts.funcs));
			
		},
		
		// 初始化，第二阶段
		init2: function(){

			var ins = this,
				el = ins.element;
			
			// 初始化
			el.removeAttr("url").show()[ins.plugin](ins.opts).attr("url", ins.url);
			
			// 自动调节尺寸
			ins.autoResize();
			
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			if(ins.url && ins.opts.autoLoad) ins.reload();
		},
		
		afterReload: function(json, clear){
			var ins = this;
			// 如果没有指定默认值， 则选中第一项
			if(!clear && json.length && !ins.opts.val){
				var roots = ins.getRoots();
				if(roots && roots.length) ins.select(roots[0].target);
			};
		},
		
		// 针对tree
		_getLinkData: function(v){
			var ins = this;
			var lkPostData = {};
			
			// 根据联动事件的不同采用不同的取值方式
			if(ins.opts.linkEvent == "onSelect" && v){
				lkPostData[ins.opts.linkParam] = v.data ? v.data[ins.opts.linkField] : v.id;
			}else if(ins.opts.linkEvent == "onCheck"){
				var vals = ins.getChecked();
				for(var i = 0; i < vals.length; i++){
					vals[i] = vals[i].data ? vals[i].data[ins.opts.linkField] : vals[i].id;
				};
				lkPostData[ins.opts.linkParam] = vals.join(",");
			};
			return lkPostData;
		}
	}; // end fn.widget.treegrid.methods
	
	
	
	//----------------------------
	// 组件 - 下拉树
	//----------------------------
	/// widget.combotree
	fn.widget.combotree = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_combotree",
				element: el,
				opts: opt || {},
				methods: {}
			};
		//
		;return fn.fwb(ins, function(ins){
			
			// 包装方法
			fn.fwbMethods(ins, ["loadData", "resize", "showPanel", "hidePanel", "disable", "enable", "clear", "setText", "setValues", "setValue", "options", "panel", "tree", "textbox", "getText", "getValues", "getValue", "getChecked"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.treeBase,
				fn.comboBase,
				fn.linkageBase,
				//fn.validBase,
				fn.widget.combotree.methods
			);
			
			ins.init();
			
			// 调用基类方法
			ins._ajaxInit();
			ins._treeInit();
			ins._comboInit();
			ins._linkageInit();
			//ins._validInit();
			
			// hap add 2012/10/24
			// 延迟加载初始化
			if(ins.opts.lazyLoad){
				ins.element.addClass("fn-combo-lazyLoad");
				// 显示值
				if(ins.opts.lazyText){
					var offset = ins.element.offset();
					ins.lazyTextDiv = $('<input type="text" class="fn-combo-lazyLoad-text" \>').val(ins.opts.lazyText).insertAfter(ins.element).css({
						position: "absolute",
						left: offset.left + 1,
						top: offset.top + 1,
						width: ins.element.width() - 23
					});
				};
				
				function init2(){
					if(ins.lazyTextDiv){
						ins.lazyTextDiv.remove();
					};
					ins.init2();
					setTimeout(function(){
						ins.showPanel();
					},10);
				};
				if(ins.lazyTextDiv){
					ins.lazyTextDiv.one("click", init2);
				};
				ins.element.one("click", init2);
			}else{
				ins.init2();
			};
			
		});
	}; // end fn.widget.combotree
	
	// combotree方法
	fn.widget.combotree.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
				
			//
			$.extend(ins.opts, {
				rejectNodeFn: fn.tagFunc(el.attr("rejectNodeFn")) || function(n, l){ },
				checkbox: ((el.attr("multiple") || "").toString() == "true") || 
							((el.attr("checkbox") || "").toString() == "true"),
				width: el.attr("inputWidth") || el.width() || 173
			}, fn.tagAttrs(ins.element, "formatter,jsonHandler,onBeforeCollapse,onBeforeExpand,onChange,onCheck,onClick,onCollapse,onExpand,onFirstLoad,onLinkage,onLoadSuccess,onSelect,onShowPanel,freeInput,editable,lazyLoad,lazyText"), ins.opts);
			ins.opts.multiple = ins.opts.checkbox;
			if(ins.opts.checkbox) ins.opts.linkEvent = "onHidePanel";
			// 指定联动事件类型， 必须在 _linkageInit 被调用之前
			if(ins.opts.checkbox){ 
				ins.opts.linkEvent = "onCheck";
			}else{
				ins.opts.linkEvent = "onSelect";
			};
		},
		
		// 初始化，第二阶段
		init2: function(){

			var ins = this,
				el = ins.element;
			
			// 初始化
			el.removeAttr("url")[ins.plugin](ins.opts).attr("url", ins.url);
			el.removeAttr("required"); // 初始化后如果不擅长此属性，在支持HTML5的浏览器中表单将无法提交
			
			// 新增freeInput参数（默认为false）：该参数为false时不允许输入下拉列表中不存在的数据
			var textbox = ins.textbox().get(0);
			
			if(ins.opts.editable) ins.textbox().click((function(ins){
				return function(){
					$(this).data("settext", this.value);
				};
			}).call(textbox, ins)).blur((function(ins){
				return function(){
					function waitAutoRequest(callback){
						if(!ins.textbox().data("autoRequesting")){
							setTimeout(callback, 200);
						}else{
							setTimeout(function(){
								waitAutoRequest(callback);
							}, 60);
						};
					};
					// 等autoRequest过去之后执行输入检查
					waitAutoRequest(function(){
						ins._checkInput();
					});
				};
			}).call(textbox, ins));
			
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			// 如果有url， 且未被关联到其他控件（被关联到而不是关联到），则主动加载数据
			if(ins.url && !ins.opts.bylinkage) ins.reload();
		},
		
		_checkInput: function(){
			var ins = this,
				data = fn.treeToAry(ins.getData(), ins.opts.childrenField),
				text = ins.textbox().val(),
				formatter = ins.opts.formatter || 
							function(row){ return row[ins.opts.textField];};
			
			var d = 0;
			
			// 如果输入文本为空， 清空
			if(!text){
				ins.setValues("").clear();
				if(d) $msg(1);
				return;
			};
			
			// 如果无数据（可能是autoRequest）， 清空
			if(!ins.opts.freeInput && (!$.isArray(data) || !data.length)){
				ins.setValues("").reload();
				if(d) $msg(2);
				return;
			};
			
			// 如果输入文本未变， 无操作
			if(text == $(this).data("settext")){
				return;
			};
			
			// 将text分割， 过滤掉不属于列表中的元素， 然后重新setValues
			var texts = text.split(",");
			var rtexts = [], 
				rvals = [];
			for(var i = 0; i < data.length; i++){
				var rText = data[i]["_TEXT"] || formatter.call(ins.element, data[i]), 
					rValue = data[i][ins.opts.valueField];
				
				if(texts.length > 5){
					if(rText == $.trim(text) || rValue == $.trim(text)){
						rtexts.push(rText);
						rvals.push(rValue);
						break;
					};
				}else{
					if(fn.inArray(rText, texts) > -1 && fn.inArray(rText, rtexts) < 0){
						rtexts.push(rText);
						rvals.push(rValue);
					};
				}; //
				
			};
			
			if(texts.length > 5) return;
			
			// 设置值
			if(rtexts.join(",") == $.trim(text)){
				if(ins.getValues().join(",") != rvals.join(",")){
					ins.clear().setValues(rvals);
					// 预防某项的value为空的情况
					if(rvals.join("") == "") ins.setText(text);
				};
				if(d) $msg(3);
			}else{
				if(ins.opts.freeInput){
					ins.clear().setValue(text).setText(text);
					ins.textbox().data("settext", text);
					if(d) $msg(4);
				}else{
					ins.setValues("").clear();
					if(d) $msg(5);
				};
			};
			// 结束
		}, // end _checkInput
		
		
		// 重新加载后触发
		afterReload: function(ret, clear){
			var ins = this;
			var firstId = ret.length ? ret[0].id || "" : "";
			
			// 如果没有指定默认值， 则选中第一项
			if(clear){
				ins.clear();
			}else if(ins.opts.val){
				if(ins.opts.multiple){
					// 多选用check
					var vals = ins.opts.val.split(",");
					ins.setValues(vals);
				}else{
					// 单选用select
					ins.select(ins.opts.val);
				};
			}else if(!ins.opts.multiple && ret.length && ins.opts.autoSelect != false){
				ins.select(firstId);
			};
		},
		
		select: function(val){
			var ins = this;
			
			ins.setValue(val);
		},
		
		getData: function(){
			var ins = this;
			return ins._data;
		},

		
		// 重新加载数据
		reload: function(url, postData, keep, callback){
			var ins = this;
			url = url || ins.url;
			
			postData = fn.paramExtend($.extend({}, ins.opts.postData), postData);
			if(keep) ins.opts.postData = postData;
			
			ins._post(url, postData, function(json){
			
				// 处理json
				if($.isFunction(ins.opts.jsonHandler))
					json = ins.opts.jsonHandler.call(ins, json);
				
				if($.isFunction(ins.beforeReload)){
					ins.beforeReload(json);
				};
				
				ins._data = json;
				ins.clear().loadData(json);
				
				if($.isFunction(ins.afterReload)){
					ins.afterReload(json);
				};
				
				// hap 2011.12.1 新增
				if($.isFunction(ins.onFirstLoad)){
					ins.onFirstLoad.call(ins, json);
					ins.onFirstLoad = null;
				};
				
				// 触发联动
				// hap 2012/3/1
				if(ins.opts.onLinkage) ins.opts.onLinkage.apply(ins);
				
				// hap 2011.12.1 新增
				if($.isFunction(ins.onNextLoad)){
					ins.onNextLoad.call(ins);
					ins.onNextLoad = null;
				};
				
				callback && callback(json);
			});
			
			return ins;
		},
		
		// 针对combotree
		_getLinkData: function(v){
			var ins = this;
			var lkPostData = {};
			
			// 根据联动事件的不同采用不同的取值方式
			if(ins.opts.linkEvent == "onSelect" && v){
				lkPostData[ins.opts.linkParam] = v.data ? v.data[ins.opts.linkField] : v.id;
			}else if(ins.opts.linkEvent == "onCheck"){
				var vals = ins.getChecked();
				for(var i = 0; i < vals.length; i++){
					vals[i] = vals[i].data ? vals[i].data[ins.opts.linkField] : vals[i].id;
				};
				lkPostData[ins.opts.linkParam] = vals.join(",");
			};
			return lkPostData;
		},
		
		treeMethod: function(){
			var ins = this,
				tree = $(ins.element).fwb_combotree("tree");
			
			return $(tree).fwb_tree.apply(tree, arguments);
		},
		
		getRoot: function(){
			return this.treeMethod("getRoot");
		},
		
		getRoots: function(){
			return this.treeMethod("getRoots");
		},
		
		getParent: function(node){
			return this.treeMethod("getParent", node);
		},
		
		getChildren: function(node){
			return this.treeMethod("getChildren", node);
		},
		
		getChecked: function(node){
			return this.treeMethod("getChecked");
		},
		
		getSelected: function(node){
			return this.treeMethod("getSelected");
		}
	}; // end fn.widget.combotree.methods
	
		
	$.fn.fwb_datagrid._reload = function(postData){
		var ins = $get(this);
		if(!ins) return;
		postData = $.extend({}, {page: ins.opts.page, rows: ins.opts.pageSize}, postData);
		
		ins.reload(null, postData);
	};
	//----------------------------
	// 组件 - 数据表格
	// 继承: fn.ajaxBase, fn.linkageBase
	//----------------------------
	/// widget.datagrid
	fn.widget.datagrid = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_datagrid",
				element: el,
				opts: $.extend({page:1, pageSize:10}, fn.tagAttrs(elem, "page,columns,fitColumns,frozenColumns,idField,loadMsg,nowrap,pageList,pageNumber,pageSize,pagination,rownumbers,singleSelect,striped"), opt, {cache: false}),
				methods: {}
			};
		
		;return fn.fwb(ins, function(ins){
			
			// 包装方法
			fn.fwbMethods(ins, ["resize","load","reload","loadData","reloadFooter","loading","loaded","fitColumns","fixColumnSize","fixRowHeight","clearSelections","selectAll","unselectAll","selectRow","unselectRow","refreshRow","deleteRow","showColumn","hideColumn","showLoadingMsg","hideLoadingMsg","mergeCells","appendRow","insertRow", "options","getPanel","getPager","getColumnFields","getColumnOption","getData","getRows","getFooterRows","getRowIndex","getSelected","getSelections"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.linkageBase,
				fn.resizeBase,
				fn.widget.datagrid.methods
			);
			// 调用基类方法
			ins._ajaxInit();
			ins._linkageInit();
			ins._resizeInit();
			// 初始化
			ins.init();
		});
	}; // end fn.widget.datagrid
	
	
	// datagrid方法
	fn.widget.datagrid.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
			
			//
			$.extend(ins.opts, {
				funcs: ["formatter", "onSelect", "onLoadSuccess", "onLoadError", "onUnselect", "onClickRow", "onDblClickRow"]
			}, ins.opts);
			
			// add hap 2012/7/19
			// 实现支持用template代替formatter
			var ths = $("tr>th", el);
			ths.each(function(){
				var tpl = $(this).attr("template"),
					temp;
				if(tpl && !$(this).attr("formatter")){
					temp = "temp_" + parseInt(Math.random()*999999);
					window[temp] = function(i,n){
						if(!window.juicer){
							fn.use("juicer");
						};
						return juicer(tpl, n);
					};
					$(this).attr("formatter", temp);
				};
			}); //
			
			// 处理函数
			ins.opts = $.extend(ins.opts, fn.getAttrFuncSet(el, ins.opts.funcs));
			
			// 初始化
			el.removeAttr("url")[ins.plugin](ins.opts).attr("url", ins.url);
			ins.options().url = ins.url;
			
			// 自动调节尺寸
			ins.autoResize();
			
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			$.extend(ins.opts.postData, {page: ins.opts.page, rows: ins.opts.pageSize});
			
			// 如果有url， 且未被关联到其他控件（被关联到而不是关联到），则主动加载数据
			if(ins.url && !ins.opts.bylinkage && ins.opts.autoLoad) ins.reload();
		},
		
		// 联动post数据
		_getLinkData: function(val, row){
			var ins = this;
			
			if(row && ins.opts.linkField && row[ins.opts.linkField]){
				var lkPostData = {};
				lkPostData[ins.opts.linkParam] = row[ins.opts.linkField];
				return lkPostData;
			};
		},
		
		// 重新加载数据
		reload: function(url, postData, keep, callback){
			var ins = this;
			url = url || ins.url;
			
			// hap 2012.10.20
			// 解决查询时务分页参数的问题
			var opts = ins.options() || {};
			var pd = fn.paramExtend({}, ins.opts.postData, opts.queryParams, postData, {
				page: opts.pageNumber,
				rows: opts.pageSize
			});
			pd = {
				page: pd.page || pd.pageNumber,
				rows: pd.rows || pd.pageSize,
				sort: pd.sort,
				order: pd.order
			};
			postData = fn.paramExtend({}, postData, pd);
			
			if(keep){
				ins.opts.postData = postData;
				// 解决查询参数分页后消失的bug
				if(opts.queryParams){
					opts.queryParams = $.extend({}, postData);
				};
			};
			//
			
			ins.showLoadingMsg();
			ins._post(url, postData, function(json){
			
				// 处理json
				if($.isFunction(ins.opts.jsonHandler))
					json = ins.opts.jsonHandler.call(ins, json);
				
				if($.isFunction(ins.beforeReload)){
					ins.beforeReload(json);
				};

				ins.loadData(json);
				
				//
				ins.hideLoadingMsg();
				
				if($.isFunction(ins.afterReload)){
					ins.afterReload(json);
				};
				
				// hap 2011.12.1 新增
				if($.isFunction(ins.onFirstLoad)){
					ins.onFirstLoad.call(ins);
					ins.onFirstLoad = null;
				};
				
				// 触发联动
				// hap 2012/3/1
				if(ins.opts.onLinkage) ins.opts.onLinkage.apply(ins);
				
				// hap 2011.12.1 新增
				if($.isFunction(ins.onNextLoad)){
					ins.onNextLoad.call(ins);
					ins.onNextLoad = null;
				};
				
				callback && callback(json);
			});
			
			return ins;
		},
		
		// 重新加载后触发
		afterReload: function(ret){
			var ins = this;
		}
		
	}; // end fn.widget.datagrid.methods
	
	
	
	//----------------------------
	// 组件 - 树表格
	//----------------------------
	/// widget.combogrid
	fn.widget.combogrid = function(elem, opt){
		
		var el = $(elem),
			ins = {
				plugin: "fwb_combogrid",
				element: el,
				opts: $.extend({cache: false}, opt),
				methods: {}
			};
		//
		;return fn.fwb(ins, function(ins){
			
			fn.fwbMethods(ins, ["options", "panel", "textbox", "destroy", "resize", "showPanel", "hidePanel", "disable", "enable", "validate", "isValid", "clear", "getText", "setText", "getValues", "setValues", "getValue", "setValue", "grid"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.ajaxBase,
				fn.linkageBase,
				//fn.gridBase,
				fn.widget.combogrid.methods
			);
			
			ins.init();
			
			// 调用基类方法
			ins._ajaxInit();
			ins._linkageInit();
			// 
			ins.init2();
		});
	}; // end fn.widget.tree
	
	// tree方法
	fn.widget.combogrid.methods = {
		
		// 初始化
		init: function(){

			var ins = this,
				el = ins.element;
			
			//
			$.extend(ins.opts, {
				funcs: ["onShowPanel", "onHidePanel", "onChange", "formatter", "onSelect", "onLoadSuccess", "onLoadError", "onUnselect", "onClickRow", "onDblClickRow"]
			}, fn.tagAttrs(el, ""), ins.opts);
			
			// 处理函数
			ins.opts = $.extend(ins.opts, fn.getAttrFuncSet(el, ins.opts.funcs));
			
		},
		
		// 初始化，第二阶段
		init2: function(){

			var ins = this,
				el = ins.element;
			
			// 初始化
			el.removeAttr("url").show()[ins.plugin](ins.opts).attr("url", ins.url);
			
			// 初始化之后应立即拷贝参数
			$.extend(ins.opts, ins.options());
			
			if(ins.url && ins.opts.autoLoad) ins.reload();
		},
		
		afterReload: function(json, clear){
			var ins = this;
			// 如果没有指定默认值， 则选中第一项
			if(!clear && json.length && !ins.opts.val){
				var roots = ins.getRoots();
				if(roots && roots.length) ins.select(roots[0].target);
			};
		},
		
		loadData: function(data){
			var ins = this;
			var grid = this.grid();
			return grid.fwb_datagrid("loadData", data);
		}
		
	}; // end fn.widget.combogrid.methods
	
	
	
	//----------------------------
	// 组件 - 弹出表格
	//----------------------------
	/// widget.gridwindow
	fn.widget.gridwindow = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_window",
				element: el,
				opts: opt || {},
				methods: {},
				grid: null
			};
		//
		;return fn.fwb(ins, function(ins){
			$.extend(
				ins,
				fn.widget.gridwindow.methods
			);
			// 初始化
			ins.init();
		});
	}; // end fn.widget.gridwindow
	
	fn.widget.gridwindow.methods = {
		//
		init: function(){
			var ins = this,
				el = ins.element;
			
			el.addClass("gridwindow").hide();
			
			ins.grid = el.find("table");
			//
			$.extend(ins.opts, {
				url: el.attr("url") || "",
				singleSelect: el.find("table").attr("singleSelect") == "true",
				width: el.attr("width") ? parseInt(el.attr("width")) : 500,
				height: el.attr("height") ? parseInt(el.attr("height")) : 400,
				queryLabelText: el.attr("queryLabelText") || "查询条件：",
				queryFieldName: el.attr("queryFieldName") || "id",
				queryButtonText: el.attr("queryButtonText") || "查询",
				okButtonText: el.attr("okButtonText") || "确定",
				cancelButtonText: el.attr("cancelButtonText") || "取消",
				postData: fn.urlStrToObj(el.attr("postData") || ""),
				funcs: ["onSelected"]
			}, ins.opts);
			
			ins.grid.attr("url", ins.opts.url);
			
			$.extend(ins.opts, {
				tbar: $(
					'<div class="topbar">' + ins.opts.queryLabelText +
					'    <input name="' + ins.opts.queryFieldName + '"/>' + 
					'    <button class="btn_search">' + ins.opts.queryButtonText + '</button>' +
					'</div>').prependTo(el),
				
				bbar: $(
					'<div class="bottombar">' +
					'    <button class="gridwindow-ok">' + ins.opts.okButtonText + '</button>' +
					'    <button class="gridwindow-close">' + ins.opts.cancelButtonText + '</button>' +
					'</div>').appendTo(el)
			});
			
			$.extend(ins.opts, {
				trigger: $(el.attr("trigger")),
				ok: el.find(".gridwindow-ok"),
				close: el.find(".gridwindow-close"),
				queryBtn: el.find(".btn_search"),
				queryField: el.find("input[name='"+ ins.opts.queryFieldName +"']")
			});
			
			// 处理函数
			ins.opts = $.extend(ins.opts, fn.getAttrFuncSet(el, ins.opts.funcs));
			//alert(ins.opts.onSelect);
			//fn.d(fn.getAttrFuncSet(el, ins.opts.funcs));
			if(ins.grid.length != 1) return;
			
			// 初始化window
			if($.fn.fwb_window){
				init();
			}else{
				setTimeout(init, 2000);
			};
			
			function init(){
				ins.element.show().fwb_window({
					minimizable: false,
					collapsible: false,
					maximizable: false,
					closed: true,
					width: ins.opts.width,
					height: ins.opts.height,
					onResize: (function(){
						return function(){
							ins.setGridSize.call(ins);
						};
					})(ins)
				});
			};
			
			// 绑定事件
			ins.opts.trigger.click((function(ins){
				return function(){
					ins.open.call(ins);
				};
			})(ins));
			

			ins.opts.ok.click((function(ins){
				return function(){
					ins.ok.call(ins);
				};
			})(ins));
			
			ins.opts.close.click((function(ins){
				return function(){
					ins.close.call(ins);
				};
			})(ins));
			
			ins.opts.queryBtn.click((function(ins){
				return function(){
					var data = {};
					ins.opts.queryField.each(function(){
						var name = $(this).attr("name"), val = $(this).val();
						if(name) data[name] = val || "";
					});
					ins.reload.call(ins, null, data);
				};
			})(ins));
			
		},
		
		reload: function(url, postData, keep, callback){
			var ins = this;
			
			ins.grid.fwb_datagrid("reload", fn.paramExtend($.extend({}, ins.opts.postData), postData));
			
			return ins;
		},
		
		open: function(){
			var ins = this;
			
			ins.element.fwb_window("open");
			ins.setCenter.call(ins);
			
			if(!ins._inited){
				// 初始化
				ins._inited = true;
				ins.grid.fwb_datagrid({
					onDblClickRow: ins.opts.singleSelect ? (function(ins){
						return function(){
							ins.ok.call(ins);
						};
					})(ins) : null,
					queryParams: ins.opts.postData
				});
				ins.setGridSize.call(ins);
			};
		},
		ok: function(){
			var ins = this;
			
			var rows = ins.grid.fwb_datagrid("getSelections");
			if(rows.length < 1) return alert("您没有选中任何数据");
			
			if(ins.opts.onSelected){
				if(ins.opts.singleSelect){
					ins.opts.onSelected.call(ins, rows.length ? rows[0] : null);
				}else{
					ins.opts.onSelected.call(ins, rows)
				};
			};
			ins.close();
		},
		close: function(){
			var ins = this;
			
			ins.element.fwb_window("close");
		},
		// 调整grid大小以适应window
		setGridSize: function(){
			var ins = this;
			
			if(!ins._inited) return;
			
			var panel = ins.element.fwb_window("panel").find(".fwb_window-body"),
				size = { width: panel.innerWidth() - 5, height: panel.innerHeight() - 5 };
			
			$([ins.opts.tbar, ins.opts.bbar]).each(function(){
				size.height -= $(this).outerHeight();
			});
			
			ins.grid.fwb_datagrid("resize", size);
		},
		
		setCenter: function(){
			var ins = this;
			
			var scroll = document.documentElement.scrollTop + document.body.scrollTop,
				left = fn.dom.clientWidth() - ins.opts.width, 
				top = fn.dom.clientHeight() - ins.opts.height;
				
			left = left > 0 ? left / 2 : 0;
			top = top > 0 ? top / 2 : 0;
			top += scroll;
			
			document.title = ([left, top].join(","));
			ins.element.fwb_window("move", {left: left, top: top});
		}
	};
	
	
	
	//----------------------------
	// 组件 - 数字输入框
	//----------------------------
	$(".numberbox").each(function(){
		var el = $(this),
			attr = {
				min: isNaN(el.attr("min")) ? null : parseFloat(el.attr("min")),
				max: isNaN(el.attr("max")) ? null : parseFloat(el.attr("max")),
				precision: isNaN(el.attr("precision")) ? 0 : parseInt(el.attr("precision"))
			};
		el.numberbox(attr);
	});

	
	
	/// widget.rdockbBase
	// 单选多选组共同方法
	fn.rdockbBase = {
		
		// need: ins{elemType, boxCls, boxBorderCls}
		_initRdockbBase: function(){
			var ins = this,
				el = ins.element.hide();
			//
			ins.opts = $.extend({
				name: el.attr("name") || el.attr("id") || parseInt(Math.random()*100000), 
				showBorder: el.attr("showBorder") == "true", 
				width: el.attr("width") || "auto", 
				colWidth: el.attr("colWidth") || "auto", 
				onCheck: fn.tagFunc(el.attr("onCheck")), 
				tmp: '<label {4}><input value="{1}" name="{2}" {3} type="' + ins.elemType + '" />{0}</label>',
				vals: ins.opts.val.split(",") || [],
				boxCls: ins.boxCls,
				linkEvent: 'onCheck',
				showSelectAll: el.attr("showSelectAll") != "false",
				selectAllText: el.attr("selectAllText") || "全选",
				selectAllTitle: (el.attr("selectAllTitle") || "全选/全不选").split("/"),
				selectAllStyle: el.attr("selectAllStyle") || "",
				autoSelect: el.attr("autoSelect") == "true", // radios自动选中第一项， 默认为false
				titleField: el.attr("titleField") || ""
			}, ins.opts);
			
			$.extend(ins.opts, {
				box: $('<div class="' + ins.opts.boxCls + '" style="display:none; width:' + ins.opts.width + 'px;" />').insertAfter(el)
			});
			
			// 边框
			if(ins.opts.showBorder) ins.opts.box.addClass(ins.boxBorderCls);
			
		}, // end init
		
		loadData: function(json){
			var ins = this,
				attr = ins.opts;
			
			var inputs = [];
			var sel = "";
			
			// 全选
			if(ins.elemType == "checkbox" && ins.opts.showSelectAll){
				var html = fn.format(attr.tmp, 
					ins.opts.selectAllText, 
					'', 
					'selectallbtn',
					"",
					' class="checkbox-selectall" title="' + ins.opts.selectAllTitle[0] + '" '
					//,'style="font-weight:bold;' + ins.opts.selectAllStyle + '"'
				);
				inputs.push(html);
			};
			
			$.each(json, function(i, n){
				var html = fn.format(attr.tmp, 
					n[attr.textField], 
					n[attr.valueField], 
					attr.name,
					'',
					ins.opts.titleField ? (' title="' + n[ins.opts.titleField] + '" ') : ""
				);
				inputs.push(html);
				//
				if($.inArray(n[attr.valueField], attr.vals) > -1){
					if(sel) sel += ",";
					sel += "input[name=" + ins.opts.name + "][value='" + n[attr.valueField] + "']";
				};
			});
			
			inputs = $(inputs.join(""));
			ins.element.attr("name", "hid_prototype_" + attr.name).css({
				width: 0,
				padding: 0,
				margin: 0,
				border: 'none',
				visibility: 'hidden'
			}).show();
			attr.box.html(inputs).append('<label class="clear" />');
			
			// 全选按钮点击事件
			if(ins.elemType == "checkbox") attr.box.find("[name=selectallbtn]").click((function(ins, btn){
				return function(){
					// 切换“全选/全不选”的提示
					btn.parent().attr("title", this.checked ? ins.opts.selectAllTitle[1] : ins.opts.selectAllTitle[0]);
					// 进行全选或者全不选
					ins.select(null, this.checked);
				};
			})(ins, attr.box.find("[name=selectallbtn]")));
			
			if(!inputs.length){ 
				attr.box.hide();
			}else{
				attr.box.show();
			};
			
			ins.element.prependTo(ins.opts.box);
			
			var onClick = (function(ins){
				return function(validate){
					var input = this;
					// 存值和触发验证
					// hap add 2012/3/7
					var ids = [];
					ins.opts.box.find("input[name=" + ins.opts.name + "]").each(function(){
						if(this.checked) ids.push(this.value);
					});
					ids = ids.join(",");
					if(validate != false) ins.element.val(ids).trigger("focus");
					// 触发onCheck事件
					var val = ins.getValue(),
						vals = ins.getValues();
						
					ins.opts.onCheck && ins.opts.onCheck(val, vals, input);
					ins._onCheck && ins._onCheck(val, vals, input);
				};
			})(ins);
			
			$("input[name=" + ins.opts.name + "]", ins.opts.box).bind("click", onClick);
			
			// 宽度
			var labels = $(">label", attr.box);
			if(!isNaN(attr.colWidth)){
				labels.width(parseInt(attr.colWidth));
			};
			
			/*
			// 选中指定值或者第一个(radio)
			sel = $(sel || ((ins.elemType == "radio" && ins.opts.autoSelect) ? "input[name=" + ins.opts.name + "]:first" : ""), attr.box);
			*/
			
			// 选中初始值
			var initValues = (ins.opts.vals || "").toString().split(",");
			if(initValues && initValues.length && initValues[0]){
				ins.select(initValues);
			}else if(ins.elemType == "radio" && ins.opts.autoSelect){
				ins.select(0);
			};
		}, // end loadData
		
		// 针对radio和checkboxs的联动post数据
		_getLinkData: function(v){
			var ins = this,
				ids = [];
			
			ins.opts.box.find("input[name=" + ins.opts.name + "]").each(function(){
				if(this.checked) ids.push(this.value);
			});
			ids = ids.join(",");
			
			var lkPostData = {};
			lkPostData[ins.opts.linkField] = ids;
			
			return lkPostData;
		},
		
		// 返回第一个选中值
		getValue: function(){
			var ins = this,
				vals = ins.getValues();
				
			return vals.length ? vals[0] : null;
		},
		
		// 返回选中值数组
		getValues: function(){
			var ins = this,
				ids = [];
			
			ins.opts.box.find("input[name=" + ins.opts.name + "]").each(function(){
				if(this.checked) ids.push(this.value);
			});
			
			return ids;
		},
		
		// 返回选中的text
		getText: function(){
			var ins = this,
				text = [];
			
			ins.opts.box.find("input[name=" + ins.opts.name + "]").each(function(){
				if(this.checked) text.push($(this).parent().text());
			});
			
			return text.join(",");
		},
		
		getData: function(){
			return this._data;
		},
		
		select: function(vals, checked){
			
			var ins = this;
			
			// checked默认为true
			checked = !!(checked == undefined ? true : checked);
			
			if(typeof vals == "number"){
				// 索引
				ins.opts.box.find("input[name=" + ins.opts.name + "]:eq(" + vals + ")").attr("checked", checked);
			}else if(typeof vals == "string"){
				// 值
				ins.opts.box.find("input[name=" + ins.opts.name + "][value=" + vals + "]").attr("checked", checked);
			}else if($.isArray(vals) && vals.length){
				
				if(typeof vals[0] == "number"){
					// 索引数组
					var selectors = [];
					$.each(vals, function(i,n){
						if(typeof n == "number") selectors.push("input[name=" + ins.opts.name + "]:eq(" + n + ")");
					});
					ins.opts.box.find(selectors.join(",")).attr("checked", checked);
				}else{
					// 值数组
					var selectors = [];
					$.each(vals, function(i,n){
						selectors.push("input[name=" + ins.opts.name + "][value=" + n + "]");
					});
					ins.opts.box.find(selectors.join(",")).attr("checked", checked);
				}
			}else if(!vals && ins.elemType == "checkbox"){
				// 全选
				ins.opts.box.find("input").attr("checked", checked);
			};
			
			var val = ins.getValue(),
				vals = ins.getValues();
				
			ins.opts.onCheck && ins.opts.onCheck(val, vals);
			ins._onCheck && ins._onCheck(val, vals);
			
			return ins;
		},
		
		// 选中后触发
		_onCheck: function(){
			var ins = this;
			
			// 将被选中的label设置selected
			ins.opts.box.find("label").removeClass("selected");
			ins.opts.box.find("input[name=" + ins.opts.name + "]:checked").parent().addClass("selected");
		},
		
		unselect: function(vals){
			return this.select(vals, false);
		},
		
		toggle: function(){
			var ins = this,
				c = 0,
				input = ins.opts.box.find("input[name=" + ins.opts.name + "]");
			input.each(function(){
				if(this.checked) c++;
			});
			if(c == input.length){
				ins.unselect();
			}else{
				ins.select();
			}
		}
	};
	
	//----------------------------
	// 组件 - radios
	// 继承: fn.ajaxBase, fn.linkageBase
	//----------------------------
	/// widget.radios
	fn.widget.radios = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "radios",
				element: el,
				opts: opt || {},
				methods: {}
			}
		//
		;return fn.fwb(ins, function(ins){
			$.extend(
				ins,
				fn.ajaxBase,
				fn.linkageBase,
				fn.rdockbBase,
				fn.validBase,
				fn.widget.radios.methods
			);
			
			// 调用基类方法
			ins._ajaxInit();
			ins._validInit();
			
			// 初始化
			ins.init();
			
			ins._linkageInit();
			
			// 如果未被关联到其他控件（被关联到而不是关联到），则主动加载数据
			if(!ins.opts.bylinkage) ins.reload();
		});
	}; // end fn.widget.radios
	
	fn.widget.radios.methods = {
		init: function(){
			var ins = this;
			
			ins.elemType = "radio";
			ins.boxCls = "bt-radios-box";
			ins.boxBorderCls = "bt-radios-box-border";
			
			ins._initRdockbBase();
		}
	}; // end fn.widget.radios.methods
	
	
	//----------------------------
	// 组件 - checkboxs
	// 继承: fn.ajaxBase, fn.linkageBase
	//----------------------------
	/// widget.checkboxs
	fn.widget.checkboxs = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "",
				element: el,
				opts: opt || {},
				methods: {}
			}
		//
		;return fn.fwb(ins, function(ins){
			$.extend(
				ins,
				fn.ajaxBase,
				fn.linkageBase,
				fn.rdockbBase,
				fn.validBase,
				fn.widget.checkboxs.methods
			);
			
			// 调用基类方法
			ins._ajaxInit();
			ins._validInit();
			
			// 初始化
			ins.init();
			
			ins._linkageInit();
			
			// 如果未被关联到其他控件（被关联到而不是关联到），则主动加载数据
			if(!ins.opts.bylinkage) ins.reload();
		});
	}; // end fn.widget.checkboxs
	
	fn.widget.checkboxs.methods = {
		
		init: function(){
			var ins = this;
			
			ins.elemType = "checkbox";
			ins.boxCls = "bt-checkboxs-box";
			ins.boxBorderCls = "bt-checkboxs-box-border";
			
			ins._initRdockbBase();
		}
		
	}; // end fn.widget.checkboxs.methods
	
	
	
	
	//----------------------------
	// 组件 - tabs
	//----------------------------
	/// widget.tabs
	fn.widget.tabs = function(elem, opt){
		opt = opt || {};
		var el = $(elem),
			ins = {
				plugin: "fwb_tabs",
				element: el,
				opts: $.extend({
					selectors: true,
					onClick: opt.onChange || fn.tagFunc(el.attr("onChange")),
					onBeforeClick: opt.onBeforeChange || fn.tagFunc(el.attr("onBeforeChange"))
				}, fn.tagAttrs(el, "panels,effect,event,fadeInSpeed,fadeOutSpeed,history,initialIndex,rotate,tabs"), opt),
				methods: {}
			},
			sets = ["click", "destroy", "next", "prev"],
			gets = ["options:getConf", "getPanel:getCurrentPane", "getTab:getCurrentTab", "getIndex", "getPanels:getPanes", "getTabs"];
		
		;return fn.fwb(ins, function(ins){
			
			// 初始化
			fn.fwbToolsMethods(ins, "get", gets);
			fn.fwbToolsMethods(ins, "set", sets);
			
			$.extend(
				ins,
				ins.methods,
				fn.widget.tabs.methods
			);
			
			if(ins.opts.panels){
				ins.opts.panels = $(ins.opts.panels);
			}else{
				ins.opts.panels = ins.element.next().children();
			};
			
			ins.element.addClass("fn-tabs");
			ins.opts.panels.show().addClass("fn-panel");
			
			ins.element[ins.plugin](ins.opts.panels, ins.opts);
			
		});
	}; // end fn.widget.tabs
	
	fn.widget.tabs.methods = {}; // end fn.widget.tabs.methods
	
	
	
	
	//----------------------------
	// 组件 - date
	//----------------------------
	/// widget.date
	fn.widget.date = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_dateinput",
				element: el,
				opts: $.extend({
					selectors: true
				}, fn.tagAttrs(el, "css, firstDay, format, lang, max, min, offset, selectors, speed, trigger, yearRange, change, change:onChange, onBeforeShow, onHide, onShow, data-value"), opt),
				methods: {}
			},
			sets = ["addDay", "addMonth", "addYear", "hide", "setMax", "setMin", "setValue", "show", "today"],
			gets = ["options:getConf", "getCalendar", "textbox:getInput", "getValue", "isOpen"];
		
		;return fn.fwb(ins, function(ins){
			
			// 初始化
			fn.fwbToolsMethods(ins, "get", gets);
			fn.fwbToolsMethods(ins, "set", sets);
			
			$.extend(
				ins,
				ins.methods,
				fn.widget.date.methods
			);
			
			// 把today、数字等转换成日期
			if(ins.opts["data-value"] == "today"){
				ins.opts["data-value"] = fn.date.format(new Date());
			}else if(ins.opts["data-value"]){
				ins.opts["data-value"] = fn.date.format(ins.opts["data-value"]);
			};
			
			// 初始化
			ins.element.fwb_dateinput(ins.opts);
			
			// 显示datavalue
			if(ins.opts["data-value"]){
				var date = fn.date.get(ins.opts["data-value"]);
				if(date){
					ins.setValue(date.getFullYear(), date.getMonth() + 1, date.getDate());
				};
			}
		});
	}; // end fn.widget.date
	
	fn.widget.date.methods = {
		
		init: function(){
			var ins = this;
		},
		
		method: function(methodName, type, args){
			var ins = this,
			    api = ins.element.data(ins.plugin);
			
			// 根据参数返回执行结果或者ins本身
			if(type == "get"){
				return api[methodName].apply(ins.element, args);
			}else{
				api[methodName].apply(ins.element, args);
				return ins;
			};
		},
		
		setValue: function(year, month, day){
			if(month){
				month -= 1;
			};
			return this.method("setValue", "set", [year, month, day]);
		}
		
	}; // end fn.widget.date.methods
	
	
	

	//----------------------------
	// 组件 - validate
	// 2012/3/6
	//----------------------------
	/// widget.validate
	fn.widget.validate = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "validate",
				element: el,
				opts: $.extend({}, fn.tagAttrs(el, ""), opt),
				methods: {}
			},
			sets = [""],
			gets = [""];
		//
		;return fn.fwb(ins, function(ins){
			
			// 初始化
			fn.fwbToolsMethods(ins, "get", gets);
			fn.fwbToolsMethods(ins, "set", sets);
			
			$.extend(
				ins,
				ins.methods,
				fn.widget.validate.methods
			);
			
			$("[required],[validType]", ins.element).fwb_validatebox();
			$("[required]", ins.element).removeAttr("required");
			
			if(ins.element.is("form")){
				ins.element.submit((function(ins){
					return function(){
						return ins.validate();
					};
				})(ins));
			}
			
		});
	}; // end fn.widget.validate
	
	fn.widget.validate.methods = {
		
		init: function(){
			var ins = this;
		},
		
		validate: function(){
			var ins = this;
			if(ins.element.is("form")){
				return ins.element.fwb_form('validate');
			}else{
				var elems = ins.element.filter("[required],[validType]");
				for(var i = 0, len = elems.length; i < len; i++){
					if(!$(elems[i]).fwb_validatebox('isValid')){
						return false;
					}
				}
				return true;
			};
		}
		
	}; // end fn.widget.validate.methods
	
	//
	fn.widget.validate.rules = $.fn.fwb_validatebox.defaults.rules;
	
	fn.widget.validate.add = function(rules){

		// 扩展验证规则
		$.extend(fn.widget.validate.rules, rules);
	};
	
	// 扩展验证规则
	//$.extend(fn.widget.validate.rules, {
	fn.widget.validate.add({
		// 日期
		date: {  
			validator: function(value){
				var reg = /^((((((0[48])|([13579][26])|([2468][048]))00)|([0-9][0-9]((0[48])|([13579][26])|([2468][048]))))-(2|02)-29)|(((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9][0-9])|([1-9][0-9][0-9][0-9]))-((((0[13578])|(1[02]))-31)|((([1,3-9]|0[1,3-9])|(1[0-2]))-(29|30))|((([1-9]|0[1-9])|(1[0-2]))-(([1-9]|0[1-9])|(1[0-9])|(2[0-8]))))))$/i;
				return reg.test(value);
			},  
			message: function(value){
				return value + "不是有效的日期";
			}
		},
		// 数字
		number: {
			validator: function(val, param){
				if(!param || param.length == 0){
					return !isNaN(val);
				}else if(param.length == 1){
					return !isNaN(val) && val >= param[0];
				}else if(param.length == 2){
					return !isNaN(val) && val >= param[0] && val <= param[1];
				};
			},  
			message: function(val, param){
				if(!param || param.length == 0){
					return '请输入一个有效的数字';
				}else if(param.length == 1){
					return '请输入大于等于' + param[0] + '的数字';
				}else if(param.length == 2){
					return '请输入范围在[' + param[0] + ',' + param[1] + ']间的数字';
				};
			}
		},
		// 整数
		integer: {
			validator: function(val, param){
				
				val = fn.replace(val, ",", "");
				
				if(!param || param.length == 0){
					return !isNaN(val) && (val == parseInt(val));
				}else if(param.length == 1){
					return !isNaN(val) && (val == parseInt(val)) && val >= param[0];
				}else if(param.length == 2){
					return !isNaN(val) && (val == parseInt(val)) && val >= param[0] && val <= param[1];
				};
			},  
			message: function(val, param){
				
				val = fn.replace(val, ",", "");
				
				if(!param || param.length == 0){
					return '请输入一个有效的整数';
				}else if(param.length == 1){
					return '请输入大于等于' + param[0] + '的整数';
				}else if(param.length == 2){
					return '请输入范围在[' + param[0] + ',' + param[1] + ']间的整数';
				};
			}
		},
		// 货币
		money: {
			validator: function(val, param){
				
				val = fn.replace(val, ",", "");
				val = fn.replace(val, "￥", "");
				val = fn.replace(val, "$", "");
				
				if(!param || param.length == 0){
					return !isNaN(val);
				}else if(param.length == 1){
					return !isNaN(val) && val >= param[0];
				}else if(param.length == 2){
					return !isNaN(val) && val >= param[0] && val <= param[1];
				};
			},  
			message: function(val, param){
				if(!param || param.length == 0){
					return '请输入一个有效的金额';
				}else if(param.length == 1){
					return '请输入大于等于' + param[0] + '的金额';
				}else if(param.length == 2){
					return '请输入范围在[' + param[0] + ',' + param[1] + ']间的金额';
				};
			}
		}
	}); // end $.extend(fn.widget.validate.rules)
	
	// 扩展验证规则(外部js)
	(function(){
		var _rules = fn.remote("{fn}/lib/widget/1.3/validateRules.js");
		fn.widget.validate.add(_rules);
	})();
	
	//----------------------------
	// 组件 - money
	//----------------------------
	(function(){
		// 
		function allowEmpty(ins){
				
			// 如果参数允许， 输入框的值可以为空
			var val = $.trim(ins.element.val());
			if(ins.opts.allowEmpty){
				val = fn.money.toNumber(val);
				if(!val){
					ins.element.val("");
				};
			}; // end if
				
		};
		
		/// widget.money
		fn.widget.money = function(elem, opt){
			var el = $(elem),
				ins = {
					element: el,
					opts: $.extend(
						{onkeydown: window.fwb_currenciesOnly}, 
						fn.tagAttrs(el, "symbol,scale,format,separator,separator,noSeparator,allowEmpty"), 
						opt
					),
					methods: {}
				},
				sets = [""],
				gets = [""];
			//
			;return fn.fwb(ins, function(ins){
				
				ins.element
					.fwb_formatCurrency(ins.opts)
					.bind('keydown', ins.opts.onkeydown)
					.bind('blur', (function(ins){
						return function(){
							
							// 
							$(this).fwb_formatCurrency(ins.opts);
						
							// 如果参数允许， 输入框的值可以为空
							allowEmpty(ins);
						};
					})(ins));
				
				// 如果参数允许， 输入框的值可以为空
				allowEmpty(ins);
				
			});
		}; // end fn.widget.money
	})();
	
	
	//----------------------------
	// 组件 - number
	//----------------------------
	/// widget.number
	fn.widget.number = function(elem, opt){
		return fn.widget.money(elem, 
			$.extend({
				scale: -1,
				symbol: "",
				onkeydown: window.fwb_decimalsOnly
			}, opt, fn.tagAttrs(elem, "symbol,scale,onkeydown"))
		);
	}; // end fn.widget.number
	
	
	//----------------------------
	// 组件 - bankcard
	//----------------------------
	/// widget.bankcard
	fn.widget.bankcard = function(elem, opt){
		var el = $(elem),
			ins = {
				element: el,
				opts: $.extend({}, 
					fn.tagAttrs(el, ""), 
					opt
				),
				methods: {}
			},
			sets = [""],
			gets = [""];
		//
		;return fn.fwb(ins, function(ins){
				
			var tip = ins.tip = $('<div class="fn-bankacc-tip" style="display:none;"></div>').appendTo("body");
			
			el.data("tip", tip)
				.keydown(fwb_numbersAndCommasOnly)
				.keyup(function(){
					showtip(el,tip);
				})
				.focus(function(){
					showtip(el,tip);
				})
				.blur(function(){
					tip.hide();
				})
				.attr("maxlength", 19);
				
			
			var allowedSpecialCharKeyCodes = [46,8,37,39,35,36,9],
				numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
				commaKeyCode = [188],
				decimalKeyCode = [190,110];
					
			function fwb_numbersAndCommasOnly (event) {
				var legalKeyCode =
					(!event.shiftKey && !event.ctrlKey && !event.altKey)
						&&
					($.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
						||
					$.inArray(event.keyCode, numberKeyCodes) >= 0
						||
					$.inArray(event.keyCode, commaKeyCode) >= 0);
			
				if (legalKeyCode === false)
					event.preventDefault();
			}; //
			
			function showtip(el, div){
				var val = el.val(),
					ary = [];
				
				// 分隔
				for(var i = 0; i < val.length; i++){
					ary.push(val.charAt(i));
					if((i+1)%4 == 0) ary.push("&nbsp;&nbsp;");
				};
				ary = ary.join("");
				
				// 有效性及银行卡信息
				if(val.length >= 16 && fn.money.bankcard(val)){
					ary += "<br/>" + (find(val) || "有效");
				};
				
				div.html(ary);
				
				if(ary){
					// 重设位置
					fn.dom.pin({element: div, x: "0" , y: "bottom"}, {element: el, x: 0, y: "top - 10px"});
					tip.bgiframe();
					div.show();
				}else{
					div.hide();
				};
			};
			
			// 查找银行卡信息
			function find(str){
				var _rules = fn.widget.bankcard._rules;
				for(var n in _rules){
					if(str.indexOf(n) > -1){
						return _rules[n];
					}
				};
			}; //
			
		});
	}; // end fn.widget.money
	
	fn.widget.bankcard._rules = {
		"436742": "中国建设银行VISA龙卡借记卡",
		"436745": "中国建设银行VISA龙卡贷记卡",
		"622280": "中国建设银行支付宝龙卡借记卡",
		"458123": "交通银行VISA普通卡",
		"521899": "交通银行MC信用卡普通卡",
		"622260": "交通银行太平洋卡借记卡",
		"402674": "上海银行VISA金卡",
		"622892": "上海银行借记卡",
		"622188": "中国邮政储蓄绿卡借记卡",
		"602969": "北京银行京卡借记卡",
		"622760": "中国银行中银都市卡",
		"409666": "中国银行BOC系列VISA标准卡普通卡/VISA高校认同卡",
		"438088": "中国银行国航知音信用卡",
		"622752": "中国银行上海市分行长城人民币贷记卡普通卡",
		"427020": "中国工商银行VISA学生国际信用卡",
		"427030": "中国工商银行VISA国际信用卡金卡",
		"530990": "中国工商银行MC国际信用卡普通卡",
		"622230": "中国工商银行新版人民币贷记卡普卡",
		"622235": "中国工商银行新版人民币贷记卡金卡",
		"622210": "中国工商银行新版信用卡(准贷)普卡",
		"622215": "中国工商银行新版信用卡(准贷)金卡",
		"622200": "中国工商银行牡丹灵通卡借记卡",
		"955880": "中国工商银行原牡丹灵通卡借记卡",
		"622568": "广东发展银行新理财通借记卡",
		"520152": "广东发展银行南航明珠卡MC金卡",
		"520382": "广东发展银行南航明珠卡MC普卡",
		"911121": "广东发展银行理财通借记卡",
		"548844": "广发真情卡",
		"512431": "宁波银行",
		"520194": "宁波银行",
		"622318": "宁波银行",
		"622778": "宁波银行",
		"622282": "宁波银行汇通卡人民币金卡/钻石联名卡",
		"407405": "民生银行",
		"517636": "民生银行",
		"512466": "中国民生银行MC金卡",
		"415599": "中国民生银行星座卡借记卡",
		"421870": "中国民生银行VISA信用卡金卡",
		"622622": "中国民生银行蝶卡银卡借记卡",
		"528948": "民生银行",
		"552288": "民生银行",
		"556610": "民生银行",
		"622600": "民生银行",
		"622601": "民生银行",
		"622602": "民生银行",
		"622603": "民生银行",
		"421869": "民生银行",
		"421871": "民生银行",
		"628258": "民生银行",
		"418152": "上海浦东发展银行奥运WOW卡美元单币",
		"456418": "上海浦东发展银行WOW卡/奥运WOW卡",
		"622521": "上海浦东发展银行东方卡借记卡",
		"404738": "上海浦东发展银行VISA普通卡",
		"404739": "上海浦东发展银行VISA金卡",
		"498451": "浦东发展银行",
		"622517": "浦东发展银行",
		"622518": "浦东发展银行",
		"515672": "浦东发展银行",
		"517650": "浦东发展银行",
		"525998": "浦东发展银行",
		"356850": "浦东发展银行",
		"356851": "浦东发展银行",
		"356852": "浦东发展银行",
		"435744": "深发展联名普卡",
		"622526": "深发展卡普通卡",
		"435745": "深发展联名金卡",
		"998801": "深圳发展银行",
		"998802": "深圳发展银行",
		"622525": "深发展卡金卡",
		"622538": "深圳发展银行发展卡借记卡",
		"406254": "光大银行",
		"622655": "光大银行",
		"622650": "光大银行",
		"622658": "光大银行",
		"356839": "光大银行",
		"486497": "光大银行",
		"481699": "光大银行",
		"543159": "光大银行",
		"425862": "光大银行",
		"406252": "光大银行",
		"356837": "光大银行",
		"356838": "光大银行",
		"356840": "光大银行",
		"622161": "光大银行",
		"628201": "光大银行",
		"628202": "光大银行",
		"622155": "深圳平安银行",
		"622156": "深圳平安银行",
		"528020": "深圳平安银行万事达卡普卡",
		"526855": "深圳平安银行万事达卡金卡",
		"539867": "华夏银行",
		"528709": "华夏银行",
		"523959": "华夏银行MC钛金卡",
		"622637": "华夏银行人民币卡金卡",
		"622636": "华夏银行人民币卡普卡",
		"528708": "华夏银行MC金卡",
		"539868": "华夏银行MC普卡",
		"518710": "招商银行哆啦A梦粉丝信用卡",
		"518718": "招商银行哆啦A梦粉丝信用卡珍藏版卡面/MC贝塔斯曼金卡/MC车主卡",
		"622588": "招商银行QQ一卡通借记卡",
		"622575": "招商银行HELLO KITTY单币卡",
		"545947": "招商银行",
		"521302": "招商银行",
		"439229": "招商银行",
		"552534": "招商银行",
		"622577": "招商银行",
		"622579": "招商银行",
		"439227": "招商银行",
		"479229": "招商银行",
		"356890": "招商银行",
		"356889": "招商银行JCB信用卡普通卡",
		"356885": "招商银行",
		"439188": "招商银行VISA白金卡",
		"545948": "招商银行",
		"545623": "招商银行",
		"552580": "招商银行",
		"552581": "招商银行",
		"552582": "招商银行",
		"552583": "招商银行",
		"552584": "招商银行",
		"552585": "招商银行",
		"552586": "招商银行",
		"552588": "招商银行",
		"552589": "招商银行",
		"645621": "招商银行",
		"545619": "招商银行",
		"356886": "招商银行",
		"622578": "招商银行",
		"622576": "招商银行",
		"622581": "招商银行",
		"439228": "招商银行",
		"439225": "招商银行VISA信用卡普通卡",
		"439226": "招商银行VISA信用卡金卡",
		"628262": "招商银行",
		"628362": "招商银行",
		"628362": "招商银行",
		"628262": "招商银行",
		"376968": "中信银行",
		"376966": "中信银行",
		"622918": "中信银行",
		"622916": "中信银行",
		"518212": "中信银行国航知音信用卡/万事达卡普通卡",
		"622690": "中信银行理财宝卡借记卡",
		"520108": "中信银行万事达卡金卡",
		"376969": "中信银行",
		"622919": "中信银行",
		"556617": "中信银行",
		"622680": "中信银行蓝卡/I卡信用卡",
		"403391": "中信银行",
		"558916": "中信银行",
		"514906": "中信银行",
		"400360": "中信银行",
		"433669": "中信银行",
		"433667": "中信银行",
		"433666": "中信银行",
		"404173": "中信银行",
		"404172": "中信银行",
		"404159": "中信银行",
		"404158": "中信银行",
		"403393": "中信银行",
		"403392": "中信银行",
		"622689": "中信银行",
		"622688": "中信银行",
		"433668": "中信银行",
		"404157": "中信银行",
		"404171": "中信银行",
		"404174": "中信银行",
		"628209": "中信银行",
		"628208": "中信银行",
		"628206": "中信银行",
		"451289": "兴业银行",
		"622909": "兴业银行",
		"622902": "兴业银行",
		"622901": "兴业银行",
		"527414": "兴业银行",
		"524070": "兴业银行",
		"486493": "兴业银行",
		"486494": "兴业银行",
		"451290": "兴业银行",
		"523036": "兴业银行",
		"486861": "兴业银行",
		"622922": "兴业银行",
		"552599": "农业银行",
		"404119": "农业银行",
		"404121": "农业银行",
		"519412": "农业银行",
		"403361": "农业银行",
		"558730": "农业银行",
		"520083": "农业银行",
		"520082": "农业银行",
		"519413": "农业银行",
		"49102": "农业银行",
		"404120": "农业银行",
		"404118": "农业银行",
		"53591": "农业银行",
		"404117": "农业银行",
		"622836": "中国农业银行人民币贷记卡/香港旅游卡贷记卡金卡",
		"622837": "中国农业银行人民币贷记卡/香港旅游卡贷记卡普卡",
		"622848": "中国农业银行世纪通宝借记卡"
	};
	
	
	//----------------------------
	// 组件 - int
	//----------------------------
	/// widget.int
	fn.widget.int = function(elem, opt){
		return fn.widget.number(elem,
			$.extend({
				scale: 0,
				onkeydown: window.fwb_numbersOnly
			}, opt)
		);
	}; // end fn.widget.int
	
	
	
	//----------------------------
	// 组件 - window
	//----------------------------
	/// widget.window
	fn.widget.window = function(elem, opt){
		var el = $(elem),
			ins = {
				plugin: "fwb_window",
				element: el,
				opts: $.extend(
					{
						width: 500, 
						height: 250
					},
					fn.tagAttrs(el, "autoOpen,url,href,width,height,maximize,minimize,maximized,minimized,autoLoad,draggable,resizable,shadow,modal,zIndex,closable,closed,left,top,noheader,content,cache,loadingMessage"), opt),
				methods: {}
			};
			
			// 兼容旧版本jqueryDemo中的fn.widget.model
			//ins.opts.href = ins.opts.href || ins.opts.url;
		//
		;return fn.fwb(ins, function(ins){
			// 包装方法
			fn.fwbMethods(ins, ["setTitle","open","close","destroy","refresh","resize","move","maximize","minimize","restore","collapse","expand", "options","panel","panel:fwb_panel","header","body"]);
			
			$.extend(
				ins, 
				ins.methods,
				fn.widget.window.methods
			);
			ins.element[ins.plugin](ins.opts);
			
			ins.element.css({width: ins.opts.width, height: ins.opts.height}); 
			
			if(ins.opts.autoOpen){
				if(ins.opts.maximize) ins.maximize();
			}else{
				ins.close();
			};
			
			if(ins.opts.url && ins.opts.autoLoad){
				ins.element.load(ins.opts.url);
			};
		});
	}; // end fn.widget.window
	
	fn.widget.window.methods = {
		load: function(url, postData, callback){
			var ins = this;
			ins.element.html("加载中...").load(url || ins.opts.url, postData, callback);
		}
	};
	
	// 消息提示控件
	/// widget.msg
	fn.widget.msg = function(msg, opt){
		var sType, sClose, sBtns, sWidth, sHeight;
		var ins = {};
		
		msg = fn.replace(msg + "", "\n", "<br/>");
		
		opt = $.extend({
			type: "msg",
			title: "提示",
			time: 0,
			width: "",
			position: ""
		}, opt);
		
		// 消息类型cls
		sType = {
			"msg":"m_t_msg", 
			"confirm":"m_t_confirm", 
			"error": "m_t_error", 
			"warn": "m_t_warn"
		}[opt.type] || "m_t_msg";
		
		// 关闭按钮，confirm类型中无
		sClose = (opt.type == "confirm") ? "" : '<span class="m_close">关闭</span>';
		
		// 按钮组
		sBtns = (opt.type != "confirm") ? "" : 
			('<div class="m_buttons">' + 
				'<span class="m_ok">确定</span>' +
				'<span class="m_cancel">取消</span>' +
			 '</div>');
		
		// 尺寸
		if(!opt.width){
			sWidth = '';
		}else if(opt.width == "auto" && (!window.ActiveXObject || document.documentMode)){ // IE89及火狐谷歌才允许auto
			sWidth = 'width:auto;';
		}else if(!isNaN(opt.width)){
			sWidth = 'width:' + opt.width + 'px; overflow-x:auto;';
		}else if(opt.width == "max"){
			sWidth = ";width:" + (fn.dom.clientWidth() - 40) + "px";
		}else{
			sWidth = '';
		};
		
		if(!opt.height){
			sHeight = '';
		}else if(opt.height == "auto"){
			sHeight = 'height:auto;';
		}else if(!isNaN(opt.height)){
			sHeight = 'height:' + opt.height + 'px; overflow-y:auto;';
		}else if(opt.height == "max"){
			sHeight = ";height" + (fn.dom.clientHeight() - 200) + "px";
		}else{
			sHeight = '';
		};
		// 
		var div = fn.format(
			'<div style="">'+ // 增加这个div为了解决bgiframe问题
			'<div class="tools_msg {0}" style="position:absolute; _position:absolute; z-index:9999; {4}">' +
			' 	<div class="m_head" onselectstart="return false">' +
			'     	<span class="m_title">{1}</span>&nbsp;' +
			'     	<span class="m_time" title="取消倒计时"></span>&nbsp;&nbsp;' +
			'     	<span class="m_close" title="点击关闭">关闭</span>' +
			'     </div>' +
			' 	<div class="m_main" style="overflow:auto; {5}">{3}</div>' +
			'   {2}' +
			'</div></div>', sType, opt.title, sBtns, msg, sWidth, sHeight);
		
		div = $(div).appendTo(document.body);
		
		if(opt.type == "confirm"){ $(".m_close", div).hide(); };
		
		// 穿透
		div.width($(".tools_msg", div).width()+2);
		div.height($(".tools_msg", div).height()+2);
		//
		div.bgiframe();
		
		function hide(div){
			div.fadeOut(100, function(){
				div.remove();
			});
		};
		
		// 拖动
		div.draggable2({ handler: ".m_head"});
		
		// 绑定事件
		$(".m_time", div).click((function(div){
			return function(){ div.suspend = !div.suspend; $(".m_time", div).html(""); };
		})(div));
		$(".m_close", div).click((function(div){
			return function(){ hide(div); };
		})(div));
		$(".m_ok", div).click((function(div){
			return function(){ if($.isFunction(opt.ok) && (opt.ok() == false)) return; hide(div); };
		})(div));
		$(".m_cancel", div).click((function(div){
			return function(){ if($.isFunction(opt.cancel) && (opt.cancel() == false)) return; hide(div); };
		})(div));
		
		// 偏移量
		var offset = fn.widget.msg.offset || 0;
		fn.widget.msg.offset = offset = offset >= 20 ? 0 : offset + 2;
		
		// 设置位置
		function setDivPos(div, opt){
			//
			div.css("position", (!window.XMLHttpRequest || document.compatMode == "BackCompat") ? "absolute" : "fixed");
			
			var padding = "10px";
			var ary = opt.position.split(" ");
			
			//
			function getPos(str, _offset){
				var key = "", 
					val = "",
					str = fn.replace(str, "px", "");
				
				for(var i = 0; i < ary.length; i++){
					if(ary[i].indexOf(str) > -1){
						var ary2 = ary[i].split(":");
						key = ary2[0];
						if(ary2.length > 1) val = ary2[1];
						break;
					};
				};
				
				val = parseInt(val) || 10;
				if(!window.XMLHttpRequest && (key.indexOf("top") > -1)) val += $(document).scrollTop();
				
				return parseFloat(val) + _offset + "px"; // defaultValue
			};
			
			// 纵向
			if(opt.position.indexOf("bottom") > -1){ 
				div.css("bottom", getPos("bottom", offset)); // 下
			}else if(opt.position.indexOf("top") > -1){ 
				div.css("top", getPos("top",  -offset)); // 上
			}else{ 
				div.css("top", ($(window).height() - div.outerHeight())/2 + (!window.XMLHttpRequest ? $(document).scrollTop() : 0) - offset);
			};
			
			// 横向
			if(opt.position.indexOf("right") > -1){
				div.css("right", getPos("right", offset)); // 右
			}else if(opt.position.indexOf("left") > -1){ 
				div.css("left", getPos("left", -offset)); // 左
			}else{ 
				div.css("left", ($(window).width() - div.outerWidth())/2 - offset);
			};
			
		};
		
		// 立即设置
		setDivPos(div, opt);
		
		// 自动居中
		//$(window).resize((function(div, opt){
		//	return function(){
		//		setDivPos(div, opt);
		//	};
		//})(div, opt)); // 立即触发
		
		// 自动关闭
		if((opt.time > 0) && (opt.type != "confirm")){
			
			var timer = (function(div, opt){
				return function(){
					if(div.suspend) return;
					
					opt.time -= 1000;
					$(".m_time", div).html(parseInt(opt.time/1000) + "秒后");
					
					if(opt.time > 0){
						setTimeout(timer, 1000);
					}else{
						hide(div);
					};
				};
			})(div, opt);
			
			timer(); //
			//tools.getShimIframe(elem).fadeOut(opt.time);
		}; // end 自动关闭
		
	}; // end fn.widget.msg

	
	/// widget.warn
	fn.widget.warn = function(msg, opt){
		opt = $.extend({type:"warn"},opt);
		return fn.widget.msg(msg, opt);
	};
	
	/// widget.error
	fn.widget.error = function(msg, opt){
		opt = $.extend({type:"error"},opt);
		return fn.widget.msg(msg, opt);
	};
	
	/// widget.confirm
	fn.widget.confirm = function(msg, opt){
		opt = $.extend({type:"confirm"},opt);
		return fn.widget.msg(msg, opt);
	};
	
	
})(fn.jQuery);



/// 模块
(function($){
	if(!fn || !fn.widget) return;
	
	var Module, ListModule, QueryModule, BoxModule, EditModule;
	
	
	//==============
	// 模块
	//==============
	Module = function(target, config){
		return this.init(target, config);
	};
	Module.prototype = {
		
		_configNames: ["url","action","title"],
		
		_eventNames: ["onInit"],
		
		_regConfig: function(name){
			this._configNames.push(name);
		},
		
		_regEvent: function(name){
			this._eventNames.push(name);
		},
		
		// 初始化（读取参数和事件）
		init: function(target, config){
			
			this.target = $(target);
			if(!this.target.length){
				return;
			};
			
			// 读取target参数
			this.config = $.extend(this.config || {}, 
				fn.tagAttrs(this.target, this._configNames.join(","))
			);
			this.config.event = $.extend(this.config.event || {},
				fn.tagAttrs(this.target, this._eventNames.join(","))
			);
			
			// 读取参数
			$.extend(true, this.config, config);
			
		}, // end init
		
		// 取得关联的ListModule
		getListModule: function(){
			return fn.widget.listModule;
		},
		
		// 取得关联的QueryModule
		getQueryModule: function(){
			return fn.widget.queryModule;
		},
		
		// 刷新列表
		refreshList: function(){
			var l = this.getListModule();
			l && l.reload && l.reload();
		}
		//
//		// 刷新列表
//		queryList: function(){
//			var q = this.getQueryModule();
//			q && q.query && q.query(false);
//		}
		
	}; // end Module.prototype
	
	
	
	//==============
	/// 查询模块
	//==============
	QueryModule = function(target, config){
		return this.init(target, config);
	};
	QueryModule.prototype = $.extend({}, Module.prototype, {
		
		// 初始化
		init: function(target, config){
			var self = this;
			
			this.config = {
				labelWidth: 100,
				colspan: 2
			};
			
			// 参数和事件
			this._regConfig("labelWidth,colspan");
			
			// 执行基类初始化方法
			Module.prototype.init.apply(this, arguments);
			
			this.build();
		}, // end init
		
		form: null,
		
		// 创建html
		build: function(){
			var self = this,
				hasTable = $("table", self.target).length >= 1,
				inputs = hasTable ? [] : self.target.children().not(":hidden");
			
			if(inputs.length && !hasTable){
				var cols = self.config.colspan;
				var rows = parseInt(inputs.length/cols);
				if(rows < inputs.length/cols) rows++; 
				
				// 表格结构
				var tb = $('<table/>');
				for(var i = 0; i < rows; i++){
					var tr = $('<tr/>');
					for(var j = 0; j < cols; j++){
						$('<td width="' + self.config.labelWidth + '" class="td-label"></td><td class="td-input"></td>').appendTo(tr);
					};
					tr.appendTo(tb);
				};
				self.target.html(tb);
				tb.wrap('<form></form>');
				
				// 控件组
				var tdLabels = $("td.td-label", self.target);
				var tdInputs = $("td.td-input", self.target);
				$.each(inputs, function(i,n){
					var label = $(n).attr("title");
					$(tdLabels[i]).append(label ? label + "：" : "");
					$(tdInputs[i]).append(n);
				});
				
				self.target.show();
			}; // end if(inputs.length){
			
			self.form = self.target.find("form");
			
		}, // end build
		
		// 查询
		query: function(dontValid){
			var self = this;
			//
			if(dontValid && !$validate(self.form).validate()){
				return;
			};
			
			// 读取查询条件
			//var postData = fn.urlStrToObj($(":input", self.form).serialize());
			//[fn-2012.09]解决可能因为post数据被编码而引起服务器端报错的问题
			var params = fn.form2param(self.form);
			
			// 刷新表格
			var listModule = self.getListModule();
			listModule && listModule.reload && listModule.reload(params);
		},
		
		// 重置表单
		reset: function(){
			var form = this.form.get(0);
			form && form.reset && form.reset();
		}
		
	}); // end QueryModule.prototype
	
	
	
	//==============
	/// 列表模块
	//==============
	/*
		liuhp update 2012/09 ：解决ListModule加载时未传入查询条件的问题
	*/
	ListModule = function(target, config){
		return this.init(target, config);
	};
	ListModule.prototype = $.extend({}, Module.prototype, {
		
		// 初始化
		init: function(target, config){
			var self = this;
			
			// 执行基类初始化方法
			Module.prototype.init.apply(this, arguments);
			
			if(!this.target || !this.target.length) {
				fn.log("ListModule error.");
				return;
			};
			
			this.listTarget = this.target.children(":eq(0)");
			this.target.show();
			
			// 检测list控件的类型
			function getCls(){
				var cls = self.listTarget.attr("class");
				if(!cls) return null;
				cls = cls.split(" ");
				var types = ["fn-datagrid", "fn-treegrid", "fn-treelist", "treelist"];
				for(var i = 0; i < cls.length; i++){
					for(var j = 0; j < types.length; j++){
						if(cls[i] === types[j]){
							return cls[i];
						};
					};
				};
				return null;
			};
			
			var qm = window.$queryModule;
			
			// 如果检测到查询模块， 由查询模块来触发list的第一次reload事件
			if(qm){
			
				// 取得控件类型， 并且删除其cls以实现手动初始化
				var cls = getCls();
				this.cls = cls;
				this.listTarget.removeClass(cls);
				
				// 实现手动初始化
				if(cls === "fn-datagrid"){
					this.list = fn.widget.datagrid(this.listTarget, {autoLoad: false});
					
				}else if(cls === "fn-treegrid"){
					this.list = fn.widget.treegrid(this.listTarget, {autoLoad: false});
					
				}else if(cls === "treelist" || cls === "fn-treelist"){
					fn.use("widget/supcan", function(){
						self.list = $treelist(self.listTarget, {autoLoad: false});
					});
					
				}else{
					fn.log("ListModule错误： 不能识别的list控件类型");
					return;
				};
				
				// 延迟触发查询事件 
				setTimeout(function(){
					qm.query();
				}, 100);
				
			}; // end if
		}, // end init
		
		getList: function(){
			return this.list || $get(this.listTarget);
		},
			
		reload: function(param){
			var list = this.getList();
			list && list.reload && list.reload(null, param, true);
		}, // end reload
		
		getSelections: function(){
			var list = this.getList();
			
			if(!list){
				return [];
			};
			
			if(list.plugin === "fwb_datagrid"){
				return list.getSelections() || [];
			};
			
			return [];
		}
		
	}); //  end ListModule.prototype
	
	
	//==============
	// 弹出模块
	//==============
	BoxModule = function(target, config){
		return this.init(target, config);
	};
	BoxModule.prototype = $.extend({}, Module.prototype, {
		box: null,
		
		// 初始化
		init: function(target, config){
			var self = this;
			
			// 参数和事件
			this._regConfig("max, iframe");
			
			// 执行基类初始化方法
			Module.prototype.init.apply(this, arguments);
			
		}, // end init
		
		open: function(param, cb){
			var self = this;
			var boxConfig = $.extend({
					max: true,
					iframe: false,
					postData: param
				}, this.config); // end boxConfig
			
			fn.use("dom/box", function(){
				self.box = fn.dom.box(boxConfig);
				
				// 初始化业务组件
				var target = $("input, div", self.box.target);
				bt.initialize(target);
				fn.widget.initialize(target);
				
				if($.isFunction(cb)){
					cb.call(self);
				};
			});
			
		}, // end open
		
		close: function(){
			var self = this;
			self.box.hide();
			// 清除box（如果不加延时直接清除， 会报错）
			setTimeout(function(){
				self.box.target.remove();
				self.box = null;
			},200);
		}
		
	}); // end BoxModule.prototype
	
	
	
	//==============
	/// 编辑模块
	//==============
	EditModule = function(target, config){
		return this.init(target, config);
	};
	EditModule.prototype = $.extend({}, BoxModule.prototype, {
		
		// 初始化
		init: function(target, config){
			var self = this;
			
			// 参数和事件
			this._regEvent("onAfterSubmit");
			
			// 执行基类初始化方法
			BoxModule.prototype.init.apply(this, arguments);
		},
		
		open: function(param, cb){
			var self = this;
			
			// 执行基类方法
			BoxModule.prototype.open.call(this, param, function(){
				// 记录表单初始信息， 保存时判断是否更改
				var form = $(self.box.target).find("form"),
					data = form.serialize();
				
				// 绑定事件
				self.box.target.find(".fn-button-close").click(function(){
					//
					var isChange = data != form.serialize();
					if(isChange && confirm('您有未保存的更改，点击"确定"进行保存！')){
						self.doSubmit();
					}else{
						self.close();
					};
				});
				
				// 绑定提交按钮
				self.box.target.find(".fn-button-submit").click(function(){
					self.doSubmit();
				});	
				
				if($.isFunction(cb)){
					cb.call(self);
				};
			});
			
		},
		
		doSubmit: function(){
			var self = this;
			
			var form = $(self.box.target).find("form");
			
			// 检查表单
			if(!$validate(form).validate()) return;
			
			$.ajax({
				url: self.config.action,
				type: "post",
				data: form.serialize(),
				dataType: "json",
				cache: true,
				success: function(data){
					// 调用onAfterSubmit事件， 如未指定就调用默认事件
					(self.config.event.onAfterSubmit || self._onAfterSubmit).call(self, data);
				},
				error: function(){
					// 调用onAfterSubmit事件， 如未指定就调用默认事件
					var data = {success: false, msg: "异步错误"};
					(self.config.event.onAfterSubmit || self._onAfterSubmit).call(self, data);
				}
			});
		},
		
		// 默认onAfterSubmit事件
		_onAfterSubmit: function(){
			this.refreshList();
			this.close();
		}
		
	}); // end EditModule.prototype
	
	
	
	//==============
	/// 删除模块
	//==============
	DelModule = function(target, config){
		return this.init(target, config);
	};
	DelModule.prototype = $.extend({}, Module.prototype, {
		
		// 初始化
		init: function(target, config){
			var self = this;
			
			// 参数和事件
			this._regConfig("pk");
			this._regEvent("onAfterSubmit");
			
			// 执行基类初始化方法
			BoxModule.prototype.init.apply(this, arguments);
		},
		
		// 执行删除
		del: function(opt){
			var self = this;
			
			if(typeof opt == "string"){
				param = opt;
				$warn("确认要删除吗？", {type:"confirm", ok: doDelete});
			}else{
				var listModule = self.getListModule();
				var sels = listModule ? listModule.getSelections() : [];
				
				if(!sels || !sels.length) {
					$warn("请选择要删除的记录！", {time: 3000});
					return;
				};
			
				var ids = [];
				var errRows = [];
				var callback = (opt && typeof(opt.callback) === "function") || null;
				$.each(sels, function(i, obj){
					// 如果有回调函数，并且回调函数未返回true的话return
					if(callback && !callback(obj)){
						errRows.push(i);
						return;
					};
					// 记录主键
					ids.push(obj[self.config.pk]);
				});
				
				// 判断是否有不可删除的行 
				if(errRows.length){
					alert("您选择的第[" + errRows.join(",") + "]行数据无法删除。");
				}else{
					// 确认后进行删除
					param = self.config.pk + "=" + ids.join(",");
					$warn("要删除选中的" + sels.length + "条记录吗？", {type:"confirm", ok: doDelete});
				};
			};
			
			function doDelete(){
				$.ajax({
					url: self.config.action,
					type: "post",
					data: param,
					dataType: "json",
					cache: false,
					success: function(data){
						// 调用onAfterSubmit事件， 如未指定就调用默认事件
						(self.config.event.onAfterSubmit || self._onAfterSubmit).call(self, data);
					},
					error: function(){
						// 调用onAfterSubmit事件， 如未指定就调用默认事件
						var data = {success: false, msg: "异步错误"};
						(self.config.event.onAfterSubmit || self._onAfterSubmit).call(self, data);
					}
				});
			} // end doDelete
		}, // end del
		
		// 默认onAfterSubmit事件
		_onAfterSubmit: function(data){
			if(data){
				$msg(data.msg || (data.success ? "删除成功" : "删除失败"));
			};
			this.refreshList();
		}
		
	}); // end DelModule.prototype
	
	
	
	// 扩展fn.widget
	$.extend(fn.widget, {
		Module: Module,
		ListModule: ListModule,
		QueryModule: QueryModule,
		BoxModule: BoxModule,
		EditModule: EditModule
	});
	
	/// widget.module.init
	fn.widget.module = {
		
		
		// 初始化
		init: function(){
			if($(".fn-queryModule").length){
				window.$queryModule = fn.widget.queryModule = new QueryModule(".fn-queryModule");
			};
			if($(".fn-listModule").length){
				window.$listModule = fn.widget.listModule = new ListModule(".fn-listModule");
			};
			if($(".fn-addModule").length){
				window.$addModule = fn.widget.addModule = new EditModule(".fn-addModule");
			};
			if($(".fn-editModule").length){
				window.$editModule = fn.widget.editModule = new EditModule(".fn-editModule");
			};
			if($(".fn-viewModule").length){
				window.$viewModule = fn.widget.viewModule = new BoxModule(".fn-viewModule");
			};
			if($(".fn-delModule").length){
				window.$delModule = fn.widget.delModule = new DelModule(".fn-delModule");
			};
		} // end init
	}; // end fn.widget.module
	
	
	// DomReady
	// Module组件应先于普通控件初始化
	jQuery(fn.widget.module.init);
	
})(fn.jQuery);

	


fn.widget.init = function(selector){

	var $ = fn.jQuery;
	if(!$ || fn.widget._inited) return;
	
	fn.widget._inited = true;
	
//=====================================================================
/// p5 - 最终调用
//=====================================================================
(function($){
	
	// 注册
	fn.widget.reg(["combobox", "combotree", "tree", "radios", "checkboxs", "gridwindow", "datagrid", "msg", "warn", "error", "confirm", "tabs", "date", "money", "number", "int", "window", "validate", "bankcard", "treegrid", "combogrid"]);
	
	
	// 如果指定了window.fn_initTypes，则只在页面中查找并初始化指定的组件
	var _plugins = !window.fn_initTypes ? fn.widget.plugins : (function(){
		var ary = [];
		for(var n in (window.fn_initTypes_rely || {})){
			ary.push(n);
		};
		return ary;
	})();
	var _selector = _plugins.length ? $(selector).filter(".fn-" + _plugins.join(", .fn-")) : $();
	
	if($.isFunction(window.onBeforeFnInit)){
		window.onBeforeFnInit();
	};
	
	// 处理联动
	_selector.filter("[linkage]").each(function(){
		var _linkage = $(this).attr("linkage");
		_linkage = $(_linkage);
		_linkage.attr("bylinkage", "true");
	});
	
	fn.widget.initialize = function(selector){
		// 
		//bt.initialize();
		
		// 初始化
		$.each(_plugins, function(i,n){
			var target = $(selector || _selector);
			
			//$(".fn-" + n, target).each(function(){
			//	fn.widget[n](this);
			//});
			//console.log(n);
			target.filter(".fn-" + n).each(function(){
				fn.widget[n](this);
			});
		});
	};
	fn.widget.initialize();

	/**/
	// 让fn组件具有可以被reset功能
	$("form").each(function(){
		this._onreset = this.onreset;
		this.onreset = function(){
			var form = this, args = arguments;
			// 重置combobox和combbotree
			$("input", this).each(function(){
				var a = $get(this);
				if(a && a.reset) a.reset();
			});
			// 调用原来的onreset
			setTimeout(function(){
				if(form._onreset) form._onreset.apply(form, args);
			}, 10);
		};
	}); //
	
})(fn.jQuery);

}; // end fn.widget.init