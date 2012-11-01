/** 
 DOM处理
 @namespace 
 @name fn.dom
*/

window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	/*
	 如果在ie6下iframe内页出现横向滚动条， 给iframe内页的body设置： _width:0%;
	*/
	var box = function(opt){
		var self = this;
		
		self.id = "jq_box_" + parseInt(Math.random()*1000000);
		self.opt = opt = $.extend({
			width: 400,
			height: 300,
			title: "",
			titleCls: "default_title",
			target: "",
			content: "",
			modal: true,
			iframe: true,
			noborder: false,
			url: "",
			zIndex: 99,
			postData: null,
			max: false,
			show: true,
			cache: false,
			success: function(){}
		},opt);
		
		// 计算初始宽度
		var _initSize = self.opt.max ? {
			width: fn.dom.clientWidth(),
			height: fn.dom.clientHeight()
		} : {
			width: self.opt.width,
			height: self.opt.height
		};
		// 限制最大宽、高度
		_initSize.width = Math.min(_initSize.width, fn.dom.clientWidth());
		_initSize.height = Math.min(_initSize.height, fn.dom.clientHeight());
		//
		var _initSizeStyle = ' width:' + _initSize.width +'px; height:' + _initSize.height +'px; ';
		
		var html = 
			'<style>'+
			//'  html{overflow:hidden;}'+
			//'  .box_div{ z-index:' + self.opt.zIndex + '; background:#FFF; overflow:auto; position:absolute; top:0;}'+
			//'  .box_div iframe{border:none;}'+
			//'  .box_div .box_head{ border: 1px solid #CCC; height:30px; position:relative; background:#5683B8; color: #FFF;}'+
			//'  .box_div .box_title{ position:absolute; left:5px; top:8px; height:22px; font-size:14px; font-weight: bold;}'+
			//'  .box_div .box_body{ border: 1px solid #CCC; border-top:none; overflow:auto;}'+
			//'  .box_div .box_close{ background: url(http://www.chinaunbound.com/image/icon.png) -820px -720px no-repeat; cursor: pointer; position: absolute; right: 10px; top: 8px; width: 10px; height: 16px; text-indent: -10em; overflow: hidden;}'+
			//'  .box_div .box_close{ cursor: pointer; position: absolute; right: 5px; top: 8px; width: 30px; height: 20px; overflow: hidden; font-size:12px; text-decoration:underline;}'+
			'</style>'+
			'<div id="div_' + this.id + '" class="box_div" style=" ' + _initSizeStyle + ' ">' +
			'      <div class="box_head ' + self.opt.titleCls + '">'+
			'          <span class="box_title">' + opt.title + '</span>'+
			'          <span class="box_close"></span>'+
			'      </div>'+
			'      <div class="box_body"></div>'+
			'</div>';
		
		html = $(html).appendTo("body");
		
		self.div = $("#div_" + self.id).css("z-index", self.opt.zIndex);
		self.close = $(".box_close", self.div);
		self.head = $(".box_head", self.div);
		self.body = $(".box_body", self.div);
		self.iframe;
		
		if(self.opt.title === false){
			self.head.hide();
		};
		
		
		self.opt.body_overflow = $("body").css("overflow");
		
		if(self.opt.url){
			self.reload(opt);
		}else{
			if(self.opt.target){
				self.target = $(self.opt.target).appendTo(self.body);
			}else{
				self.target = $("<div/>").html(self.opt.content).appendTo(self.body);
			};
		};
		
		// 消除滚动条
		if(self.opt.iframe){
			self.body.css("overflow", "hidden");
			self.iframe.css("overflow", "hidden");
		}else{
			self.body.css("overflow", "auto");
		};
		
		// 按钮事件
		self.close.click((function(self){
			return function(){
				self.hide();
			};
		})(self));
		
		if(self.opt.max){
			$(window).bind("resize." + self.id, (function(self){
				return function(){
					console.log(new Date().getTime());
					self.max();
				};
			})(self));
		};
		
		// 满屏
		if(self.opt.show){
			self.show();
		};
		
		return this;
	};
	
	$.extend(box.prototype,{
		
		reload: function(opt){
			var self = this;
			
			$.extend(self.opt, opt);
			
			if(self.opt.iframe){
				var name = "iframe_" + parseInt(Math.random()*10000);
				self.opt.iframeID = name;
				// 创建
				this.iframe = this.iframe || 
					$('<iframe name="' + name + '" frameborder="0" style="width:100%; height:100%;" scrolling="auto" />');
				this.iframe.bind("load", (function(self){
					return function(){
						/*
						 消除IE6下iframe内页横向滚动条
						 当iframe加载成功后，判断内页是否有滚动条， 如果有滚动条重新设置内页的宽度为原来宽度+17（17为滚动条宽度-1）， 否则设为原来宽度
						*/
						var b = jQuery(this).contents().find('body'); 
						var d = b.get(0).document; 
						if(d){ 
							d = d.documentElement; 
							var w = b.width(); 
							if(d.clientHeight < d.offsetHeight - 100){ 
								w+=17;
							}; 
							b.width(w);
						};
						
						self.iframe.contents().find(".close-box").click(function(){
							self.hide();
						});
						
						// 加载完成后事件
						if(self.opt.onLoad){
							self.opt.onLoad.call(self);
						};
					};
				})(self)); // end this.iframe.bind
				this.iframe.appendTo(self.body);
				
				// 增加post方式提交数据的功能
				if(self.opt.postData){
					var form = $('<form/>').attr({
						target: name,
						action: self.opt.url,
						method: "post"
					}).hide().appendTo(self.body);
					
					if(typeof self.opt.postData === "string"){
						self.opt.postData = fn.string.url2obj(self.opt.postData);
					};
					
					for(var n in self.opt.postData){
						var o = self.opt.postData[n];
						form.append('<input type="hidden" name="' + n + '" value="' + o +'" />');
					};
					
					form.get(0).submit();
				}else{
					// url参数
					var param = self.opt.postData || "";
					if(typeof param === "object"){
						param = $.param(param); 
					};
					
					var url = self.opt.url + (self.opt.url.indexOf("?") == -1 ? "?" : "&") + param;
					if(!self.opt.cache){
						url += "&" + Math.random();
					};
					// 设置url
					this.iframe.attr("src", url);
				};
				
				this.target = this.iframe;
			}else{
				// 创建
				self.target = self.target || $("<div/>").html("&nbsp;").appendTo(self.body);
				
				// ajax
				$.ajax({
					url: self.opt.url,
					type: "post",
					data: self.opt.postData,
					async: false,
					cache: self.opt.cache,
					success: function(data){
						self.target.html(data);
						if(self.opt.sucess) self.opt.sucess.apply(self);
					}
				});
			};
		},
		
		// 
		title: function(str){
			var self = this;
			if(typeof str === "string"){
				// 设置
				self.head.find(".box_title").html(str);
			}else{
				// 取值
				return self.head.find(".box_title").html();
			};
		},
		
		// 
		showCloseBtn: function(swt){
			var self = this;
			self.head.find(".box_close").toggle(swt);
		},
		
		showHead: function(swt){
			var self = this;
			self.head.toggle(swt);
		},
		
		// 显示
		show: function(){
			var self = this;
			
			if(self.opt.max){
				self.resize({
					width: 9999,
					height: 9999
				}, function(){
					self.div.show();
					fn.dom.center(self.div);
				});
			}else{
				self.resize(null, function(){
					self.div.show();
					fn.dom.center(self.div);
				});
			};
		},
		
		// 隐藏
		hide:function(){
			var self = this;
			self.div.hide();
			self.dispose();
		},
		
		dispose: function(){
			var self = this;
			$(window).unbind("resize." + self.id);
			if(self.iframe && self.iframe.length){
				var iframe = self.iframe.get(0);
				iframe.src = "about:blank";
				iframe = null;
			};
			self.div.remove(); // 彻底删除div
			self.div = null;
			self = null;
		},
		
		
		// 最大化
		max: function(){
			this.resize({
				width: 9999,
				height: 9999
			});
		},
		
		// 调整大小
		resize: function(size, callback){
			var self = this;
			
			// 默认使用设定宽度
			size = $.extend({
				width: self.opt.width,
				height: self.opt.height
			}, size);
			
			// 先将body的滚动条取消， 以免计算可视范围时被滚动条影响
			$("body").css({overflow: "hidden"});
			
			function doResize(){
				// 限制最大宽、高度
				size.width = Math.min(size.width, fn.dom.clientWidth());
				size.height = Math.min(size.height, fn.dom.clientHeight());
				
				//
				var _div = {
					width: size.width,
					height: size.height,
					position: "absolute",
					top:0,
					left:0,
					overflow: "hidden"
				};
				var _body = {
					width: _div.width,
					height: _div.height - self.head.outerHeight() - (self.opt.iframe ? 0 : 22),
					border: "none",
					overflow: self.opt.iframe ? "hidden" : "auto"
				};
				
				// 如果是第一次最大化， iframe高度要减掉22， 第二次以后则不用
				var iframeCutHeight;
				
				if(!self.max.notFirst){
					self.max.notFirst = true;
					iframeCutHeight = 22;
				}else{
					iframeCutHeight = 0;
				};
				
				var _iframe = {
					width: _body.width,
					height: _body.height - iframeCutHeight,
					overflow: "auto"
				};
				
				self.div.css(_div);
				self.body.css(_body);
				if(self.iframe){
					self.iframe.css(_iframe);
				};
				
				if($.isFunction(callback)){
					callback.call(self);
				};
			};
			
			doResize();
		} // end resize
		
		/*
		// 自动设置表格大小
		autoResize: function(){
			var self = this;
			
			if(!self.opt.max){
				return;
			};
			
			// 在autoResize之后的100毫秒内禁止再autoResize
			// 避免因为bug引起不断调整大小
			var now = new Date().getTime();
			if(self._last_autoResize && (now - self._last_autoResize < 100)){
				return;
			};
			
			// 绑定
			if(!self.autoResizeBind){
				self.autoResizeBind = true;
				self.autoResize.waiting = 0;
//				$(window).resize((function(self){
//					return function(){
//						self.autoResize();
//					};
//				})(self));
			};
			
			// 延时触发
			self.autoResize.waiting++;
			setTimeout((function(self){
				return function(){
					self.autoResize.waiting--;
					if(self.autoResize.waiting === 0){
						self.max();
					};
					
					// 在autoResize之后的100毫秒内禁止再autoResize
					// 避免因为bug引起不断调整大小
					self._last_autoResize = new Date().getTime();
				};
			})(self), 50);
		} // end autoResize
		*/
	}); // end extend
	
	var DOM = {
		box: function(opt){
			return new box(opt);
		}
	};
	
	$.extend(fn.dom = fn.dom || {}, DOM);
	
})(fn.jQuery);