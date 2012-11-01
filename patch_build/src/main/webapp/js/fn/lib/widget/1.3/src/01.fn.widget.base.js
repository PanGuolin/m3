// *****************************************************************************************
// part 1 : fn.widget.base.js
// *****************************************************************************************
// fn.widget.base.js

fn.widgetBase = function(){
	
	var $ = fn.jQuery;
	if(!$) return;
		 
	 //
	function findObject(rootObject, objectName){
		var obj = rootObject, ary = objectName.split(".");
		for(var j = 0; j < ary.length; j++){
			var n = ary[j];
			obj = obj[n] || "";
		};
		
		return obj;
	}

/**
 * jEasyUI 1.2.4
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2011 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($) {
	 
	function _1(e) {
		var _2 = $.data(e.data.target, "fwb_draggable").options;
		var _3 = e.data;
		var _4 = _3.startLeft + e.pageX - _3.startX;
		var _5 = _3.startTop + e.pageY - _3.startY;
		if (_2.deltaX != null && _2.deltaX != undefined) {
			_4 = e.pageX + _2.deltaX;
		}
		if (_2.deltaY != null && _2.deltaY != undefined) {
			_5 = e.pageY + _2.deltaY;
		}
		if (e.data.parnet != document.body) {
			if ($.boxModel == true) {
				_4 += $(e.data.parent).scrollLeft();
				_5 += $(e.data.parent).scrollTop();
			}
		}
		if (_2.axis == "h") {
			_3.left = _4;
		} else {
			if (_2.axis == "v") {
				_3.top = _5;
			} else {
				_3.left = _4;
				_3.top = _5;
			}
		}
	};
	function _6(e) {
		var _7 = $.data(e.data.target, "fwb_draggable").options;
		var _8 = $.data(e.data.target, "fwb_draggable").proxy;
		if (_8) {
			_8.css("cursor", _7.cursor);
		} else {
			_8 = $(e.data.target);
			$.data(e.data.target, "fwb_draggable").handle.css("cursor", _7.cursor);
		}
		_8.css({
			left: e.data.left,
			top: e.data.top
		});
	};
	function _9(e) {
		var _a = $.data(e.data.target, "fwb_draggable").options;
		var _b = $(".droppable").filter(function() {
			return e.data.target != this;
		}).filter(function() {
			var _c = $.data(this, "droppable").options.accept;
			if (_c) {
				return $(_c).filter(function() {
					return this == e.data.target;
				}).length > 0;
			} else {
				return true;
			}
		});
		$.data(e.data.target, "fwb_draggable").droppables = _b;
		var _d = $.data(e.data.target, "fwb_draggable").proxy;
		if (!_d) {
			if (_a.proxy) {
				if (_a.proxy == "clone") {
					_d = $(e.data.target).clone().insertAfter(e.data.target);
				} else {
					_d = _a.proxy.call(e.data.target, e.data.target);
				}
				$.data(e.data.target, "fwb_draggable").proxy = _d;
			} else {
				_d = $(e.data.target);
			}
		}
		_d.css("position", "absolute");
		_1(e);
		_6(e);
		_a.onStartDrag.call(e.data.target, e);
		return false;
	};
	function _e(e) {
		_1(e);
		if ($.data(e.data.target, "fwb_draggable").options.onDrag.call(e.data.target, e) != false) {
			_6(e);
		}
		var _f = e.data.target;
		$.data(e.data.target, "fwb_draggable").droppables.each(function() {
			var _10 = $(this);
			var p2 = $(this).offset();
			if (e.pageX > p2.left && e.pageX < p2.left + _10.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _10.outerHeight()) {
				if (!this.entered) {
					$(this).trigger("_dragenter", [_f]);
					this.entered = true;
				}
				$(this).trigger("_dragover", [_f]);
			} else {
				if (this.entered) {
					$(this).trigger("_dragleave", [_f]);
					this.entered = false;
				}
			}
		});
		return false;
	};
	function _11(e) {
		_1(e);
		var _12 = $.data(e.data.target, "fwb_draggable").proxy;
		var _13 = $.data(e.data.target, "fwb_draggable").options;
		if (_13.revert) {
			if (_14() == true) {
				_15();
				$(e.data.target).css({
					position: e.data.startPosition,
					left: e.data.startLeft,
					top: e.data.startTop
				});
			} else {
				if (_12) {
					_12.animate({
						left: e.data.startLeft,
						top: e.data.startTop
					},
					function() {
						_15();
					});
				} else {
					$(e.data.target).animate({
						left: e.data.startLeft,
						top: e.data.startTop
					},
					function() {
						$(e.data.target).css("position", e.data.startPosition);
					});
				}
			}
		} else {
			$(e.data.target).css({
				position: "absolute",
				left: e.data.left,
				top: e.data.top
			});
			_15();
			_14();
		}
		_13.onStopDrag.call(e.data.target, e);
		function _15() {
			if (_12) {
				_12.remove();
			}
			$.data(e.data.target, "fwb_draggable").proxy = null;
		};
		function _14() {
			var _16 = false;
			$.data(e.data.target, "fwb_draggable").droppables.each(function() {
				var _17 = $(this);
				var p2 = $(this).offset();
				if (e.pageX > p2.left && e.pageX < p2.left + _17.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _17.outerHeight()) {
					if (_13.revert) {
						$(e.data.target).css({
							position: e.data.startPosition,
							left: e.data.startLeft,
							top: e.data.startTop
						});
					}
					$(this).trigger("_drop", [e.data.target]);
					_16 = true;
					this.entered = false;
				}
			});
			return _16;
		};
		$(document).unbind(".fwb_draggable");
		return false;
	};
	$.fn.fwb_draggable = function(_18, _19) {
		if (typeof _18 == "string") {
			return $.fn.fwb_draggable.methods[_18](this, _19);
		}
		return this.each(function() {
			var _1a;
			var _1b = $.data(this, "fwb_draggable");
			if (_1b) {
				_1b.handle.unbind(".fwb_draggable");
				_1a = $.extend(_1b.options, _18);
			} else {
				_1a = $.extend({},
				$.fn.fwb_draggable.defaults, _18 || {});
			}
			if (_1a.disabled == true) {
				$(this).css("cursor", "default");
				return;
			}
			var _1c = null;
			if (typeof _1a.handle == "undefined" || _1a.handle == null) {
				_1c = $(this);
			} else {
				_1c = (typeof _1a.handle == "string" ? $(_1a.handle, this) : _1c);
			}
			$.data(this, "fwb_draggable", {
				options: _1a,
				handle: _1c
			});
			_1c.bind("mousedown.fwb_draggable", {
				target: this
			},
			_1d);
			_1c.bind("mousemove.fwb_draggable", {
				target: this
			},
			_1e);
			function _1d(e) {
				if (_1f(e) == false) {
					return;
				}
				var _20 = $(e.data.target).position();
				var _21 = {
					startPosition: $(e.data.target).css("position"),
					startLeft: _20.left,
					startTop: _20.top,
					left: _20.left,
					top: _20.top,
					startX: e.pageX,
					startY: e.pageY,
					target: e.data.target,
					parent: $(e.data.target).parent()[0]
				};
				if (_1a.onBeforeDrag.call(e.data.target, e) == false) {
					return;
				}
				$(document).bind("mousedown.fwb_draggable", _21, _9);
				$(document).bind("mousemove.fwb_draggable", _21, _e);
				$(document).bind("mouseup.fwb_draggable", _21, _11);
			};
			function _1e(e) {
				if (_1f(e)) {
					$(this).css("cursor", _1a.cursor);
				} else {
					$(this).css("cursor", "default");
				}
			};
			function _1f(e) {
				var _22 = $(_1c).offset();
				var _23 = $(_1c).outerWidth();
				var _24 = $(_1c).outerHeight();
				var t = e.pageY - _22.top;
				var r = _22.left + _23 - e.pageX;
				var b = _22.top + _24 - e.pageY;
				var l = e.pageX - _22.left;
				return Math.min(t, r, b, l) > _1a.edge;
			};
		});
	};
	$.fn.fwb_draggable.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_draggable").options;
		},
		proxy: function(jq) {
			return $.data(jq[0], "fwb_draggable").proxy;
		},
		enable: function(jq) {
			return jq.each(function() {
				$(this).fwb_draggable({
					disabled: false
				});
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				$(this).fwb_draggable({
					disabled: true
				});
			});
		}
	};
	$.fn.fwb_draggable.defaults = {
		proxy: null,
		revert: false,
		cursor: "move",
		deltaX: null,
		deltaY: null,
		handle: null,
		disabled: false,
		edge: 0,
		axis: null,
		onBeforeDrag: function(e) {
			},
		onStartDrag: function(e) {
			},
		onDrag: function(e) {
			},
		onStopDrag: function(e) {
			}
	};
})(fn.jQuery);
 (function($) {
	function _25(_26) {
		$(_26).addClass("droppable");
		$(_26).bind("_dragenter",
		function(e, _27) {
			$.data(_26, "droppable").options.onDragEnter.apply(_26, [e, _27]);
		});
		$(_26).bind("_dragleave",
		function(e, _28) {
			$.data(_26, "droppable").options.onDragLeave.apply(_26, [e, _28]);
		});
		$(_26).bind("_dragover",
		function(e, _29) {
			$.data(_26, "droppable").options.onDragOver.apply(_26, [e, _29]);
		});
		$(_26).bind("_drop",
		function(e, _2a) {
			$.data(_26, "droppable").options.onDrop.apply(_26, [e, _2a]);
		});
	};
	$.fn.droppable = function(_2b, _2c) {
		if (typeof _2b == "string") {
			return $.fn.droppable.methods[_2b](this, _2c);
		}
		_2b = _2b || {};
		return this.each(function() {
			var _2d = $.data(this, "droppable");
			if (_2d) {
				$.extend(_2d.options, _2b);
			} else {
				_25(this);
				$.data(this, "droppable", {
					options: $.extend({},
					$.fn.droppable.defaults, _2b)
				});
			}
		});
	};
	$.fn.droppable.methods = {};
	$.fn.droppable.defaults = {
		accept: null,
		onDragEnter: function(e, _2e) {
			},
		onDragOver: function(e, _2f) {
			},
		onDragLeave: function(e, _30) {
			},
		onDrop: function(e, _31) {
			}
	};
})(fn.jQuery);
 (function($) {
	$.fn.fwb_resizable = function(_32, _33) {
		if (typeof _32 == "string") {
			return $.fn.fwb_resizable.methods[_32](this, _33);
		}
		function _34(e) {
			var _35 = e.data;
			var _36 = $.data(_35.target, "fwb_resizable").options;
			if (_35.dir.indexOf("e") != -1) {
				var _37 = _35.startWidth + e.pageX - _35.startX;
				_37 = Math.min(Math.max(_37, _36.minWidth), _36.maxWidth);
				_35.width = _37;
			}
			if (_35.dir.indexOf("s") != -1) {
				var _38 = _35.startHeight + e.pageY - _35.startY;
				_38 = Math.min(Math.max(_38, _36.minHeight), _36.maxHeight);
				_35.height = _38;
			}
			if (_35.dir.indexOf("w") != -1) {
				_35.width = _35.startWidth - e.pageX + _35.startX;
				if (_35.width >= _36.minWidth && _35.width <= _36.maxWidth) {
					_35.left = _35.startLeft + e.pageX - _35.startX;
				}
			}
			if (_35.dir.indexOf("n") != -1) {
				_35.height = _35.startHeight - e.pageY + _35.startY;
				if (_35.height >= _36.minHeight && _35.height <= _36.maxHeight) {
					_35.top = _35.startTop + e.pageY - _35.startY;
				}
			}
		};
		function _39(e) {
			var _3a = e.data;
			var _3b = _3a.target;
			if ($.boxModel == true) {
				$(_3b).css({
					width: _3a.width - _3a.deltaWidth,
					height: _3a.height - _3a.deltaHeight,
					left: _3a.left,
					top: _3a.top
				});
			} else {
				$(_3b).css({
					width: _3a.width,
					height: _3a.height,
					left: _3a.left,
					top: _3a.top
				});
			}
		};
		function _3c(e) {
			$.data(e.data.target, "fwb_resizable").options.onStartResize.call(e.data.target, e);
			return false;
		};
		function _3d(e) {
			_34(e);
			if ($.data(e.data.target, "fwb_resizable").options.onResize.call(e.data.target, e) != false) {
				_39(e);
			}
			return false;
		};
		function _3e(e) {
			_34(e, true);
			_39(e);
			$.data(e.data.target, "fwb_resizable").options.onStopResize.call(e.data.target, e);
			$(document).unbind(".fwb_resizable");
			$("body").css("cursor", "default");
			return false;
		};
		return this.each(function() {
			var _3f = null;
			var _40 = $.data(this, "fwb_resizable");
			if (_40) {
				$(this).unbind(".fwb_resizable");
				_3f = $.extend(_40.options, _32 || {});
			} else {
				_3f = $.extend({},
				$.fn.fwb_resizable.defaults, _32 || {});
				$.data(this, "fwb_resizable", {
					options: _3f
				});
			}
			if (_3f.disabled == true) {
				return;
			}
			var _41 = this;
			$(this).bind("mousemove.fwb_resizable",
			function(e) {
				var dir = _42(e);
				if (dir == "") {
					$(_41).css("cursor", "default");
				} else {
					$(_41).css("cursor", dir + "-resize");
				}
			}).bind("mousedown.fwb_resizable",
			function(e) {
				var dir = _42(e);
				if (dir == "") {
					return;
				}
				var _43 = {
					target: this,
					dir: dir,
					startLeft: _44("left"),
					startTop: _44("top"),
					left: _44("left"),
					top: _44("top"),
					startX: e.pageX,
					startY: e.pageY,
					startWidth: $(_41).outerWidth(),
					startHeight: $(_41).outerHeight(),
					width: $(_41).outerWidth(),
					height: $(_41).outerHeight(),
					deltaWidth: $(_41).outerWidth() - $(_41).width(),
					deltaHeight: $(_41).outerHeight() - $(_41).height()
				};
				$(document).bind("mousedown.fwb_resizable", _43, _3c);
				$(document).bind("mousemove.fwb_resizable", _43, _3d);
				$(document).bind("mouseup.fwb_resizable", _43, _3e);
				$("body").css("cursor", dir + "-resize");
			}).bind("mouseleave.fwb_resizable",
			function() {
				$(_41).css("cursor", "default");
			});
			function _42(e) {
				var dir = "";
				var _45 = $(_41).offset();
				var _46 = $(_41).outerWidth();
				var _47 = $(_41).outerHeight();
				var _48 = _3f.edge;
				if (e.pageY > _45.top && e.pageY < _45.top + _48) {
					dir += "n";
				} else {
					if (e.pageY < _45.top + _47 && e.pageY > _45.top + _47 - _48) {
						dir += "s";
					}
				}
				if (e.pageX > _45.left && e.pageX < _45.left + _48) {
					dir += "w";
				} else {
					if (e.pageX < _45.left + _46 && e.pageX > _45.left + _46 - _48) {
						dir += "e";
					}
				}
				var _49 = _3f.handles.split(",");
				for (var i = 0; i < _49.length; i++) {
					var _4a = _49[i].replace(/(^\s*)|(\s*$)/g, "");
					if (_4a == "all" || _4a == dir) {
						return dir;
					}
				}
				return "";
			};
			function _44(css) {
				var val = parseInt($(_41).css(css));
				if (isNaN(val)) {
					return 0;
				} else {
					return val;
				}
			};
		});
	};
	$.fn.fwb_resizable.methods = {};
	$.fn.fwb_resizable.defaults = {
		disabled: false,
		handles: "n, e, s, w, ne, se, sw, nw, all",
		minWidth: 10,
		minHeight: 10,
		maxWidth: 10000,
		maxHeight: 10000,
		edge: 5,
		onStartResize: function(e) {
			},
		onResize: function(e) {
			},
		onStopResize: function(e) {
			}
	};
})(fn.jQuery);
 (function($) {
	function _4b(_4c) {
		var _4d = $.data(_4c, "fwb_linkbutton").options;
		$(_4c).empty();
		$(_4c).addClass("l-btn");
		if (_4d.id) {
			$(_4c).attr("id", _4d.id);
		} else {
			$.fn.removeProp ? $(_4c).removeProp("id") : $(_4c).removeAttr("id");
		}
		if (_4d.plain) {
			$(_4c).addClass("l-btn-plain");
		} else {
			$(_4c).removeClass("l-btn-plain");
		}
		if (_4d.text) {
			$(_4c).html(_4d.text).wrapInner("<span class=\"l-btn-left\">" + "<span class=\"l-btn-text\">" + "</span>" + "</span>");
			if (_4d.iconCls) {
				$(_4c).find(".l-btn-text").addClass(_4d.iconCls).css("padding-left", "20px");
			}
		} else {
			$(_4c).html("&nbsp;").wrapInner("<span class=\"l-btn-left\">" + "<span class=\"l-btn-text\">" + "<span class=\"l-btn-empty\"></span>" + "</span>" + "</span>");
			if (_4d.iconCls) {
				$(_4c).find(".l-btn-empty").addClass(_4d.iconCls);
			}
		}
		_4e(_4c, _4d.disabled);
	};
	function _4e(_4f, _50) {
		var _51 = $.data(_4f, "fwb_linkbutton");
		if (_50) {
			_51.options.disabled = true;
			var _52 = $(_4f).attr("href");
			if (_52) {
				_51.href = _52;
				$(_4f).attr("href", "javascript:void(0)");
			}
			if (_4f.onclick) {
				_51.onclick = _4f.onclick;
				_4f.onclick = null;
			}
			$(_4f).addClass("l-btn-disabled");
		} else {
			_51.options.disabled = false;
			if (_51.href) {
				$(_4f).attr("href", _51.href);
			}
			if (_51.onclick) {
				_4f.onclick = _51.onclick;
			}
			$(_4f).removeClass("l-btn-disabled");
		}
	};
	$.fn.fwb_linkbutton = function(_53, _54) {
		if (typeof _53 == "string") {
			return $.fn.fwb_linkbutton.methods[_53](this, _54);
		}
		_53 = _53 || {};
		return this.each(function() {
			var _55 = $.data(this, "fwb_linkbutton");
			if (_55) {
				$.extend(_55.options, _53);
			} else {
				$.data(this, "fwb_linkbutton", {
					options: $.extend({},
					$.fn.fwb_linkbutton.defaults, $.fn.fwb_linkbutton.parseOptions(this), _53)
				});
				$(this).removeAttr("disabled");
			}
			_4b(this);
		});
	};
	$.fn.fwb_linkbutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_linkbutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_4e(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_4e(this, true);
			});
		}
	};
	$.fn.fwb_linkbutton.parseOptions = function(_56) {
		var t = $(_56);
		return {
			id: t.attr("id"),
			disabled: (t.attr("disabled") ? true: undefined),
			plain: (t.attr("plain") ? t.attr("plain") == "true": undefined),
			text: $.trim(t.html()),
			iconCls: (t.attr("icon") || t.attr("iconCls"))
		};
	};
	$.fn.fwb_linkbutton.defaults = {
		id: null,
		disabled: false,
		plain: false,
		text: "",
		iconCls: null
	};
})(fn.jQuery);
 (function($) {
	function _57(_58) {
		var _59 = $.data(_58, "fwb_pagination").options;
		var _5a = $(_58).addClass("fwb_pagination").empty();
		var t = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>").appendTo(_5a);
		var tr = $("tr", t);
		if (_59.showPageList) {
			var ps = $("<select class=\"fwb_pagination-page-list\"></select>");
			for (var i = 0; i < _59.pageList.length; i++) {
				var _5b = $("<option></option>").text(_59.pageList[i]).appendTo(ps);
				if (_59.pageList[i] == _59.pageSize) {
					_5b.attr("selected", "selected");
				}
			}
			$("<td></td>").append(ps).appendTo(tr);
			_59.pageSize = parseInt(ps.val());
			$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
		}
		$("<td><a href=\"javascript:void(0)\" icon=\"fwb_pagination-first\"></a></td>").appendTo(tr);
		$("<td><a href=\"javascript:void(0)\" icon=\"fwb_pagination-prev\"></a></td>").appendTo(tr);
		$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
		$("<span style=\"padding-left:6px;\"></span>").html(_59.beforePageText).wrap("<td></td>").parent().appendTo(tr);
		$("<td><input class=\"fwb_pagination-num\" type=\"text\" value=\"1\" size=\"2\"></td>").appendTo(tr);
		$("<span style=\"padding-right:6px;\"></span>").wrap("<td></td>").parent().appendTo(tr);
		$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
		$("<td><a href=\"javascript:void(0)\" icon=\"fwb_pagination-next\"></a></td>").appendTo(tr);
		$("<td><a href=\"javascript:void(0)\" icon=\"fwb_pagination-last\"></a></td>").appendTo(tr);
		if (_59.showRefresh) {
			$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"fwb_pagination-load\"></a></td>").appendTo(tr);
		}
		if (_59.buttons) {
			$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
			for (var i = 0; i < _59.buttons.length; i++) {
				var btn = _59.buttons[i];
				if (btn == "-") {
					$("<td><div class=\"fwb_pagination-btn-separator\"></div></td>").appendTo(tr);
				} else {
					var td = $("<td></td>").appendTo(tr);
					$("<a href=\"javascript:void(0)\"></a>").addClass("l-btn").css("float", "left").text(btn.text || "").attr("icon", btn.iconCls || "").bind("click", eval(btn.handler ||
					function() {
						})).appendTo(td).fwb_linkbutton({
						plain: true
					});
				}
			}
		}
		$("<div class=\"fwb_pagination-info\"></div>").appendTo(_5a);
		$("<div style=\"clear:both;\"></div>").appendTo(_5a);
		$("a[icon^=fwb_pagination]", _5a).fwb_linkbutton({
			plain: true
		});
		_5a.find("a[icon=fwb_pagination-first]").unbind(".fwb_pagination").bind("click.fwb_pagination",
		function() {
			if (_59.pageNumber > 1) {
				_60(_58, 1);
			}
		});
		_5a.find("a[icon=fwb_pagination-prev]").unbind(".fwb_pagination").bind("click.fwb_pagination",
		function() {
			if (_59.pageNumber > 1) {
				_60(_58, _59.pageNumber - 1);
			}
		});
		_5a.find("a[icon=fwb_pagination-next]").unbind(".fwb_pagination").bind("click.fwb_pagination",
		function() {
			var _5c = Math.ceil(_59.total / _59.pageSize);
			if (_59.pageNumber < _5c) {
				_60(_58, _59.pageNumber + 1);
			}
		});
		_5a.find("a[icon=fwb_pagination-last]").unbind(".fwb_pagination").bind("click.fwb_pagination",
		function() {
			var _5d = Math.ceil(_59.total / _59.pageSize);
			if (_59.pageNumber < _5d) {
				_60(_58, _5d);
			}
		});
		_5a.find("a[icon=fwb_pagination-load]").unbind(".fwb_pagination").bind("click.fwb_pagination",
		function() {
			if (_59.onBeforeRefresh.call(_58, _59.pageNumber, _59.pageSize) != false) {
				_60(_58, _59.pageNumber);
				_59.onRefresh.call(_58, _59.pageNumber, _59.pageSize);
			}
		});
		_5a.find("input.fwb_pagination-num").unbind(".fwb_pagination").bind("keydown.fwb_pagination",
		function(e) {
			if (e.keyCode == 13) {
				var _5e = parseInt($(this).val()) || 1;
				_60(_58, _5e);
			}
		});
		_5a.find(".fwb_pagination-page-list").unbind(".fwb_pagination").bind("change.fwb_pagination",
		function() {
			_59.pageSize = $(this).val();
			_59.onChangePageSize.call(_58, _59.pageSize);
			var _5f = Math.ceil(_59.total / _59.pageSize);
			_60(_58, _59.pageNumber);
		});
	};
	function _60(_61, _62) {
		var _63 = $.data(_61, "fwb_pagination").options;
		var _64 = Math.ceil(_63.total / _63.pageSize) || 1;
		var _65 = _62;
		if (_62 < 1) {
			_65 = 1;
		}
		if (_62 > _64) {
			_65 = _64;
		}
		_63.pageNumber = _65;
		_63.onSelectPage.call(_61, _65, _63.pageSize);
		_66(_61);
	};
	function _66(_67) {
		var _68 = $.data(_67, "fwb_pagination").options;
		var _69 = Math.ceil(_68.total / _68.pageSize) || 1;
		var num = $(_67).find("input.fwb_pagination-num");
		num.val(_68.pageNumber);
		num.parent().next().find("span").html(_68.afterPageText.replace(/{pages}/, _69));
		var _6a = _68.displayMsg;
		_6a = _6a.replace(/{from}/, _68.pageSize * (_68.pageNumber - 1) + 1);
		_6a = _6a.replace(/{to}/, Math.min(_68.pageSize * (_68.pageNumber), _68.total));
		_6a = _6a.replace(/{total}/, _68.total);
		$(_67).find(".fwb_pagination-info").html(_6a);
		$("a[icon=fwb_pagination-first],a[icon=fwb_pagination-prev]", _67).fwb_linkbutton({
			disabled: (_68.pageNumber == 1)
		});
		$("a[icon=fwb_pagination-next],a[icon=fwb_pagination-last]", _67).fwb_linkbutton({
			disabled: (_68.pageNumber == _69)
		});
		if (_68.loading) {
			$(_67).find("a[icon=fwb_pagination-load]").find(".fwb_pagination-load").addClass("fwb_pagination-loading");
		} else {
			$(_67).find("a[icon=fwb_pagination-load]").find(".fwb_pagination-load").removeClass("fwb_pagination-loading");
		}
	};
	function _6b(_6c, _6d) {
		var _6e = $.data(_6c, "fwb_pagination").options;
		_6e.loading = _6d;
		if (_6e.loading) {
			$(_6c).find("a[icon=fwb_pagination-load]").find(".fwb_pagination-load").addClass("fwb_pagination-loading");
		} else {
			$(_6c).find("a[icon=fwb_pagination-load]").find(".fwb_pagination-load").removeClass("fwb_pagination-loading");
		}
	};
	$.fn.fwb_pagination = function(_6f, _70) {
		if (typeof _6f == "string") {
			return $.fn.fwb_pagination.methods[_6f](this, _70);
		}
		_6f = _6f || {};
		return this.each(function() {
			var _71;
			var _72 = $.data(this, "fwb_pagination");
			if (_72) {
				_71 = $.extend(_72.options, _6f);
			} else {
				_71 = $.extend({},
				$.fn.fwb_pagination.defaults, _6f);
				$.data(this, "fwb_pagination", {
					options: _71
				});
			}
			_57(this);
			_66(this);
		});
	};
	$.fn.fwb_pagination.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_pagination").options;
		},
		loading: function(jq) {
			return jq.each(function() {
				_6b(this, true);
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				_6b(this, false);
			});
		}
	};
	$.fn.fwb_pagination.defaults = {
		total: 1,
		pageSize: 10,
		pageNumber: 1,
		pageList: [10, 20, 30, 50],
		loading: false,
		buttons: null,
		showPageList: true,
		showRefresh: true,
		onSelectPage: function(_73, _74) {
			},
		onBeforeRefresh: function(_75, _76) {
			},
		onRefresh: function(_77, _78) {
			},
		onChangePageSize: function(_79) {
			},
		beforePageText: "Page",
		afterPageText: "of {pages}",
		displayMsg: "Displaying {from} to {to} of {total} items"
	};
})(fn.jQuery);
 (function($) {
	function _7a(_7b) {
		var _7c = $(_7b);
		_7c.addClass("fwb_tree");
		return _7c;
	};
	function _7d(_7e) {
		var _7f = [];
		_80(_7f, $(_7e));
		function _80(aa, _81) {
			_81.children("li").each(function() {
				var _82 = $(this);
				var _83 = {};
				_83.text = _82.children("span").html();
				if (!_83.text) {
					_83.text = _82.html();
				}
				_83.id = _82.attr("id");
				_83.iconCls = _82.attr("iconCls") || _82.attr("icon");
				_83.checked = _82.attr("checked") == "true";
				_83.state = _82.attr("state") || "open";
				var _84 = _82.children("ul");
				if (_84.length) {
					_83.children = [];
					_80(_83.children, _84);
				}
				aa.push(_83);
			});
		};
		return _7f;
	};
	function _85(_86) {
		var _87 = $.data(_86, "fwb_tree").options;
		var _88 = $.data(_86, "fwb_tree").fwb_tree;
		$("div.fwb_tree-node", _88).unbind(".fwb_tree").bind("dblclick.fwb_tree",
		function() {
			_120(_86, this);
			_87.onDblClick.call(_86, _105(_86));
		}).bind("click.fwb_tree",
		function() {
			_120(_86, this);
			_87.onClick.call(_86, _105(_86));
		}).bind("mouseenter.fwb_tree",
		function() {
			$(this).addClass("fwb_tree-node-hover");
			return false;
		}).bind("mouseleave.fwb_tree",
		function() {
			$(this).removeClass("fwb_tree-node-hover");
			return false;
		}).bind("contextfwb_menu.fwb_tree",
		function(e) {
			_87.onContextMenu.call(_86, e, _af(_86, this));
		});
		$("span.fwb_tree-hit", _88).unbind(".fwb_tree").bind("click.fwb_tree",
		function() {
			var _89 = $(this).parent();
			_e4(_86, _89[0]);
			return false;
		}).bind("mouseenter.fwb_tree",
		function() {
			if ($(this).hasClass("fwb_tree-expanded")) {
				$(this).addClass("fwb_tree-expanded-hover");
			} else {
				$(this).addClass("fwb_tree-collapsed-hover");
			}
		}).bind("mouseleave.fwb_tree",
		function() {
			if ($(this).hasClass("fwb_tree-expanded")) {
				$(this).removeClass("fwb_tree-expanded-hover");
			} else {
				$(this).removeClass("fwb_tree-collapsed-hover");
			}
		}).bind("mousedown.fwb_tree",
		function() {
			return false;
		});
		$("span.fwb_tree-checkbox", _88).unbind(".fwb_tree").bind("click.fwb_tree",
		function() {
			var _8a = $(this).parent();
			_a6(_86, _8a[0], !$(this).hasClass("fwb_tree-checkbox1"));
			return false;
		}).bind("mousedown.fwb_tree",
		function() {
			return false;
		});
	};
	function _8b(_8c) {
		var _8d = $(_8c).find("div.fwb_tree-node");
		_8d.fwb_draggable("disable");
		_8d.css("cursor", "pointer");
	};
	function _8e(_8f) {
		var _90 = $.data(_8f, "fwb_tree").options;
		var _91 = $.data(_8f, "fwb_tree").fwb_tree;
		_91.find("div.fwb_tree-node").fwb_draggable({
			disabled: false,
			revert: true,
			cursor: "pointer",
			proxy: function(_92) {
				var p = $("<div class=\"fwb_tree-node-proxy fwb_tree-dnd-no\"></div>").appendTo("body");
				p.html($(_92).find(".fwb_tree-title").html());
				p.hide();
				return p;
			},
			deltaX: 15,
			deltaY: 15,
			onBeforeDrag: function() {
				$(this).next("ul").find("div.fwb_tree-node").droppable({
					accept: "no-accept"
				});
			},
			onStartDrag: function() {
				$(this).fwb_draggable("proxy").css({
					left: -10000,
					top: -10000
				});
			},
			onDrag: function(e) {
				$(this).fwb_draggable("proxy").show();
				this.pageY = e.pageY;
			},
			onStopDrag: function() {
				$(this).next("ul").find("div.fwb_tree-node").droppable({
					accept: "div.fwb_tree-node"
				});
			}
		}).droppable({
			accept: "div.fwb_tree-node",
			onDragOver: function(e, _93) {
				var _94 = _93.pageY;
				var top = $(this).offset().top;
				var _95 = top + $(this).outerHeight();
				$(_93).fwb_draggable("proxy").removeClass("fwb_tree-dnd-no").addClass("fwb_tree-dnd-yes");
				$(this).removeClass("fwb_tree-node-append fwb_tree-node-top fwb_tree-node-bottom");
				if (_94 > top + (_95 - top) / 2) {
					if (_95 - _94 < 5) {
						$(this).addClass("fwb_tree-node-bottom");
					} else {
						$(this).addClass("fwb_tree-node-append");
					}
				} else {
					if (_94 - top < 5) {
						$(this).addClass("fwb_tree-node-top");
					} else {
						$(this).addClass("fwb_tree-node-append");
					}
				}
			},
			onDragLeave: function(e, _96) {
				$(_96).fwb_draggable("proxy").removeClass("fwb_tree-dnd-yes").addClass("fwb_tree-dnd-no");
				$(this).removeClass("fwb_tree-node-append fwb_tree-node-top fwb_tree-node-bottom");
			},
			onDrop: function(e, _97) {
				var _98 = this;
				var _99,
				_9a;
				if ($(this).hasClass("fwb_tree-node-append")) {
					_99 = _9b;
				} else {
					_99 = _9c;
					_9a = $(this).hasClass("fwb_tree-node-top") ? "top": "bottom";
				}
				setTimeout(function() {
					_99(_97, _98, _9a);
				},
				0);
				$(this).removeClass("fwb_tree-node-append fwb_tree-node-top fwb_tree-node-bottom");
			}
		});
		function _9b(_9d, _9e) {
			if (_af(_8f, _9e).state == "closed") {
				_d8(_8f, _9e,
				function() {
					_9f();
				});
			} else {
				_9f();
			}
			function _9f() {
				var _a0 = $(_8f).fwb_tree("pop", _9d);
				$(_8f).fwb_tree("append", {
					parent: _9e,
					data: [_a0]
				});
				_90.onDrop.call(_8f, _9e, _a0, "append");
			};
		};
		function _9c(_a1, _a2, _a3) {
			var _a4 = {};
			if (_a3 == "top") {
				_a4.before = _a2;
			} else {
				_a4.after = _a2;
			}
			var _a5 = $(_8f).fwb_tree("pop", _a1);
			_a4.data = _a5;
			$(_8f).fwb_tree("insert", _a4);
			_90.onDrop.call(_8f, _a2, _a5, _a3);
		};
	};
	function _a6(_a7, _a8, _a9) {
		var _aa = $.data(_a7, "fwb_tree").options;
		if (!_aa.checkbox) {
			return;
		};
		var _ab = $(_a8);
		var ck = _ab.find(".fwb_tree-checkbox");
		
		// 增加singleCheck参数， 即checkbox模式的单选（1.5+）
		if(_aa.singleCheck){
			var x = $(_a7).find(".fwb_tree-checkbox");
			x.removeClass("fwb_tree-checkbox1 fwb_tree-checkbox2").addClass("fwb_tree-checkbox0");
		};
		//
		
		ck.removeClass("fwb_tree-checkbox0 fwb_tree-checkbox1 fwb_tree-checkbox2");
		if (_a9) {
			ck.addClass("fwb_tree-checkbox1");
		} else {
			ck.addClass("fwb_tree-checkbox0");
		}
		// hap 2012/6/14
		// 是否第一级节点
		var isRoot = $(_a8).parent().parent().hasClass("fwb_tree"),
			opt = _aa;
		
		// 新增两个参数：
		// noInverse：     反选不影响父节点和子节点
		// noCheckParent： 正反选不影响父节点
		if (_aa.cascadeCheck && (_a9 || !opt.noInverse)) {
			if(!opt.noCheckParent){
				_ac(_ab); // 正反选父级
			};
			_ad(_ab); // 正反选子级
		};
		
		/* 旧代码
		if (_aa.cascadeCheck) {
			_ac(_ab); // 正反选父级
			_ad(_ab); // 正反选子级
		}
		*/
		
		var _ae = _af(_a7, _a8);
		_aa.onCheck.call(_a7, _ae, _a9);
		function _ad(_b0) {
			var _b1 = _b0.next().find(".fwb_tree-checkbox");
			_b1.removeClass("fwb_tree-checkbox0 fwb_tree-checkbox1 fwb_tree-checkbox2");
			if (_b0.find(".fwb_tree-checkbox").hasClass("fwb_tree-checkbox1")) {
				_b1.addClass("fwb_tree-checkbox1");
			} else {
				_b1.addClass("fwb_tree-checkbox0");
			}
		};
		function _ac(_b2) {
			var _b3 = _ef(_a7, _b2[0]);
			if (_b3) {
				var ck = $(_b3.target).find(".fwb_tree-checkbox");
				ck.removeClass("fwb_tree-checkbox0 fwb_tree-checkbox1 fwb_tree-checkbox2");
				if (_b4(_b2)) {
					ck.addClass("fwb_tree-checkbox1");
				} else {
					if (_b5(_b2)) {
						ck.addClass("fwb_tree-checkbox0");
					} else {
						ck.addClass("fwb_tree-checkbox2");
					}
				}
				_ac($(_b3.target));
			}
			function _b4(n) {
				var ck = n.find(".fwb_tree-checkbox");
				if (ck.hasClass("fwb_tree-checkbox0") || ck.hasClass("fwb_tree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if (!$(this).children("div.fwb_tree-node").children(".fwb_tree-checkbox").hasClass("fwb_tree-checkbox1")) {
						b = false;
					}
				});
				return b;
			};
			function _b5(n) {
				var ck = n.find(".fwb_tree-checkbox");
				if (ck.hasClass("fwb_tree-checkbox1") || ck.hasClass("fwb_tree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if (!$(this).children("div.fwb_tree-node").children(".fwb_tree-checkbox").hasClass("fwb_tree-checkbox0")) {
						b = false;
					}
				});
				return b;
			};
		};
	};
	function _b6(_b7, _b8) {
		var _b9 = $.data(_b7, "fwb_tree").options;
		var _ba = $(_b8);
		if (_bb(_b7, _b8)) {
			var ck = _ba.find(".fwb_tree-checkbox");
			if (ck.length) {
				if (ck.hasClass("fwb_tree-checkbox1")) {
					_a6(_b7, _b8, true);
				} else {
					_a6(_b7, _b8, false);
				}
			} else {
				if (_b9.onlyLeafCheck) {
					$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox0\"></span>").insertBefore(_ba.find(".fwb_tree-title"));
					_85(_b7);
				}
			}
		} else {
			var ck = _ba.find(".fwb_tree-checkbox");
			if (_b9.onlyLeafCheck) {
				ck.remove();
			} else {
				if (ck.hasClass("fwb_tree-checkbox1")) {
					_a6(_b7, _b8, true);
				} else {
					if (ck.hasClass("fwb_tree-checkbox2")) {
						var _bc = true;
						var _bd = true;
						var _be = _bf(_b7, _b8);
						for (var i = 0; i < _be.length; i++) {
							if (_be[i].checked) {
								_bd = false;
							} else {
								_bc = false;
							}
						}
						if (_bc) {
							_a6(_b7, _b8, true);
						}
						if (_bd) {
							_a6(_b7, _b8, false);
						}
					}
				}
			}
		}
	};
	
	// hap 2011.11.25
	// 分次载入
	// loadDataArray
	function loadDataXX(isTree, _c1, ul, _c2, _c3, autoLoadCount) {
		var _c4 = $.data(_c1, "fwb_tree").options;
		if (!_c3) {
			$(ul).empty();
		}
		var _c5 = [];
		var _c6 = $(ul).prev("div.fwb_tree-node").find("span.fwb_tree-indent, span.fwb_tree-hit").length;
		
		//appendNodes(ul, _c2, _c6);
		var el = $(ul).parent(".fwb_combo-fwb_panel"),
			elIndex = 0,
			hh = autoLoadCount, 
			target = _c1, 
			data = _c2,
			p = el.parent(),
			opts = _c4,
			depth = _c6,
			bindTreeEvents = _85,
			x = null;
		//
		if(isTree){
			
			x = false;
			
			appendNodes(ul, data, depth);
			
			// 滚动事件， 当接近滚动条底部时尝试增加数据
			el.bind("scroll click", function(){
				if(x == true) return;
				
				var sh = el.get(0).scrollHeight, // 滚动条高度
					h = el.get(0).scrollTop + el.outerHeight(); // 当前滚动到的位置
				
				if(sh - h > hh) return;
				
				x = true;
				
				$(ul).empty();
				
				appendNodes(ul, data, depth);
				
				bindTreeEvents(target);
			}); // end el.scroll
		}else if(data.length < hh){
			appendNodes(ul, data, depth);
		}else{
			
			// 初始化， 加载数据到滚动条位置
			for(; elIndex < data.length; elIndex++){
				
				if(elIndex > hh){
					break;
				}else{
					appendNodes(ul, [data[elIndex]], 0);
				};
			};
			
			// 滚动事件， 当接近滚动条底部时尝试增加数据
			el.scroll(function(){
				
				var sh = el.get(0).scrollHeight, // 滚动条高度
					h = el.get(0).scrollTop + el.outerHeight(); // 当前滚动到的位置
				
				if(sh - h > hh) return;
				
				for(var i = 0; i < hh; i++){
					if(elIndex >= data.length) return;
					
					appendNodes(ul, [data[elIndex]], 0);
					elIndex++;
				};
				_85(_c1);
				
				hh *= 2;
			}); // end el.scroll
		};
		// end new code
		
		bindTreeEvents(_c1);
		
		if (_c4.dnd) {
			_8e(_c1);
		} else {
			_8b(_c1);
		}
		for (var i = 0; i < _c5.length; i++) {
			_a6(_c1, _c5[i], true);
		}
		var _c8 = null;
		if (_c1 != ul) {
			var _c9 = $(ul).prev();
			_c8 = _af(_c1, _c9[0]);
		};
		_c4.onLoadSuccess.call(_c1, _c8, _c2);
		
		// appendNodes
		function appendNodes(ul, _ca, _cb) {
			for (var i = 0; i < _ca.length; i++) {
				//
				if(x == false){
					if(elIndex > hh) break;
					elIndex++;
				};
				//
				var li = $("<li></li>").appendTo(ul);
				var _cc = _ca[i];
				// hap add (2011.08.20) ： 增加formatter功能
				// hap add (2012.04.10) ： 增加_TEXT， insertData的数据不使用textField和formatter
				var formatText = _cc["_TEXT"] == "" ? "" : ((_c4.formatter ? _c4.formatter(_cc) : "") || _cc.text || "");
				//
				if (_cc.state != "open" && _cc.state != "closed") {
					_cc.state = "open";
				}
				var _cd = $("<div class=\"fwb_tree-node\"></div>").attr("title",  $("<div />").html(formatText).text()).appendTo(li);// hap add (2011.12.21): 增加title提示
				_cd.attr("node-id", _cc.id);
				$.data(_cd[0], "fwb_tree-node", {
					id: _cc.id,
					text: _cc.text,
					formatText: formatText, // hap add
					nodeLevel: _cc.nodeLevel, // hap add
					iconCls: _cc.iconCls,
					attributes: _cc.attributes,
					data: _cc.data || {}
				});
				$("<span class=\"fwb_tree-title\"></span>").html(
					//_cc.text 
					formatText // hap add (2011.08.20) ： 增加formatter功能
				).attr("title",  $("<div />").html(formatText).text()).appendTo(_cd); // hap add (2011.12.21): 增加title提示
				if (_c4.checkbox) {
					if (_c4.onlyLeafCheck) {
						if (_cc.state == "open" && (!_cc.children || !_cc.children.length)) {
							if (_cc.checked) {
								$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox1\"></span>").prependTo(_cd);
							} else {
								$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox0\"></span>").prependTo(_cd);
							}
						}
					} else {
						if (_cc.checked) {
							$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox1\"></span>").prependTo(_cd);
							_c5.push(_cd[0]);
						} else {
							$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox0\"></span>").prependTo(_cd);
						}
					}
				}
				// end if
				if (_cc.children && _cc.children.length) {
					var _ce = $("<ul></ul>").appendTo(li);
					if (_cc.state == "open") {
						$("<span class=\"fwb_tree-icon fwb_tree-folder fwb_tree-folder-open\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-expanded\"></span>").prependTo(_cd);
					} else {
						$("<span class=\"fwb_tree-icon fwb_tree-folder\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-collapsed\"></span>").prependTo(_cd);
						_ce.css("display", "none");
					}
					appendNodes(_ce, _cc.children, _cb + 1);
				} else {
					if (_cc.state == "closed") {
						$("<span class=\"fwb_tree-icon fwb_tree-folder\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-collapsed\"></span>").prependTo(_cd);
					} else {
						$("<span class=\"fwb_tree-icon fwb_tree-file\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-indent\"></span>").prependTo(_cd);
					}
				}
				// end else
				for (var j = 0; j < _cb; j++) {
					$("<span class=\"fwb_tree-indent\"></span>").prependTo(_cd);
				}
				// end for
			}
			// end for
		};
		// end appendNodes
	};
	// end loadData
	
	function loadData(target, ul, data, _c3, autoLoadCount){
		
		if(!$.isArray(data)) return;
		
		var isTree = false;
		
		for(var i = 0, len = data.length; i < len; i++){
			var n = data[i];
			if($.isArray(n.children) && n.children.length){
				isTree = true;
				break;
			};
		};
		
		if(isTree){
			loadDataXX(true, target, ul, data, _c3, autoLoadCount);
		}else{
			loadDataXX(false, target, ul, data, _c3, autoLoadCount);
		};
	
	};
	
	// loadData
	function _c0(_c1, ul, _c2, _c3) {
		
		var _c4 = $.data(_c1, "fwb_tree").options;
		
		
		// hap 2011.11.25
		// 分次载入
		// loadDataArray
		if(_c4.autoLoad && _c4.autoLoadCount) return loadData(_c1, ul, _c2, _c3, _c4.autoLoadCount);
		
		if (!_c3) {
			$(ul).empty();
		}
		var _c5 = [];
		var _c6 = $(ul).prev("div.fwb_tree-node").find("span.fwb_tree-indent, span.fwb_tree-hit").length;
		_c7(ul, _c2, _c6);
		_85(_c1);
		if (_c4.dnd) {
			_8e(_c1);
		} else {
			_8b(_c1);
		}
		for (var i = 0; i < _c5.length; i++) {
			_a6(_c1, _c5[i], true);
		}
		var _c8 = null;
		if (_c1 != ul) {
			var _c9 = $(ul).prev();
			_c8 = _af(_c1, _c9[0]);
		};
		_c4.onLoadSuccess.call(_c1, _c8, _c2);
		function _c7(ul, _ca, _cb) {
			for (var i = 0; i < _ca.length; i++) {
				var li = $("<li></li>").appendTo(ul);
				var _cc = _ca[i];
				// hap add (2011.08.20) ： 增加formatter功能
				// hap add (2012.04.10) ： 增加_TEXT， insertData的数据不使用textField和formatter
				var formatText = _cc["_TEXT"] == "" ? "" : ((_c4.formatter ? _c4.formatter(_cc) : "") || _cc.text || "");
				//
				if (_cc.state != "open" && _cc.state != "closed") {
					_cc.state = "open";
				}
				var _cd = $("<div class=\"fwb_tree-node\"></div>").attr("title",  $("<div />").html(formatText).text()).appendTo(li);// hap add (2011.12.21): 增加title提示
				_cd.attr("node-id", _cc.id);
				$.data(_cd[0], "fwb_tree-node", {
					id: _cc.id,
					text: _cc.text,
					formatText: formatText, // hap add
					nodeLevel: _cc.nodeLevel, // hap add
					iconCls: _cc.iconCls,
					attributes: _cc.attributes,
					data: _cc.data || {}
				});
				$("<span class=\"fwb_tree-title\"></span>").html(
					//_cc.text 
					formatText // hap add (2011.08.20) ： 增加formatter功能
				).attr("title",  $("<div />").html(formatText).text()).appendTo(_cd); // hap add (2011.12.21): 增加title提示
				if (_c4.checkbox) {
					if (_c4.onlyLeafCheck) {
						if (_cc.state == "open" && (!_cc.children || !_cc.children.length)) {
							if (_cc.checked) {
								$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox1\"></span>").prependTo(_cd);
							} else {
								$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox0\"></span>").prependTo(_cd);
							}
						}
					} else {
						if (_cc.checked) {
							$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox1\"></span>").prependTo(_cd);
							_c5.push(_cd[0]);
						} else {
							$("<span class=\"fwb_tree-checkbox fwb_tree-checkbox0\"></span>").prependTo(_cd);
						}
					}
				}
				if (_cc.children && _cc.children.length) {
					var _ce = $("<ul></ul>").appendTo(li);
					if (_cc.state == "open") {
						$("<span class=\"fwb_tree-icon fwb_tree-folder fwb_tree-folder-open\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-expanded\"></span>").prependTo(_cd);
					} else {
						$("<span class=\"fwb_tree-icon fwb_tree-folder\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-collapsed\"></span>").prependTo(_cd);
						_ce.css("display", "none");
					}
					_c7(_ce, _cc.children, _cb + 1);
				} else {
					if (_cc.state == "closed") {
						$("<span class=\"fwb_tree-icon fwb_tree-folder\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-hit fwb_tree-collapsed\"></span>").prependTo(_cd);
					} else {
						$("<span class=\"fwb_tree-icon fwb_tree-file\"></span>").addClass(_cc.iconCls).prependTo(_cd);
						$("<span class=\"fwb_tree-indent\"></span>").prependTo(_cd);
					}
				}
				for (var j = 0; j < _cb; j++) {
					$("<span class=\"fwb_tree-indent\"></span>").prependTo(_cd);
				}
			}
		};
	};
	// end loadData
	
	function _cf(_d0, ul, _d1, _d2) {
		var _d3 = $.data(_d0, "fwb_tree").options;
		_d1 = _d1 || {};
		var _d4 = null;
		if (_d0 != ul) {
			var _d5 = $(ul).prev();
			_d4 = _af(_d0, _d5[0]);
		}
		if (_d3.onBeforeLoad.call(_d0, _d4, _d1) == false) {
			return;
		}
		if (!_d3.url) {
			return;
		}
		var _d6 = $(ul).prev().children("span.fwb_tree-folder");
		_d6.addClass("fwb_tree-loading");
		$.ajax({
			type: _d3.method,
			url: _d3.url,
			data: _d1,
			dataType: "json",
			success: function(_d7) {
				_d6.removeClass("fwb_tree-loading");
				_c0(_d0, ul, _d7);
				if (_d2) {
					_d2();
				}
			},
			error: function() {
				_d6.removeClass("fwb_tree-loading");
				_d3.onLoadError.apply(_d0, arguments);
				if (_d2) {
					_d2();
				}
			}
		});
	};
	function _d8(_d9, _da, _db) {
		var _dc = $.data(_d9, "fwb_tree").options;
		var hit = $(_da).children("span.fwb_tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("fwb_tree-expanded")) {
			return;
		}
		var _dd = _af(_d9, _da);
		if (_dc.onBeforeExpand.call(_d9, _dd) == false) {
			return;
		}
		hit.removeClass("fwb_tree-collapsed fwb_tree-collapsed-hover").addClass("fwb_tree-expanded");
		hit.next().addClass("fwb_tree-folder-open");
		var ul = $(_da).next();
		if (ul.length) {
			if (_dc.animate) {
				ul.slideDown("normal",
				function() {
					_dc.onExpand.call(_d9, _dd);
					if (_db) {
						_db();
					}
				});
			} else {
				ul.css("display", "block");
				_dc.onExpand.call(_d9, _dd);
				if (_db) {
					_db();
				}
			}
		} else {
			var _de = $("<ul style=\"display:none\"></ul>").insertAfter(_da);
			_cf(_d9, _de[0], {
				id: _dd.id
			},
			function() {
				if (_dc.animate) {
					_de.slideDown("normal",
					function() {
						_dc.onExpand.call(_d9, _dd);
						if (_db) {
							_db();
						}
					});
				} else {
					_de.css("display", "block");
					_dc.onExpand.call(_d9, _dd);
					if (_db) {
						_db();
					}
				}
			});
		}
	};
	function _df(_e0, _e1) {
		var _e2 = $.data(_e0, "fwb_tree").options;
		var hit = $(_e1).children("span.fwb_tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("fwb_tree-collapsed")) {
			return;
		}
		var _e3 = _af(_e0, _e1);
		if (_e2.onBeforeCollapse.call(_e0, _e3) == false) {
			return;
		}
		hit.removeClass("fwb_tree-expanded fwb_tree-expanded-hover").addClass("fwb_tree-collapsed");
		hit.next().removeClass("fwb_tree-folder-open");
		var ul = $(_e1).next();
		if (_e2.animate) {
			ul.slideUp("normal",
			function() {
				_e2.onCollapse.call(_e0, _e3);
			});
		} else {
			ul.css("display", "none");
			_e2.onCollapse.call(_e0, _e3);
		}
	};
	function _e4(_e5, _e6) {
		var hit = $(_e6).children("span.fwb_tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("fwb_tree-expanded")) {
			_df(_e5, _e6);
		} else {
			_d8(_e5, _e6);
		}
	};
	function _e7(_e8, _e9) {
		var _ea = _bf(_e8, _e9);
		if (_e9) {
			_ea.unshift(_af(_e8, _e9));
		}
		for (var i = 0; i < _ea.length; i++) {
			_d8(_e8, _ea[i].target);
		}
	};
	function _eb(_ec, _ed) {
		var _ee = [];
		var p = _ef(_ec, _ed);
		while (p) {
			_ee.unshift(p);
			p = _ef(_ec, p.target);
		}
		for (var i = 0; i < _ee.length; i++) {
			_d8(_ec, _ee[i].target);
		}
	};
	function _f0(_f1, _f2) {
		var _f3 = _bf(_f1, _f2);
		if (_f2) {
			_f3.unshift(_af(_f1, _f2));
		}
		for (var i = 0; i < _f3.length; i++) {
			_df(_f1, _f3[i].target);
		}
	};
	function _f4(_f5) {
		var _f6 = _f7(_f5);
		if (_f6.length) {
			return _f6[0];
		} else {
			return null;
		}
	};
	function _f7(_f8) {
		var _f9 = [];
		$(_f8).children("li").each(function() {
			var _fa = $(this).children("div.fwb_tree-node");
			_f9.push(_af(_f8, _fa[0]));
		});
		return _f9;
	};
	function _bf(_fb, _fc) {
		var _fd = [];
		if (_fc) {
			_fe($(_fc));
		} else {
			var _ff = _f7(_fb);
			for (var i = 0; i < _ff.length; i++) {
				_fd.push(_ff[i]);
				_fe($(_ff[i].target));
			}
		}
		function _fe(node) {
			node.next().find("div.fwb_tree-node").each(function() {
				_fd.push(_af(_fb, this));
			});
		};
		return _fd;
	};
	function _ef(_100, _101) {
		var ul = $(_101).parent().parent();
		if (ul[0] == _100) {
			return null;
		} else {
			return _af(_100, ul.prev()[0]);
		}
	};
	function _102(_103) {
		var _104 = [];
		$(_103).find(".fwb_tree-checkbox1").each(function() {
			var node = $(this).parent();
			_104.push(_af(_103, node[0]));
		});
		return _104;
	};
	function _105(_106) {
		var node = $(_106).find("div.fwb_tree-node-selected");
		if (node.length) {
			return _af(_106, node[0]);
		} else {
			return null;
		}
	};
	function _107(_108, _109) {
		var node = $(_109.parent);
		var ul;
		if (node.length == 0) {
			ul = $(_108);
		} else {
			ul = node.next();
			if (ul.length == 0) {
				ul = $("<ul></ul>").insertAfter(node);
			}
		}
		if (_109.data && _109.data.length) {
			var _10a = node.find("span.fwb_tree-icon");
			if (_10a.hasClass("fwb_tree-file")) {
				_10a.removeClass("fwb_tree-file").addClass("fwb_tree-folder");
				var hit = $("<span class=\"fwb_tree-hit fwb_tree-expanded\"></span>").insertBefore(_10a);
				if (hit.prev().length) {
					hit.prev().remove();
				}
			}
		}
		_c0(_108, ul[0], _109.data, true);
		_b6(_108, ul.prev());
	};
	function _10b(_10c, _10d) {
		var ref = _10d.before || _10d.after;
		var _10e = _ef(_10c, ref);
		var li;
		if (_10e) {
			_107(_10c, {
				parent: _10e.target,
				data: [_10d.data]
			});
			li = $(_10e.target).next().children("li:last");
		} else {
			_107(_10c, {
				parent: null,
				data: [_10d.data]
			});
			li = $(_10c).children("li:last");
		}
		if (_10d.before) {
			li.insertBefore($(ref).parent());
		} else {
			li.insertAfter($(ref).parent());
		}
	};
	function _10f(_110, _111) {
		var _112 = _ef(_110, _111);
		var node = $(_111);
		var li = node.parent();
		var ul = li.parent();
		li.remove();
		if (ul.children("li").length == 0) {
			var node = ul.prev();
			node.find(".fwb_tree-icon").removeClass("fwb_tree-folder").addClass("fwb_tree-file");
			node.find(".fwb_tree-hit").remove();
			$("<span class=\"fwb_tree-indent\"></span>").prependTo(node);
			if (ul[0] != _110) {
				ul.remove();
			}
		}
		if (_112) {
			_b6(_110, _112.target);
		}
	};
	function _113(_114, _115) {
		function _116(aa, ul) {
			ul.children("li").each(function() {
				var node = $(this).children("div.fwb_tree-node");
				var _117 = _af(_114, node[0]);
				var sub = $(this).children("ul");
				if (sub.length) {
					_117.children = [];
					_113(_117.children, sub);
				}
				aa.push(_117);
			});
		};
		if (_115) {
			var _118 = _af(_114, _115);
			_118.children = [];
			_116(_118.children, $(_115).next());
			return _118;
		} else {
			return null;
		}
	};
	function _119(_11a, _11b) {
		var node = $(_11b.target);
		var data = $.data(_11b.target, "fwb_tree-node");
		if (data.iconCls) {
			node.find(".fwb_tree-icon").removeClass(data.iconCls);
		}
		$.extend(data, _11b);
		$.data(_11b.target, "fwb_tree-node", data);
		node.attr("node-id", data.id);
		node.find(".fwb_tree-title").html(
			//data.text
			data.formatText // hap add (2011.08.20) ： 增加formatter功能
		);
		if (data.iconCls) {
			node.find(".fwb_tree-icon").addClass(data.iconCls);
		}
		var ck = node.find(".fwb_tree-checkbox");
		ck.removeClass("fwb_tree-checkbox0 fwb_tree-checkbox1 fwb_tree-checkbox2");
		if (data.checked) {
			_a6(_11a, _11b.target, true);
		} else {
			_a6(_11a, _11b.target, false);
		}
	};
	function _af(_11c, _11d) {
		var node = $.extend({},
		$.data(_11d, "fwb_tree-node"), {
			target: _11d,
			checked: $(_11d).find(".fwb_tree-checkbox").hasClass("fwb_tree-checkbox1")
		});
		if (!_bb(_11c, _11d)) {
			node.state = $(_11d).find(".fwb_tree-hit").hasClass("fwb_tree-expanded") ? "open": "closed";
		}
		return node;
	};
	function _11e(_11f, id) {
		var node = $(_11f).find("div.fwb_tree-node[node-id=" + id + "]");
		if (node.length) {
			return _af(_11f, node[0]);
		} else {
			return null;
		}
	};
	function _120(_121, _122) {
		var opts = $.data(_121, "fwb_tree").options;
		var node = _af(_121, _122);
		if (opts.onBeforeSelect.call(_121, node) == false) {
			return;
		}
		$("div.fwb_tree-node-selected", _121).removeClass("fwb_tree-node-selected");
		$(_122).addClass("fwb_tree-node-selected");
		// hap add 2012/10/28
		_121.element = $(_121).data("combo_input");
		//
		opts.onSelect.call(_121, node);
	};
	function _bb(_123, _124) {
		var node = $(_124);
		var hit = node.children("span.fwb_tree-hit");
		return hit.length == 0;
	};
	function _125(_126, _127) {
		var opts = $.data(_126, "fwb_tree").options;
		var node = _af(_126, _127);
		if (opts.onBeforeEdit.call(_126, node) == false) {
			return;
		}
		$(_127).css("position", "relative");
		var nt = $(_127).find(".fwb_tree-title");
		var _128 = nt.outerWidth();
		nt.empty();
		var _129 = $("<input class=\"fwb_tree-editor\">").appendTo(nt);
		_129.val(node.text).focus();
		_129.width(_128 + 20);
		_129.height(document.compatMode == "CSS1Compat" ? (18 - (_129.outerHeight() - _129.height())) : 18);
		_129.bind("click",
		function(e) {
			return false;
		}).bind("mousedown",
		function(e) {
			e.stopPropagation();
		}).bind("mousemove",
		function(e) {
			e.stopPropagation();
		}).bind("keydown",
		function(e) {
			if (e.keyCode == 13) {
				_12a(_126, _127);
				return false;
			} else {
				if (e.keyCode == 27) {
					_12e(_126, _127);
					return false;
				}
			}
		}).bind("blur",
		function(e) {
			e.stopPropagation();
			_12a(_126, _127);
		});
	};
	function _12a(_12b, _12c) {
		var opts = $.data(_12b, "fwb_tree").options;
		$(_12c).css("position", "");
		var _12d = $(_12c).find("input.fwb_tree-editor");
		var val = _12d.val();
		_12d.remove();
		var node = _af(_12b, _12c);
		node.text = val;
		_119(_12b, node);
		opts.onAfterEdit.call(_12b, node);
	};
	function _12e(_12f, _130) {
		var opts = $.data(_12f, "fwb_tree").options;
		$(_130).css("position", "");
		$(_130).find("input.fwb_tree-editor").remove();
		var node = _af(_12f, _130);
		_119(_12f, node);
		opts.onCancelEdit.call(_12f, node);
	};
	$.fn.fwb_tree = function(_131, _132) {
		if (typeof _131 == "string") {
			return $.fn.fwb_tree.methods[_131](this, _132);
		}
		var _131 = _131 || {};
		return this.each(function() {
			var _133 = $.data(this, "fwb_tree");
			var opts;
			if (_133) {
				opts = $.extend(_133.options, _131);
				_133.options = opts;
			} else {
				opts = $.extend({},
				$.fn.fwb_tree.defaults, $.fn.fwb_tree.parseOptions(this), _131);
				$.data(this, "fwb_tree", {
					options: opts,
					fwb_tree: _7a(this)
				});
				var data = _7d(this);
				_c0(this, this, data);
			}
			if (opts.data) {
				_c0(this, this, opts.data);
			} else {
				if (opts.dnd) {
					_8e(this);
				} else {
					_8b(this);
				}
			}
			if (opts.url) {
				_cf(this, this);
			}
		});
	};
	$.fn.fwb_tree.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_tree").options;
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_c0(this, this, data);
				/*
				// hap add (2011.08.21) ： 默认只展开两级节点
				var t = this, roots = $(t).fwb_tree("collapseAll").fwb_tree("getRoots");
				$.each(roots, function(i, el){
					$(t).fwb_tree("expand", el.target);
				});
				
				// hap add (2011.08.25) ： 展开至所有选中节点
				var nodes = $(t).fwb_tree("getChecked");
				$.each(nodes, function(i, el){
					$(t).fwb_tree("expandTo", el.target);
				});
				
				// hap add (2011.08.25) ： 展开至所有选中节点
				var node = $(t).fwb_tree("getSelected");
				if(node && node.target) $(t).fwb_tree("expandTo", node.target);
				*/
			});
		},
		getNode: function(jq, _134) {
			return _af(jq[0], _134);
		},
		getData: function(jq, _135) {
			return _113(jq[0], _135);
		},
		reload: function(jq, _136) {
			return jq.each(function() {
				if (_136) {
					var node = $(_136);
					var hit = node.children("span.fwb_tree-hit");
					hit.removeClass("fwb_tree-expanded fwb_tree-expanded-hover").addClass("fwb_tree-collapsed");
					node.next().remove();
					_d8(this, _136);
				} else {
					$(this).empty();
					_cf(this, this);
				}
			});
		},
		getRoot: function(jq) {
			return _f4(jq[0]);
		},
		getRoots: function(jq) {
			return _f7(jq[0]);
		},
		getParent: function(jq, _137) {
			return _ef(jq[0], _137);
		},
		getChildren: function(jq, _138) {
			return _bf(jq[0], _138);
		},
		getChecked: function(jq) {
			return _102(jq[0]);
		},
		getSelected: function(jq) {
			return _105(jq[0]);
		},
		isLeaf: function(jq, _139) {
			return _bb(jq[0], _139);
		},
		find: function(jq, id) {
			return _11e(jq[0], id);
		},
		select: function(jq, _13a) {
			return jq.each(function() {
				_120(this, _13a);
			});
		},
		check: function(jq, _13b) {
			return jq.each(function() {
				_a6(this, _13b, true);
			});
		},
		uncheck: function(jq, _13c) {
			return jq.each(function() {
				_a6(this, _13c, false);
			});
		},
		collapse: function(jq, _13d) {
			return jq.each(function() {
				_df(this, _13d);
			});
		},
		expand: function(jq, _13e) {
			return jq.each(function() {
				_d8(this, _13e);
			});
		},
		collapseAll: function(jq, _13f) {
			return jq.each(function() {
				_f0(this, _13f);
			});
		},
		expandAll: function(jq, _140) {
			return jq.each(function() {
				_e7(this, _140);
			});
		},
		expandTo: function(jq, _141) {
			return jq.each(function() {
				_eb(this, _141);
			});
		},
		toggle: function(jq, _142) {
			return jq.each(function() {
				_e4(this, _142);
			});
		},
		append: function(jq, _143) {
			return jq.each(function() {
				_107(this, _143);
			});
		},
		insert: function(jq, _144) {
			return jq.each(function() {
				_10b(this, _144);
			});
		},
		remove: function(jq, _145) {
			return jq.each(function() {
				_10f(this, _145);
			});
		},
		pop: function(jq, _146) {
			var node = jq.fwb_tree("getData", _146);
			jq.fwb_tree("remove", _146);
			return node;
		},
		update: function(jq, _147) {
			return jq.each(function() {
				_119(this, _147);
			});
		},
		enableDnd: function(jq) {
			return jq.each(function() {
				_8e(this);
			});
		},
		disableDnd: function(jq) {
			return jq.each(function() {
				_8b(this);
			});
		},
		beginEdit: function(jq, _148) {
			return jq.each(function() {
				_125(this, _148);
			});
		},
		endEdit: function(jq, _149) {
			return jq.each(function() {
				_12a(this, _149);
			});
		},
		cancelEdit: function(jq, _14a) {
			return jq.each(function() {
				_12e(this, _14a);
			});
		}
	};
	// hap add (2011.08.26)
	$.strToFn = function(func){
		if(!func){
			return null;
		}else if(window[func]){
			func = window[func];
		}else{
			func = 'window["strToFn_tmp"] = ' + func;
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( func );
			func = window["strToFn_tmp"];
		};
		return $.isFunction(func) ? func : null;
	};
	$.fn.fwb_tree.parseOptions = function(_14b) {
		var t = $(_14b);
		return {
			url: t.attr("url"),
			valueField: t.attr("valueField"),
			// hap 2011.11.25
			// 分次载入
			// loadDataArray
			autoLoad: t.attr("autoLoad") == "true",
			autoLoadCount: parseInt(t.attr("autoLoadCount") || 40),
			
			textField: t.attr("textField"),
			onCheck: $.strToFn(t.attr("onCheck")) || function(){}, // hap add (2011.08.26)
			method: (t.attr("method") ? t.attr("method") : undefined),
			checkbox: (t.attr("checkbox") ? t.attr("checkbox") == "true": undefined),
			cascadeCheck: (t.attr("cascadeCheck") ? t.attr("cascadeCheck") == "true": undefined),
			onlyLeafCheck: (t.attr("onlyLeafCheck") ? t.attr("onlyLeafCheck") == "true": undefined),
			animate: (t.attr("animate") ? t.attr("animate") == "true": undefined),
			dnd: (t.attr("dnd") ? t.attr("dnd") == "true": undefined),
			noInverse: (t.attr("noInverse") ? t.attr("noInverse") == "true": undefined),
			noCheckParent: (t.attr("noCheckParent") ? t.attr("noCheckParent") == "true": undefined),
			singleCheck: (t.attr("singleCheck") ? t.attr("singleCheck") == "true": undefined)
		};
	};
	$.fn.fwb_tree.defaults = {
		url: null,
		method: "post",
		animate: false,
		checkbox: false,
		cascadeCheck: true,
		onlyLeafCheck: false,
		dnd: false,
		data: null,
		onBeforeLoad: function(node, _14c) {
			},
		onLoadSuccess: function(node, data) {
			},
		onLoadError: function() {
			},
		onClick: function(node) {
			},
		onDblClick: function(node) {
			},
		onBeforeExpand: function(node) {
			},
		onExpand: function(node) {
			},
		onBeforeCollapse: function(node) {
			},
		onCollapse: function(node) {
			},
		onCheck: function(node, _14d) {
			},
		onBeforeSelect: function(node) {
			},
		onSelect: function(node) {
			},
		onContextMenu: function(e, node) {
			},
		onDrop: function(_14e, _14f, _150) {
			},
		onBeforeEdit: function(node) {
			},
		onAfterEdit: function(node) {
			},
		onCancelEdit: function(node) {
			}
	};
})(fn.jQuery);
 (function($) {
	$.parser = {
		auto: true,
		onComplete: function(_151) {
			},
		plugins: ["fwb_linkbutton", "fwb_menu", "fwb_menubutton", "fwb_splitbutton", "fwb_progressbar", "fwb_tree", "fwb_combobox", "fwb_combotree", "fwb_numberbox", "fwb_validatebox", "fwb_searchbox", "fwb_numberspinner", "fwb_timespinner", "fwb_calendar", "fwb_datebox", "fwb_datetimebox", "fwb_layout", "fwb_panel", "fwb_datagrid", "fwb_propertygrid", "fwb_treegrid", "fwb_tabs", "fwb_accordion", "fwb_window", "fwb_dialog"],
		parse: function(_152) {
			var aa = [];
			for (var i = 0; i < $.parser.plugins.length; i++) {
				var name = $.parser.plugins[i];
				var r = $("." + name, _152);
				if (r.length) {
					if (r[name]) {
						r[name]();
					} else {
						aa.push({
							name: name,
							jq: r
						});
					}
				}
			}
			if (aa.length && window.easyloader) {
				var _153 = [];
				for (var i = 0; i < aa.length; i++) {
					_153.push(aa[i].name);
				}
				easyloader.load(_153,
				function() {
					for (var i = 0; i < aa.length; i++) {
						var name = aa[i].name;
						var jq = aa[i].jq;
						jq[name]();
					}
					$.parser.onComplete.call($.parser, _152);
				});
			} else {
				$.parser.onComplete.call($.parser, _152);
			}
		}
	};
	$(function() {
		if (!window.easyloader && $.parser.auto) {
			$.parser.parse();
		}
	});
})(fn.jQuery);
/*
 (function($) {
	function init(_154) {
		$(_154).addClass("fwb_progressbar");
		$(_154).html("<div class=\"fwb_progressbar-text\"></div><div class=\"fwb_progressbar-value\">&nbsp;</div>");
		return $(_154);
	};
	function _155(_156, _157) {
		var opts = $.data(_156, "fwb_progressbar").options;
		var bar = $.data(_156, "fwb_progressbar").bar;
		if (_157) {
			opts.width = _157;
		}
		if ($.boxModel == true) {
			bar.width(opts.width - (bar.outerWidth() - bar.width()));
		} else {
			bar.width(opts.width);
		}
		bar.find("div.fwb_progressbar-text").width(bar.width());
	};
	$.fn.fwb_progressbar = function(_158, _159) {
		if (typeof _158 == "string") {
			var _15a = $.fn.fwb_progressbar.methods[_158];
			if (_15a) {
				return _15a(this, _159);
			}
		}
		_158 = _158 || {};
		return this.each(function() {
			var _15b = $.data(this, "fwb_progressbar");
			if (_15b) {
				$.extend(_15b.options, _158);
			} else {
				_15b = $.data(this, "fwb_progressbar", {
					options: $.extend({},
					$.fn.fwb_progressbar.defaults, $.fn.fwb_progressbar.parseOptions(this), _158),
					bar: init(this)
				});
			}
			$(this).fwb_progressbar("setValue", _15b.options.value);
			_155(this);
		});
	};
	$.fn.fwb_progressbar.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_progressbar").options;
		},
		resize: function(jq, _15c) {
			return jq.each(function() {
				_155(this, _15c);
			});
		},
		getValue: function(jq) {
			return $.data(jq[0], "fwb_progressbar").options.value;
		},
		setValue: function(jq, _15d) {
			if (_15d < 0) {
				_15d = 0;
			}
			if (_15d > 100) {
				_15d = 100;
			}
			return jq.each(function() {
				var opts = $.data(this, "fwb_progressbar").options;
				var text = opts.text.replace(/{value}/, _15d);
				var _15e = opts.value;
				opts.value = _15d;
				$(this).find("div.fwb_progressbar-value").width(_15d + "%");
				$(this).find("div.fwb_progressbar-text").html(text);
				if (_15e != _15d) {
					opts.onChange.call(this, _15d, _15e);
				}
			});
		}
	};
	$.fn.fwb_progressbar.parseOptions = function(_15f) {
		var t = $(_15f);
		return {
			width: (parseInt(_15f.style.width) || undefined),
			value: (t.attr("value") ? parseInt(t.attr("value")) : undefined),
			text: t.attr("text")
		};
	};
	$.fn.fwb_progressbar.defaults = {
		width: "auto",
		value: 0,
		text: "{value}%",
		onChange: function(_160, _161) {
			}
	};
})(fn.jQuery);
*/
 (function($) {
	function _162(node) {
		node.each(function() {
			$(this).remove();
			if ($.browser.msie) {
				this.outerHTML = "";
			}
		});
	};
	function _163(_164, _165) {
		var opts = $.data(_164, "fwb_panel").options;
		var _166 = $.data(_164, "fwb_panel").fwb_panel;
		var _167 = _166.children("div.fwb_panel-header");
		var _168 = _166.children("div.fwb_panel-body");
		
		if (_165) {
			if (_165.width) {
				opts.width = _165.width;
			}
			if (_165.height) {
				opts.height = _165.height;
			}
			if (_165.left != null) {
				opts.left = _165.left;
			}
			if (_165.top != null) {
				opts.top = _165.top;
			}
			// hap add (2011.09.02)
			opts.mustInWindow = _165.mustInWindow;
		}
		if (opts.fit == true) {
			var p = _166.parent();
			
			// hap 2012.2 修改， 判断panel父元素是body的情况
			if(window.fn && (p.get(0) == document.body || p.get(0) == document)){
				opts.width = fn.clientWidth();
				opts.height = fn.clientHeight();
			}else{
				opts.width = p.width();
				opts.height = p.height();
			};
			
			// hap 2012/3/20
			function cssValue(str){
				str = str.replace(/([^\d])/gm, "");
				if(isNaN(str)){
					return 0;
				}else{
					return Number(str);
				};
			};
			if(p.length){
				var pw = cssValue(p.css("padding-left")) + 
						cssValue(p.css("padding-right"));
				opts.width -= pw;
			};
			
		};
		_166.css({
			left: opts.left,
			top: opts.top
		});
		
		if (!isNaN(opts.width)) {
			if ($.boxModel == true) {
				var padding = Number(_166.css("padding-left").replace("px",""));
				_166.width(opts.width - (_166.outerWidth() - _166.width()) + padding*2);
			} else {
				_166.width(opts.width);
			}
		} else {
			_166.width("auto");
		}
		if ($.boxModel == true) {
			_167.width(_166.width() - (_167.outerWidth() - _167.width()));
			_168.width(_166.width() - (_168.outerWidth() - _168.width()));
		} else {
			_167.width(_166.width());
			_168.width(_166.width());
		}
		if (!isNaN(opts.height)) {
			if ($.boxModel == true) {
				_166.height(opts.height - (_166.outerHeight() - _166.height()));
				_168.height(_166.height() - _167.outerHeight() - (_168.outerHeight() - _168.height()));
			} else {
				_166.height(opts.height);
				_168.height(_166.height() - _167.outerHeight());
			}
		} else {
			// hap add (2011.09.02)
			// 下拉框自动高度
			if(opts.mustInWindow) {
				var doc = document.compatMode=="CSS1Compat" ? 
						document.documentElement : document.body,
					scrollTop = doc.scrollTop,
					clientHeight = doc.clientHeight,
					scrollBottom = scrollTop + clientHeight,
					el = _166,
					elTop = el.offset().top,
					elBottom = elTop + _167.height(),
					disTop = elTop - scrollTop - 30,
					disBottom = scrollBottom - elBottom,
					dis = disTop > disBottom ? disTop : disBottom;
					
				_168.height("auto");
				
				if(_166.height() > dis){
					_166.height(dis - 10);
					_168.height(_166.height() - _167.outerHeight());
				};
			}else{
				_168.height("auto");
			};
			//
		}
		_166.css("height", "");
		opts.onResize.apply(_164, [opts.width, opts.height]);
		_166.find(">div.fwb_panel-body>div").triggerHandler("_resize");
	};
	function _169(_16a, _16b) {
		var opts = $.data(_16a, "fwb_panel").options;
		var _16c = $.data(_16a, "fwb_panel").fwb_panel;
		if (_16b) {
			if (_16b.left != null) {
				opts.left = _16b.left;
			}
			if (_16b.top != null) {
				opts.top = _16b.top;
			}
		}
		_16c.css({
			left: opts.left,
			top: opts.top
		});
		opts.onMove.apply(_16a, [opts.left, opts.top]);
	};
	function _16d(_16e) {
		var _16f = $(_16e).addClass("fwb_panel-body").wrap("<div class=\"fwb_panel\"></div>").parent();
		_16f.bind("_resize",
		function() {
			var opts = $.data(_16e, "fwb_panel").options;
			if (opts.fit == true) {
				_163(_16e);
			}
			return false;
		});
		return _16f;
	};
	function _170(_171) {
		var opts = $.data(_171, "fwb_panel").options;
		var _172 = $.data(_171, "fwb_panel").fwb_panel;
		_162(_172.find(">div.fwb_panel-header"));
		if (opts.title && !opts.noheader) {
			var _173 = $("<div class=\"fwb_panel-header\"><div class=\"fwb_panel-title\">" + opts.title + "</div></div>").prependTo(_172);
			if (opts.iconCls) {
				_173.find(".fwb_panel-title").addClass("fwb_panel-with-icon");
				$("<div class=\"fwb_panel-icon\"></div>").addClass(opts.iconCls).appendTo(_173);
			}
			var tool = $("<div class=\"fwb_panel-tool\"></div>").appendTo(_173);
			if (opts.closable) {
				$("<div class=\"fwb_panel-tool-close\"></div>").appendTo(tool).bind("click", _174);
			}
			if (opts.maximizable) {
				$("<div class=\"fwb_panel-tool-max\"></div>").appendTo(tool).bind("click", _175);
			}
			if (opts.minimizable) {
				$("<div class=\"fwb_panel-tool-min\"></div>").appendTo(tool).bind("click", _176);
			}
			if (opts.collapsible) {
				$("<div class=\"fwb_panel-tool-collapse\"></div>").appendTo(tool).bind("click", _177);
			}
			if (opts.tools) {
				for (var i = opts.tools.length - 1; i >= 0; i--) {
					var t = $("<div></div>").addClass(opts.tools[i].iconCls).appendTo(tool);
					if (opts.tools[i].handler) {
						t.bind("click", eval(opts.tools[i].handler));
					}
				}
			}
			tool.find("div").hover(function() {
				$(this).addClass("fwb_panel-tool-over");
			},
			function() {
				$(this).removeClass("fwb_panel-tool-over");
			});
			_172.find(">div.fwb_panel-body").removeClass("fwb_panel-body-noheader");
		} else {
			_172.find(">div.fwb_panel-body").addClass("fwb_panel-body-noheader");
		}
		function _177() {
			if (opts.collapsed == true) {
				_18f(_171, true);
			} else {
				_184(_171, true);
			}
			return false;
		};
		function _176() {
			_195(_171);
			return false;
		};
		function _175() {
			if (opts.maximized == true) {
				_198(_171);
			} else {
				_183(_171);
			}
			return false;
		};
		function _174() {
			_178(_171);
			return false;
		};
	};
	function _179(_17a) {
		var _17b = $.data(_17a, "fwb_panel");
		if (_17b.options.href && (!_17b.isLoaded || !_17b.options.cache)) {
			_17b.isLoaded = false;
			var _17c = _17b.fwb_panel.find(">div.fwb_panel-body");
			if (_17b.options.loadingMessage) {
				_17c.html($("<div class=\"fwb_panel-loading\"></div>").html(_17b.options.loadingMessage));
			}
			$.ajax({
				url: _17b.options.href,
				cache: false,
				success: function(data) {
					_17c.html(_17b.options.extractor.call(_17a, data));
					if ($.parser) {
						$.parser.parse(_17c);
					}
					_17b.options.onLoad.apply(_17a, arguments);
					_17b.isLoaded = true;
				}
			});
		}
	};
	function _17d(_17e) {
		$(_17e).find("div.fwb_panel:visible,div.fwb_accordion:visible,div.fwb_tabs-container:visible,div.fwb_layout:visible").each(function() {
			$(this).triggerHandler("_resize", [true]);
		});
	};
	function _17f(_180, _181) {
		var opts = $.data(_180, "fwb_panel").options;
		var _182 = $.data(_180, "fwb_panel").fwb_panel;
		if (_181 != true) {
			if (opts.onBeforeOpen.call(_180) == false) {
				return;
			}
		}
		_182.show();
		opts.closed = false;
		opts.minimized = false;
		opts.onOpen.call(_180);
		if (opts.maximized == true) {
			opts.maximized = false;
			_183(_180);
		}
		if (opts.collapsed == true) {
			opts.collapsed = false;
			_184(_180);
		}
		if (!opts.collapsed) {
			_179(_180);
			_17d(_180);
		};
	};
	function _178(_185, _186) {
		var opts = $.data(_185, "fwb_panel").options;
		var _187 = $.data(_185, "fwb_panel").fwb_panel;
		if (_186 != true) {
			if (opts.onBeforeClose.call(_185) == false) {
				return;
			}
		}
		_187.hide();
		opts.closed = true;
		opts.onClose.call(_185);
	};
	function _188(_189, _18a) {
		var opts = $.data(_189, "fwb_panel").options;
		var _18b = $.data(_189, "fwb_panel").fwb_panel;
		if (_18a != true) {
			if (opts.onBeforeDestroy.call(_189) == false) {
				return;
			}
		}
		_162(_18b);
		opts.onDestroy.call(_189);
	};
	function _184(_18c, _18d) {
		var opts = $.data(_18c, "fwb_panel").options;
		var _18e = $.data(_18c, "fwb_panel").fwb_panel;
		var body = _18e.children("div.fwb_panel-body");
		var tool = _18e.children("div.fwb_panel-header").find("div.fwb_panel-tool-collapse");
		if (opts.collapsed == true) {
			return;
		}
		body.stop(true, true);
		if (opts.onBeforeCollapse.call(_18c) == false) {
			return;
		}
		tool.addClass("fwb_panel-tool-expand");
		if (_18d == true) {
			body.slideUp("normal",
			function() {
				opts.collapsed = true;
				opts.onCollapse.call(_18c);
			});
		} else {
			body.hide();
			opts.collapsed = true;
			opts.onCollapse.call(_18c);
		}
	};
	function _18f(_190, _191) {
		var opts = $.data(_190, "fwb_panel").options;
		var _192 = $.data(_190, "fwb_panel").fwb_panel;
		var body = _192.children("div.fwb_panel-body");
		var tool = _192.children("div.fwb_panel-header").find("div.fwb_panel-tool-collapse");
		if (opts.collapsed == false) {
			return;
		}
		body.stop(true, true);
		if (opts.onBeforeExpand.call(_190) == false) {
			return;
		}
		tool.removeClass("fwb_panel-tool-expand");
		if (_191 == true) {
			body.slideDown("normal",
			function() {
				opts.collapsed = false;
				opts.onExpand.call(_190);
				_179(_190);
				_17d(_190);
			});
		} else {
			body.show();
			opts.collapsed = false;
			opts.onExpand.call(_190);
			_179(_190);
			_17d(_190);
		}
	};
	function _183(_193) {
		var opts = $.data(_193, "fwb_panel").options;
		var _194 = $.data(_193, "fwb_panel").fwb_panel;
		var tool = _194.children("div.fwb_panel-header").find("div.fwb_panel-tool-max");
		if (opts.maximized == true) {
			return;
		}
		tool.addClass("fwb_panel-tool-restore");
		if (!$.data(_193, "fwb_panel").original) {
			$.data(_193, "fwb_panel").original = {
				width: opts.width,
				height: opts.height,
				left: opts.left,
				top: opts.top,
				fit: opts.fit
			};
		}
		opts.left = 0;
		opts.top = 0;
		opts.fit = true;
		_163(_193);
		opts.minimized = false;
		opts.maximized = true;
		opts.onMaximize.call(_193);
	};
	function _195(_196) {
		var opts = $.data(_196, "fwb_panel").options;
		var _197 = $.data(_196, "fwb_panel").fwb_panel;
		_197.hide();
		opts.minimized = true;
		opts.maximized = false;
		opts.onMinimize.call(_196);
	};
	function _198(_199) {
		var opts = $.data(_199, "fwb_panel").options;
		var _19a = $.data(_199, "fwb_panel").fwb_panel;
		var tool = _19a.children("div.fwb_panel-header").find("div.fwb_panel-tool-max");
		if (opts.maximized == false) {
			return;
		}
		_19a.show();
		tool.removeClass("fwb_panel-tool-restore");
		var _19b = $.data(_199, "fwb_panel").original;
		opts.width = _19b.width;
		opts.height = _19b.height;
		opts.left = _19b.left;
		opts.top = _19b.top;
		opts.fit = _19b.fit;
		_163(_199);
		opts.minimized = false;
		opts.maximized = false;
		$.data(_199, "fwb_panel").original = null;
		opts.onRestore.call(_199);
	};
	function _19c(_19d) {
		var opts = $.data(_19d, "fwb_panel").options;
		var _19e = $.data(_19d, "fwb_panel").fwb_panel;
		if (opts.border == true) {
			_19e.children("div.fwb_panel-header").removeClass("fwb_panel-header-noborder");
			_19e.children("div.fwb_panel-body").removeClass("fwb_panel-body-noborder");
		} else {
			_19e.children("div.fwb_panel-header").addClass("fwb_panel-header-noborder");
			_19e.children("div.fwb_panel-body").addClass("fwb_panel-body-noborder");
		}
		_19e.css(opts.style);
		_19e.addClass(opts.cls);
		_19e.children("div.fwb_panel-header").addClass(opts.headerCls);
		_19e.children("div.fwb_panel-body").addClass(opts.bodyCls);
	};
	function _19f(_1a0, _1a1) {
		$.data(_1a0, "fwb_panel").options.title = _1a1;
		$(_1a0).fwb_panel("header").find("div.fwb_panel-title").html(_1a1);
	};
	var TO = false;
	var _1a2 = true;
	$(window).unbind(".fwb_panel").bind("resize.fwb_panel",
	function() {
		if (!_1a2) {
			return;
		}
		if (TO !== false) {
			clearTimeout(TO);
		}
		TO = setTimeout(function() {
			_1a2 = false;
			var _1a3 = $("body.fwb_layout");
			if (_1a3.length) {
				_1a3.fwb_layout("resize");
			} else {
				$("body").children("div.fwb_panel,div.fwb_accordion,div.fwb_tabs-container,div.fwb_layout").triggerHandler("_resize");
			}
			_1a2 = true;
			TO = false;
		},
		200);
	});
	$.fn.fwb_panel = function(_1a4, _1a5) {
		if (typeof _1a4 == "string") {
			return $.fn.fwb_panel.methods[_1a4](this, _1a5);
		}
		_1a4 = _1a4 || {};
		return this.each(function() {
			var _1a6 = $.data(this, "fwb_panel");
			var opts;
			if (_1a6) {
				opts = $.extend(_1a6.options, _1a4);
			} else {
				opts = $.extend({},
				$.fn.fwb_panel.defaults, $.fn.fwb_panel.parseOptions(this), _1a4);
				$(this).attr("title", "");
				_1a6 = $.data(this, "fwb_panel", {
					options: opts,
					fwb_panel: _16d(this),
					isLoaded: false
				});
			}
			if (opts.content) {
				$(this).html(opts.content);
				if ($.parser) {
					$.parser.parse(this);
				}
			}
			_170(this);
			_19c(this);
			if (opts.doSize == true) {
				_1a6.fwb_panel.css("display", "block");
				_163(this);
			}
			if (opts.closed == true || opts.minimized == true) {
				_1a6.fwb_panel.hide();
			} else {
				_17f(this);
			}
		});
	};
	$.fn.fwb_panel.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_panel").options;
		},
		panel: function(jq) {
			return $.fn.fwb_panel.methods.fwb_panel(jq);
		},
		fwb_panel: function(jq) {
			return $.data(jq[0], "fwb_panel").fwb_panel;
		},
		header: function(jq) {
			return $.data(jq[0], "fwb_panel").fwb_panel.find(">div.fwb_panel-header");
		},
		body: function(jq) {
			return $.data(jq[0], "fwb_panel").fwb_panel.find(">div.fwb_panel-body");
		},
		setTitle: function(jq, _1a7) {
			return jq.each(function() {
				_19f(this, _1a7);
			});
		},
		open: function(jq, _1a8) {
			return jq.each(function() {
				_17f(this, _1a8);
			});
		},
		close: function(jq, _1a9) {
			return jq.each(function() {
				_178(this, _1a9);
			});
		},
		destroy: function(jq, _1aa) {
			return jq.each(function() {
				_188(this, _1aa);
			});
		},
		refresh: function(jq, href) {
			return jq.each(function() {
				$.data(this, "fwb_panel").isLoaded = false;
				if (href) {
					$.data(this, "fwb_panel").options.href = href;
				}
				_179(this);
			});
		},
		resize: function(jq, _1ab) {
			return jq.each(function() {
				_163(this, _1ab);
			});
		},
		move: function(jq, _1ac) {
			return jq.each(function() {
				_169(this, _1ac);
			});
		},
		maximize: function(jq) {
			return jq.each(function() {
				_183(this);
			});
		},
		minimize: function(jq) {
			return jq.each(function() {
				_195(this);
			});
		},
		restore: function(jq) {
			return jq.each(function() {
				_198(this);
			});
		},
		collapse: function(jq, _1ad) {
			return jq.each(function() {
				_184(this, _1ad);
			});
		},
		expand: function(jq, _1ae) {
			return jq.each(function() {
				_18f(this, _1ae);
			});
		}
	};
	$.fn.fwb_panel.parseOptions = function(_1af) {
		var t = $(_1af);
		return {
			width: (parseInt(_1af.style.width) || undefined),
			height: (parseInt(_1af.style.height) || undefined),
			left: (parseInt(_1af.style.left) || undefined),
			top: (parseInt(_1af.style.top) || undefined),
			title: (t.attr("title") || undefined),
			iconCls: (t.attr("iconCls") || t.attr("icon")),
			cls: t.attr("cls"),
			headerCls: t.attr("headerCls"),
			bodyCls: t.attr("bodyCls"),
			href: t.attr("href"),
			loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined),
			cache: (t.attr("cache") ? t.attr("cache") == "true": undefined),
			fit: (t.attr("fit") ? t.attr("fit") == "true": undefined),
			border: (t.attr("border") ? t.attr("border") == "true": undefined),
			noheader: (t.attr("noheader") ? t.attr("noheader") == "true": undefined),
			collapsible: (t.attr("collapsible") ? t.attr("collapsible") == "true": undefined),
			minimizable: (t.attr("minimizable") ? t.attr("minimizable") == "true": undefined),
			maximizable: (t.attr("maximizable") ? t.attr("maximizable") == "true": undefined),
			closable: (t.attr("closable") ? t.attr("closable") == "true": undefined),
			collapsed: (t.attr("collapsed") ? t.attr("collapsed") == "true": undefined),
			minimized: (t.attr("minimized") ? t.attr("minimized") == "true": undefined),
			maximized: (t.attr("maximized") ? t.attr("maximized") == "true": undefined),
			closed: (t.attr("closed") ? t.attr("closed") == "true": undefined)
		};
	};
	$.fn.fwb_panel.defaults = {
		title: null,
		iconCls: null,
		width: "auto",
		height: "auto",
		left: null,
		top: null,
		cls: null,
		headerCls: null,
		bodyCls: null,
		style: {},
		href: null,
		cache: true,
		fit: false,
		border: true,
		doSize: true,
		noheader: false,
		content: null,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable: false,
		collapsed: false,
		minimized: false,
		maximized: false,
		closed: false,
		tools: [],
		href: null,
		loadingMessage: "Loading...",
		extractor: function(data) {
			var _1b0 = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
			var _1b1 = _1b0.exec(data);
			if (_1b1) {
				return _1b1[1];
			} else {
				return data;
			}
		},
		onLoad: function() {
			},
		onBeforeOpen: function() {
			},
		onOpen: function() {
			},
		onBeforeClose: function() {
			},
		onClose: function() {
			},
		onBeforeDestroy: function() {
			},
		onDestroy: function() {
			},
		onResize: function(_1b2, _1b3) {
			},
		onMove: function(left, top) {
			},
		onMaximize: function() {
			},
		onRestore: function() {
			},

		onMinimize: function() {
			},
		onBeforeCollapse: function() {
			},
		onBeforeExpand: function() {
			},
		onCollapse: function() {
			},
		onExpand: function() {
			}
	};
})(fn.jQuery);
 (function($) {
	function _1b4(_1b5, _1b6) {
		var opts = $.data(_1b5, "fwb_window").options;
		if (_1b6) {
			if (_1b6.width) {
				opts.width = _1b6.width;
			}
			if (_1b6.height) {
				opts.height = _1b6.height;
			}
			if (_1b6.left != null) {
				opts.left = _1b6.left;

			}
			if (_1b6.top != null) {
				opts.top = _1b6.top;
			}
		}
		$(_1b5).fwb_panel("resize", opts);
	};
	function _1b7(_1b8, _1b9) {
		var _1ba = $.data(_1b8, "fwb_window");
		
		if (_1b9) {
			if (_1b9.left != null) {
				_1ba.options.left = _1b9.left;
			}
			if (_1b9.top != null) {
				_1ba.options.top = _1b9.top;
			}
		}
		$(_1b8).fwb_panel("move", _1ba.options);
		if (_1ba.shadow) {
			_1ba.shadow.css({
				left: _1ba.options.left,
				top: _1ba.options.top
			});
		}
	};
	function _1bb(_1bc) {
		var _1bd = $.data(_1bc, "fwb_window");
		var win = $(_1bc).fwb_panel($.extend({},
		_1bd.options, {
			border: false,
			doSize: true,
			closed: true,
			cls: "fwb_window",
			headerCls: "fwb_window-header",
			bodyCls: "fwb_window-body " + (_1bd.options.noheader ? "fwb_window-body-noheader": ""),
			onBeforeDestroy: function() {
				if (_1bd.options.onBeforeDestroy.call(_1bc) == false) {
					return false;
				}
				if (_1bd.shadow) {
					_1bd.shadow.remove();
				}
				if (_1bd.mask) {
					_1bd.mask.remove();
				}
			},
			onClose: function() {
				if (_1bd.shadow) {
					_1bd.shadow.hide();
				}
				if (_1bd.mask) {
					_1bd.mask.hide();
				}
				_1bd.options.onClose.call(_1bc);
			},
			onOpen: function() {
				if (_1bd.mask) {
					_1bd.mask.css({
						display: "block",
						zIndex: $.fn.fwb_window.defaults.zIndex++
					});
				}
				if (_1bd.shadow) {
					_1bd.shadow.css({
						display: "block",
						zIndex: $.fn.fwb_window.defaults.zIndex++,
						left: _1bd.options.left,
						top: _1bd.options.top,
						width: _1bd.fwb_window.outerWidth(),
						height: _1bd.fwb_window.outerHeight()
					});
				}
				_1bd.fwb_window.css("z-index", $.fn.fwb_window.defaults.zIndex++);
				
				
				// 2012.10.20 hap add 
				// 解决IE6穿透bug
				_663.bgiframe({
					height: _663.height() - 2,
					width: _663.width() - 2 // 减2解决因为bgiframe引起的下拉框出现滚动条问题
				});
				
				_1bd.options.onOpen.call(_1bc);
			},
			onResize: function(_1be, _1bf) {
				var opts = $(_1bc).fwb_panel("options");
				_1bd.options.width = opts.width;
				_1bd.options.height = opts.height;
				_1bd.options.left = opts.left;
				_1bd.options.top = opts.top;
				if (_1bd.shadow) {
					_1bd.shadow.css({
						left: _1bd.options.left,
						top: _1bd.options.top,
						width: _1bd.fwb_window.outerWidth(),
						height: _1bd.fwb_window.outerHeight()
					});
				}
				_1bd.options.onResize.call(_1bc, _1be, _1bf);
			},
			onMinimize: function() {
				if (_1bd.shadow) {
					_1bd.shadow.hide();
				}
				if (_1bd.mask) {
					_1bd.mask.hide();
				}
				_1bd.options.onMinimize.call(_1bc);
			},
			onBeforeCollapse: function() {
				if (_1bd.options.onBeforeCollapse.call(_1bc) == false) {
					return false;
				}
				if (_1bd.shadow) {
					_1bd.shadow.hide();
				}
			},
			onExpand: function() {
				if (_1bd.shadow) {
					_1bd.shadow.show();
				}
				_1bd.options.onExpand.call(_1bc);
			}
		}));
		_1bd.fwb_window = win.fwb_panel("fwb_panel");
		if (_1bd.mask) {
			_1bd.mask.remove();
		}
		if (_1bd.options.modal == true) {
			_1bd.mask = $("<div class=\"fwb_window-mask\"></div>").insertAfter(_1bd.fwb_window);
			_1bd.mask.css({
				width: (_1bd.options.inline ? _1bd.mask.parent().width() : _1c0().width),
				height: (_1bd.options.inline ? _1bd.mask.parent().height() : _1c0().height),
				display: "none"
			});
		}
		if (_1bd.shadow) {
			_1bd.shadow.remove();
		}
		if (_1bd.options.shadow == true) {
			_1bd.shadow = $("<div class=\"fwb_window-shadow\"></div>").insertAfter(_1bd.fwb_window);
			_1bd.shadow.css({
				display: "none"
			});
		}
		if (_1bd.options.left == null) {
			var _1c1 = _1bd.options.width;
			if (isNaN(_1c1)) {
				_1c1 = _1bd.fwb_window.outerWidth();
			}
			if (_1bd.options.inline) {
				var _1c2 = _1bd.fwb_window.parent();
				_1bd.options.left = (_1c2.width() - _1c1) / 2 + _1c2.scrollLeft();
			} else {
				_1bd.options.left = ($(window).width() - _1c1) / 2 + $(document).scrollLeft();
			}
		}
		if (_1bd.options.top == null) {
			var _1c3 = _1bd.fwb_window.height;
			if (isNaN(_1c3)) {
				_1c3 = _1bd.fwb_window.outerHeight();
			}
			if (_1bd.options.inline) {
				var _1c2 = _1bd.fwb_window.parent();
				_1bd.options.top = (_1c2.height() - _1c3) / 2 + _1c2.scrollTop();
			} else {
				_1bd.options.top = ($(window).height() - _1c3) / 2 + $(document).scrollTop();

			}
		}
		_1b7(_1bc);
		if (_1bd.options.closed == false) {
			win.fwb_window("open");
		}
	};
	function _1c4(_1c5) {
		var _1c6 = $.data(_1c5, "fwb_window");
		_1c6.fwb_window.fwb_draggable({
			handle: ">div.fwb_panel-header>div.fwb_panel-title",
			disabled: _1c6.options.draggable == false,
			onStartDrag: function(e) {
				if (_1c6.mask) {
					_1c6.mask.css("z-index", $.fn.fwb_window.defaults.zIndex++);
				}
				if (_1c6.shadow) {
					_1c6.shadow.css("z-index", $.fn.fwb_window.defaults.zIndex++);
				}
				_1c6.fwb_window.css("z-index", $.fn.fwb_window.defaults.zIndex++);
				if (!_1c6.proxy) {
					_1c6.proxy = $("<div class=\"fwb_window-proxy\"></div>").insertAfter(_1c6.fwb_window);
				}
				_1c6.proxy.css({
					display: "none",
					zIndex: $.fn.fwb_window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel == true ? (_1c6.fwb_window.outerWidth() - (_1c6.proxy.outerWidth() - _1c6.proxy.width())) : _1c6.fwb_window.outerWidth()),
					height: ($.boxModel == true ? (_1c6.fwb_window.outerHeight() - (_1c6.proxy.outerHeight() - _1c6.proxy.height())) : _1c6.fwb_window.outerHeight())
				});
				setTimeout(function() {
					if (_1c6.proxy) {
						_1c6.proxy.show();
					}
				},
				500);
			},
			onDrag: function(e) {
				_1c6.proxy.css({
					display: "block",
					left: e.data.left,
					top: e.data.top
				});
				return false;
			},
			onStopDrag: function(e) {
				_1c6.options.left = e.data.left;
				_1c6.options.top = e.data.top;
				$(_1c5).fwb_window("move");
				_1c6.proxy.remove();
				_1c6.proxy = null;
			}
		});
		_1c6.fwb_window.fwb_resizable({
			disabled: _1c6.options.resizable == false,
			onStartResize: function(e) {
				_1c6.pmask = $("<div class=\"fwb_window-proxy-mask\"></div>").insertAfter(_1c6.fwb_window);
				_1c6.pmask.css({
					zIndex: $.fn.fwb_window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: _1c6.fwb_window.outerWidth(),
					height: _1c6.fwb_window.outerHeight()
				});
				if (!_1c6.proxy) {
					_1c6.proxy = $("<div class=\"fwb_window-proxy\"></div>").insertAfter(_1c6.fwb_window);
				}
				_1c6.proxy.css({
					zIndex: $.fn.fwb_window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel == true ? (e.data.width - (_1c6.proxy.outerWidth() - _1c6.proxy.width())) : e.data.width),
					height: ($.boxModel == true ? (e.data.height - (_1c6.proxy.outerHeight() - _1c6.proxy.height())) : e.data.height)
				});
			},
			onResize: function(e) {
				_1c6.proxy.css({
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel == true ? (e.data.width - (_1c6.proxy.outerWidth() - _1c6.proxy.width())) : e.data.width),
					height: ($.boxModel == true ? (e.data.height - (_1c6.proxy.outerHeight() - _1c6.proxy.height())) : e.data.height)
				});
				return false;
			},
			onStopResize: function(e) {
				_1c6.options.left = e.data.left;
				_1c6.options.top = e.data.top;
				_1c6.options.width = e.data.width;
				_1c6.options.height = e.data.height;
				_1b4(_1c5);
				_1c6.pmask.remove();
				_1c6.pmask = null;
				_1c6.proxy.remove();
				_1c6.proxy = null;
			}
		});
	};
	function _1c0() {
		if (document.compatMode == "BackCompat") {
			return {
				width: Math.max(document.body.scrollWidth, document.body.clientWidth),
				height: Math.max(document.body.scrollHeight, document.body.clientHeight)
			};
		} else {
			return {
				width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
				height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
			};
		}
	};
	$(window).resize(function() {
		$("body>div.fwb_window-mask").css({
			width: $(window).width(),
			height: $(window).height()

		});
		setTimeout(function() {
			$("body>div.fwb_window-mask").css({
				width: _1c0().width,
				height: _1c0().height
			});
		},
		50);
	});
	$.fn.fwb_window = function(_1c7, _1c8) {
		if (typeof _1c7 == "string") {
			var _1c9 = $.fn.fwb_window.methods[_1c7];
			if (_1c9) {
				return _1c9(this, _1c8);
			} else {
				return this.fwb_panel(_1c7, _1c8);
			}
		}
		_1c7 = _1c7 || {};
		return this.each(function() {
			var _1ca = $.data(this, "fwb_window");
			if (_1ca) {
				$.extend(_1ca.options, _1c7);
			} else {
				_1ca = $.data(this, "fwb_window", {
					options: $.extend({},
					$.fn.fwb_window.defaults, $.fn.fwb_window.parseOptions(this), _1c7)
				});
				if (!_1ca.options.inline) {
					$(this).appendTo("body");
				}
			}
			_1bb(this);
			_1c4(this);
		});
	};
	$.fn.fwb_window.methods = {
		options: function(jq) {
			var _1cb = jq.fwb_panel("options");
			var _1cc = $.data(jq[0], "fwb_window").options;
			return $.extend(_1cc, {
				closed: _1cb.closed,
				collapsed: _1cb.collapsed,
				minimized: _1cb.minimized,
				maximized: _1cb.maximized
			});
		},
		fwb_window: function(jq) {
			return $.fn.fwb_window.window(jq);
		},
		window: function(jq) {
			return $.data(jq[0], "fwb_window").fwb_window;
		},
		resize: function(jq, _1cd) {
			return jq.each(function() {
				_1b4(this, _1cd);
			});
		},
		move: function(jq, _1ce) {
			return jq.each(function() {
				_1b7(this, _1ce);
			});
		}
	};
	$.fn.fwb_window.parseOptions = function(_1cf) {
		var t = $(_1cf);
		return $.extend({},
		$.fn.fwb_panel.parseOptions(_1cf), {
			draggable: (t.attr("draggable") ? t.attr("draggable") == "true": false),
			resizable: (t.attr("resizable") ? t.attr("resizable") == "true": false),
			shadow: (t.attr("shadow") ? t.attr("shadow") == "true": false),
			modal: (t.attr("modal") ? t.attr("modal") == "true": false),
			inline: (t.attr("inline") ? t.attr("inline") == "true": false)
		});
	};
	$.fn.fwb_window.defaults = $.extend({},
	$.fn.fwb_panel.defaults, {
		zIndex: 9000,
		draggable: true,
		resizable: true,
		shadow: true,
		modal: false,
		inline: false,
		title: "New Window",
		collapsible: true,
		minimizable: true,
		maximizable: true,
		closable: true,
		closed: false
	});
})(fn.jQuery);
/*
 (function($) {
	function _1d0(_1d1) {
		var t = $(_1d1);
		t.wrapInner("<div class=\"fwb_dialog-content\"></div>");
		var _1d2 = t.children("div.fwb_dialog-content");
		_1d2.attr("style", t.attr("style"));
		t.removeAttr("style").css("overflow", "hidden");
		_1d2.fwb_panel({
			border: false,
			doSize: false
		});
		return _1d2;
	};
	function _1d3(_1d4) {
		var opts = $.data(_1d4, "fwb_dialog").options;
		var _1d5 = $.data(_1d4, "fwb_dialog").contentPanel;
		if (opts.toolbar) {
			if (typeof opts.toolbar == "string") {
				$(opts.toolbar).addClass("fwb_dialog-toolbar").prependTo(_1d4);
				$(opts.toolbar).show();
			} else {
				$(_1d4).find("div.fwb_dialog-toolbar").remove();
				var _1d6 = $("<div class=\"fwb_dialog-toolbar\"></div>").prependTo(_1d4);
				for (var i = 0; i < opts.toolbar.length; i++) {
					var p = opts.toolbar[i];
					if (p == "-") {
						_1d6.append("<div class=\"fwb_dialog-tool-separator\"></div>");
					} else {
						var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(_1d6);
						tool.css("float", "left");
						tool[0].onclick = eval(p.handler ||
						function() {
							});
						tool.fwb_linkbutton($.extend({},
						p, {
							plain: true
						}));
					}
				}
				_1d6.append("<div style=\"clear:both\"></div>");
			}
		} else {
			$(_1d4).find("div.fwb_dialog-toolbar").remove();
		}
		if (opts.buttons) {
			if (typeof opts.buttons == "string") {
				$(opts.buttons).addClass("fwb_dialog-button").appendTo(_1d4);
				$(opts.buttons).show();
			} else {
				$(_1d4).find("div.fwb_dialog-button").remove();
				var _1d7 = $("<div class=\"fwb_dialog-button\"></div>").appendTo(_1d4);
				for (var i = 0; i < opts.buttons.length; i++) {
					var p = opts.buttons[i];
					var _1d8 = $("<a href=\"javascript:void(0)\"></a>").appendTo(_1d7);
					if (p.handler) {
						_1d8[0].onclick = p.handler;
					}
					_1d8.fwb_linkbutton(p);
				}
			}
		} else {
			$(_1d4).find("div.fwb_dialog-button").remove();
		}
		var _1d9 = opts.href;
		var _1da = opts.content;
		opts.href = null;
		opts.content = null;
		$(_1d4).fwb_window($.extend({},
		opts, {
			onOpen: function() {
				_1d5.fwb_panel("open");
				if (opts.onOpen) {
					opts.onOpen.call(_1d4);
				}
			},
			onResize: function(_1db, _1dc) {
				var _1dd = $(_1d4).fwb_panel("fwb_panel").find(">div.fwb_panel-body");
				_1d5.fwb_panel("resize", {
					width: _1dd.width(),
					height: (_1dc == "auto") ? "auto": _1dd.height() - _1dd.find(">div.fwb_dialog-toolbar").outerHeight() - _1dd.find(">div.fwb_dialog-button").outerHeight()
				});
				if (opts.onResize) {
					opts.onResize.call(_1d4, _1db, _1dc);
				}
			}
		}));
		_1d5.fwb_panel({
			closed: opts.closed,
			href: _1d9,
			content: _1da,
			onLoad: function() {
				if (opts.height == "auto") {
					$(_1d4).fwb_window("resize");
				}
				opts.onLoad.apply(_1d4, arguments);
			}
		});
		opts.href = _1d9;
	};
	function _1de(_1df, href) {
		var _1e0 = $.data(_1df, "fwb_dialog").contentPanel;
		_1e0.fwb_panel("refresh", href);
	};
	$.fn.fwb_dialog = function(_1e1, _1e2) {
		if (typeof _1e1 == "string") {
			var _1e3 = $.fn.fwb_dialog.methods[_1e1];
			if (_1e3) {
				return _1e3(this, _1e2);
			} else {
				return this.fwb_window(_1e1, _1e2);
			}
		}
		_1e1 = _1e1 || {};
		return this.each(function() {
			var _1e4 = $.data(this, "fwb_dialog");
			if (_1e4) {
				$.extend(_1e4.options, _1e1);
			} else {
				$.data(this, "fwb_dialog", {
					options: $.extend({},
					$.fn.fwb_dialog.defaults, $.fn.fwb_dialog.parseOptions(this), _1e1),
					contentPanel: _1d0(this)
				});
			}
			_1d3(this);
		});
	};
	$.fn.fwb_dialog.methods = {
		options: function(jq) {
			var _1e5 = $.data(jq[0], "fwb_dialog").options;
			var _1e6 = jq.fwb_panel("options");
			$.extend(_1e5, {
				closed: _1e6.closed,
				collapsed: _1e6.collapsed,
				minimized: _1e6.minimized,
				maximized: _1e6.maximized
			});
			var _1e7 = $.data(jq[0], "fwb_dialog").contentPanel;
			return _1e5;
		},
		dialog: function(jq) {
			return $.fn.fwb_dialog.methods.fwb_dialog(jq);
		},
		fwb_dialog: function(jq) {
			return jq.fwb_window("fwb_window");
		},
		refresh: function(jq, href) {
			return jq.each(function() {
				_1de(this, href);
			});
		}
	};
	$.fn.fwb_dialog.parseOptions = function(_1e8) {
		var t = $(_1e8);
		return $.extend({},
		$.fn.fwb_window.parseOptions(_1e8), {
			toolbar: t.attr("toolbar"),
			buttons: t.attr("buttons")
		});
	};
	$.fn.fwb_dialog.defaults = $.extend({},
	$.fn.fwb_window.defaults, {
		title: "New Dialog",
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		toolbar: null,
		buttons: null
	});
})(fn.jQuery);
*/
 (function($) {
	function show(el, type, _1e9, _1ea) {
		var win = $(el).fwb_window("fwb_window");
		if (!win) {
			return;
		}
		switch (type) {
		case null:
			win.show();
			break;
		case "slide":
			win.slideDown(_1e9);
			break;
		case "fade":
			win.fadeIn(_1e9);
			break;
		case "show":
			win.show(_1e9);
			break;
		}
		var _1eb = null;
		if (_1ea > 0) {
			_1eb = setTimeout(function() {
				hide(el, type, _1e9);
			},
			_1ea);
		}
		win.hover(function() {
			if (_1eb) {
				clearTimeout(_1eb);
			}
		},
		function() {
			if (_1ea > 0) {
				_1eb = setTimeout(function() {
					hide(el, type, _1e9);
				},
				_1ea);
			}
		});
	};
	function hide(el, type, _1ec) {
		if (el.locked == true) {
			return;
		}
		el.locked = true;
		var win = $(el).fwb_window("fwb_window");
		if (!win) {
			return;
		}
		switch (type) {
		case null:
			win.hide();
			break;
		case "slide":
			win.slideUp(_1ec);
			break;
		case "fade":
			win.fadeOut(_1ec);
			break;
		case "show":
			win.hide(_1ec);
			break;
		}
		setTimeout(function() {
			$(el).fwb_window("destroy");
		},
		_1ec);
	};
	function _1ed(_1ee, _1ef, _1f0) {
		var win = $("<div class=\"messager-body\"></div>").appendTo("body");
		win.append(_1ef);
		if (_1f0) {
			var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
			for (var _1f1 in _1f0) {
				$("<a></a>").attr("href", "javascript:void(0)").text(_1f1).css("margin-left", 10).bind("click", eval(_1f0[_1f1])).appendTo(tb).fwb_linkbutton();
			}
		}
		win.fwb_window({
			title: _1ee,
			noheader: (_1ee ? false: true),
			width: 300,
			height: "auto",
			modal: true,
			collapsible: false,
			minimizable: false,
			maximizable: false,
			resizable: false,
			onClose: function() {
				setTimeout(function() {
					win.fwb_window("destroy");
				},
				100);
			}
		});
		win.fwb_window("fwb_window").addClass("messager-fwb_window");
		return win;
	};
	$.messager = {
		show: function(_1f2) {
			var opts = $.extend({
				showType: "slide",
				showSpeed: 600,
				width: 250,
				height: 100,
				msg: "",
				title: "",
				timeout: 4000
			},
			_1f2 || {});
			var win = $("<div class=\"messager-body\"></div>").html(opts.msg).appendTo("body");
			win.fwb_window({
				title: opts.title,
				width: opts.width,
				height: opts.height,
				collapsible: false,
				minimizable: false,
				maximizable: false,
				shadow: false,
				draggable: false,
				resizable: false,
				closed: true,
				onBeforeOpen: function() {
					show(this, opts.showType, opts.showSpeed, opts.timeout);
					return false;
				},
				onBeforeClose: function() {
					hide(this, opts.showType, opts.showSpeed);
					return false;
				}
			});
			win.fwb_window("fwb_window").css({
				left: "",
				top: "",
				right: 0,
				zIndex: $.fn.fwb_window.defaults.zIndex++,
				bottom: -document.body.scrollTop - document.documentElement.scrollTop
			});
			win.fwb_window("open");
		},
		alert: function(_1f3, msg, icon, fn) {
			var _1f4 = "<div>" + msg + "</div>";
			switch (icon) {
			case "error":
				_1f4 = "<div class=\"messager-icon messager-error\"></div>" + _1f4;
				break;
			case "info":
				_1f4 = "<div class=\"messager-icon messager-info\"></div>" + _1f4;
				break;
			case "question":
				_1f4 = "<div class=\"messager-icon messager-question\"></div>" + _1f4;
				break;
			case "warning":
				_1f4 = "<div class=\"messager-icon messager-warning\"></div>" + _1f4;
				break;
			}
			_1f4 += "<div style=\"clear:both;\"/>";
			var _1f5 = {};
			_1f5[$.messager.defaults.ok] = function() {
				win.fwb_dialog({
					closed: true
				});
				if (fn) {
					fn();
					return false;
				}
			};
			_1f5[$.messager.defaults.ok] = function() {
				win.fwb_window("close");
				if (fn) {
					fn();
					return false;
				}
			};
			var win = _1ed(_1f3, _1f4, _1f5);
		},
		confirm: function(_1f6, msg, fn) {
			var _1f7 = "<div class=\"messager-icon messager-question\"></div>" + "<div>" + msg + "</div>" + "<div style=\"clear:both;\"/>";
			var _1f8 = {};
			_1f8[$.messager.defaults.ok] = function() {
				win.fwb_window("close");
				if (fn) {
					fn(true);
					return false;
				}
			};
			_1f8[$.messager.defaults.cancel] = function() {
				win.fwb_window("close");
				if (fn) {
					fn(false);
					return false;
				}
			};
			var win = _1ed(_1f6, _1f7, _1f8);
		},
		prompt: function(_1f9, msg, fn) {
			var _1fa = "<div class=\"messager-icon messager-question\"></div>" + "<div>" + msg + "</div>" + "<br/>" + "<input class=\"messager-input\" type=\"text\"/>" + "<div style=\"clear:both;\"/>";
			var _1fb = {};
			_1fb[$.messager.defaults.ok] = function() {
				win.fwb_window("close");
				if (fn) {
					fn($(".messager-input", win).val());
					return false;
				}
			};
			_1fb[$.messager.defaults.cancel] = function() {
				win.fwb_window("close");
				if (fn) {
					fn();
					return false;
				}
			};
			var win = _1ed(_1f9, _1fa, _1fb);
		},
		progress: function(_1fc) {
			var opts = $.extend({
				title: "",
				msg: "",
				text: undefined,
				interval: 300
			},
			_1fc || {});
			var _1fd = {
				bar: function() {
					return $("body>div.messager-fwb_window").find("div.messager-p-bar");
				},
				close: function() {
					var win = $("body>div.messager-fwb_window>div.messager-body");
					if (win.length) {
						if (win[0].timer) {
							clearInterval(win[0].timer);
						}
						win.fwb_window("close");
					}
				}
			};
			if (typeof _1fc == "string") {
				var _1fe = _1fd[_1fc];
				return _1fe();
			}
			var _1ff = "<div class=\"messager-progress\"><div class=\"messager-p-msg\"></div><div class=\"messager-p-bar\"></div></div>";
			var win = _1ed(opts.title, _1ff, null);
			win.find("div.messager-p-msg").html(opts.msg);
			var bar = win.find("div.messager-p-bar");
			bar.fwb_progressbar({
				text: opts.text
			});
			win.fwb_window({
				closable: false
			});
			if (opts.interval) {
				win[0].timer = setInterval(function() {
					var v = bar.fwb_progressbar("getValue");
					v += 10;
					if (v > 100) {
						v = 0;
					}
					bar.fwb_progressbar("setValue", v);
				},
				opts.interval);
			}
		}
	};
	$.messager.defaults = {
		ok: "Ok",
		cancel: "Cancel"
	};
})(fn.jQuery);
/*
 (function($) {
	function _200(_201) {
		var opts = $.data(_201, "fwb_accordion").options;
		var _202 = $.data(_201, "fwb_accordion").panels;
		var cc = $(_201);
		if (opts.fit == true) {
			var p = cc.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		if (opts.width > 0) {
			cc.width($.boxModel == true ? (opts.width - (cc.outerWidth() - cc.width())) : opts.width);
		}
		var _203 = "auto";
		if (opts.height > 0) {
			cc.height($.boxModel == true ? (opts.height - (cc.outerHeight() - cc.height())) : opts.height);
			var _204 = _202.length ? _202[0].fwb_panel("header").css("height", null).outerHeight() : "auto";
			var _203 = cc.height() - (_202.length - 1) * _204;
		}
		for (var i = 0; i < _202.length; i++) {
			var _205 = _202[i];
			var _206 = _205.fwb_panel("header");
			_206.height($.boxModel == true ? (_204 - (_206.outerHeight() - _206.height())) : _204);
			_205.fwb_panel("resize", {
				width: cc.width(),
				height: _203
			});
		}
	};
	function _207(_208) {
		var _209 = $.data(_208, "fwb_accordion").panels;
		for (var i = 0; i < _209.length; i++) {
			var _20a = _209[i];
			if (_20a.fwb_panel("options").collapsed == false) {
				return _20a;
			}
		}
		return null;
	};
	function _20b(_20c, _20d, _20e) {
		var _20f = $.data(_20c, "fwb_accordion").panels;
		for (var i = 0; i < _20f.length; i++) {
			var _210 = _20f[i];
			if (_210.fwb_panel("options").title == _20d) {
				if (_20e) {
					_20f.splice(i, 1);
				}
				return _210;
			}
		}
		return null;
	};
	function _211(_212) {
		var cc = $(_212);
		cc.addClass("fwb_accordion");
		if (cc.attr("border") == "false") {
			cc.addClass("fwb_accordion-noborder");
		} else {
			cc.removeClass("fwb_accordion-noborder");
		}
		var _213 = cc.children("div[selected]");
		cc.children("div").not(_213).attr("collapsed", "true");
		if (_213.length == 0) {
			cc.children("div:first").attr("collapsed", "false");
		}
		var _214 = [];
		cc.children("div").each(function() {
			var pp = $(this);
			_214.push(pp);
			_216(_212, pp, {});
		});
		cc.bind("_resize",
		function(e, _215) {
			var opts = $.data(_212, "fwb_accordion").options;
			if (opts.fit == true || _215) {
				_200(_212);
			}
			return false;
		});
		return {
			fwb_accordion: cc,
			panels: _214
		};
	};
	function _216(_217, pp, _218) {
		pp.fwb_panel($.extend({},
		_218, {
			collapsible: false,
			minimizable: false,
			maximizable: false,
			closable: false,
			doSize: false,
			tools: [{
				iconCls: "fwb_accordion-collapse",
				handler: function() {
					var _219 = $.data(_217, "fwb_accordion").options.animate;
					if (pp.fwb_panel("options").collapsed) {
						_221(_217);
						pp.fwb_panel("expand", _219);
					} else {
						_221(_217);
						pp.fwb_panel("collapse", _219);
					}
					return false;
				}
			}],
			onBeforeExpand: function() {
				var curr = _207(_217);
				if (curr) {
					var _21a = $(curr).fwb_panel("header");
					_21a.removeClass("fwb_accordion-header-selected");
					_21a.find(".fwb_accordion-collapse").triggerHandler("click");
				}
				var _21a = pp.fwb_panel("header");
				_21a.addClass("fwb_accordion-header-selected");
				_21a.find("div.fwb_accordion-collapse").removeClass("fwb_accordion-expand");
			},
			onExpand: function() {
				var opts = $.data(_217, "fwb_accordion").options;
				opts.onSelect.call(_217, pp.fwb_panel("options").title);
			},
			onBeforeCollapse: function() {
				var _21b = pp.fwb_panel("header");
				_21b.removeClass("fwb_accordion-header-selected");
				_21b.find("div.fwb_accordion-collapse").addClass("fwb_accordion-expand");
			}
		}));
		pp.fwb_panel("body").addClass("fwb_accordion-body");
		pp.fwb_panel("header").addClass("fwb_accordion-header").click(function() {
			$(this).find(".fwb_accordion-collapse").triggerHandler("click");
			return false;
		});
	};
	function _21c(_21d, _21e) {
		var opts = $.data(_21d, "fwb_accordion").options;
		var _21f = $.data(_21d, "fwb_accordion").panels;
		var curr = _207(_21d);
		if (curr && curr.fwb_panel("options").title == _21e) {
			return;
		}
		var _220 = _20b(_21d, _21e);
		if (_220) {
			_220.fwb_panel("header").triggerHandler("click");
		} else {
			if (curr) {
				curr.fwb_panel("header").addClass("fwb_accordion-header-selected");
				opts.onSelect.call(_21d, curr.fwb_panel("options").title);
			}
		}
	};
	function _221(_222) {
		var _223 = $.data(_222, "fwb_accordion").panels;
		for (var i = 0; i < _223.length; i++) {
			_223[i].stop(true, true);
		}
	};
	function add(_224, _225) {
		var opts = $.data(_224, "fwb_accordion").options;
		var _226 = $.data(_224, "fwb_accordion").panels;
		_221(_224);
		var pp = $("<div></div>").appendTo(_224);
		_226.push(pp);
		_216(_224, pp, _225);
		_200(_224);
		opts.onAdd.call(_224, _225.title);
		_21c(_224, _225.title);
	};
	function _227(_228, _229) {
		var opts = $.data(_228, "fwb_accordion").options;
		var _22a = $.data(_228, "fwb_accordion").panels;
		_221(_228);
		if (opts.onBeforeRemove.call(_228, _229) == false) {
			return;
		}
		var _22b = _20b(_228, _229, true);
		if (_22b) {
			_22b.fwb_panel("destroy");
			if (_22a.length) {
				_200(_228);
				var curr = _207(_228);
				if (!curr) {
					_21c(_228, _22a[0].fwb_panel("options").title);
				}
			}
		}
		opts.onRemove.call(_228, _229);
	};
	$.fn.fwb_accordion = function(_22c, _22d) {
		if (typeof _22c == "string") {
			return $.fn.fwb_accordion.methods[_22c](this, _22d);
		}
		_22c = _22c || {};
		return this.each(function() {
			var _22e = $.data(this, "fwb_accordion");
			var opts;
			if (_22e) {
				opts = $.extend(_22e.options, _22c);
				_22e.opts = opts;
			} else {
				opts = $.extend({},
				$.fn.fwb_accordion.defaults, $.fn.fwb_accordion.parseOptions(this), _22c);
				var r = _211(this);
				$.data(this, "fwb_accordion", {
					options: opts,
					fwb_accordion: r.fwb_accordion,
					panels: r.panels
				});
			}
			_200(this);
			_21c(this);
		});
	};
	$.fn.fwb_accordion.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_accordion").options;
		},
		panels: function(jq) {
			return $.data(jq[0], "fwb_accordion").panels;
		},
		resize: function(jq) {
			return jq.each(function() {
				_200(this);
			});
		},
		getSelected: function(jq) {
			return _207(jq[0]);
		},
		getPanel: function(jq, _22f) {
			return _20b(jq[0], _22f);
		},
		select: function(jq, _230) {
			return jq.each(function() {
				_21c(this, _230);
			});
		},
		add: function(jq, opts) {
			return jq.each(function() {
				add(this, opts);
			});
		},
		remove: function(jq, _231) {
			return jq.each(function() {
				_227(this, _231);
			});
		}
	};
	$.fn.fwb_accordion.parseOptions = function(_232) {
		var t = $(_232);
		return {
			width: (parseInt(_232.style.width) || undefined),
			height: (parseInt(_232.style.height) || undefined),
			fit: (t.attr("fit") ? t.attr("fit") == "true": undefined),
			border: (t.attr("border") ? t.attr("border") == "true": undefined),
			animate: (t.attr("animate") ? t.attr("animate") == "true": undefined)
		};
	};
	$.fn.fwb_accordion.defaults = {
		width: "auto",
		height: "auto",
		fit: false,
		border: true,
		animate: true,
		onSelect: function(_233) {
			},
		onAdd: function(_234) {
			},
		onBeforeRemove: function(_235) {
			},
		onRemove: function(_236) {
			}
	};
})(fn.jQuery);
*/
/*
 (function($) {
	function _237(_238) {
		var _239 = $(">div.fwb_tabs-header", _238);
		var _23a = 0;
		$("ul.fwb_tabs li", _239).each(function() {
			_23a += $(this).outerWidth(true);
		});
		var _23b = $("div.fwb_tabs-wrap", _239).width();
		var _23c = parseInt($("ul.fwb_tabs", _239).css("padding-left"));
		return _23a - _23b + _23c;
	};
	function _23d(_23e) {
		var opts = $.data(_23e, "fwb_tabs").options;
		var _23f = $(_23e).children("div.fwb_tabs-header");
		var tool = _23f.children("div.fwb_tabs-tool");
		var _240 = _23f.children("div.fwb_tabs-scroller-left");
		var _241 = _23f.children("div.fwb_tabs-scroller-right");
		var wrap = _23f.children("div.fwb_tabs-wrap");
		var _242 = ($.boxModel == true ? (_23f.outerHeight() - (tool.outerHeight() - tool.height())) : _23f.outerHeight());
		if (opts.plain) {
			_242 -= 2;
		}
		tool.height(_242);
		var _243 = 0;
		$("ul.fwb_tabs li", _23f).each(function() {
			_243 += $(this).outerWidth(true);
		});
		var _244 = _23f.width() - tool.outerWidth();
		if (_243 > _244) {
			_240.show();
			_241.show();
			tool.css("right", _241.outerWidth());
			wrap.css({
				marginLeft: _240.outerWidth(),
				marginRight: _241.outerWidth() + tool.outerWidth(),
				left: 0,
				width: _244 - _240.outerWidth() - _241.outerWidth()
			});
		} else {
			_240.hide();
			_241.hide();
			tool.css("right", 0);
			wrap.css({
				marginLeft: 0,
				marginRight: tool.outerWidth(),
				left: 0,
				width: _244
			});
			wrap.scrollLeft(0);
		}
	};
	function _245(_246) {
		var opts = $.data(_246, "fwb_tabs").options;
		var _247 = $(_246).children("div.fwb_tabs-header");
		var _248 = _247.children("div.fwb_tabs-tool");
		_248.remove();
		if (opts.tools) {
			_248 = $("<div class=\"fwb_tabs-tool\"></div>").appendTo(_247);
			for (var i = 0; i < opts.tools.length; i++) {
				var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(_248);
				tool[0].onclick = eval(opts.tools[i].handler ||
				function() {
					});
				tool.fwb_linkbutton($.extend({},
				opts.tools[i], {
					plain: true
				}));
			}
		}
	};
	function _249(_24a) {
		var opts = $.data(_24a, "fwb_tabs").options;
		var cc = $(_24a);
		if (opts.fit == true) {
			var p = cc.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		cc.width(opts.width).height(opts.height);
		var _24b = $(">div.fwb_tabs-header", _24a);
		if ($.boxModel == true) {
			_24b.width(opts.width - (_24b.outerWidth() - _24b.width()));
		} else {
			_24b.width(opts.width);
		}
		_23d(_24a);
		var _24c = $(">div.fwb_tabs-panels", _24a);
		var _24d = opts.height;
		if (!isNaN(_24d)) {
			if ($.boxModel == true) {
				var _24e = _24c.outerHeight() - _24c.height();
				_24c.css("height", (_24d - _24b.outerHeight() - _24e) || "auto");
			} else {
				_24c.css("height", _24d - _24b.outerHeight());
			}
		} else {
			_24c.height("auto");
		}
		var _24f = opts.width;
		if (!isNaN(_24f)) {
			if ($.boxModel == true) {
				_24c.width(_24f - (_24c.outerWidth() - _24c.width()));
			} else {
				_24c.width(_24f);
			}
		} else {
			_24c.width("auto");
		}
	};
	function _250(_251) {
		var opts = $.data(_251, "fwb_tabs").options;
		var tab = _252(_251);
		if (tab) {
			var _253 = $(_251).find(">div.fwb_tabs-panels");
			var _254 = opts.width == "auto" ? "auto": _253.width();
			var _255 = opts.height == "auto" ? "auto": _253.height();
			tab.fwb_panel("resize", {
				width: _254,
				height: _255
			});
		}
	};
	function _256(_257) {
		var cc = $(_257);
		cc.addClass("fwb_tabs-container");
		cc.wrapInner("<div class=\"fwb_tabs-panels\"/>");
		$("<div class=\"fwb_tabs-header\">" + "<div class=\"fwb_tabs-scroller-left\"></div>" + "<div class=\"fwb_tabs-scroller-right\"></div>" + "<div class=\"fwb_tabs-wrap\">" + "<ul class=\"fwb_tabs\"></ul>" + "</div>" + "</div>").prependTo(_257);
		var fwb_tabs = [];
		var tp = cc.children("div.fwb_tabs-panels");
		tp.children("div[selected]").attr("closed", "false");
		tp.children("div").not("div[selected]").attr("closed", "true");
		tp.children("div").each(function() {
			var pp = $(this);
			fwb_tabs.push(pp);
			_260(_257, pp);
		});
		cc.children("div.fwb_tabs-header").find(".fwb_tabs-scroller-left, .fwb_tabs-scroller-right").hover(function() {
			$(this).addClass("fwb_tabs-scroller-over");
		},
		function() {
			$(this).removeClass("fwb_tabs-scroller-over");
		});
		cc.bind("_resize",
		function(e, _258) {
			var opts = $.data(_257, "fwb_tabs").options;
			if (opts.fit == true || _258) {
				_249(_257);
				_250(_257);
			}
			return false;
		});
		return fwb_tabs;
	};
	function _259(_25a) {
		var opts = $.data(_25a, "fwb_tabs").options;
		var _25b = $(">div.fwb_tabs-header", _25a);
		var _25c = $(">div.fwb_tabs-panels", _25a);
		if (opts.plain == true) {
			_25b.addClass("fwb_tabs-header-plain");
		} else {
			_25b.removeClass("fwb_tabs-header-plain");
		}
		if (opts.border == true) {
			_25b.removeClass("fwb_tabs-header-noborder");
			_25c.removeClass("fwb_tabs-panels-noborder");
		} else {
			_25b.addClass("fwb_tabs-header-noborder");
			_25c.addClass("fwb_tabs-panels-noborder");
		}
		$(".fwb_tabs-scroller-left", _25b).unbind(".fwb_tabs").bind("click.fwb_tabs",
		function() {
			var wrap = $(".fwb_tabs-wrap", _25b);
			var pos = wrap.scrollLeft() - opts.scrollIncrement;
			wrap.animate({
				scrollLeft: pos
			},
			opts.scrollDuration);
		});
		$(".fwb_tabs-scroller-right", _25b).unbind(".fwb_tabs").bind("click.fwb_tabs",
		function() {
			var wrap = $(".fwb_tabs-wrap", _25b);
			var pos = Math.min(wrap.scrollLeft() + opts.scrollIncrement, _237(_25a));
			wrap.animate({
				scrollLeft: pos
			},
			opts.scrollDuration);
		});
		var fwb_tabs = $.data(_25a, "fwb_tabs").fwb_tabs;
		for (var i = 0, len = fwb_tabs.length; i < len; i++) {
			var _25d = fwb_tabs[i];
			var tab = _25d.fwb_panel("options").tab;
			var _25e = _25d.fwb_panel("options").title;
			tab.unbind(".fwb_tabs").bind("click.fwb_tabs", {
				title: _25e
			},
			function(e) {
				_26a(_25a, e.data.title);
			}).bind("contextfwb_menu.fwb_tabs", {
				title: _25e
			},
			function(e) {
				opts.onContextMenu.call(_25a, e, e.data.title);
			});
			tab.find("a.fwb_tabs-close").unbind(".fwb_tabs").bind("click.fwb_tabs", {
				title: _25e
			},
			function(e) {
				_25f(_25a, e.data.title);
				return false;
			});
		}
	};
	function _260(_261, pp, _262) {
		_262 = _262 || {};
		pp.fwb_panel($.extend({},
		_262, {
			border: false,
			noheader: true,
			doSize: false,
			iconCls: (_262.icon ? _262.icon: undefined),
			onLoad: function() {
				$.data(_261, "fwb_tabs").options.onLoad.call(_261, pp);
			}
		}));
		var opts = pp.fwb_panel("options");
		var _263 = $(">div.fwb_tabs-header", _261);
		var fwb_tabs = $("ul.fwb_tabs", _263);
		var tab = $("<li></li>").appendTo(fwb_tabs);
		var _264 = $("<a href=\"javascript:void(0)\" class=\"fwb_tabs-inner\"></a>").appendTo(tab);
		var _265 = $("<span class=\"fwb_tabs-title\"></span>").html(opts.title).appendTo(_264);
		var _266 = $("<span class=\"fwb_tabs-icon\"></span>").appendTo(_264);
		if (opts.closable) {
			_265.addClass("fwb_tabs-closable");
			$("<a href=\"javascript:void(0)\" class=\"fwb_tabs-close\"></a>").appendTo(tab);
		}
		if (opts.iconCls) {
			_265.addClass("fwb_tabs-with-icon");
			_266.addClass(opts.iconCls);
		}
		opts.tab = tab;
	};
	function _267(_268, _269) {
		var opts = $.data(_268, "fwb_tabs").options;
		var fwb_tabs = $.data(_268, "fwb_tabs").fwb_tabs;
		var pp = $("<div></div>").appendTo($(">div.fwb_tabs-panels", _268));
		fwb_tabs.push(pp);
		_260(_268, pp, _269);
		opts.onAdd.call(_268, _269.title);
		_23d(_268);
		_259(_268);
		_26a(_268, _269.title);
	};
	function _26b(_26c, _26d) {
		var _26e = $.data(_26c, "fwb_tabs").selectHis;
		var pp = _26d.tab;
		var _26f = pp.fwb_panel("options").title;
		pp.fwb_panel($.extend({},
		_26d.options, {
			iconCls: (_26d.options.icon ? _26d.options.icon: undefined)
		}));
		var opts = pp.fwb_panel("options");
		var tab = opts.tab;
		tab.find("span.fwb_tabs-icon").attr("class", "fwb_tabs-icon");
		tab.find("a.fwb_tabs-close").remove();
		tab.find("span.fwb_tabs-title").html(opts.title);
		if (opts.closable) {
			tab.find("span.fwb_tabs-title").addClass("fwb_tabs-closable");
			$("<a href=\"javascript:void(0)\" class=\"fwb_tabs-close\"></a>").appendTo(tab);
		} else {
			tab.find("span.fwb_tabs-title").removeClass("fwb_tabs-closable");
		}
		if (opts.iconCls) {
			tab.find("span.fwb_tabs-title").addClass("fwb_tabs-with-icon");
			tab.find("span.fwb_tabs-icon").addClass(opts.iconCls);
		} else {
			tab.find("span.fwb_tabs-title").removeClass("fwb_tabs-with-icon");
		}
		if (_26f != opts.title) {
			for (var i = 0; i < _26e.length; i++) {
				if (_26e[i] == _26f) {
					_26e[i] = opts.title;
				}
			}
		}
		_259(_26c);
		$.data(_26c, "fwb_tabs").options.onUpdate.call(_26c, opts.title);
	};
	function _25f(_270, _271) {
		var opts = $.data(_270, "fwb_tabs").options;
		var fwb_tabs = $.data(_270, "fwb_tabs").fwb_tabs;
		var _272 = $.data(_270, "fwb_tabs").selectHis;
		if (!_273(_270, _271)) {
			return;
		}
		if (opts.onBeforeClose.call(_270, _271) == false) {
			return;
		}
		var tab = _274(_270, _271, true);
		tab.fwb_panel("options").tab.remove();
		tab.fwb_panel("destroy");
		opts.onClose.call(_270, _271);
		_23d(_270);
		for (var i = 0; i < _272.length; i++) {
			if (_272[i] == _271) {
				_272.splice(i, 1);
				i--;
			}
		}
		var _275 = _272.pop();
		if (_275) {
			_26a(_270, _275);
		} else {
			if (fwb_tabs.length) {
				_26a(_270, fwb_tabs[0].fwb_panel("options").title);
			}
		}
	};
	function _274(_276, _277, _278) {
		var fwb_tabs = $.data(_276, "fwb_tabs").fwb_tabs;
		for (var i = 0; i < fwb_tabs.length; i++) {
			var tab = fwb_tabs[i];
			if (tab.fwb_panel("options").title == _277) {
				if (_278) {
					fwb_tabs.splice(i, 1);
				}
				return tab;
			}
		}
		return null;
	};
	function _252(_279) {
		var fwb_tabs = $.data(_279, "fwb_tabs").fwb_tabs;
		for (var i = 0; i < fwb_tabs.length; i++) {
			var tab = fwb_tabs[i];
			if (tab.fwb_panel("options").closed == false) {
				return tab;
			}
		}
		return null;
	};
	function _27a(_27b) {
		var fwb_tabs = $.data(_27b, "fwb_tabs").fwb_tabs;
		for (var i = 0; i < fwb_tabs.length; i++) {
			var tab = fwb_tabs[i];
			if (!tab.fwb_panel("options").closed) {
				_26a(_27b, tab.fwb_panel("options").title);
				return;
			}
		}
		if (fwb_tabs.length) {
			_26a(_27b, fwb_tabs[0].fwb_panel("options").title);
		}
	};
	function _26a(_27c, _27d) {
		var opts = $.data(_27c, "fwb_tabs").options;
		var fwb_tabs = $.data(_27c, "fwb_tabs").fwb_tabs;
		var _27e = $.data(_27c, "fwb_tabs").selectHis;
		if (fwb_tabs.length == 0) {
			return;
		}
		var _27f = _274(_27c, _27d);
		if (!_27f) {
			return;
		}
		var _280 = _252(_27c);
		if (_280) {
			_280.fwb_panel("close");
			_280.fwb_panel("options").tab.removeClass("fwb_tabs-selected");
		}
		_27f.fwb_panel("open");
		var tab = _27f.fwb_panel("options").tab;
		tab.addClass("fwb_tabs-selected");
		var wrap = $(_27c).find(">div.fwb_tabs-header div.fwb_tabs-wrap");
		var _281 = tab.position().left + wrap.scrollLeft();
		var left = _281 - wrap.scrollLeft();
		var _282 = left + tab.outerWidth();
		if (left < 0 || _282 > wrap.innerWidth()) {
			var pos = Math.min(_281 - (wrap.width() - tab.width()) / 2, _237(_27c));
			wrap.animate({
				scrollLeft: pos
			},
			opts.scrollDuration);
		} else {
			var pos = Math.min(wrap.scrollLeft(), _237(_27c));
			wrap.animate({
				scrollLeft: pos
			},
			opts.scrollDuration);
		}
		_250(_27c);
		_27e.push(_27d);
		opts.onSelect.call(_27c, _27d);
	};
	function _273(_283, _284) {
		return _274(_283, _284) != null;
	};
	$.fn.fwb_tabs = function(_285, _286) {
		if (typeof _285 == "string") {
			return $.fn.fwb_tabs.methods[_285](this, _286);
		}
		_285 = _285 || {};
		return this.each(function() {
			var _287 = $.data(this, "fwb_tabs");
			var opts;
			if (_287) {
				opts = $.extend(_287.options, _285);
				_287.options = opts;
			} else {
				$.data(this, "fwb_tabs", {
					options: $.extend({},
					$.fn.fwb_tabs.defaults, $.fn.fwb_tabs.parseOptions(this), _285),
					fwb_tabs: _256(this),
					selectHis: []
				});
			}
			_245(this);
			_259(this);
			_249(this);
			_27a(this);
		});
	};
	$.fn.fwb_tabs.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_tabs").options;
		},
		tabs: function(jq) {
			return $.fn.fwb_tabs.methods.fwb_tabs(jq);
		},
		fwb_tabs: function(jq) {
			return $.data(jq[0], "fwb_tabs").fwb_tabs;
		},
		resize: function(jq) {
			return jq.each(function() {
				_249(this);
				_250(this);
			});
		},
		add: function(jq, _288) {
			return jq.each(function() {
				_267(this, _288);
			});
		},
		close: function(jq, _289) {
			return jq.each(function() {
				_25f(this, _289);
			});
		},
		getTab: function(jq, _28a) {
			return _274(jq[0], _28a);
		},
		getSelected: function(jq) {
			return _252(jq[0]);
		},
		select: function(jq, _28b) {
			return jq.each(function() {
				_26a(this, _28b);
			});
		},
		exists: function(jq, _28c) {
			return _273(jq[0], _28c);
		},
		update: function(jq, _28d) {
			return jq.each(function() {
				_26b(this, _28d);
			});
		}
	};
	$.fn.fwb_tabs.parseOptions = function(_28e) {
		var t = $(_28e);
		return {
			width: (parseInt(_28e.style.width) || undefined),
			height: (parseInt(_28e.style.height) || undefined),
			fit: (t.attr("fit") ? t.attr("fit") == "true": undefined),
			border: (t.attr("border") ? t.attr("border") == "true": undefined),
			plain: (t.attr("plain") ? t.attr("plain") == "true": undefined)
		};
	};
	$.fn.fwb_tabs.defaults = {
		width: "auto",
		height: "auto",
		plain: false,
		fit: false,
		border: true,
		tools: null,
		scrollIncrement: 100,
		scrollDuration: 400,
		onLoad: function(_28f) {
			},
		onSelect: function(_290) {
			},
		onBeforeClose: function(_291) {
			},
		onClose: function(_292) {
			},
		onAdd: function(_293) {
			},
		onUpdate: function(_294) {
			},
		onContextMenu: function(e, _295) {
			}
	};
})(fn.jQuery);
*/
 (function($) {
	var _296 = false;
	function _297(_298) {
		var opts = $.data(_298, "fwb_layout").options;
		var _299 = $.data(_298, "fwb_layout").panels;
		var cc = $(_298);
		if (opts.fit == true) {
			var p = cc.parent();
			cc.width(p.width()).height(p.height());
		}
		var cpos = {
			top: 0,
			left: 0,
			width: cc.width(),
			height: cc.height()
		};
		function _29a(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.fwb_panel("resize", {
				width: cc.width(),
				height: pp.fwb_panel("options").height,
				left: 0,
				top: 0
			});
			cpos.top += pp.fwb_panel("options").height;
			cpos.height -= pp.fwb_panel("options").height;
		};
		if (_29e(_299.expandNorth)) {
			_29a(_299.expandNorth);
		} else {
			_29a(_299.north);
		}
		function _29b(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.fwb_panel("resize", {
				width: cc.width(),
				height: pp.fwb_panel("options").height,
				left: 0,
				top: cc.height() - pp.fwb_panel("options").height
			});
			cpos.height -= pp.fwb_panel("options").height;
		};
		if (_29e(_299.expandSouth)) {
			_29b(_299.expandSouth);
		} else {
			_29b(_299.south);
		}
		function _29c(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.fwb_panel("resize", {
				width: pp.fwb_panel("options").width,
				height: cpos.height,
				left: cc.width() - pp.fwb_panel("options").width,
				top: cpos.top
			});
			cpos.width -= pp.fwb_panel("options").width;
		};
		if (_29e(_299.expandEast)) {
			_29c(_299.expandEast);
		} else {
			_29c(_299.east);
		}
		function _29d(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.fwb_panel("resize", {
				width: pp.fwb_panel("options").width,
				height: cpos.height,
				left: 0,
				top: cpos.top
			});
			cpos.left += pp.fwb_panel("options").width;
			cpos.width -= pp.fwb_panel("options").width;
		};
		if (_29e(_299.expandWest)) {
			_29d(_299.expandWest);
		} else {
			_29d(_299.west);
		}
		_299.center.fwb_panel("resize", cpos);
	};
	function init(_29f) {
		var cc = $(_29f);
		if (cc[0].tagName == "BODY") {
			$("html").css({
				height: "100%",
				overflow: "hidden"
			});
			$("body").css({
				height: "100%",
				overflow: "hidden",
				border: "none"
			});
		}
		cc.addClass("fwb_layout");
		cc.css({
			margin: 0,
			padding: 0
		});
		function _2a0(dir) {
			var pp = $(">div[region=" + dir + "]", _29f).addClass("fwb_layout-body");
			var _2a1 = null;
			if (dir == "north") {
				_2a1 = "fwb_layout-button-up";
			} else {
				if (dir == "south") {
					_2a1 = "fwb_layout-button-down";
				} else {
					if (dir == "east") {
						_2a1 = "fwb_layout-button-right";
					} else {
						if (dir == "west") {
							_2a1 = "fwb_layout-button-left";
						}
					}
				}
			}
			var cls = "fwb_layout-fwb_panel fwb_layout-fwb_panel-" + dir;
			if (pp.attr("split") == "true") {
				cls += " fwb_layout-split-" + dir;
			}
			pp.fwb_panel({
				cls: cls,
				doSize: false,
				border: (pp.attr("border") == "false" ? false: true),
				width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
				height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
				tools: [{
					iconCls: _2a1,
					handler: function() {
						_2aa(_29f, dir);
					}
				}]
			});
			if (pp.attr("split") == "true") {
				var _2a2 = pp.fwb_panel("fwb_panel");
				var _2a3 = "";
				if (dir == "north") {
					_2a3 = "s";
				}
				if (dir == "south") {
					_2a3 = "n";
				}
				if (dir == "east") {
					_2a3 = "w";
				}
				if (dir == "west") {
					_2a3 = "e";
				}
				_2a2.fwb_resizable({
					handles: _2a3,
					onStartResize: function(e) {
						_296 = true;
						if (dir == "north" || dir == "south") {
							var _2a4 = $(">div.fwb_layout-split-proxy-v", _29f);
						} else {
							var _2a4 = $(">div.fwb_layout-split-proxy-h", _29f);
						}
						var top = 0,
						left = 0,
						_2a5 = 0,
						_2a6 = 0;
						var pos = {
							display: "block"
						};
						if (dir == "north") {
							pos.top = parseInt(_2a2.css("top")) + _2a2.outerHeight() - _2a4.height();
							pos.left = parseInt(_2a2.css("left"));
							pos.width = _2a2.outerWidth();
							pos.height = _2a4.height();
						} else {
							if (dir == "south") {
								pos.top = parseInt(_2a2.css("top"));
								pos.left = parseInt(_2a2.css("left"));
								pos.width = _2a2.outerWidth();
								pos.height = _2a4.height();
							} else {
								if (dir == "east") {
									pos.top = parseInt(_2a2.css("top")) || 0;
									pos.left = parseInt(_2a2.css("left")) || 0;
									pos.width = _2a4.width();
									pos.height = _2a2.outerHeight();
								} else {
									if (dir == "west") {
										pos.top = parseInt(_2a2.css("top")) || 0;
										pos.left = _2a2.outerWidth() - _2a4.width();
										pos.width = _2a4.width();
										pos.height = _2a2.outerHeight();
									}
								}
							}
						}
						_2a4.css(pos);
						$("<div class=\"fwb_layout-mask\"></div>").css({
							left: 0,
							top: 0,
							width: cc.width(),
							height: cc.height()
						}).appendTo(cc);
					},
					onResize: function(e) {
						if (dir == "north" || dir == "south") {
							var _2a7 = $(">div.fwb_layout-split-proxy-v", _29f);
							_2a7.css("top", e.pageY - $(_29f).offset().top - _2a7.height() / 2);
						} else {
							var _2a7 = $(">div.fwb_layout-split-proxy-h", _29f);
							_2a7.css("left", e.pageX - $(_29f).offset().left - _2a7.width() / 2);
						}
						return false;
					},
					onStopResize: function() {
						$(">div.fwb_layout-split-proxy-v", _29f).css("display", "none");
						$(">div.fwb_layout-split-proxy-h", _29f).css("display", "none");
						var opts = pp.fwb_panel("options");
						opts.width = _2a2.outerWidth();
						opts.height = _2a2.outerHeight();
						opts.left = _2a2.css("left");
						opts.top = _2a2.css("top");
						pp.fwb_panel("resize");
						_297(_29f);
						_296 = false;
						cc.find(">div.fwb_layout-mask").remove();
					}
				});
			}
			return pp;
		};
		$("<div class=\"fwb_layout-split-proxy-h\"></div>").appendTo(cc);
		$("<div class=\"fwb_layout-split-proxy-v\"></div>").appendTo(cc);
		var _2a8 = {
			center: _2a0("center")
		};
		_2a8.north = _2a0("north");
		_2a8.south = _2a0("south");
		_2a8.east = _2a0("east");
		_2a8.west = _2a0("west");
		$(_29f).bind("_resize",
		function(e, _2a9) {
			var opts = $.data(_29f, "fwb_layout").options;
			if (opts.fit == true || _2a9) {
				_297(_29f);
			}
			return false;
		});
		return _2a8;
	};
	function _2aa(_2ab, _2ac) {
		var _2ad = $.data(_2ab, "fwb_layout").panels;
		var cc = $(_2ab);
		function _2ae(dir) {
			var icon;
			if (dir == "east") {
				icon = "fwb_layout-button-left";
			} else {
				if (dir == "west") {
					icon = "fwb_layout-button-right";
				} else {
					if (dir == "north") {
						icon = "fwb_layout-button-down";
					} else {
						if (dir == "south") {
							icon = "fwb_layout-button-up";
						}
					}
				}
			}
			var p = $("<div></div>").appendTo(cc).fwb_panel({
				cls: "fwb_layout-expand",
				title: "&nbsp;",
				closed: true,
				doSize: false,
				tools: [{
					iconCls: icon,
					handler: function() {
						_2af(_2ab, _2ac);
					}
				}]
			});
			p.fwb_panel("fwb_panel").hover(function() {
				$(this).addClass("fwb_layout-expand-over");
			},
			function() {
				$(this).removeClass("fwb_layout-expand-over");
			});
			return p;
		};
		if (_2ac == "east") {
			if (_2ad.east.fwb_panel("options").onBeforeCollapse.call(_2ad.east) == false) {
				return;
			}
			_2ad.center.fwb_panel("resize", {
				width: _2ad.center.fwb_panel("options").width + _2ad.east.fwb_panel("options").width - 28
			});
			_2ad.east.fwb_panel("fwb_panel").animate({
				left: cc.width()
			},
			function() {
				_2ad.east.fwb_panel("close");
				_2ad.expandEast.fwb_panel("open").fwb_panel("resize", {
					top: _2ad.east.fwb_panel("options").top,
					left: cc.width() - 28,
					width: 28,
					height: _2ad.east.fwb_panel("options").height
				});
				_2ad.east.fwb_panel("options").onCollapse.call(_2ad.east);
			});
			if (!_2ad.expandEast) {
				_2ad.expandEast = _2ae("east");
				_2ad.expandEast.fwb_panel("fwb_panel").click(function() {
					_2ad.east.fwb_panel("open").fwb_panel("resize", {
						left: cc.width()
					});
					_2ad.east.fwb_panel("fwb_panel").animate({
						left: cc.width() - _2ad.east.fwb_panel("options").width
					});
					return false;
				});
			}
		} else {
			if (_2ac == "west") {
				if (_2ad.west.fwb_panel("options").onBeforeCollapse.call(_2ad.west) == false) {
					return;
				}
				_2ad.center.fwb_panel("resize", {
					width: _2ad.center.fwb_panel("options").width + _2ad.west.fwb_panel("options").width - 28,
					left: 28
				});
				_2ad.west.fwb_panel("fwb_panel").animate({
					left: -_2ad.west.fwb_panel("options").width
				},
				function() {
					_2ad.west.fwb_panel("close");
					_2ad.expandWest.fwb_panel("open").fwb_panel("resize", {
						top: _2ad.west.fwb_panel("options").top,
						left: 0,
						width: 28,
						height: _2ad.west.fwb_panel("options").height
					});
					_2ad.west.fwb_panel("options").onCollapse.call(_2ad.west);
				});
				if (!_2ad.expandWest) {
					_2ad.expandWest = _2ae("west");
					_2ad.expandWest.fwb_panel("fwb_panel").click(function() {
						_2ad.west.fwb_panel("open").fwb_panel("resize", {
							left: -_2ad.west.fwb_panel("options").width
						});
						_2ad.west.fwb_panel("fwb_panel").animate({
							left: 0
						});
						return false;
					});
				}
			} else {
				if (_2ac == "north") {
					if (_2ad.north.fwb_panel("options").onBeforeCollapse.call(_2ad.north) == false) {
						return;
					}
					var hh = cc.height() - 28;
					if (_29e(_2ad.expandSouth)) {
						hh -= _2ad.expandSouth.fwb_panel("options").height;
					} else {
						if (_29e(_2ad.south)) {
							hh -= _2ad.south.fwb_panel("options").height;
						}
					}
					_2ad.center.fwb_panel("resize", {
						top: 28,
						height: hh
					});
					_2ad.east.fwb_panel("resize", {
						top: 28,
						height: hh
					});
					_2ad.west.fwb_panel("resize", {
						top: 28,
						height: hh
					});
					if (_29e(_2ad.expandEast)) {
						_2ad.expandEast.fwb_panel("resize", {
							top: 28,
							height: hh
						});
					}
					if (_29e(_2ad.expandWest)) {
						_2ad.expandWest.fwb_panel("resize", {
							top: 28,
							height: hh
						});
					}
					_2ad.north.fwb_panel("fwb_panel").animate({
						top: -_2ad.north.fwb_panel("options").height
					},
					function() {
						_2ad.north.fwb_panel("close");
						_2ad.expandNorth.fwb_panel("open").fwb_panel("resize", {
							top: 0,
							left: 0,
							width: cc.width(),
							height: 28
						});
						_2ad.north.fwb_panel("options").onCollapse.call(_2ad.north);
					});
					if (!_2ad.expandNorth) {
						_2ad.expandNorth = _2ae("north");
						_2ad.expandNorth.fwb_panel("fwb_panel").click(function() {
							_2ad.north.fwb_panel("open").fwb_panel("resize", {
								top: -_2ad.north.fwb_panel("options").height
							});
							_2ad.north.fwb_panel("fwb_panel").animate({
								top: 0
							});
							return false;
						});
					}
				} else {
					if (_2ac == "south") {
						if (_2ad.south.fwb_panel("options").onBeforeCollapse.call(_2ad.south) == false) {
							return;
						}
						var hh = cc.height() - 28;
						if (_29e(_2ad.expandNorth)) {
							hh -= _2ad.expandNorth.fwb_panel("options").height;
						} else {
							if (_29e(_2ad.north)) {
								hh -= _2ad.north.fwb_panel("options").height;
							}
						}
						_2ad.center.fwb_panel("resize", {
							height: hh
						});
						_2ad.east.fwb_panel("resize", {
							height: hh
						});
						_2ad.west.fwb_panel("resize", {
							height: hh
						});
						if (_29e(_2ad.expandEast)) {
							_2ad.expandEast.fwb_panel("resize", {
								height: hh
							});
						}
						if (_29e(_2ad.expandWest)) {
							_2ad.expandWest.fwb_panel("resize", {
								height: hh
							});
						}
						_2ad.south.fwb_panel("fwb_panel").animate({
							top: cc.height()
						},
						function() {
							_2ad.south.fwb_panel("close");
							_2ad.expandSouth.fwb_panel("open").fwb_panel("resize", {
								top: cc.height() - 28,
								left: 0,
								width: cc.width(),
								height: 28
							});
							_2ad.south.fwb_panel("options").onCollapse.call(_2ad.south);
						});
						if (!_2ad.expandSouth) {
							_2ad.expandSouth = _2ae("south");
							_2ad.expandSouth.fwb_panel("fwb_panel").click(function() {
								_2ad.south.fwb_panel("open").fwb_panel("resize", {
									top: cc.height()
								});
								_2ad.south.fwb_panel("fwb_panel").animate({
									top: cc.height() - _2ad.south.fwb_panel("options").height
								});
								return false;
							});
						}
					}
				}
			}
		}
	};
	function _2af(_2b0, _2b1) {
		var _2b2 = $.data(_2b0, "fwb_layout").panels;
		var cc = $(_2b0);
		if (_2b1 == "east" && _2b2.expandEast) {
			if (_2b2.east.fwb_panel("options").onBeforeExpand.call(_2b2.east) == false) {
				return;
			}
			_2b2.expandEast.fwb_panel("close");
			_2b2.east.fwb_panel("fwb_panel").stop(true, true);
			_2b2.east.fwb_panel("open").fwb_panel("resize", {
				left: cc.width()
			});
			_2b2.east.fwb_panel("fwb_panel").animate({
				left: cc.width() - _2b2.east.fwb_panel("options").width
			},
			function() {
				_297(_2b0);
				_2b2.east.fwb_panel("options").onExpand.call(_2b2.east);
			});
		} else {
			if (_2b1 == "west" && _2b2.expandWest) {
				if (_2b2.west.fwb_panel("options").onBeforeExpand.call(_2b2.west) == false) {
					return;
				}
				_2b2.expandWest.fwb_panel("close");
				_2b2.west.fwb_panel("fwb_panel").stop(true, true);
				_2b2.west.fwb_panel("open").fwb_panel("resize", {
					left: -_2b2.west.fwb_panel("options").width
				});
				_2b2.west.fwb_panel("fwb_panel").animate({
					left: 0
				},
				function() {
					_297(_2b0);
					_2b2.west.fwb_panel("options").onExpand.call(_2b2.west);
				});
			} else {
				if (_2b1 == "north" && _2b2.expandNorth) {
					if (_2b2.north.fwb_panel("options").onBeforeExpand.call(_2b2.north) == false) {
						return;
					}
					_2b2.expandNorth.fwb_panel("close");
					_2b2.north.fwb_panel("fwb_panel").stop(true, true);
					_2b2.north.fwb_panel("open").fwb_panel("resize", {
						top: -_2b2.north.fwb_panel("options").height
					});
					_2b2.north.fwb_panel("fwb_panel").animate({
						top: 0
					},
					function() {
						_297(_2b0);
						_2b2.north.fwb_panel("options").onExpand.call(_2b2.north);
					});
				} else {
					if (_2b1 == "south" && _2b2.expandSouth) {
						if (_2b2.south.fwb_panel("options").onBeforeExpand.call(_2b2.south) == false) {
							return;
						}
						_2b2.expandSouth.fwb_panel("close");
						_2b2.south.fwb_panel("fwb_panel").stop(true, true);
						_2b2.south.fwb_panel("open").fwb_panel("resize", {
							top: cc.height()
						});
						_2b2.south.fwb_panel("fwb_panel").animate({
							top: cc.height() - _2b2.south.fwb_panel("options").height
						},
						function() {
							_297(_2b0);
							_2b2.south.fwb_panel("options").onExpand.call(_2b2.south);
						});
					}
				}
			}
		}
	};
	function _2b3(_2b4) {
		var _2b5 = $.data(_2b4, "fwb_layout").panels;
		var cc = $(_2b4);
		if (_2b5.east.length) {
			_2b5.east.fwb_panel("fwb_panel").bind("mouseover", "east", _2aa);
		}
		if (_2b5.west.length) {
			_2b5.west.fwb_panel("fwb_panel").bind("mouseover", "west", _2aa);
		}
		if (_2b5.north.length) {
			_2b5.north.fwb_panel("fwb_panel").bind("mouseover", "north", _2aa);
		}
		if (_2b5.south.length) {
			_2b5.south.fwb_panel("fwb_panel").bind("mouseover", "south", _2aa);
		}
		_2b5.center.fwb_panel("fwb_panel").bind("mouseover", "center", _2aa);
		function _2aa(e) {
			if (_296 == true) {
				return;
			}
			if (e.data != "east" && _29e(_2b5.east) && _29e(_2b5.expandEast)) {
				_2b5.east.fwb_panel("fwb_panel").animate({
					left: cc.width()
				},
				function() {
					_2b5.east.fwb_panel("close");
				});
			}
			if (e.data != "west" && _29e(_2b5.west) && _29e(_2b5.expandWest)) {
				_2b5.west.fwb_panel("fwb_panel").animate({
					left: -_2b5.west.fwb_panel("options").width
				},
				function() {
					_2b5.west.fwb_panel("close");
				});
			}
			if (e.data != "north" && _29e(_2b5.north) && _29e(_2b5.expandNorth)) {
				_2b5.north.fwb_panel("fwb_panel").animate({
					top: -_2b5.north.fwb_panel("options").height
				},
				function() {
					_2b5.north.fwb_panel("close");
				});
			}
			if (e.data != "south" && _29e(_2b5.south) && _29e(_2b5.expandSouth)) {
				_2b5.south.fwb_panel("fwb_panel").animate({
					top: cc.height()
				},
				function() {
					_2b5.south.fwb_panel("close");
				});
			}
			return false;
		};
	};
	function _29e(pp) {
		if (!pp) {
			return false;
		}
		if (pp.length) {
			return pp.fwb_panel("fwb_panel").is(":visible");
		} else {
			return false;
		}
	};
	$.fn.fwb_layout = function(_2b6, _2b7) {
		if (typeof _2b6 == "string") {
			return $.fn.fwb_layout.methods[_2b6](this, _2b7);
		}
		return this.each(function() {
			var _2b8 = $.data(this, "fwb_layout");
			if (!_2b8) {
				var opts = $.extend({},
				{
					fit: $(this).attr("fit") == "true"
				});
				$.data(this, "fwb_layout", {
					options: opts,
					panels: init(this)
				});
				_2b3(this);
			}
			_297(this);
		});
	};
	$.fn.fwb_layout.methods = {
		resize: function(jq) {
			return jq.each(function() {
				_297(this);
			});
		},
		panel: function(jq, _2b9) {
			return $.fn.fwb_layout.methods.fwb_panel(jq, _2b9);
		},
		fwb_panel: function(jq, _2b9) {
			return $.data(jq[0], "fwb_layout").panels[_2b9];
		},
		collapse: function(jq, _2ba) {
			return jq.each(function() {
				_2aa(this, _2ba);
			});
		},
		expand: function(jq, _2bb) {
			return jq.each(function() {
				_2af(this, _2bb);
			});
		}
	};
})(fn.jQuery);
/*
 (function($) {
	function init(_2bc) {
		$(_2bc).appendTo("body");
		$(_2bc).addClass("fwb_menu-top");
		var _2bd = [];
		_2be($(_2bc));
		var time = null;
		for (var i = 0; i < _2bd.length; i++) {
			var fwb_menu = _2bd[i];
			_2bf(fwb_menu);
			fwb_menu.children("div.fwb_menu-item").each(function() {
				_2c3(_2bc, $(this));
			});
			fwb_menu.bind("mouseenter",
			function() {
				if (time) {
					clearTimeout(time);
					time = null;
				}
			}).bind("mouseleave",
			function() {
				time = setTimeout(function() {
					_2c8(_2bc);
				},
				100);
			});
		}
		function _2be(fwb_menu) {
			_2bd.push(fwb_menu);
			fwb_menu.find(">div").each(function() {
				var item = $(this);
				var _2c0 = item.find(">div");
				if (_2c0.length) {
					_2c0.insertAfter(_2bc);
					item[0].subfwb_menu = _2c0;
					_2be(_2c0);
				}
			});
		};
		function _2bf(fwb_menu) {
			fwb_menu.addClass("fwb_menu").find(">div").each(function() {
				var item = $(this);
				if (item.hasClass("fwb_menu-sep")) {
					item.html("&nbsp;");
				} else {
					var text = item.addClass("fwb_menu-item").html();
					item.empty().append($("<div class=\"fwb_menu-text\"></div>").html(text));
					var _2c1 = item.attr("iconCls") || item.attr("icon");
					if (_2c1) {
						$("<div class=\"fwb_menu-icon\"></div>").addClass(_2c1).appendTo(item);
					}
					if (item[0].subfwb_menu) {
						$("<div class=\"fwb_menu-rightarrow\"></div>").appendTo(item);
					}
					if ($.boxModel == true) {
						var _2c2 = item.height();
						item.height(_2c2 - (item.outerHeight() - item.height()));
					}
				}
			});
			fwb_menu.hide();
		};
	};
	function _2c3(_2c4, item) {
		item.unbind(".fwb_menu");
		item.bind("mousedown.fwb_menu",
		function() {
			return false;
		}).bind("click.fwb_menu",
		function() {
			if ($(this).hasClass("fwb_menu-item-disabled")) {
				return;
			}
			if (!this.subfwb_menu) {
				_2c8(_2c4);
				var href = $(this).attr("href");
				if (href) {
					location.href = href;
				}
			}
			var item = $(_2c4).fwb_menu("getItem", this);
			$.data(_2c4, "fwb_menu").options.onClick.call(_2c4, item);
		}).bind("mouseenter.fwb_menu",
		function(e) {
			item.siblings().each(function() {
				if (this.subfwb_menu) {
					_2c7(this.subfwb_menu);
				}
				$(this).removeClass("fwb_menu-active");
			});
			item.addClass("fwb_menu-active");
			if ($(this).hasClass("fwb_menu-item-disabled")) {
				item.addClass("fwb_menu-active-disabled");
				return;
			}
			var _2c5 = item[0].subfwb_menu;
			if (_2c5) {
				var left = item.offset().left + item.outerWidth() - 2;
				if (left + _2c5.outerWidth() + 5 > $(window).width() + $(document).scrollLeft()) {
					left = item.offset().left - _2c5.outerWidth() + 2;
				}
				var top = item.offset().top - 3;
				if (top + _2c5.outerHeight() > $(window).height() + $(document).scrollTop()) {
					top = $(window).height() + $(document).scrollTop() - _2c5.outerHeight() - 5;
				}
				_2cc(_2c5, {
					left: left,
					top: top
				});
			}
		}).bind("mouseleave.fwb_menu",
		function(e) {
			item.removeClass("fwb_menu-active fwb_menu-active-disabled");
			var _2c6 = item[0].subfwb_menu;
			if (_2c6) {
				if (e.pageX >= parseInt(_2c6.css("left"))) {
					item.addClass("fwb_menu-active");
				} else {
					_2c7(_2c6);
				}
			} else {
				item.removeClass("fwb_menu-active");
			}
		});
	};
	function _2c8(_2c9) {
		var opts = $.data(_2c9, "fwb_menu").options;
		_2c7($(_2c9));
		$(document).unbind(".fwb_menu");
		opts.onHide.call(_2c9);
		return false;
	};
	function _2ca(_2cb, pos) {
		var opts = $.data(_2cb, "fwb_menu").options;
		if (pos) {
			opts.left = pos.left;
			opts.top = pos.top;
			if (opts.left + $(_2cb).outerWidth() > $(window).width() + $(document).scrollLeft()) {
				opts.left = $(window).width() + $(document).scrollLeft() - $(_2cb).outerWidth() - 5;
			}
			if (opts.top + $(_2cb).outerHeight() > $(window).height() + $(document).scrollTop()) {
				opts.top -= $(_2cb).outerHeight();
			}
		}
		_2cc($(_2cb), {
			left: opts.left,
			top: opts.top
		},
		function() {
			$(document).unbind(".fwb_menu").bind("mousedown.fwb_menu",
			function() {
				_2c8(_2cb);
				$(document).unbind(".fwb_menu");
				return false;
			});
			opts.onShow.call(_2cb);
		});
	};
	function _2cc(fwb_menu, pos, _2cd) {
		if (!fwb_menu) {
			return;
		}
		if (pos) {
			fwb_menu.css(pos);
		}
		fwb_menu.show(0,
		function() {
			if (!fwb_menu[0].shadow) {
				fwb_menu[0].shadow = $("<div class=\"fwb_menu-shadow\"></div>").insertAfter(fwb_menu);
			}
			fwb_menu[0].shadow.css({
				display: "block",
				zIndex: $.fn.fwb_menu.defaults.zIndex++,
				left: fwb_menu.css("left"),
				top: fwb_menu.css("top"),
				width: fwb_menu.outerWidth(),
				height: fwb_menu.outerHeight()
			});
			fwb_menu.css("z-index", $.fn.fwb_menu.defaults.zIndex++);
			if (_2cd) {
				_2cd();
			}
		});
	};
	function _2c7(fwb_menu) {
		if (!fwb_menu) {
			return;
		}
		_2ce(fwb_menu);
		fwb_menu.find("div.fwb_menu-item").each(function() {
			if (this.subfwb_menu) {
				_2c7(this.subfwb_menu);
			}
			$(this).removeClass("fwb_menu-active");
		});
		function _2ce(m) {
			m.stop(true, true);
			if (m[0].shadow) {
				m[0].shadow.hide();
			}
			m.hide();
		};
	};
	function _2cf(_2d0, text) {
		var _2d1 = null;
		var tmp = $("<div></div>");
		function find(fwb_menu) {
			fwb_menu.children("div.fwb_menu-item").each(function() {
				var item = $(_2d0).fwb_menu("getItem", this);
				var s = tmp.empty().html(item.text).text();
				if (text == $.trim(s)) {
					_2d1 = item;
				} else {
					if (this.subfwb_menu && !_2d1) {
						find(this.subfwb_menu);
					}
				}
			});
		};
		find($(_2d0));
		tmp.remove();
		return _2d1;
	};
	function _2d2(_2d3, _2d4, _2d5) {
		var t = $(_2d4);
		if (_2d5) {
			t.addClass("fwb_menu-item-disabled");
			if (_2d4.onclick) {
				_2d4.onclick1 = _2d4.onclick;
				_2d4.onclick = null;
			}
		} else {
			t.removeClass("fwb_menu-item-disabled");
			if (_2d4.onclick1) {
				_2d4.onclick = _2d4.onclick1;
				_2d4.onclick1 = null;
			}
		}
	};
	function _2d6(_2d7, _2d8) {
		var fwb_menu = $(_2d7);
		if (_2d8.parent) {
			fwb_menu = _2d8.parent.subfwb_menu;
		}
		var item = $("<div class=\"fwb_menu-item\"></div>").appendTo(fwb_menu);
		$("<div class=\"fwb_menu-text\"></div>").html(_2d8.text).appendTo(item);
		if (_2d8.iconCls) {
			$("<div class=\"fwb_menu-icon\"></div>").addClass(_2d8.iconCls).appendTo(item);
		}
		if (_2d8.id) {
			item.attr("id", _2d8.id);
		}
		if (_2d8.href) {
			item.attr("href", _2d8.href);
		}
		if (_2d8.onclick) {
			if (typeof _2d8.onclick == "string") {
				item.attr("onclick", _2d8.onclick);
			} else {
				item[0].onclick = eval(_2d8.onclick);
			}
		}
		if (_2d8.handler) {
			item[0].onclick = eval(_2d8.handler);
		}
		_2c3(_2d7, item);
	};
	function _2d9(_2da, _2db) {
		function _2dc(el) {
			if (el.subfwb_menu) {
				el.subfwb_menu.children("div.fwb_menu-item").each(function() {
					_2dc(this);
				});
				var _2dd = el.subfwb_menu[0].shadow;
				if (_2dd) {
					_2dd.remove();
				}
				el.subfwb_menu.remove();
			}
			$(el).remove();
		};
		_2dc(_2db);
	};
	function _2de(_2df) {
		$(_2df).children("div.fwb_menu-item").each(function() {
			_2d9(_2df, this);
		});
		if (_2df.shadow) {
			_2df.shadow.remove();
		}
		$(_2df).remove();
	};
	$.fn.fwb_menu = function(_2e0, _2e1) {
		if (typeof _2e0 == "string") {
			return $.fn.fwb_menu.methods[_2e0](this, _2e1);
		}
		_2e0 = _2e0 || {};
		return this.each(function() {
			var _2e2 = $.data(this, "fwb_menu");
			if (_2e2) {
				$.extend(_2e2.options, _2e0);
			} else {
				_2e2 = $.data(this, "fwb_menu", {
					options: $.extend({},
					$.fn.fwb_menu.defaults, _2e0)
				});
				init(this);
			}
			$(this).css({
				left: _2e2.options.left,
				top: _2e2.options.top
			});
		});
	};
	$.fn.fwb_menu.methods = {
		show: function(jq, pos) {
			return jq.each(function() {
				_2ca(this, pos);
			});
		},
		hide: function(jq) {
			return jq.each(function() {
				_2c8(this);
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				_2de(this);
			});
		},
		setText: function(jq, _2e3) {
			return jq.each(function() {
				$(_2e3.target).children("div.fwb_menu-text").html(_2e3.text);
			});
		},
		setIcon: function(jq, _2e4) {
			return jq.each(function() {
				var item = $(this).fwb_menu("getItem", _2e4.target);
				if (item.iconCls) {
					$(item.target).children("div.fwb_menu-icon").removeClass(item.iconCls).addClass(_2e4.iconCls);
				} else {
					$("<div class=\"fwb_menu-icon\"></div>").addClass(_2e4.iconCls).appendTo(_2e4.target);
				}
			});
		},
		getItem: function(jq, _2e5) {
			var item = {
				target: _2e5,
				id: $(_2e5).attr("id"),
				text: $.trim($(_2e5).children("div.fwb_menu-text").html()),
				disabled: $(_2e5).hasClass("fwb_menu-item-disabled"),
				href: $(_2e5).attr("href"),
				onclick: _2e5.onclick
			};
			var icon = $(_2e5).children("div.fwb_menu-icon");
			if (icon.length) {
				var cc = [];
				var aa = icon.attr("class").split(" ");
				for (var i = 0; i < aa.length; i++) {
					if (aa[i] != "fwb_menu-icon") {
						cc.push(aa[i]);
					}
				}
				item.iconCls = cc.join(" ");
			}
			return item;
		},
		findItem: function(jq, text) {
			return _2cf(jq[0], text);
		},
		appendItem: function(jq, _2e6) {
			return jq.each(function() {
				_2d6(this, _2e6);
			});
		},
		removeItem: function(jq, _2e7) {
			return jq.each(function() {
				_2d9(this, _2e7);
			});
		},
		enableItem: function(jq, _2e8) {
			return jq.each(function() {
				_2d2(this, _2e8, false);
			});
		},
		disableItem: function(jq, _2e9) {
			return jq.each(function() {
				_2d2(this, _2e9, true);
			});
		}
	};
	$.fn.fwb_menu.defaults = {
		zIndex: 110000,
		left: 0,
		top: 0,
		onShow: function() {
			},
		onHide: function() {
			},
		onClick: function(item) {
			}
	};
})(fn.jQuery);
*/
/*
 (function($) {
	function init(_2ea) {
		var opts = $.data(_2ea, "fwb_menubutton").options;
		var btn = $(_2ea);
		btn.removeClass("m-btn-active m-btn-plain-active");
		btn.fwb_linkbutton($.extend({},
		opts, {
			text: opts.text + "<span class=\"m-btn-downarrow\">&nbsp;</span>"
		}));
		if (opts.fwb_menu) {
			$(opts.fwb_menu).fwb_menu({
				onShow: function() {
					btn.addClass((opts.plain == true) ? "m-btn-plain-active": "m-btn-active");
				},
				onHide: function() {
					btn.removeClass((opts.plain == true) ? "m-btn-plain-active": "m-btn-active");
				}
			});
		}
		_2eb(_2ea, opts.disabled);
	};
	function _2eb(_2ec, _2ed) {
		var opts = $.data(_2ec, "fwb_menubutton").options;
		opts.disabled = _2ed;
		var btn = $(_2ec);
		if (_2ed) {
			btn.fwb_linkbutton("disable");
			btn.unbind(".fwb_menubutton");
		} else {
			btn.fwb_linkbutton("enable");
			btn.unbind(".fwb_menubutton");
			btn.bind("click.fwb_menubutton",
			function() {
				_2ee();
				return false;
			});
			var _2ef = null;
			btn.bind("mouseenter.fwb_menubutton",
			function() {
				_2ef = setTimeout(function() {
					_2ee();
				},
				opts.duration);
				return false;
			}).bind("mouseleave.fwb_menubutton",
			function() {
				if (_2ef) {
					clearTimeout(_2ef);
				}
			});
		}
		function _2ee() {
			if (!opts.fwb_menu) {
				return;
			}
			var left = btn.offset().left;
			if (left + $(opts.fwb_menu).outerWidth() + 5 > $(window).width()) {
				left = $(window).width() - $(opts.fwb_menu).outerWidth() - 5;
			}
			$("body>div.fwb_menu-top").fwb_menu("hide");
			$(opts.fwb_menu).fwb_menu("show", {
				left: left,
				top: btn.offset().top + btn.outerHeight()
			});
			btn.blur();
		};
	};
	$.fn.fwb_menubutton = function(_2f0, _2f1) {
		if (typeof _2f0 == "string") {
			return $.fn.fwb_menubutton.methods[_2f0](this, _2f1);
		}
		_2f0 = _2f0 || {};
		return this.each(function() {
			var _2f2 = $.data(this, "fwb_menubutton");
			if (_2f2) {
				$.extend(_2f2.options, _2f0);
			} else {
				$.data(this, "fwb_menubutton", {
					options: $.extend({},
					$.fn.fwb_menubutton.defaults, $.fn.fwb_menubutton.parseOptions(this), _2f0)
				});
				$(this).removeAttr("disabled");
			}
			init(this);
		});
	};
	$.fn.fwb_menubutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_menubutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_2eb(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_2eb(this, true);
			});
		}
	};
	$.fn.fwb_menubutton.parseOptions = function(_2f3) {
		var t = $(_2f3);
		return $.extend({},
		$.fn.fwb_linkbutton.parseOptions(_2f3), {
			fwb_menu: t.attr("fwb_menu"),
			duration: t.attr("duration")
		});
	};
	$.fn.fwb_menubutton.defaults = $.extend({},
	$.fn.fwb_linkbutton.defaults, {
		plain: true,
		fwb_menu: null,
		duration: 100
	});
})(fn.jQuery);
*/
/*
 (function($) {
	function init(_2f4) {
		var opts = $.data(_2f4, "fwb_splitbutton").options;
		var btn = $(_2f4);
		btn.removeClass("s-btn-active s-btn-plain-active");
		btn.fwb_linkbutton($.extend({},
		opts, {
			text: opts.text + "<span class=\"s-btn-downarrow\">&nbsp;</span>"
		}));
		if (opts.fwb_menu) {
			$(opts.fwb_menu).fwb_menu({
				onShow: function() {
					btn.addClass((opts.plain == true) ? "s-btn-plain-active": "s-btn-active");
				},
				onHide: function() {
					btn.removeClass((opts.plain == true) ? "s-btn-plain-active": "s-btn-active");
				}
			});
		}
		_2f5(_2f4, opts.disabled);
	};
	function _2f5(_2f6, _2f7) {
		var opts = $.data(_2f6, "fwb_splitbutton").options;
		opts.disabled = _2f7;
		var btn = $(_2f6);
		var _2f8 = btn.find(".s-btn-downarrow");
		if (_2f7) {
			btn.fwb_linkbutton("disable");
			_2f8.unbind(".fwb_splitbutton");
		} else {
			btn.fwb_linkbutton("enable");
			_2f8.unbind(".fwb_splitbutton");
			_2f8.bind("click.fwb_splitbutton",
			function() {
				_2f9();
				return false;
			});
			var _2fa = null;
			_2f8.bind("mouseenter.fwb_splitbutton",
			function() {
				_2fa = setTimeout(function() {
					_2f9();
				},
				opts.duration);
				return false;
			}).bind("mouseleave.fwb_splitbutton",
			function() {
				if (_2fa) {
					clearTimeout(_2fa);
				}
			});
		}
		function _2f9() {
			if (!opts.fwb_menu) {
				return;
			}
			var left = btn.offset().left;
			if (left + $(opts.fwb_menu).outerWidth() + 5 > $(window).width()) {
				left = $(window).width() - $(opts.fwb_menu).outerWidth() - 5;
			}
			$("body>div.fwb_menu-top").fwb_menu("hide");
			$(opts.fwb_menu).fwb_menu("show", {
				left: left,
				top: btn.offset().top + btn.outerHeight()
			});
			btn.blur();
		};
	};
	$.fn.fwb_splitbutton = function(_2fb, _2fc) {
		if (typeof _2fb == "string") {
			return $.fn.fwb_splitbutton.methods[_2fb](this, _2fc);
		}
		_2fb = _2fb || {};
		return this.each(function() {
			var _2fd = $.data(this, "fwb_splitbutton");
			if (_2fd) {
				$.extend(_2fd.options, _2fb);
			} else {
				$.data(this, "fwb_splitbutton", {
					options: $.extend({},
					$.fn.fwb_splitbutton.defaults, $.fn.fwb_splitbutton.parseOptions(this), _2fb)
				});
				$(this).removeAttr("disabled");
			}
			init(this);
		});
	};
	$.fn.fwb_splitbutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_splitbutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_2f5(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_2f5(this, true);
			});
		}
	};
	$.fn.fwb_splitbutton.parseOptions = function(_2fe) {
		var t = $(_2fe);
		return $.extend({},
		$.fn.fwb_linkbutton.parseOptions(_2fe), {
			fwb_menu: t.attr("fwb_menu"),
			duration: t.attr("duration")
		});
	};
	$.fn.fwb_splitbutton.defaults = $.extend({},
	$.fn.fwb_linkbutton.defaults, {
		plain: true,
		fwb_menu: null,
		duration: 100
	});
})(fn.jQuery);
*/
/*
 (function($) {
	function init(_2ff) {
		$(_2ff).hide();
		var span = $("<span class=\"fwb_searchbox\"></span>").insertAfter(_2ff);
		var _300 = $("<input type=\"text\" class=\"fwb_searchbox-text\">").appendTo(span);
		$("<span><span class=\"fwb_searchbox-button\"></span></span>").appendTo(span);
		var name = $(_2ff).attr("name");
		if (name) {
			_300.attr("name", name);
			$(_2ff).removeAttr("name").attr("searchboxName", name);
		}
		return span;
	};
	function _301(_302) {
		var opts = $.data(_302, "fwb_searchbox").options;
		var sb = $.data(_302, "fwb_searchbox").fwb_searchbox;
		if (_303) {
			opts.width = _303;
		}
		sb.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = sb.find("input.fwb_searchbox.text").outerWidth();
		}
		var _303 = opts.width - sb.find("a.fwb_searchbox-fwb_menu").outerWidth() - sb.find("span.fwb_searchbox-button").outerWidth();
		if ($.boxModel == true) {
			_303 -= sb.outerWidth() - sb.width();
		}
		sb.find("input.fwb_searchbox-text").width(_303);
		sb.insertAfter(_302);
	};
	function _304(_305) {
		var _306 = $.data(_305, "fwb_searchbox");
		var opts = _306.options;
		if (opts.fwb_menu) {
			_306.fwb_menu = $(opts.fwb_menu).fwb_menu({
				onClick: function(item) {
					_307(item);
				}
			});
			var item = _306.fwb_menu.fwb_menu("getItem", _306.fwb_menu.children("div.fwb_menu-item")[0]);
			_306.fwb_menu.children("div.fwb_menu-item").triggerHandler("click");
		} else {
			_306.fwb_searchbox.find("a.fwb_searchbox-fwb_menu").remove();
			_306.fwb_menu = null;
		}
		function _307(item) {
			_306.fwb_searchbox.find("a.fwb_searchbox-fwb_menu").remove();
			var mb = $("<a class=\"fwb_searchbox-fwb_menu\" href=\"javascript:void(0)\"></a>").html(item.text);
			mb.prependTo(_306.fwb_searchbox).fwb_menubutton({
				fwb_menu: _306.fwb_menu,
				iconCls: item.iconCls
			});
			_306.fwb_searchbox.find("input.fwb_searchbox-text").attr("name", $(item.target).attr("name") || item.text);
			_301(_305);
		};
	};
	function _308(_309) {
		var _30a = $.data(_309, "fwb_searchbox");
		var opts = _30a.options;
		var _30b = _30a.fwb_searchbox.find("input.fwb_searchbox-text");
		var _30c = _30a.fwb_searchbox.find(".fwb_searchbox-button");
		_30b.unbind(".fwb_searchbox").bind("blur.fwb_searchbox",
		function(e) {
			opts.value = $(this).val();
			if (opts.value == "") {
				$(this).val(opts.prompt);
				$(this).addClass("fwb_searchbox-prompt");
			} else {
				$(this).removeClass("fwb_searchbox-prompt");
			}
		}).bind("focus.fwb_searchbox",
		function(e) {
			if ($(this).val() != opts.value) {
				$(this).val(opts.value);
			}
			$(this).removeClass("fwb_searchbox-prompt");
		}).bind("keydown.fwb_searchbox",
		function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				opts.value = $(this).val();
				opts.searcher.call(_309, opts.value, _30b.attr("name"));
				return false;
			}
		});
		_30c.unbind(".fwb_searchbox").bind("click.fwb_searchbox",
		function() {
			opts.searcher.call(_309, opts.value, _30b.attr("name"));
		}).bind("mouseenter.fwb_searchbox",
		function() {
			$(this).addClass("fwb_searchbox-button-hover");
		}).bind("mouseleave.fwb_searchbox",
		function() {
			$(this).removeClass("fwb_searchbox-button-hover");
		});
	};
	function _30d(_30e) {
		var _30f = $.data(_30e, "fwb_searchbox");
		var opts = _30f.options;
		var _310 = _30f.fwb_searchbox.find("input.fwb_searchbox-text");
		if (opts.value == "") {
			_310.val(opts.prompt);
			_310.addClass("fwb_searchbox-prompt");
		} else {
			_310.val(opts.value);
			_310.removeClass("fwb_searchbox-prompt");
		}
	};
	$.fn.fwb_searchbox = function(_311, _312) {
		if (typeof _311 == "string") {
			return $.fn.fwb_searchbox.methods[_311](this, _312);
		}
		_311 = _311 || {};
		return this.each(function() {
			var _313 = $.data(this, "fwb_searchbox");
			if (_313) {
				$.extend(_313.options, _311);
			} else {
				_313 = $.data(this, "fwb_searchbox", {
					options: $.extend({},
					$.fn.fwb_searchbox.defaults, $.fn.fwb_searchbox.parseOptions(this), _311),
					fwb_searchbox: init(this)
				});
			}
			_304(this);
			_30d(this);
			_308(this);
			_301(this);
		});
	};
	$.fn.fwb_searchbox.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_searchbox").options;
		},
		menu: function(jq) {
			return $.fn.fwb_searchbox.methods.fwb_menu(jq);
		},
		fwb_menu: function(jq) {
			return $.data(jq[0], "fwb_searchbox").fwb_menu;
		},
		textbox: function(jq) {
			return $.data(jq[0], "fwb_searchbox").fwb_searchbox.find("input.fwb_searchbox-text");
		},
		getValue: function(jq) {
			return $.data(jq[0], "fwb_searchbox").options.value;
		},
		setValue: function(jq, _314) {
			return jq.each(function() {
				$(this).fwb_searchbox("options").value = _314;
				$(this).fwb_searchbox("textbox").val(_314);
				$(this).fwb_searchbox("textbox").blur();
			});
		},
		getName: function(jq) {
			return $.data(jq[0], "fwb_searchbox").fwb_searchbox.find("input.fwb_searchbox-text").attr("name");
		},
		destroy: function(jq) {
			return jq.each(function() {
				var fwb_menu = $(this).fwb_searchbox("fwb_menu");
				if (fwb_menu) {
					fwb_menu.fwb_menu("destroy");
				}
				$.data(this, "fwb_searchbox").fwb_searchbox.remove();
				$(this).remove();
			});
		},
		resize: function(jq, _315) {
			return jq.each(function() {
				_301(this, _315);
			});
		}
	};
	$.fn.fwb_searchbox.parseOptions = function(_316) {
		var t = $(_316);
		return {
			width: (parseInt(_316.style.width) || undefined),
			prompt: t.attr("prompt"),
			value: t.val(),
			fwb_menu: t.attr("fwb_menu"),
			searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)
		};
	};
	$.fn.fwb_searchbox.defaults = {
		width: "auto",
		prompt: "",
		value: "",
		fwb_menu: null,
		searcher: function(_317, name) {
			}
	};
})(fn.jQuery);
*/

 (function($) {
	function init(_318) {
		$(_318).addClass("fwb_validatebox-text");
	};
	function _319(_31a) {
		var _31b = $.data(_31a, "fwb_validatebox");
		_31b.validating = false;
		var tip = _31b.tip;
		if (tip) {
			tip.remove();
		}
		$(_31a).unbind();
		$(_31a).remove();
	};
	function _31c(_31d) {
		var box = $(_31d);
		var _31e = $.data(_31d, "fwb_validatebox");
		_31e.validating = false;
		box.unbind(".fwb_validatebox").bind("focus.fwb_validatebox",
		function() {
			_31e.validating = true;
			_31e.value = undefined;
			 (function() {
				if (_31e.validating) {
					if (_31e.value != box.val()) {
						_31e.value = box.val();
						_323(_31d);
					}
					setTimeout(arguments.callee, 200);
				}
			})();
		}).bind("blur.fwb_validatebox",
		function() {
			_31e.validating = false;
			_31f(_31d);
		}).bind("mouseenter.fwb_validatebox",
		function() {
			if (box.hasClass("fwb_validatebox-invalid")) {
				_320(_31d);
			}
		}).bind("mouseleave.fwb_validatebox",
		function() {
			_31f(_31d);
		});
	};
	function _320(_321) {
		var box = $(_321);
		var msg = $.data(_321, "fwb_validatebox").message;
		var tip = $.data(_321, "fwb_validatebox").tip;
		if (!tip) {
			tip = $("<div class=\"fwb_validatebox-tip\">" + "<span class=\"fwb_validatebox-tip-content\">" + "</span>" + "<span class=\"fwb_validatebox-tip-pointer\">" + "</span>" + "</div>").appendTo("body");
			$.data(_321, "fwb_validatebox").tip = tip;
		}
		tip.find(".fwb_validatebox-tip-content").html(msg);
		
		// hap 2011/12/21 修改validate-tip显示位置
		// hap 2011/12/22 再次修改
		// hap 2012/10/11 再次修改
		(function(){
			var css = {
				display: "block"
			};
			
			if(box.offset().top > $(window).height() - 50){
				// 提示框在上
				css.top = box.offset().top - 5;
				tip.addClass("fwb_validatebox-tip-top");
			}else{
				// 提示框在下
				css.top = box.offset().top + 5 + box.outerHeight();
				tip.removeClass("fwb_validatebox-tip-top");
			};
			
			if(box.offset().left + tip.width() + 20 > $(document).width()){
				// 提示框在左
				css.right = 20;
				tip.addClass("fwb_validatebox-tip-left");
			}else{
				// 提示框在右
				css.left = box.offset().left;
				tip.removeClass("fwb_validatebox-tip-left");
			};
			
			tip.css(css);
		})(); // end hap update
		
		// 2012.10.20 hap add：解决验证提示在IE6下被select控件穿透问题
		tip.bgiframe({
			width: tip.width(),
			height: 50
		});
		
//		tip.css({
//			display: "block",
//			left: box.offset().left + box.outerWidth(),
//			top: box.offset().top
//		});
	};
	function _31f(_322) {
		var tip = $.data(_322, "fwb_validatebox").tip;
		if (tip) {
			tip.remove();
			$.data(_322, "fwb_validatebox").tip = null;
		}
	};
	function _323(_324) {
		var opts = $.data(_324, "fwb_validatebox").options;
		var tip = $.data(_324, "fwb_validatebox").tip;
		var box = $(_324);
		var _325 = box.val();
		function _326(msg) {
			$.data(_324, "fwb_validatebox").message = msg;
		};
		var _327 = box.attr("disabled");
		if (_327 == true || _327 == "true") {
			return true;
		}
		if (opts.required) {
			if (_325 == "") {
				box.addClass("fwb_validatebox-invalid");
				_326(opts.missingMessage);
				_320(_324);
				return false;
			}
		}
		if (opts.validType) {
			var _328 = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
			var rule = opts.rules[_328[1]];
			if (_325 && rule) {
				var _329 = eval(_328[2]);
				if (!rule["validator"](_325, _329)) {
					box.addClass("fwb_validatebox-invalid");
					var _32a = rule["message"];
							
					// hap add 2012/3/7
					if($.isFunction(_32a)){
						_32a = _32a(_325, _329 || []) || "请输入正确的数据.";
					};
							
					if (_329) {
						for (var i = 0; i < _329.length; i++) {
							_32a = _32a.replace(new RegExp("\\{" + i + "\\}", "g"), _329[i]);
						}
					}
					_326(opts.invalidMessage || _32a);
					_320(_324);
					return false;
				}
			}
		}
		box.removeClass("fwb_validatebox-invalid");
		_31f(_324);
		return true;
	};
	$.fn.fwb_validatebox = function(_32b, _32c) {
		if (typeof _32b == "string") {
			return $.fn.fwb_validatebox.methods[_32b](this, _32c);
		}
		_32b = _32b || {};
		return this.each(function() {
			var _32d = $.data(this, "fwb_validatebox");
			if (_32d) {
				$.extend(_32d.options, _32b);
			} else {
				init(this);
				$.data(this, "fwb_validatebox", {
					options: $.extend({},
					$.fn.fwb_validatebox.defaults, $.fn.fwb_validatebox.parseOptions(this), _32b)
				});
			}
			_31c(this);
		});
	};
	$.fn.fwb_validatebox.methods = {
		destroy: function(jq) {
			return jq.each(function() {
				_319(this);
			});
		},
		validate: function(jq) {
			return jq.each(function() {
				_323(this);
			});
		},
		isValid: function(jq) {
			return _323(jq[0]);
		}
	};
	$.fn.fwb_validatebox.parseOptions = function(_32e) {
		var t = $(_32e);
		return {
			required: (t.attr("required") ? (t.attr("required") == "required" || t.attr("required") == "true" || t.attr("required") == true) : undefined),
			validType: (t.attr("validType") || undefined),
			missingMessage: (t.attr("missingMessage") || undefined),
			invalidMessage: (t.attr("invalidMessage") || undefined)
		};
	};
	$.fn.fwb_validatebox.defaults = {
		required: false,
		validType: null,
		missingMessage: "This field is required.",
		invalidMessage: null,
		rules: {
			email: {
				validator: function(_32f) {
					return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_32f);
				},
				message: "Please enter a valid email address."
			},
			url: {
				validator: function(_330) {
					return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_330);
				},
				message: "Please enter a valid URL."
			},
			length: {
				validator: function(_331, _332) {
					var len = $.trim(_331).length;
					return len >= _332[0] && len <= _332[1];
				},
				message: "Please enter a value between {0} and {1}."
			},
			remote: {
				validator: function(_333, _334) {
					var data = {};
					data[_334[1]] = _333;
					var _335 = $.ajax({
						url: _334[0],
						dataType: "json",
						data: data,
						async: false,
						cache: false,
						type: "post"
					}).responseText;
					return _335 == "true";
				},
				message: "Please fix this field."
			}
		}
	};
})(fn.jQuery);

(function($) {
	function _336(_337, _338) {
		_338 = _338 || {};
		if (_338.onSubmit) {
			if (_338.onSubmit.call(_337) == false) {
				return;
			}
		}
		var fwb_form = $(_337);
		if (_338.url) {
			fwb_form.attr("action", _338.url);
		}
		var _339 = "fwb_frame_" + (new Date().getTime());
		var _33a = $("<iframe id=" + _339 + " name=" + _339 + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false": "about:blank").css({
			position: "absolute",
			top: -1000,
			left: -1000
		});
		var t = fwb_form.attr("target"),
		a = fwb_form.attr("action");
		fwb_form.attr("target", _339);
		try {
			_33a.appendTo("body");
			_33a.bind("load", cb);
			fwb_form[0].submit();
		}
		 finally {
			fwb_form.attr("action", a);
			t ? fwb_form.attr("target", t) : fwb_form.removeAttr("target");
		}
		var _33b = 10;
		function cb() {
			_33a.unbind();
			var body = $("#" + _339).contents().find("body");
			var data = body.html();
			if (data == "") {
				if (--_33b) {
					setTimeout(cb, 100);
					return;
				}
				return;
			}
			var ta = body.find(">textarea");
			if (ta.length) {
				data = ta.val();
			} else {
				var pre = body.find(">pre");
				if (pre.length) {
					data = pre.html();
				}
			}
			if (_338.success) {
				_338.success(data);
			}
			setTimeout(function() {
				_33a.unbind();
				_33a.remove();
			},
			100);
		};
	};
	function load(_33c, data) {
		if (!$.data(_33c, "fwb_form")) {
			$.data(_33c, "fwb_form", {
				options: $.extend({},
				$.fn.fwb_form.defaults)
			});
		}
		var opts = $.data(_33c, "fwb_form").options;
		if (typeof data == "string") {
			var _33d = {};
			if (opts.onBeforeLoad.call(_33c, _33d) == false) {
				return;
			}
			$.ajax({
				url: data,
				data: _33d,
				dataType: "json",
				success: function(data) {
					_33e(data);
				},
				error: function() {
					opts.onLoadError.apply(_33c, arguments);
				}
			});
		} else {
			_33e(data);
		}
		function _33e(data) {
			var fwb_form = $(_33c);
			for (var name in data) {
				var val = data[name];
				var rr = $("input[name=" + name + "][type=radio]", fwb_form);
				$.fn.prop ? rr.prop("checked", false) : rr.attr("checked", false);
				var rv = $("input[name=" + name + "][type=radio][value=\"" + val + "\"]", fwb_form);
				$.fn.prop ? rv.prop("checked", true) : rv.attr("checked", true);
				var cc = $("input[name=" + name + "][type=checkbox]", fwb_form);
				$.fn.prop ? cc.prop("checked", false) : cc.attr("checked", false);
				var cv = $("input[name=" + name + "][type=checkbox][value=\"" + val + "\"]", fwb_form);
				$.fn.prop ? cv.prop("checked", true) : cv.attr("checked", true);
				if (!rr.length && !cc.length) {
					$("input[name=" + name + "]", fwb_form).val(val);
					$("textarea[name=" + name + "]", fwb_form).val(val);
					$("select[name=" + name + "]", fwb_form).val(val);
				}
				var cc = ["fwb_combo", "fwb_combobox", "fwb_combotree", "fwb_combogrid", "fwb_datebox", "fwb_datetimebox"];
				for (var i = 0; i < cc.length; i++) {
					_33f(cc[i], name, val);
				}
			}
			opts.onLoadSuccess.call(_33c, data);
			_345(_33c);
		};
		function _33f(type, name, val) {
			var fwb_form = $(_33c);
			var c = fwb_form.find("." + type + "-f[comboName=" + name + "]");
			if (c.length && c[type]) {
				if (c[type]("options").multiple) {
					c[type]("setValues", val);
				} else {
					c[type]("setValue", val);
				}
			}
		};
	};
	function _340(_341) {
		$("input,select,textarea", _341).each(function() {
			var t = this.type,
			tag = this.tagName.toLowerCase();
			if (t == "text" || t == "hidden" || t == "password" || tag == "textarea") {
				this.value = "";
			} else {
				if (t == "file") {
					var file = $(this);
					file.after(file.clone().val(""));
					file.remove();
				} else {
					if (t == "checkbox" || t == "radio") {
						this.checked = false;
					} else {
						if (tag == "select") {
							this.selectedIndex = -1;
						}
					}
				}
			}
		});
		if ($.fn.fwb_combo) {
			$(".fwb_combo-f", _341).fwb_combo("clear");
		}
		if ($.fn.fwb_combobox) {
			$(".fwb_combobox-f", _341).fwb_combobox("clear");
		}
		if ($.fn.fwb_combotree) {
			$(".fwb_combotree-f", _341).fwb_combotree("clear");
		}
		if ($.fn.fwb_combogrid) {
			$(".fwb_combogrid-f", _341).fwb_combogrid("clear");
		}
	};
	function _342(_343) {
		var _344 = $.data(_343, "fwb_form").options;
		var fwb_form = $(_343);
		fwb_form.unbind(".fwb_form").bind("submit.fwb_form",
		function() {
			setTimeout(function() {
				_336(_343, _344);
			},
			0);
			return false;
		});
	};
	function _345(_346) {
		if ($.fn.fwb_validatebox) {
			var box = $(".fwb_validatebox-text", _346);
			if (box.length) {
				box.fwb_validatebox("validate");
				box.trigger("blur");
				var _347 = $(".fwb_validatebox-invalid:first", _346).focus();
				return _347.length == 0;
			}
		}
		return true;
	};
	$.fn.fwb_form = function(_348, _349) {
		if (typeof _348 == "string") {
			return $.fn.fwb_form.methods[_348](this, _349);
		}
		_348 = _348 || {};
		return this.each(function() {
			if (!$.data(this, "fwb_form")) {
				$.data(this, "fwb_form", {
					options: $.extend({},
					$.fn.fwb_form.defaults, _348)
				});
			}
			_342(this);
		});
	};
	$.fn.fwb_form.methods = {
		submit: function(jq, _34a) {
			return jq.each(function() {
				_336(this, $.extend({},
				$.fn.fwb_form.defaults, _34a || {}));
			});
		},
		load: function(jq, data) {
			return jq.each(function() {
				load(this, data);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				_340(this);
			});
		},
		validate: function(jq) {
			return _345(jq[0]);
		}
	};
	$.fn.fwb_form.defaults = {
		url: null,
		onSubmit: function() {
			},
		success: function(data) {
			},
		onBeforeLoad: function(_34b) {
			},
		onLoadSuccess: function(data) {
			},
		onLoadError: function() {
			}
	};
})(fn.jQuery);
 (function($) {
	function _34c(_34d) {
		var opts = $.data(_34d, "fwb_numberbox").options;
		var val = parseFloat($(_34d).val()).toFixed(opts.precision);
		if (isNaN(val)) {
			$(_34d).val("");
			return;
		}
		if (typeof(opts.min) == "number" && val < opts.min) {
			$(_34d).val(opts.min.toFixed(opts.precision));
		} else {
			if (typeof(opts.max) == "number" && val > opts.max) {
				$(_34d).val(opts.max.toFixed(opts.precision));
			} else {
				$(_34d).val(val);
			}
		}
	};
	function _34e(_34f) {
		$(_34f).unbind(".fwb_numberbox");
		$(_34f).bind("keypress.fwb_numberbox",
		function(e) {
			if (e.which == 45) {
				return true;
			}
			if (e.which == 46) {
				return true;
			} else {
				if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
					return true;
				} else {
					if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
						return true;
					} else {
						return false;
					}
				}
			}
		}).bind("paste.fwb_numberbox",
		function() {
			if (window.clipboardData) {
				var s = clipboardData.getData("text");
				if (!/\D/.test(s)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}).bind("dragenter.fwb_numberbox",
		function() {
			return false;
		}).bind("blur.fwb_numberbox",
		function() {
			_34c(_34f);
		});
	};
	function _350(_351) {
		if ($.fn.fwb_validatebox) {
			var opts = $.data(_351, "fwb_numberbox").options;
			$(_351).fwb_validatebox(opts);
		}
	};
	function _352(_353, _354) {
		var opts = $.data(_353, "fwb_numberbox").options;
		if (_354) {
			opts.disabled = true;
			$(_353).attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_353).removeAttr("disabled");
		}
	};
	$.fn.fwb_numberbox = function(_355, _356) {
		if (typeof _355 == "string") {
			var _357 = $.fn.fwb_numberbox.methods[_355];
			if (_357) {
				return _357(this, _356);
			} else {
				return this.fwb_validatebox(_355, _356);
			}
		}
		_355 = _355 || {};
		return this.each(function() {
			var _358 = $.data(this, "fwb_numberbox");
			if (_358) {
				$.extend(_358.options, _355);
			} else {
				_358 = $.data(this, "fwb_numberbox", {
					options: $.extend({},
					$.fn.fwb_numberbox.defaults, $.fn.fwb_numberbox.parseOptions(this), _355)
				});
				$(this).removeAttr("disabled");
				$(this).css({
					imeMode: "disabled"
				});
			}
			_352(this, _358.options.disabled);
			_34e(this);
			_350(this);
		});
	};
	$.fn.fwb_numberbox.methods = {
		disable: function(jq) {
			return jq.each(function() {
				_352(this, true);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_352(this, false);
			});
		},
		fix: function(jq) {
			return jq.each(function() {
				_34c(this);
			});
		}
	};
	$.fn.fwb_numberbox.parseOptions = function(_359) {
		var t = $(_359);
		return $.extend({},
		$.fn.fwb_validatebox.parseOptions(_359), {
			disabled: (t.attr("disabled") ? true: undefined),
			min: (t.attr("min") == "0" ? 0: parseFloat(t.attr("min")) || undefined),
			max: (t.attr("max") == "0" ? 0: parseFloat(t.attr("max")) || undefined),
			precision: (parseInt(t.attr("precision")) || undefined)
		});
	};
	$.fn.fwb_numberbox.defaults = $.extend({},
	$.fn.fwb_validatebox.defaults, {
		disabled: false,
		min: null,
		max: null,
		precision: 0
	});
})(fn.jQuery);
/*
 (function($) {
	function _35a(_35b) {
		var opts = $.data(_35b, "fwb_calendar").options;
		var t = $(_35b);
		if (opts.fit == true) {
			var p = t.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		var _35c = t.find(".fwb_calendar-header");
		if ($.boxModel == true) {
			t.width(opts.width - (t.outerWidth() - t.width()));
			t.height(opts.height - (t.outerHeight() - t.height()));
		} else {
			t.width(opts.width);
			t.height(opts.height);
		}
		var body = t.find(".fwb_calendar-body");
		var _35d = t.height() - _35c.outerHeight();
		if ($.boxModel == true) {
			body.height(_35d - (body.outerHeight() - body.height()));
		} else {
			body.height(_35d);
		}
	};
	function init(_35e) {
		$(_35e).addClass("fwb_calendar").wrapInner("<div class=\"fwb_calendar-header\">" + "<div class=\"fwb_calendar-prevmonth\"></div>" + "<div class=\"fwb_calendar-nextmonth\"></div>" + "<div class=\"fwb_calendar-prevyear\"></div>" + "<div class=\"fwb_calendar-nextyear\"></div>" + "<div class=\"fwb_calendar-title\">" + "<span>Aprial 2010</span>" + "</div>" + "</div>" + "<div class=\"fwb_calendar-body\">" + "<div class=\"fwb_calendar-fwb_menu\">" + "<div class=\"fwb_calendar-fwb_menu-year-inner\">" + "<span class=\"fwb_calendar-fwb_menu-prev\"></span>" + "<span><input class=\"fwb_calendar-fwb_menu-year\" type=\"text\"></input></span>" + "<span class=\"fwb_calendar-fwb_menu-next\"></span>" + "</div>" + "<div class=\"fwb_calendar-fwb_menu-month-inner\">" + "</div>" + "</div>" + "</div>");
		$(_35e).find(".fwb_calendar-title span").hover(function() {
			$(this).addClass("fwb_calendar-fwb_menu-hover");
		},
		function() {
			$(this).removeClass("fwb_calendar-fwb_menu-hover");
		}).click(function() {
			var fwb_menu = $(_35e).find(".fwb_calendar-fwb_menu");
			if (fwb_menu.is(":visible")) {
				fwb_menu.hide();
			} else {
				_365(_35e);
			}
		});
		$(".fwb_calendar-prevmonth,.fwb_calendar-nextmonth,.fwb_calendar-prevyear,.fwb_calendar-nextyear", _35e).hover(function() {
			$(this).addClass("fwb_calendar-nav-hover");
		},
		function() {
			$(this).removeClass("fwb_calendar-nav-hover");
		});
		$(_35e).find(".fwb_calendar-nextmonth").click(function() {
			_35f(_35e, 1);
		});
		$(_35e).find(".fwb_calendar-prevmonth").click(function() {
			_35f(_35e, -1);
		});
		$(_35e).find(".fwb_calendar-nextyear").click(function() {
			_362(_35e, 1);
		});
		$(_35e).find(".fwb_calendar-prevyear").click(function() {
			_362(_35e, -1);
		});
		$(_35e).bind("_resize",
		function() {
			var opts = $.data(_35e, "fwb_calendar").options;
			if (opts.fit == true) {
				_35a(_35e);
			}
			return false;
		});
	};
	function _35f(_360, _361) {
		var opts = $.data(_360, "fwb_calendar").options;
		opts.month += _361;
		if (opts.month > 12) {
			opts.year++;
			opts.month = 1;
		} else {
			if (opts.month < 1) {
				opts.year--;
				opts.month = 12;
			}
		}
		show(_360);
		var fwb_menu = $(_360).find(".fwb_calendar-fwb_menu-month-inner");
		fwb_menu.find("td.fwb_calendar-selected").removeClass("fwb_calendar-selected");
		fwb_menu.find("td:eq(" + (opts.month - 1) + ")").addClass("fwb_calendar-selected");
	};
	function _362(_363, _364) {
		var opts = $.data(_363, "fwb_calendar").options;
		opts.year += _364;
		show(_363);
		var fwb_menu = $(_363).find(".fwb_calendar-fwb_menu-year");
		fwb_menu.val(opts.year);
	};
	function _365(_366) {
		var opts = $.data(_366, "fwb_calendar").options;
		$(_366).find(".fwb_calendar-fwb_menu").show();
		if ($(_366).find(".fwb_calendar-fwb_menu-month-inner").is(":empty")) {
			$(_366).find(".fwb_calendar-fwb_menu-month-inner").empty();
			var t = $("<table></table>").appendTo($(_366).find(".fwb_calendar-fwb_menu-month-inner"));
			var idx = 0;
			for (var i = 0; i < 3; i++) {
				var tr = $("<tr></tr>").appendTo(t);
				for (var j = 0; j < 4; j++) {
					$("<td class=\"fwb_calendar-fwb_menu-month\"></td>").html(opts.months[idx++]).attr("abbr", idx).appendTo(tr);
				}
			}
			$(_366).find(".fwb_calendar-fwb_menu-prev,.fwb_calendar-fwb_menu-next").hover(function() {
				$(this).addClass("fwb_calendar-fwb_menu-hover");
			},
			function() {
				$(this).removeClass("fwb_calendar-fwb_menu-hover");
			});
			$(_366).find(".fwb_calendar-fwb_menu-next").click(function() {
				var y = $(_366).find(".fwb_calendar-fwb_menu-year");
				if (!isNaN(y.val())) {
					y.val(parseInt(y.val()) + 1);
				}
			});
			$(_366).find(".fwb_calendar-fwb_menu-prev").click(function() {
				var y = $(_366).find(".fwb_calendar-fwb_menu-year");
				if (!isNaN(y.val())) {
					y.val(parseInt(y.val() - 1));
				}
			});
			$(_366).find(".fwb_calendar-fwb_menu-year").keypress(function(e) {
				if (e.keyCode == 13) {
					_367();
				}
			});
			$(_366).find(".fwb_calendar-fwb_menu-month").hover(function() {
				$(this).addClass("fwb_calendar-fwb_menu-hover");
			},
			function() {
				$(this).removeClass("fwb_calendar-fwb_menu-hover");
			}).click(function() {
				var fwb_menu = $(_366).find(".fwb_calendar-fwb_menu");
				fwb_menu.find(".fwb_calendar-selected").removeClass("fwb_calendar-selected");
				$(this).addClass("fwb_calendar-selected");
				_367();
			});
		}
		function _367() {
			var fwb_menu = $(_366).find(".fwb_calendar-fwb_menu");
			var year = fwb_menu.find(".fwb_calendar-fwb_menu-year").val();
			var _368 = fwb_menu.find(".fwb_calendar-selected").attr("abbr");
			if (!isNaN(year)) {
				opts.year = parseInt(year);
				opts.month = parseInt(_368);
				show(_366);
			}
			fwb_menu.hide();
		};
		var body = $(_366).find(".fwb_calendar-body");
		var sele = $(_366).find(".fwb_calendar-fwb_menu");
		var _369 = sele.find(".fwb_calendar-fwb_menu-year-inner");
		var _36a = sele.find(".fwb_calendar-fwb_menu-month-inner");
		_369.find("input").val(opts.year).focus();
		_36a.find("td.fwb_calendar-selected").removeClass("fwb_calendar-selected");
		_36a.find("td:eq(" + (opts.month - 1) + ")").addClass("fwb_calendar-selected");
		if ($.boxModel == true) {
			sele.width(body.outerWidth() - (sele.outerWidth() - sele.width()));
			sele.height(body.outerHeight() - (sele.outerHeight() - sele.height()));
			_36a.height(sele.height() - (_36a.outerHeight() - _36a.height()) - _369.outerHeight());
		} else {
			sele.width(body.outerWidth());
			sele.height(body.outerHeight());
			_36a.height(sele.height() - _369.outerHeight());
		}
	};
	function _36b(year, _36c) {
		var _36d = [];
		var _36e = new Date(year, _36c, 0).getDate();
		for (var i = 1; i <= _36e; i++) {
			_36d.push([year, _36c, i]);
		}
		var _36f = [],
		week = [];
		while (_36d.length > 0) {
			var date = _36d.shift();
			week.push(date);
			if (new Date(date[0], date[1] - 1, date[2]).getDay() == 6) {
				_36f.push(week);
				week = [];
			}
		}
		if (week.length) {
			_36f.push(week);
		}
		var _370 = _36f[0];
		if (_370.length < 7) {
			while (_370.length < 7) {
				var _371 = _370[0];
				var date = new Date(_371[0], _371[1] - 1, _371[2] - 1);
				_370.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
		} else {
			var _371 = _370[0];
			var week = [];
			for (var i = 1; i <= 7; i++) {
				var date = new Date(_371[0], _371[1] - 1, _371[2] - i);
				week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
			_36f.unshift(week);
		}
		var _372 = _36f[_36f.length - 1];
		while (_372.length < 7) {
			var _373 = _372[_372.length - 1];
			var date = new Date(_373[0], _373[1] - 1, _373[2] + 1);
			_372.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
		}
		if (_36f.length < 6) {
			var _373 = _372[_372.length - 1];
			var week = [];
			for (var i = 1; i <= 7; i++) {
				var date = new Date(_373[0], _373[1] - 1, _373[2] + i);
				week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
			_36f.push(week);
		}
		return _36f;
	};
	function show(_374) {
		var opts = $.data(_374, "fwb_calendar").options;
		$(_374).find(".fwb_calendar-title span").html(opts.months[opts.month - 1] + " " + opts.year);
		var body = $(_374).find("div.fwb_calendar-body");
		body.find(">table").remove();
		var t = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead></thead><tbody></tbody></table>").prependTo(body);
		var tr = $("<tr></tr>").appendTo(t.find("thead"));
		for (var i = 0; i < opts.weeks.length; i++) {
			tr.append("<th>" + opts.weeks[i] + "</th>");
		}
		var _375 = _36b(opts.year, opts.month);
		for (var i = 0; i < _375.length; i++) {
			var week = _375[i];
			var tr = $("<tr></tr>").appendTo(t.find("tbody"));
			for (var j = 0; j < week.length; j++) {
				var day = week[j];
				$("<td class=\"fwb_calendar-day fwb_calendar-other-month\"></td>").attr("abbr", day[0] + "," + day[1] + "," + day[2]).html(day[2]).appendTo(tr);
			}
		}
		t.find("td[abbr^=\"" + opts.year + "," + opts.month + "\"]").removeClass("fwb_calendar-other-month");
		var now = new Date();
		var _376 = now.getFullYear() + "," + (now.getMonth() + 1) + "," + now.getDate();
		t.find("td[abbr=\"" + _376 + "\"]").addClass("fwb_calendar-today");
		if (opts.current) {
			t.find(".fwb_calendar-selected").removeClass("fwb_calendar-selected");
			var _377 = opts.current.getFullYear() + "," + (opts.current.getMonth() + 1) + "," + opts.current.getDate();
			t.find("td[abbr=\"" + _377 + "\"]").addClass("fwb_calendar-selected");
		}
		t.find("tr").find("td:first").addClass("fwb_calendar-sunday");
		t.find("tr").find("td:last").addClass("fwb_calendar-saturday");
		t.find("td").hover(function() {
			$(this).addClass("fwb_calendar-hover");
		},
		function() {
			$(this).removeClass("fwb_calendar-hover");
		}).click(function() {
			t.find(".fwb_calendar-selected").removeClass("fwb_calendar-selected");
			$(this).addClass("fwb_calendar-selected");
			var _378 = $(this).attr("abbr").split(",");
			opts.current = new Date(_378[0], parseInt(_378[1]) - 1, _378[2]);
			opts.onSelect.call(_374, opts.current);
		});
	};
	$.fn.fwb_calendar = function(_379, _37a) {
		if (typeof _379 == "string") {
			return $.fn.fwb_calendar.methods[_379](this, _37a);
		}
		_379 = _379 || {};
		return this.each(function() {
			var _37b = $.data(this, "fwb_calendar");
			if (_37b) {
				$.extend(_37b.options, _379);
			} else {
				_37b = $.data(this, "fwb_calendar", {
					options: $.extend({},
					$.fn.fwb_calendar.defaults, $.fn.fwb_calendar.parseOptions(this), _379)
				});
				init(this);
			}
			if (_37b.options.border == false) {
				$(this).addClass("fwb_calendar-noborder");
			}
			_35a(this);
			show(this);
			$(this).find("div.fwb_calendar-fwb_menu").hide();
		});
	};
	$.fn.fwb_calendar.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_calendar").options;
		},
		resize: function(jq) {
			return jq.each(function() {
				_35a(this);
			});
		},
		moveTo: function(jq, date) {
			return jq.each(function() {
				$(this).fwb_calendar({
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					current: date
				});
			});
		}
	};
	$.fn.fwb_calendar.parseOptions = function(_37c) {
		var t = $(_37c);
		return {
			width: (parseInt(_37c.style.width) || undefined),
			height: (parseInt(_37c.style.height) || undefined),
			fit: (t.attr("fit") ? t.attr("fit") == "true": undefined),
			border: (t.attr("border") ? t.attr("border") == "true": undefined)
		};
	};
	$.fn.fwb_calendar.defaults = {
		width: 180,
		height: 180,
		fit: false,
		border: true,
		weeks: ["S", "M", "T", "W", "T", "F", "S"],
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		current: new Date(),
		onSelect: function(date) {
			}
	};
})(fn.jQuery);
*/
/*
 (function($) {
	function init(_37d) {
		var _37e = $("<span class=\"fwb_spinner\">" + "<span class=\"fwb_spinner-arrow\">" + "<span class=\"fwb_spinner-arrow-up\"></span>" + "<span class=\"fwb_spinner-arrow-down\"></span>" + "</span>" + "</span>").insertAfter(_37d);
		$(_37d).addClass("fwb_spinner-text").prependTo(_37e);
		return _37e;
	};
	function _37f(_380, _381) {
		var opts = $.data(_380, "fwb_spinner").options;
		var _382 = $.data(_380, "fwb_spinner").fwb_spinner;
		if (_381) {
			opts.width = _381;
		}
		var _383 = $("<div style=\"display:none\"></div>").insertBefore(_382);
		_382.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = $(_380).outerWidth();
		}
		var _384 = _382.find(".fwb_spinner-arrow").outerWidth();
		var _381 = opts.width - _384;
		if ($.boxModel == true) {
			_381 -= _382.outerWidth() - _382.width();
		}
		$(_380).width(_381);

		_382.insertAfter(_383);
		_383.remove();
	};
	function _385(_386) {
		var opts = $.data(_386, "fwb_spinner").options;
		var _387 = $.data(_386, "fwb_spinner").fwb_spinner;
		_387.find(".fwb_spinner-arrow-up,.fwb_spinner-arrow-down").unbind(".fwb_spinner");
		if (!opts.disabled) {
			_387.find(".fwb_spinner-arrow-up").bind("mouseenter.fwb_spinner",
			function() {
				$(this).addClass("fwb_spinner-arrow-hover");
			}).bind("mouseleave.fwb_spinner",
			function() {
				$(this).removeClass("fwb_spinner-arrow-hover");
			}).bind("click.fwb_spinner",
			function() {
				opts.spin.call(_386, false);
				opts.onSpinUp.call(_386);
				$(_386).fwb_validatebox("validate");
			});
			_387.find(".fwb_spinner-arrow-down").bind("mouseenter.fwb_spinner",
			function() {
				$(this).addClass("fwb_spinner-arrow-hover");
			}).bind("mouseleave.fwb_spinner",
			function() {
				$(this).removeClass("fwb_spinner-arrow-hover");
			}).bind("click.fwb_spinner",
			function() {
				opts.spin.call(_386, true);
				opts.onSpinDown.call(_386);
				$(_386).fwb_validatebox("validate");
			});
		}
	};
	function _388(_389, _38a) {
		var opts = $.data(_389, "fwb_spinner").options;
		if (_38a) {
			opts.disabled = true;
			$(_389).attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_389).removeAttr("disabled");
		}
	};
	$.fn.fwb_spinner = function(_38b, _38c) {
		if (typeof _38b == "string") {
			var _38d = $.fn.fwb_spinner.methods[_38b];
			if (_38d) {
				return _38d(this, _38c);
			} else {
				return this.fwb_validatebox(_38b, _38c);
			}
		}
		_38b = _38b || {};
		return this.each(function() {
			var _38e = $.data(this, "fwb_spinner");
			if (_38e) {
				$.extend(_38e.options, _38b);
			} else {
				_38e = $.data(this, "fwb_spinner", {
					options: $.extend({},
					$.fn.fwb_spinner.defaults, $.fn.fwb_spinner.parseOptions(this), _38b),
					fwb_spinner: init(this)
				});
				$(this).removeAttr("disabled");
			}
			$(this).val(_38e.options.value);
			$(this).attr("readonly", !_38e.options.editable);
			_388(this, _38e.options.disabled);
			_37f(this);
			$(this).fwb_validatebox(_38e.options);
			_385(this);
		});
	};
	$.fn.fwb_spinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "fwb_spinner").options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				var _38f = $.data(this, "fwb_spinner").fwb_spinner;
				$(this).fwb_validatebox("destroy");
				_38f.remove();
			});
		},
		resize: function(jq, _390) {
			return jq.each(function() {
				_37f(this, _390);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_388(this, false);
				_385(this);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_388(this, true);
				_385(this);
			});
		},
		getValue: function(jq) {
			return jq.val();
		},
		setValue: function(jq, _391) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_spinner").options;
				opts.value = _391;
				$(this).val(_391);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_spinner").options;
				opts.value = "";
				$(this).val("");
			});
		}
	};
	$.fn.fwb_spinner.parseOptions = function(_392) {
		var t = $(_392);
		return $.extend({},
		$.fn.fwb_validatebox.parseOptions(_392), {
			width: (parseInt(_392.style.width) || undefined),
			value: (t.val() || undefined),
			min: t.attr("min"),
			max: t.attr("max"),
			increment: (parseFloat(t.attr("increment")) || undefined),
			editable: (t.attr("editable") ? t.attr("editable") == "true": undefined),
			disabled: (t.attr("disabled") ? true: undefined)
		});
	};
	$.fn.fwb_spinner.defaults = $.extend({},
	$.fn.fwb_validatebox.defaults, {
		width: "auto",
		value: "",
		min: null,
		max: null,
		increment: 1,
		editable: true,
		disabled: false,
		spin: function(down) {
			},
		onSpinUp: function() {
			},
		onSpinDown: function() {
			}
	});
})(fn.jQuery);
*/
/*
 (function($) {
	function _393(_394) {
		var opts = $.data(_394, "fwb_numberspinner").options;
		$(_394).fwb_spinner(opts).fwb_numberbox(opts);
	};
	function _395(_396, down) {
		var opts = $.data(_396, "fwb_numberspinner").options;
		var v = parseFloat($(_396).val() || opts.value) || 0;
		if (down == true) {
			v -= opts.increment;
		} else {
			v += opts.increment;
		}
		$(_396).val(v).fwb_numberbox("fix");
	};
	$.fn.fwb_numberspinner = function(_397, _398) {
		if (typeof _397 == "string") {
			var _399 = $.fn.fwb_numberspinner.methods[_397];
			if (_399) {
				return _399(this, _398);
			} else {
				return this.fwb_spinner(_397, _398);
			}
		}
		_397 = _397 || {};
		return this.each(function() {
			var _39a = $.data(this, "fwb_numberspinner");
			if (_39a) {
				$.extend(_39a.options, _397);
			} else {
				$.data(this, "fwb_numberspinner", {
					options: $.extend({},
					$.fn.fwb_numberspinner.defaults, $.fn.fwb_numberspinner.parseOptions(this), _397)
				});
			}
			_393(this);
		});
	};
	$.fn.fwb_numberspinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "fwb_numberspinner").options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		setValue: function(jq, _39b) {
			return jq.each(function() {
				$(this).val(_39b).fwb_numberbox("fix");
			});
		}
	};
	$.fn.fwb_numberspinner.parseOptions = function(_39c) {
		return $.extend({},
		$.fn.fwb_spinner.parseOptions(_39c), $.fn.fwb_numberbox.parseOptions(_39c), {});
	};
	$.fn.fwb_numberspinner.defaults = $.extend({},
	$.fn.fwb_spinner.defaults, $.fn.fwb_numberbox.defaults, {
		spin: function(down) {
			_395(this, down);
		}
	});
})(fn.jQuery);
*/
/*
 (function($) {
	function _39d(_39e) {
		var opts = $.data(_39e, "fwb_timespinner").options;
		$(_39e).fwb_spinner(opts);
		$(_39e).unbind(".fwb_timespinner");
		$(_39e).bind("click.fwb_timespinner",
		function() {
			var _39f = 0;
			if (this.selectionStart != null) {
				_39f = this.selectionStart;
			} else {
				if (this.createTextRange) {
					var _3a0 = _39e.createTextRange();
					var s = document.selection.createRange();
					s.setEndPoint("StartToStart", _3a0);
					_39f = s.text.length;
				}
			}
			if (_39f >= 0 && _39f <= 2) {
				opts.highlight = 0;
			} else {
				if (_39f >= 3 && _39f <= 5) {
					opts.highlight = 1;
				} else {
					if (_39f >= 6 && _39f <= 8) {
						opts.highlight = 2;
					}
				}
			}
			_3a2(_39e);
		}).bind("blur.fwb_timespinner",
		function() {
			_3a1(_39e);
		});
	};
	function _3a2(_3a3) {
		var opts = $.data(_3a3, "fwb_timespinner").options;
		var _3a4 = 0,
		end = 0;
		if (opts.highlight == 0) {
			_3a4 = 0;
			end = 2;
		} else {
			if (opts.highlight == 1) {
				_3a4 = 3;
				end = 5;
			} else {
				if (opts.highlight == 2) {
					_3a4 = 6;
					end = 8;
				}
			}
		}
		if (_3a3.selectionStart != null) {
			_3a3.setSelectionRange(_3a4, end);
		} else {
			if (_3a3.createTextRange) {
				var _3a5 = _3a3.createTextRange();
				_3a5.collapse();
				_3a5.moveEnd("character", end);
				_3a5.moveStart("character", _3a4);
				_3a5.select();
			}
		}
		$(_3a3).focus();
	};
	function _3a6(_3a7, _3a8) {
		var opts = $.data(_3a7, "fwb_timespinner").options;
		if (!_3a8) {
			return null;
		}
		var vv = _3a8.split(opts.separator);
		for (var i = 0; i < vv.length; i++) {
			if (isNaN(vv[i])) {
				return null;
			}
		}
		while (vv.length < 3) {
			vv.push(0);
		}
		return new Date(1900, 0, 0, vv[0], vv[1], vv[2]);
	};
	function _3a1(_3a9) {
		var opts = $.data(_3a9, "fwb_timespinner").options;
		var _3aa = $(_3a9).val();
		var time = _3a6(_3a9, _3aa);
		if (!time) {
			time = _3a6(_3a9, opts.value);
		}
		if (!time) {
			opts.value = "";
			$(_3a9).val("");
			return;
		}
		var _3ab = _3a6(_3a9, opts.min);
		var _3ac = _3a6(_3a9, opts.max);
		if (_3ab && _3ab > time) {
			time = _3ab;
		}
		if (_3ac && _3ac < time) {
			time = _3ac;
		}
		var tt = [_3ad(time.getHours()), _3ad(time.getMinutes())];
		if (opts.showSeconds) {
			tt.push(_3ad(time.getSeconds()));
		}
		var val = tt.join(opts.separator);
		opts.value = val;
		$(_3a9).val(val);
		function _3ad(_3ae) {
			return (_3ae < 10 ? "0": "") + _3ae;
		};
	};
	function _3af(_3b0, down) {
		var opts = $.data(_3b0, "fwb_timespinner").options;
		var val = $(_3b0).val();
		if (val == "") {
			val = [0, 0, 0].join(opts.separator);
		}
		var vv = val.split(opts.separator);
		for (var i = 0; i < vv.length; i++) {
			vv[i] = parseInt(vv[i], 10);
		}
		if (down == true) {
			vv[opts.highlight] -= opts.increment;
		} else {
			vv[opts.highlight] += opts.increment;
		}
		$(_3b0).val(vv.join(opts.separator));
		_3a1(_3b0);
		_3a2(_3b0);
	};
	$.fn.fwb_timespinner = function(_3b1, _3b2) {
		if (typeof _3b1 == "string") {
			var _3b3 = $.fn.fwb_timespinner.methods[_3b1];
			if (_3b3) {
				return _3b3(this, _3b2);
			} else {
				return this.fwb_spinner(_3b1, _3b2);
			}
		}
		_3b1 = _3b1 || {};
		return this.each(function() {
			var _3b4 = $.data(this, "fwb_timespinner");
			if (_3b4) {
				$.extend(_3b4.options, _3b1);
			} else {
				$.data(this, "fwb_timespinner", {
					options: $.extend({},
					$.fn.fwb_timespinner.defaults, $.fn.fwb_timespinner.parseOptions(this), _3b1)
				});
				_39d(this);
			}
		});
	};
	$.fn.fwb_timespinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "fwb_timespinner").options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		setValue: function(jq, _3b5) {
			return jq.each(function() {
				$(this).val(_3b5);
				_3a1(this);
			});
		},
		getHours: function(jq) {
			var opts = $.data(jq[0], "fwb_timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[0], 10);
		},
		getMinutes: function(jq) {
			var opts = $.data(jq[0], "fwb_timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[1], 10);
		},
		getSeconds: function(jq) {
			var opts = $.data(jq[0], "fwb_timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[2], 10) || 0;
		}
	};
	$.fn.fwb_timespinner.parseOptions = function(_3b6) {
		var t = $(_3b6);
		return $.extend({},
		$.fn.fwb_spinner.parseOptions(_3b6), {
			separator: t.attr("separator"),
			showSeconds: (t.attr("showSeconds") ? t.attr("showSeconds") == "true": undefined),
			highlight: (parseInt(t.attr("highlight")) || undefined)
		});
	};
	$.fn.fwb_timespinner.defaults = $.extend({},
	$.fn.fwb_spinner.defaults, {
		separator: ":",
		showSeconds: false,
		highlight: 0,
		spin: function(down) {
			_3af(this, down);
		}
	});
})(fn.jQuery);
*/
 (function($) {
	$.extend(Array.prototype, {
		indexOf: function(o) {
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[i] == o) {
					return i;
				}
			}
			return - 1;
		},
		remove: function(o) {
			var _3b7 = this.indexOf(o);
			if (_3b7 != -1) {
				this.splice(_3b7, 1);
			}
			return this;
		},
		removeById: function(_3b8, id) {
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[i][_3b8] == id) {
					this.splice(i, 1);
					return this;
				}
			}
			return this;
		}
	});
	function _3b9(_3ba, _3bb) {
		var opts = $.data(_3ba, "fwb_datagrid").options;
		var _3bc = $.data(_3ba, "fwb_datagrid").fwb_panel;
		if (_3bb) {
			if (_3bb.width) {
				opts.width = _3bb.width;
			}
			if (_3bb.height) {
				opts.height = _3bb.height;
			}
		}
		if (opts.fit == true) {
			var p = _3bc.fwb_panel("fwb_panel").parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		_3bc.fwb_panel("resize", {
			width: opts.width,
			height: opts.height
		});
	};
	function _3bd(_3be) {
		var opts = $.data(_3be, "fwb_datagrid").options;
		var wrap = $.data(_3be, "fwb_datagrid").fwb_panel;
		var _3bf = wrap.width();
		var _3c0 = wrap.height();
		var view = wrap.children("div.fwb_datagrid-view");
		var _3c1 = view.children("div.fwb_datagrid-view1");
		var _3c2 = view.children("div.fwb_datagrid-view2");
		var _3c3 = _3c1.children("div.fwb_datagrid-header");
		var _3c4 = _3c2.children("div.fwb_datagrid-header");
		var _3c5 = _3c3.find("table");
		var _3c6 = _3c4.find("table");
		view.width(_3bf);
		var _3c7 = _3c3.children("div.fwb_datagrid-header-inner").show();
		_3c1.width(_3c7.find("table").width());
		if (!opts.showHeader) {
			_3c7.hide();
		}
		_3c2.width(_3bf - _3c1.outerWidth());
		_3c1.children("div.fwb_datagrid-header,div.fwb_datagrid-body,div.fwb_datagrid-footer").width(_3c1.width());
		_3c2.children("div.fwb_datagrid-header,div.fwb_datagrid-body,div.fwb_datagrid-footer").width(_3c2.width());
		var hh;
		_3c3.css("height", "");
		_3c4.css("height", "");
		_3c5.css("height", "");
		_3c6.css("height", "");
		hh = Math.max(_3c5.height(), _3c6.height());
		_3c5.height(hh);
		_3c6.height(hh);
		if ($.boxModel == true) {
			_3c3.height(hh - (_3c3.outerHeight() - _3c3.height()));
			_3c4.height(hh - (_3c4.outerHeight() - _3c4.height()));
		} else {
			_3c3.height(hh);
			_3c4.height(hh);
		}
		if (opts.height != "auto") {
			var _3c8 = _3c0 - _3c2.children("div.fwb_datagrid-header").outerHeight(true) - _3c2.children("div.fwb_datagrid-footer").outerHeight(true) - wrap.children("div.fwb_datagrid-toolbar").outerHeight(true) - wrap.children("div.fwb_datagrid-pager").outerHeight(true);
			_3c1.children("div.fwb_datagrid-body").height(_3c8);
			_3c2.children("div.fwb_datagrid-body").height(_3c8);
		}
		view.height(_3c2.height());
		_3c2.css("left", _3c1.outerWidth());
	};
	function _3c9(_3ca) {
		var _3cb = $(_3ca).fwb_datagrid("getPanel");
		var mask = _3cb.children("div.fwb_datagrid-mask");
		if (mask.length) {
			mask.css({
				width: _3cb.width(),
				height: _3cb.height()
			});
			var msg = _3cb.children("div.fwb_datagrid-mask-msg");
			msg.css({
				left: (_3cb.width() - msg.outerWidth()) / 2,
				top: (_3cb.height() - msg.outerHeight()) / 2
			});
		}
	};
	function _3cc(_3cd, _3ce) {
		var rows = $.data(_3cd, "fwb_datagrid").data.rows;
		var opts = $.data(_3cd, "fwb_datagrid").options;
		var _3cf = $.data(_3cd, "fwb_datagrid").fwb_panel;
		var view = _3cf.children("div.fwb_datagrid-view");
		var _3d0 = view.children("div.fwb_datagrid-view1");
		var _3d1 = view.children("div.fwb_datagrid-view2");
		if (!_3d0.find("div.fwb_datagrid-body-inner").is(":empty")) {
			if (_3ce >= 0) {
				_3d2(_3ce);
			} else {
				for (var i = 0; i < rows.length; i++) {
					_3d2(i);
				}
				if (opts.showFooter) {
					var _3d3 = $(_3cd).fwb_datagrid("getFooterRows") || [];
					var c1 = _3d0.children("div.fwb_datagrid-footer");
					var c2 = _3d1.children("div.fwb_datagrid-footer");
					for (var i = 0; i < _3d3.length; i++) {
						_3d2(i, c1, c2);
					}
					_3bd(_3cd);
				}
			}
		}
		if (opts.height == "auto") {
			var _3d4 = _3d0.children("div.fwb_datagrid-body");
			var _3d5 = _3d1.children("div.fwb_datagrid-body");
			var _3d6 = 0;
			var _3d7 = 0;
			_3d5.children().each(function() {
				var c = $(this);
				if (c.is(":visible")) {
					_3d6 += c.outerHeight();
					if (_3d7 < c.outerWidth()) {
						_3d7 = c.outerWidth();
					}
				}
			});
			if (_3d7 > _3d5.width()) {
				_3d6 += 18;
			}
			_3d4.height(_3d6);
			_3d5.height(_3d6);
			view.height(_3d1.height());
		}
		_3d1.children("div.fwb_datagrid-body").triggerHandler("scroll");
		function _3d2(_3d8, c1, c2) {
			c1 = c1 || _3d0;
			c2 = c2 || _3d1;
			var tr1 = c1.find("tr[fwb_datagrid-row-index=" + _3d8 + "]");
			var tr2 = c2.find("tr[fwb_datagrid-row-index=" + _3d8 + "]");
			tr1.css("height", "");
			tr2.css("height", "");
			var _3d9 = Math.max(tr1.height(), tr2.height());
			tr1.css("height", _3d9);
			tr2.css("height", _3d9);
		};
	};
	function _3da(_3db, _3dc) {
		function _3dd(_3de) {
			var _3df = [];
			$("tr", _3de).each(function() {
				var cols = [];
				$("th", this).each(function() {
					var th = $(this);
					var col = {
						title: th.html(),
						align: th.attr("align") || "left",
						sortable: th.attr("sortable") == "true" || false,
						checkbox: th.attr("checkbox") == "true" || false
					};
					if (th.attr("field")) {
						col.field = th.attr("field");
					}
					if (th.attr("formatter")) {
						// hap 2012.1 修改：支持formatter="function(){ return 'xxx';}" 形式
						col.formatter = window.fn ? fn.tagFunc(th.attr("formatter")) : eval(th.attr("formatter"));
						//col.formatter = eval(th.attr("formatter"));
					}
					if (th.attr("styler")) {
						col.styler = eval(th.attr("styler"));
					}
					if (th.attr("editor")) {
						var s = $.trim(th.attr("editor"));
						if (s.substr(0, 1) == "{") {
							col.editor = eval("(" + s + ")");
						} else {
							col.editor = s;
						}
					}
					if (th.attr("rowspan")) {
						col.rowspan = parseInt(th.attr("rowspan"));
					}
					if (th.attr("colspan")) {
						col.colspan = parseInt(th.attr("colspan"));
					}
					if (th.attr("width")) {
						col.width = parseInt(th.attr("width"));
					}
					if (th.attr("hidden")) {
						col.hidden = true;
					}
					if (th.attr("resizable")) {
						col.resizable = th.attr("resizable") == "true";
					}
					cols.push(col);
				});
				_3df.push(cols);
			});
			return _3df;
		};
		var _3e0 = $("<div class=\"fwb_datagrid-wrap\">" + "<div class=\"fwb_datagrid-view\">" + "<div class=\"fwb_datagrid-view1\">" + "<div class=\"fwb_datagrid-header\">" + "<div class=\"fwb_datagrid-header-inner\"></div>" + "</div>" + "<div class=\"fwb_datagrid-body\">" + "<div class=\"fwb_datagrid-body-inner\"></div>" + "</div>" + "<div class=\"fwb_datagrid-footer\">" + "<div class=\"fwb_datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"fwb_datagrid-view2\">" + "<div class=\"fwb_datagrid-header\">" + "<div class=\"fwb_datagrid-header-inner\"></div>" + "</div>" + "<div class=\"fwb_datagrid-body\"></div>" + "<div class=\"fwb_datagrid-footer\">" + "<div class=\"fwb_datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"fwb_datagrid-resize-proxy\"></div>" + "</div>" + "</div>").insertAfter(_3db);
		_3e0.fwb_panel({
			doSize: false
		});
		_3e0.fwb_panel("fwb_panel").addClass("fwb_datagrid").bind("_resize",
		function(e, _3e1) {
			var opts = $.data(_3db, "fwb_datagrid").options;
			if (opts.fit == true || _3e1) {
				_3b9(_3db);
				setTimeout(function() {
					if ($.data(_3db, "fwb_datagrid")) {
						_3e2(_3db);
					}
				},
				0);
			}
			return false;
		});
		$(_3db).hide().appendTo(_3e0.children("div.fwb_datagrid-view"));
		var _3e3 = _3dd($("thead[frozen=true]", _3db));
		var _3e4 = _3dd($("thead[frozen!=true]", _3db));
		return {
			fwb_panel: _3e0,
			frozenColumns: _3e3,
			columns: _3e4
		};
	};
	function _3e5(_3e6) {
		var data = {
			total: 0,
			rows: []
		};
		var _3e7 = _3e8(_3e6, true).concat(_3e8(_3e6, false));
		$(_3e6).find("tbody tr").each(function() {
			data.total++;
			var col = {};
			for (var i = 0; i < _3e7.length; i++) {
				col[_3e7[i]] = $("td:eq(" + i + ")", this).html();
			}
			data.rows.push(col);
		});
		return data;
	};
	function _3e9(_3ea) {
		var opts = $.data(_3ea, "fwb_datagrid").options;
		var _3eb = $.data(_3ea, "fwb_datagrid").fwb_panel;
		_3eb.fwb_panel($.extend({},
		opts, {
			doSize: false,
			onResize: function(_3ec, _3ed) {
				_3c9(_3ea);
				setTimeout(function() {
					if ($.data(_3ea, "fwb_datagrid")) {
						_3bd(_3ea);
						_418(_3ea);
						opts.onResize.call(_3eb, _3ec, _3ed);
					}
				},
				0);
			},
			onExpand: function() {
				_3bd(_3ea);
				_3cc(_3ea);
				opts.onExpand.call(_3eb);
			}
		}));
		var view = _3eb.children("div.fwb_datagrid-view");
		var _3ee = view.children("div.fwb_datagrid-view1");
		var _3ef = view.children("div.fwb_datagrid-view2");
		var _3f0 = _3ee.children("div.fwb_datagrid-header").children("div.fwb_datagrid-header-inner");
		var _3f1 = _3ef.children("div.fwb_datagrid-header").children("div.fwb_datagrid-header-inner");
		_3f2(_3f0, opts.frozenColumns, true);
		_3f2(_3f1, opts.columns, false);
		_3f0.css("display", opts.showHeader ? "block": "none");
		_3f1.css("display", opts.showHeader ? "block": "none");
		_3ee.find("div.fwb_datagrid-footer-inner").css("display", opts.showFooter ? "block": "none");
		_3ef.find("div.fwb_datagrid-footer-inner").css("display", opts.showFooter ? "block": "none");
		if (opts.toolbar) {
			if (typeof opts.toolbar == "string") {
				$(opts.toolbar).addClass("fwb_datagrid-toolbar").prependTo(_3eb);
				$(opts.toolbar).show();
			} else {
				$("div.fwb_datagrid-toolbar", _3eb).remove();
				var tb = $("<div class=\"fwb_datagrid-toolbar\"></div>").prependTo(_3eb);
				for (var i = 0; i < opts.toolbar.length; i++) {
					var btn = opts.toolbar[i];
					if (btn == "-") {
						$("<div class=\"fwb_datagrid-btn-separator\"></div>").appendTo(tb);
					} else {
						var tool = $("<a href=\"javascript:void(0)\"></a>");
						tool[0].onclick = eval(btn.handler ||
						function() {
							});
						tool.css("float", "left").appendTo(tb).fwb_linkbutton($.extend({},
						btn, {
							plain: true
						}));
					}
				}
			}
		} else {
			$("div.fwb_datagrid-toolbar", _3eb).remove();
		}
		$("div.fwb_datagrid-pager", _3eb).remove();
		if (opts.pagination) {
			var _3f3 = $("<div class=\"fwb_datagrid-pager\"></div>").appendTo(_3eb);
			_3f3.fwb_pagination({
				pageNumber: opts.pageNumber,
				pageSize: opts.pageSize,
				pageList: opts.pageList,
				onSelectPage: function(_3f4, _3f5) {
					opts.pageNumber = _3f4;
					opts.pageSize = _3f5;
					_4ae(_3ea);
				}
			});
			opts.pageSize = _3f3.fwb_pagination("options").pageSize;
		}
		function _3f2(_3f6, _3f7, _3f8) {
			if (!_3f7) {
				return;
			}
			$(_3f6).show();
			$(_3f6).empty();
			var t = $("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_3f6);
			for (var i = 0; i < _3f7.length; i++) {
				var tr = $("<tr></tr>").appendTo($("tbody", t));
				var cols = _3f7[i];
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					var attr = "";
					if (col.rowspan) {
						attr += "rowspan=\"" + col.rowspan + "\" ";
					}
					if (col.colspan) {
						attr += "colspan=\"" + col.colspan + "\" ";
					}
					var td = $("<td " + attr + "></td>").appendTo(tr);
					if (col.checkbox) {
						td.attr("field", col.field);
						$("<div class=\"fwb_datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
					} else {
						if (col.field) {
							td.attr("field", col.field);
							td.append("<div class=\"fwb_datagrid-cell\"><span></span><span class=\"fwb_datagrid-sort-icon\"></span></div>");
							$("span", td).html(col.title);
							$("span.fwb_datagrid-sort-icon", td).html("&nbsp;");
							var cell = td.find("div.fwb_datagrid-cell");
							if (col.resizable == false) {
								cell.attr("resizable", "false");
							}
							col.boxWidth = $.boxModel ? (col.width - (cell.outerWidth() - cell.width())) : col.width;
							cell.width(col.boxWidth);
							cell.css("text-align", (col.align || "left"));
						} else {
							$("<div class=\"fwb_datagrid-cell-group\"></div>").html(col.title).appendTo(td);
						}
					}
					if (col.hidden) {
						td.hide();
					}
				}
			}
			if (_3f8 && opts.rownumbers) {
				var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"fwb_datagrid-header-rownumber\"></div></td>");
				if ($("tr", t).length == 0) {
					td.wrap("<tr></tr>").parent().appendTo($("tbody", t));
				} else {
					td.prependTo($("tr:first", t));
				}
			}
		};
	};
	function _3f9(_3fa) {
		var _3fb = $.data(_3fa, "fwb_datagrid").fwb_panel;
		var opts = $.data(_3fa, "fwb_datagrid").options;
		var data = $.data(_3fa, "fwb_datagrid").data;
		var body = _3fb.find("div.fwb_datagrid-body");
		body.find("tr[fwb_datagrid-row-index]").unbind(".fwb_datagrid").bind("mouseenter.fwb_datagrid",
		function() {
			var _3fc = $(this).attr("fwb_datagrid-row-index");
			body.find("tr[fwb_datagrid-row-index=" + _3fc + "]").addClass("fwb_datagrid-row-over");
		}).bind("mouseleave.fwb_datagrid",
		function() {
			var _3fd = $(this).attr("fwb_datagrid-row-index");
			body.find("tr[fwb_datagrid-row-index=" + _3fd + "]").removeClass("fwb_datagrid-row-over");
		}).bind("click.fwb_datagrid",
		function() {
			var _3fe = $(this).attr("fwb_datagrid-row-index");
			if (opts.singleSelect == true) {
				_408(_3fa);
				_409(_3fa, _3fe);
			} else {
				if ($(this).hasClass("fwb_datagrid-row-selected")) {
					_40a(_3fa, _3fe);
				} else {
					_409(_3fa, _3fe);
				}
			}
			if (opts.onClickRow) {
				opts.onClickRow.call(_3fa, _3fe, data.rows[_3fe]);
			}
		}).bind("dblclick.fwb_datagrid",
		function() {
			var _3ff = $(this).attr("fwb_datagrid-row-index");
			if (opts.onDblClickRow) {
				opts.onDblClickRow.call(_3fa, _3ff, data.rows[_3ff]);
			}
		}).bind("contextfwb_menu.fwb_datagrid",
		function(e) {
			var _400 = $(this).attr("fwb_datagrid-row-index");
			if (opts.onRowContextMenu) {
				opts.onRowContextMenu.call(_3fa, e, _400, data.rows[_400]);
			}
		});
		body.find("td[field]").unbind(".fwb_datagrid").bind("click.fwb_datagrid",
		function() {
			var _401 = $(this).parent().attr("fwb_datagrid-row-index");
			var _402 = $(this).attr("field");
			var _403 = data.rows[_401][_402];
			opts.onClickCell.call(_3fa, _401, _402, _403);
		}).bind("dblclick.fwb_datagrid",
		function() {
			var _404 = $(this).parent().attr("fwb_datagrid-row-index");
			var _405 = $(this).attr("field");
			var _406 = data.rows[_404][_405];
			opts.onDblClickCell.call(_3fa, _404, _405, _406);
		});
		body.find("div.fwb_datagrid-cell-check input[type=checkbox]").unbind(".fwb_datagrid").bind("click.fwb_datagrid",
		function(e) {
			var _407 = $(this).parent().parent().parent().attr("fwb_datagrid-row-index");
			if (opts.singleSelect) {
				_408(_3fa);
				_409(_3fa, _407);
			} else {
				if ($(this).is(":checked")) {
					_409(_3fa, _407);
				} else {
					_40a(_3fa, _407);
				}
			}
			e.stopPropagation();
		});
	};
	function _40b(_40c) {
		var _40d = $.data(_40c, "fwb_datagrid").fwb_panel;
		var opts = $.data(_40c, "fwb_datagrid").options;
		var _40e = _40d.find("div.fwb_datagrid-header");
		_40e.find("td:has(div.fwb_datagrid-cell)").unbind(".fwb_datagrid").bind("mouseenter.fwb_datagrid",
		function() {
			$(this).addClass("fwb_datagrid-header-over");
		}).bind("mouseleave.fwb_datagrid",
		function() {
			$(this).removeClass("fwb_datagrid-header-over");
		}).bind("contextfwb_menu.fwb_datagrid",
		function(e) {
			var _40f = $(this).attr("field");
			opts.onHeaderContextMenu.call(_40c, e, _40f);
		});
		_40e.find("div.fwb_datagrid-cell").unbind(".fwb_datagrid").bind("click.fwb_datagrid",
		function() {
			var _410 = $(this).parent().attr("field");
			var opt = _416(_40c, _410);
			if (!opt.sortable) {
				return;
			}
			opts.sortName = _410;
			opts.sortOrder = "asc";
			var c = "fwb_datagrid-sort-asc";
			if ($(this).hasClass("fwb_datagrid-sort-asc")) {
				c = "fwb_datagrid-sort-desc";
				opts.sortOrder = "desc";
			}
			_40e.find("div.fwb_datagrid-cell").removeClass("fwb_datagrid-sort-asc fwb_datagrid-sort-desc");
			$(this).addClass(c);
			if (opts.remoteSort) {
				_4ae(_40c);
			} else {
				var data = $.data(_40c, "fwb_datagrid").data;
				_43d(_40c, data);
			}
			if (opts.onSortColumn) {
				opts.onSortColumn.call(_40c, opts.sortName, opts.sortOrder);
			}
		});
		_40e.find("input[type=checkbox]").unbind(".fwb_datagrid").bind("click.fwb_datagrid",
		function() {
			if (opts.singleSelect) {
				return false;
			}
			if ($(this).is(":checked")) {
				_44e(_40c);
			} else {
				_44c(_40c);
			}
		});
		var view = _40d.children("div.fwb_datagrid-view");
		var _411 = view.children("div.fwb_datagrid-view1");
		var _412 = view.children("div.fwb_datagrid-view2");
		_412.children("div.fwb_datagrid-body").unbind(".fwb_datagrid").bind("scroll.fwb_datagrid",
		function() {
			_411.children("div.fwb_datagrid-body").scrollTop($(this).scrollTop());
			_412.children("div.fwb_datagrid-header").scrollLeft($(this).scrollLeft());
			_412.children("div.fwb_datagrid-footer").scrollLeft($(this).scrollLeft());
		});
		_40e.find("div.fwb_datagrid-cell").each(function() {
			$(this).fwb_resizable({
				handles: "e",
				disabled: ($(this).attr("resizable") ? $(this).attr("resizable") == "false": false),
				minWidth: 25,
				onStartResize: function(e) {
					view.children("div.fwb_datagrid-resize-proxy").css({
						left: e.pageX - $(_40d).offset().left - 1,
						display: "block"
					});
				},
				onResize: function(e) {
					view.children("div.fwb_datagrid-resize-proxy").css({
						display: "block",
						left: e.pageX - $(_40d).offset().left - 1
					});
					return false;
				},
				onStopResize: function(e) {
					var _413 = $(this).parent().attr("field");
					var col = _416(_40c, _413);
					col.width = $(this).outerWidth();
					col.boxWidth = $.boxModel == true ? $(this).width() : $(this).outerWidth();
					_3e2(_40c, _413);
					_418(_40c);
					var _414 = _40d.find("div.fwb_datagrid-view2");
					_414.find("div.fwb_datagrid-header").scrollLeft(_414.find("div.fwb_datagrid-body").scrollLeft());
					view.children("div.fwb_datagrid-resize-proxy").css("display", "none");
					opts.onResizeColumn.call(_40c, _413, col.width);
				}
			});
		});
		_411.children("div.fwb_datagrid-header").find("div.fwb_datagrid-cell").fwb_resizable({
			onStopResize: function(e) {
				var _415 = $(this).parent().attr("field");
				var col = _416(_40c, _415);
				col.width = $(this).outerWidth();
				col.boxWidth = $.boxModel == true ? $(this).width() : $(this).outerWidth();
				_3e2(_40c, _415);
				var _417 = _40d.find("div.fwb_datagrid-view2");
				_417.find("div.fwb_datagrid-header").scrollLeft(_417.find("div.fwb_datagrid-body").scrollLeft());
				view.children("div.fwb_datagrid-resize-proxy").css("display", "none");
				_3bd(_40c);
				_418(_40c);
				opts.onResizeColumn.call(_40c, _415, col.width);
			}
		});
	};
	function _418(_419) {
		var opts = $.data(_419, "fwb_datagrid").options;
		if (!opts.fitColumns) {
			return;
		}
		var _41a = $.data(_419, "fwb_datagrid").fwb_panel;
		var _41b = _41a.find("div.fwb_datagrid-view2 div.fwb_datagrid-header");
		var _41c = 0;
		var _41d;
		var _41e = _3e8(_419, false);
		for (var i = 0; i < _41e.length; i++) {
			var col = _416(_419, _41e[i]);
			if (!col.hidden && !col.checkbox) {
				_41c += col.width;
				_41d = col;
			}
		}
		var _41f = _41b.children("div.fwb_datagrid-header-inner").show();
		var _420 = _41b.width() - _41b.find("table").width()- opts.scrollbarSize;
		var rate = _420 / _41c;
		if (!opts.showHeader) {
			_41f.hide();
		}
		for (var i = 0; i < _41e.length; i++) {
			var col = _416(_419, _41e[i]);
			if (!col.hidden && !col.checkbox) {
				var _421 = Math.floor(col.width * rate);
				_422(col, _421);
				_420 -= _421;
			}
		}
		_3e2(_419);
		if (_420) {
			_422(_41d, _420);
			_3e2(_419, _41d.field);
		}
		function _422(col, _423) {
			col.width += _423;
			col.boxWidth += _423;
			_41b.find("td[field=" + col.field + "] div.fwb_datagrid-cell").width(col.boxWidth);
		};
	};
	function _3e2(_424, _425) {
		var _426 = $.data(_424, "fwb_datagrid").fwb_panel;
		var bf = _426.find("div.fwb_datagrid-body,div.fwb_datagrid-footer");
		if (_425) {
			fix(_425);
		} else {
			_426.find("div.fwb_datagrid-header td[field]").each(function() {
				fix($(this).attr("field"));
			});
		}
		_429(_424);
		setTimeout(function() {
			_3cc(_424);
			_431(_424);
		},
		0);
		function fix(_427) {
			var col = _416(_424, _427);
			bf.find("td[field=" + _427 + "]").each(function() {
				var td = $(this);
				var _428 = td.attr("colspan") || 1;
				if (_428 == 1) {
					td.find("div.fwb_datagrid-cell").width(col.boxWidth);
					td.find("div.fwb_datagrid-editable").width(col.width);
				}
			});
		};
	};
	function _429(_42a) {
		var _42b = $.data(_42a, "fwb_datagrid").fwb_panel;
		var _42c = _42b.find("div.fwb_datagrid-header");
		_42b.find("div.fwb_datagrid-body td.fwb_datagrid-td-merged").each(function() {
			var td = $(this);
			var _42d = td.attr("colspan") || 1;
			var _42e = td.attr("field");
			var _42f = _42c.find("td[field=" + _42e + "]");
			var _430 = _42f.width();

			for (var i = 1; i < _42d; i++) {
				_42f = _42f.next();
				_430 += _42f.outerWidth();
			}
			var cell = td.children("div.fwb_datagrid-cell");
			if ($.boxModel == true) {
				cell.width(_430 - (cell.outerWidth() - cell.width()));
			} else {
				cell.width(_430);
			}
		});
	};
	function _431(_432) {
		var _433 = $.data(_432, "fwb_datagrid").fwb_panel;
		_433.find("div.fwb_datagrid-editable").each(function() {
			var ed = $.data(this, "fwb_datagrid.editor");
			if (ed.actions.resize) {
				ed.actions.resize(ed.target, $(this).width());
			}
		});
	};
	function _416(_434, _435) {
		var opts = $.data(_434, "fwb_datagrid").options;
		if (opts.columns) {
			for (var i = 0; i < opts.columns.length; i++) {
				var cols = opts.columns[i];
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					if (col.field == _435) {
						return col;
					}
				}
			}
		}
		if (opts.frozenColumns) {
			for (var i = 0; i < opts.frozenColumns.length; i++) {
				var cols = opts.frozenColumns[i];
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					if (col.field == _435) {
						return col;
					}
				}
			}
		}
		return null;
	};
	function _3e8(_436, _437) {
		var opts = $.data(_436, "fwb_datagrid").options;
		var _438 = (_437 == true) ? (opts.frozenColumns || [[]]) : opts.columns;
		if (_438.length == 0) {
			return [];
		}
		var _439 = [];
		function _43a(_43b) {
			var c = 0;
			var i = 0;
			while (true) {
				if (_439[i] == undefined) {
					if (c == _43b) {
						return i;
					}
					c++;
				}
				i++;
			}
		};
		function _43c(r) {
			var ff = [];
			var c = 0;
			for (var i = 0; i < _438[r].length; i++) {
				var col = _438[r][i];
				if (col.field) {
					ff.push([c, col.field]);
				}
				c += parseInt(col.colspan || "1");
			}
			for (var i = 0; i < ff.length; i++) {
				ff[i][0] = _43a(ff[i][0]);
			}
			for (var i = 0; i < ff.length; i++) {
				var f = ff[i];
				_439[f[0]] = f[1];
			}
		};
		for (var i = 0; i < _438.length; i++) {
			_43c(i);
		}
		return _439;
	};
	function _43d(_43e, data) {
		var opts = $.data(_43e, "fwb_datagrid").options;
		var wrap = $.data(_43e, "fwb_datagrid").fwb_panel;
		var _43f = $.data(_43e, "fwb_datagrid").selectedRows;
		data = opts.loadFilter.call(_43e, data);
		var rows = data.rows;
		$.data(_43e, "fwb_datagrid").data = data;
		if (data.footer) {
			$.data(_43e, "fwb_datagrid").footer = data.footer;
		}
		if (!opts.remoteSort) {
			var opt = _416(_43e, opts.sortName);
			if (opt) {
				var _440 = opt.sorter ||
				function(a, b) {
					return (a > b ? 1: -1);
				};
				data.rows.sort(function(r1, r2) {
					return _440(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1: -1);
				});
			}
		}
		var view = wrap.children("div.fwb_datagrid-view");
		var _441 = view.children("div.fwb_datagrid-view1");
		var _442 = view.children("div.fwb_datagrid-view2");
		if (opts.view.onBeforeRender) {
			opts.view.onBeforeRender.call(opts.view, _43e, rows);
		}
		opts.view.render.call(opts.view, _43e, _442.children("div.fwb_datagrid-body"), false);
		opts.view.render.call(opts.view, _43e, _441.children("div.fwb_datagrid-body").children("div.fwb_datagrid-body-inner"), true);
		if (opts.showFooter) {
			opts.view.renderFooter.call(opts.view, _43e, _442.find("div.fwb_datagrid-footer-inner"), false);
			opts.view.renderFooter.call(opts.view, _43e, _441.find("div.fwb_datagrid-footer-inner"), true);
		}
		if (opts.view.onAfterRender) {
			opts.view.onAfterRender.call(opts.view, _43e);
		}
		opts.onLoadSuccess.call(_43e, data);
		var _443 = wrap.children("div.fwb_datagrid-pager");
		if (_443.length) {
			if (_443.fwb_pagination("options").total != data.total) {
				_443.fwb_pagination({
					total: data.total
				});
			}
		}
		_3cc(_43e);
		_3f9(_43e);
		_442.children("div.fwb_datagrid-body").triggerHandler("scroll");
		if (opts.idField) {
			for (var i = 0; i < rows.length; i++) {
				if (_444(rows[i])) {
					_460(_43e, rows[i][opts.idField]);
				}
			}
		}
		function _444(row) {
			for (var i = 0; i < _43f.length; i++) {
				if (_43f[i][opts.idField] == row[opts.idField]) {
					_43f[i] = row;
					return true;
				}
			}
			return false;
		};
	};
	function _445(_446, row) {
		var opts = $.data(_446, "fwb_datagrid").options;
		var rows = $.data(_446, "fwb_datagrid").data.rows;
		if (typeof row == "object") {
			return rows.indexOf(row);
		} else {
			for (var i = 0; i < rows.length; i++) {
				if (rows[i][opts.idField] == row) {
					return i;
				}
			}
			return - 1;
		}
	};
	function _447(_448) {
		var opts = $.data(_448, "fwb_datagrid").options;
		var _449 = $.data(_448, "fwb_datagrid").fwb_panel;
		var data = $.data(_448, "fwb_datagrid").data;
		if (opts.idField) {
			return $.data(_448, "fwb_datagrid").selectedRows;
		} else {
			var rows = [];
			$("div.fwb_datagrid-view2 div.fwb_datagrid-body tr.fwb_datagrid-row-selected", _449).each(function() {
				var _44a = parseInt($(this).attr("fwb_datagrid-row-index"));
				rows.push(data.rows[_44a]);
			});
			return rows;
		}
	};
	function _408(_44b) {
		_44c(_44b);
		var _44d = $.data(_44b, "fwb_datagrid").selectedRows;
		_44d.splice(0, _44d.length);
	};
	function _44e(_44f) {
		var opts = $.data(_44f, "fwb_datagrid").options;
		var _450 = $.data(_44f, "fwb_datagrid").fwb_panel;
		var data = $.data(_44f, "fwb_datagrid").data;
		var _451 = $.data(_44f, "fwb_datagrid").selectedRows;
		var rows = data.rows;
		var body = _450.find("div.fwb_datagrid-body");
		body.find("tr").addClass("fwb_datagrid-row-selected");
		var _452 = body.find("div.fwb_datagrid-cell-check input[type=checkbox]");
		$.fn.prop ? _452.prop("checked", true) : _452.attr("checked", true);
		for (var _453 = 0; _453 < rows.length; _453++) {
			if (opts.idField) {
				 (function() {
					var row = rows[_453];
					for (var i = 0; i < _451.length; i++) {
						if (_451[i][opts.idField] == row[opts.idField]) {
							return;
						}
					}
					_451.push(row);
				})();
			}
		}
		opts.onSelectAll.call(_44f, rows);
	};
	function _44c(_454) {
		var opts = $.data(_454, "fwb_datagrid").options;
		var _455 = $.data(_454, "fwb_datagrid").fwb_panel;
		var data = $.data(_454, "fwb_datagrid").data;
		var _456 = $.data(_454, "fwb_datagrid").selectedRows;
		var _457 = _455.find("div.fwb_datagrid-body div.fwb_datagrid-cell-check input[type=checkbox]");
		$.fn.prop ? _457.prop("checked", false) : _457.attr("checked", false);
		$("div.fwb_datagrid-body tr.fwb_datagrid-row-selected", _455).removeClass("fwb_datagrid-row-selected");
		if (opts.idField) {
			for (var _458 = 0; _458 < data.rows.length; _458++) {
				_456.removeById(opts.idField, data.rows[_458][opts.idField]);
			}
		}
		opts.onUnselectAll.call(_454, data.rows);
	};
	function _409(_459, _45a) {
		var _45b = $.data(_459, "fwb_datagrid").fwb_panel;
		var opts = $.data(_459, "fwb_datagrid").options;
		var data = $.data(_459, "fwb_datagrid").data;
		var _45c = $.data(_459, "fwb_datagrid").selectedRows;
		if (_45a < 0 || _45a >= data.rows.length) {
			return;
		}
		if (opts.singleSelect == true) {
			_408(_459);
		}
		var tr = $("div.fwb_datagrid-body tr[fwb_datagrid-row-index=" + _45a + "]", _45b);
		if (!tr.hasClass("fwb_datagrid-row-selected")) {
			tr.addClass("fwb_datagrid-row-selected");
			var ck = $("div.fwb_datagrid-cell-check input[type=checkbox]", tr);
			$.fn.prop ? ck.prop("checked", true) : ck.attr("checked", true);
			if (opts.idField) {
				var row = data.rows[_45a];
				 (function() {
					for (var i = 0; i < _45c.length; i++) {
						if (_45c[i][opts.idField] == row[opts.idField]) {
							return;
						}
					}
					_45c.push(row);
				})();
			}
		}
		opts.onSelect.call(_459, _45a, data.rows[_45a]);
		var _45d = _45b.find("div.fwb_datagrid-view2");
		var _45e = _45d.find("div.fwb_datagrid-header").outerHeight();
		var _45f = _45d.find("div.fwb_datagrid-body");
		var top = tr.position().top - _45e;
		if (top <= 0) {
			_45f.scrollTop(_45f.scrollTop() + top);
		} else {
			if (top + tr.outerHeight() > _45f.height() - 18) {
				_45f.scrollTop(_45f.scrollTop() + top + tr.outerHeight() - _45f.height() + 18);
			}
		}
	};
	function _460(_461, _462) {
		var opts = $.data(_461, "fwb_datagrid").options;
		var data = $.data(_461, "fwb_datagrid").data;
		if (opts.idField) {
			var _463 = -1;
			for (var i = 0; i < data.rows.length; i++) {
				if (data.rows[i][opts.idField] == _462) {
					_463 = i;
					break;
				}
			}
			if (_463 >= 0) {
				_409(_461, _463);
			}
		}
	};
	function _40a(_464, _465) {
		var opts = $.data(_464, "fwb_datagrid").options;
		var _466 = $.data(_464, "fwb_datagrid").fwb_panel;
		var data = $.data(_464, "fwb_datagrid").data;
		var _467 = $.data(_464, "fwb_datagrid").selectedRows;
		if (_465 < 0 || _465 >= data.rows.length) {
			return;
		}
		var body = _466.find("div.fwb_datagrid-body");
		var tr = $("tr[fwb_datagrid-row-index=" + _465 + "]", body);
		var ck = $("tr[fwb_datagrid-row-index=" + _465 + "] div.fwb_datagrid-cell-check input[type=checkbox]", body);
		tr.removeClass("fwb_datagrid-row-selected");
		$.fn.prop ? ck.prop("checked", false) : ck.attr("checked", false);
		var row = data.rows[_465];
		if (opts.idField) {
			_467.removeById(opts.idField, row[opts.idField]);
		}
		opts.onUnselect.call(_464, _465, row);
	};
	function _468(_469, _46a) {
		var opts = $.data(_469, "fwb_datagrid").options;
		var tr = opts.editConfig.getTr(_469, _46a);
		var row = opts.editConfig.getRow(_469, _46a);
		if (tr.hasClass("fwb_datagrid-row-editing")) {
			return;
		}
		if (opts.onBeforeEdit.call(_469, _46a, row) == false) {
			return;
		}
		tr.addClass("fwb_datagrid-row-editing");
		_46b(_469, _46a);
		_431(_469);
		tr.find("div.fwb_datagrid-editable").each(function() {
			var _46c = $(this).parent().attr("field");
			var ed = $.data(this, "fwb_datagrid.editor");
			
			// 2012.02.06 修改，支持field="customer.name"格式
			ed.actions.setValue(ed.target, /*row[_46c]*/ findObject(row, _46c));
			//ed.actions.setValue(ed.target, row[_46c]);
			
		});
		_46d(_469, _46a);
	};
	function _46e(_46f, _470, _471) {
		var opts = $.data(_46f, "fwb_datagrid").options;
		var _472 = $.data(_46f, "fwb_datagrid").updatedRows;
		var _473 = $.data(_46f, "fwb_datagrid").insertedRows;
		var tr = opts.editConfig.getTr(_46f, _470);
		var row = opts.editConfig.getRow(_46f, _470);
		if (!tr.hasClass("fwb_datagrid-row-editing")) {
			return;
		}
		if (!_471) {
			if (!_46d(_46f, _470)) {
				return;
			}
			var _474 = false;
			var _475 = {};
			tr.find("div.fwb_datagrid-editable").each(function() {
				var _476 = $(this).parent().attr("field");
				var ed = $.data(this, "fwb_datagrid.editor");
				var _477 = ed.actions.getValue(ed.target);
				if (row[_476] != _477) {
					row[_476] = _477;
					_474 = true;
					_475[_476] = _477;
				}
			});
			if (_474) {
				if (_473.indexOf(row) == -1) {
					if (_472.indexOf(row) == -1) {
						_472.push(row);
					}
				}
			}
		}
		tr.removeClass("fwb_datagrid-row-editing");
		_478(_46f, _470);
		$(_46f).fwb_datagrid("refreshRow", _470);
		if (!_471) {
			opts.onAfterEdit.call(_46f, _470, row, _475);
		} else {
			opts.onCancelEdit.call(_46f, _470, row);
		}
	};
	function _479(_47a, _47b) {
		var opts = $.data(_47a, "fwb_datagrid").options;
		var tr = opts.editConfig.getTr(_47a, _47b);
		var _47c = [];
		tr.children("td").each(function() {
			var cell = $(this).find("div.fwb_datagrid-editable");
			if (cell.length) {
				var ed = $.data(cell[0], "fwb_datagrid.editor");
				_47c.push(ed);
			}
		});
		return _47c;
	};
	function _47d(_47e, _47f) {
		var _480 = _479(_47e, _47f.index);
		for (var i = 0; i < _480.length; i++) {
			if (_480[i].field == _47f.field) {
				return _480[i];
			}
		}
		return null;
	};
	function _46b(_481, _482) {
		var opts = $.data(_481, "fwb_datagrid").options;
		var tr = opts.editConfig.getTr(_481, _482);
		tr.children("td").each(function() {
			var cell = $(this).find("div.fwb_datagrid-cell");
			var _483 = $(this).attr("field");
			var col = _416(_481, _483);
			if (col && col.editor) {
				var _484,
				_485;
				if (typeof col.editor == "string") {
					_484 = col.editor;
				} else {
					_484 = col.editor.type;
					_485 = col.editor.options;
				}
				var _486 = opts.editors[_484];
				if (_486) {
					var _487 = cell.html();
					var _488 = cell.outerWidth();
					cell.addClass("fwb_datagrid-editable");
					if ($.boxModel == true) {
						cell.width(_488 - (cell.outerWidth() - cell.width()));
					}
					cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
					cell.children("table").attr("align", col.align);
					cell.children("table").bind("click dblclick contextfwb_menu",
					function(e) {
						e.stopPropagation();
					});
					$.data(cell[0], "fwb_datagrid.editor", {
						actions: _486,
						target: _486.init(cell.find("td"), _485),
						field: _483,
						type: _484,
						oldHtml: _487
					});
				}
			}
		});
		_3cc(_481, _482);
	};
	function _478(_489, _48a) {
		var opts = $.data(_489, "fwb_datagrid").options;
		var tr = opts.editConfig.getTr(_489, _48a);
		tr.children("td").each(function() {
			var cell = $(this).find("div.fwb_datagrid-editable");
			if (cell.length) {
				var ed = $.data(cell[0], "fwb_datagrid.editor");
				if (ed.actions.destroy) {
					ed.actions.destroy(ed.target);
				}
				cell.html(ed.oldHtml);
				$.removeData(cell[0], "fwb_datagrid.editor");
				var _48b = cell.outerWidth();
				cell.removeClass("fwb_datagrid-editable");
				if ($.boxModel == true) {
					cell.width(_48b - (cell.outerWidth() - cell.width()));
				}
			}
		});
	};
	function _46d(_48c, _48d) {
		var tr = $.data(_48c, "fwb_datagrid").options.editConfig.getTr(_48c, _48d);
		if (!tr.hasClass("fwb_datagrid-row-editing")) {
			return true;
		}
		var vbox = tr.find(".fwb_validatebox-text");
		vbox.fwb_validatebox("validate");
		vbox.trigger("mouseleave");
		var _48e = tr.find(".fwb_validatebox-invalid");
		return _48e.length == 0;
	};
	function _48f(_490, _491) {
		var _492 = $.data(_490, "fwb_datagrid").insertedRows;
		var _493 = $.data(_490, "fwb_datagrid").deletedRows;
		var _494 = $.data(_490, "fwb_datagrid").updatedRows;
		if (!_491) {
			var rows = [];
			rows = rows.concat(_492);
			rows = rows.concat(_493);
			rows = rows.concat(_494);
			return rows;
		} else {
			if (_491 == "inserted") {
				return _492;
			} else {
				if (_491 == "deleted") {
					return _493;
				} else {
					if (_491 == "updated") {
						return _494;
					}
				}
			}
		}
		return [];
	};
	function _495(_496, _497) {
		var opts = $.data(_496, "fwb_datagrid").options;
		var data = $.data(_496, "fwb_datagrid").data;
		var _498 = $.data(_496, "fwb_datagrid").insertedRows;
		var _499 = $.data(_496, "fwb_datagrid").deletedRows;
		var _49a = $.data(_496, "fwb_datagrid").selectedRows;
		$(_496).fwb_datagrid("cancelEdit", _497);
		var row = data.rows[_497];
		if (_498.indexOf(row) >= 0) {
			_498.remove(row);
		} else {
			_499.push(row);
		}
		_49a.removeById(opts.idField, data.rows[_497][opts.idField]);
		opts.view.deleteRow.call(opts.view, _496, _497);
		if (opts.height == "auto") {
			_3cc(_496);
		}
	};
	function _49b(_49c, _49d) {
		var view = $.data(_49c, "fwb_datagrid").options.view;
		var _49e = $.data(_49c, "fwb_datagrid").insertedRows;
		view.insertRow.call(view, _49c, _49d.index, _49d.row);
		_3f9(_49c);
		_49e.push(_49d.row);
	};
	function _49f(_4a0, row) {
		var view = $.data(_4a0, "fwb_datagrid").options.view;
		var _4a1 = $.data(_4a0, "fwb_datagrid").insertedRows;
		view.insertRow.call(view, _4a0, null, row);
		_3f9(_4a0);
		_4a1.push(row);
	};
	function _4a2(_4a3) {
		var data = $.data(_4a3, "fwb_datagrid").data;
		var rows = data.rows;
		var _4a4 = [];
		for (var i = 0; i < rows.length; i++) {
			_4a4.push($.extend({},
			rows[i]));
		}
		$.data(_4a3, "fwb_datagrid").originalRows = _4a4;
		$.data(_4a3, "fwb_datagrid").updatedRows = [];
		$.data(_4a3, "fwb_datagrid").insertedRows = [];
		$.data(_4a3, "fwb_datagrid").deletedRows = [];
	};
	function _4a5(_4a6) {
		var data = $.data(_4a6, "fwb_datagrid").data;
		var ok = true;
		for (var i = 0, len = data.rows.length; i < len; i++) {
			if (_46d(_4a6, i)) {
				_46e(_4a6, i, false);
			} else {
				ok = false;
			}
		}
		if (ok) {
			_4a2(_4a6);
		}
	};
	function _4a7(_4a8) {
		var opts = $.data(_4a8, "fwb_datagrid").options;
		var _4a9 = $.data(_4a8, "fwb_datagrid").originalRows;
		var _4aa = $.data(_4a8, "fwb_datagrid").insertedRows;
		var _4ab = $.data(_4a8, "fwb_datagrid").deletedRows;
		var _4ac = $.data(_4a8, "fwb_datagrid").selectedRows;
		var data = $.data(_4a8, "fwb_datagrid").data;
		for (var i = 0; i < data.rows.length; i++) {
			_46e(_4a8, i, true);
		}
		var _4ad = [];
		for (var i = 0; i < _4ac.length; i++) {
			_4ad.push(_4ac[i][opts.idField]);
		}
		_4ac.splice(0, _4ac.length);
		data.total += _4ab.length - _4aa.length;
		data.rows = _4a9;
		_43d(_4a8, data);
		for (var i = 0; i < _4ad.length; i++) {
			_460(_4a8, _4ad[i]);
		}
		_4a2(_4a8);
	};
	function _4ae(_4af, _4b0) {
		var _4b1 = $.data(_4af, "fwb_datagrid").fwb_panel;
		var opts = $.data(_4af, "fwb_datagrid").options;
		if (_4b0) {
			opts.queryParams = _4b0;
		}
		if (!opts.url) {
			return;
		}
		var _4b2 = $.extend({},
		opts.queryParams);
		if (opts.pagination) {
			$.extend(_4b2, {
				page: opts.pageNumber,
				rows: opts.pageSize
			});
		}
		if (opts.sortName) {
			$.extend(_4b2, {
				sort: opts.sortName,
				order: opts.sortOrder
			});
		}
		if (opts.onBeforeLoad.call(_4af, _4b2) == false) {
			return;
		}
		if(!$.fn.fwb_datagrid._reload)
			$(_4af).fwb_datagrid("loading");
		setTimeout(function() {
			if(window.$get && window.$get(_4af) && $.fn.fwb_datagrid._reload){
				$.fn.fwb_datagrid._reload.call(_4af, _4b2);
			}else{
				 _4b3.call(_4af, _4b2);
			};
		}, 0);
		function _4b3() {
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: (window.fn && window.fn.param) ? fn.param(_4b2) : _4b2,
				dataType: "json",
				success: function(data) {
					setTimeout(function() {
						$(_4af).fwb_datagrid("loaded");
					},
					0);
					_43d(_4af, data);
					setTimeout(function() {
						_4a2(_4af);
					},
					0);
				},
				error: function() {
					setTimeout(function() {
						$(_4af).fwb_datagrid("loaded");
					},
					0);
					if (opts.onLoadError) {
						opts.onLoadError.apply(_4af, arguments);
					}
				}
			});
		};
	};
	function _4b4(_4b5, _4b6) {
		var rows = $.data(_4b5, "fwb_datagrid").data.rows;
		var _4b7 = $.data(_4b5, "fwb_datagrid").fwb_panel;
		_4b6.rowspan = _4b6.rowspan || 1;
		_4b6.colspan = _4b6.colspan || 1;
		if (_4b6.index < 0 || _4b6.index >= rows.length) {
			return;
		}
		if (_4b6.rowspan == 1 && _4b6.colspan == 1) {
			return;
		}
		var _4b8 = rows[_4b6.index][_4b6.field];
		var tr = _4b7.find("div.fwb_datagrid-body tr[fwb_datagrid-row-index=" + _4b6.index + "]");
		var td = tr.find("td[field=" + _4b6.field + "]");
		td.attr("rowspan", _4b6.rowspan).attr("colspan", _4b6.colspan);
		td.addClass("fwb_datagrid-td-merged");
		for (var i = 1; i < _4b6.colspan; i++) {
			td = td.next();
			td.hide();
			rows[_4b6.index][td.attr("field")] = _4b8;
		}
		for (var i = 1; i < _4b6.rowspan; i++) {
			tr = tr.next();
			var td = tr.find("td[field=" + _4b6.field + "]").hide();
			rows[_4b6.index + i][td.attr("field")] = _4b8;
			for (var j = 1; j < _4b6.colspan; j++) {
				td = td.next();
				td.hide();
				rows[_4b6.index + i][td.attr("field")] = _4b8;
			}
		}
		setTimeout(function() {
			_429(_4b5);
		},
		0);
	};
	$.fn.fwb_datagrid = function(_4b9, _4ba) {
		if (typeof _4b9 == "string") {
			return $.fn.fwb_datagrid.methods[_4b9](this, _4ba);
		}
		_4b9 = _4b9 || {};
		return this.each(function() {
			var _4bb = $.data(this, "fwb_datagrid");
			var opts;
			if (_4bb) {
				opts = $.extend(_4bb.options, _4b9);
				_4bb.options = opts;
			} else {
				opts = $.extend({},
				$.fn.fwb_datagrid.defaults, $.fn.fwb_datagrid.parseOptions(this), _4b9);
				$(this).css("width", "").css("height", "");
				var _4bc = _3da(this, opts.rownumbers);
				if (!opts.columns) {
					opts.columns = _4bc.columns;
				}
				if (!opts.frozenColumns) {
					opts.frozenColumns = _4bc.frozenColumns;
				}
				var panel = _4bc.fwb_panel;
				
				$.data(this, "fwb_datagrid", {
					options: opts,
					fwb_panel: panel,
					selectedRows: [],
					data: {
						total: 0,
						rows: []
					},
					originalRows: [],
					updatedRows: [],
					insertedRows: [],
					deletedRows: []
				});
			}
			_3e9(this);
			if (!_4bb) {
				var data = _3e5(this);
				if (data.total > 0) {
					_43d(this, data);
					_4a2(this);
				}
			}
			_3b9(this);
			if (opts.url) {
				_4ae(this);
			}
			_40b(this);
		});
	};
	var _4bd = {
		text: {
			init: function(_4be, _4bf) {
				var _4c0 = $("<input type=\"text\" class=\"fwb_datagrid-editable-input\">").appendTo(_4be);
				return _4c0;
			},
			getValue: function(_4c1) {
				return $(_4c1).val();
			},
			setValue: function(_4c2, _4c3) {
				$(_4c2).val(_4c3);
			},
			resize: function(_4c4, _4c5) {
				var _4c6 = $(_4c4);
				if ($.boxModel == true) {
					_4c6.width(_4c5 - (_4c6.outerWidth() - _4c6.width()));
				} else {
					_4c6.width(_4c5);
				}
			}
		},
		textarea: {
			init: function(_4c7, _4c8) {
				var _4c9 = $("<textarea class=\"fwb_datagrid-editable-input\"></textarea>").appendTo(_4c7);
				return _4c9;
			},
			getValue: function(_4ca) {
				return $(_4ca).val();
			},
			setValue: function(_4cb, _4cc) {
				$(_4cb).val(_4cc);
			},
			resize: function(_4cd, _4ce) {
				var _4cf = $(_4cd);
				if ($.boxModel == true) {
					_4cf.width(_4ce - (_4cf.outerWidth() - _4cf.width()));
				} else {
					_4cf.width(_4ce);
				}
			}
		},
		checkbox: {
			init: function(_4d0, _4d1) {
				var _4d2 = $("<input type=\"checkbox\">").appendTo(_4d0);
				_4d2.val(_4d1.on);
				_4d2.attr("offval", _4d1.off);
				return _4d2;
			},
			getValue: function(_4d3) {
				if ($(_4d3).is(":checked")) {
					return $(_4d3).val();
				} else {
					return $(_4d3).attr("offval");
				}
			},
			setValue: function(_4d4, _4d5) {
				var _4d6 = false;
				if ($(_4d4).val() == _4d5) {
					_4d6 = true;
				}
				$.fn.prop ? $(_4d4).prop("checked", _4d6) : $(_4d4).attr("checked", _4d6);
			}
		},
		fwb_numberbox: {
			init: function(_4d7, _4d8) {
				var _4d9 = $("<input type=\"text\" class=\"fwb_datagrid-editable-input\">").appendTo(_4d7);
				_4d9.fwb_numberbox(_4d8);
				return _4d9;
			},
			destroy: function(_4da) {
				$(_4da).fwb_numberbox("destroy");
			},
			getValue: function(_4db) {
				return $(_4db).val();
			},
			setValue: function(_4dc, _4dd) {
				$(_4dc).val(_4dd);
			},
			resize: function(_4de, _4df) {
				var _4e0 = $(_4de);
				if ($.boxModel == true) {
					_4e0.width(_4df - (_4e0.outerWidth() - _4e0.width()));
				} else {
					_4e0.width(_4df);
				}
			}
		},
		fwb_validatebox: {
			init: function(_4e1, _4e2) {
				var _4e3 = $("<input type=\"text\" class=\"fwb_datagrid-editable-input\">").appendTo(_4e1);
				_4e3.fwb_validatebox(_4e2);
				return _4e3;
			},
			destroy: function(_4e4) {
				$(_4e4).fwb_validatebox("destroy");
			},
			getValue: function(_4e5) {
				return $(_4e5).val();
			},
			setValue: function(_4e6, _4e7) {
				$(_4e6).val(_4e7);
			},
			resize: function(_4e8, _4e9) {
				var _4ea = $(_4e8);
				if ($.boxModel == true) {
					_4ea.width(_4e9 - (_4ea.outerWidth() - _4ea.width()));
				} else {
					_4ea.width(_4e9);
				}
			}
		},
		fwb_datebox: {
			init: function(_4eb, _4ec) {
				var _4ed = $("<input type=\"text\">").appendTo(_4eb);
				_4ed.fwb_datebox(_4ec);
				return _4ed;
			},
			destroy: function(_4ee) {
				$(_4ee).fwb_datebox("destroy");
			},
			getValue: function(_4ef) {
				return $(_4ef).fwb_datebox("getValue");
			},
			setValue: function(_4f0, _4f1) {
				$(_4f0).fwb_datebox("setValue", _4f1);
			},
			resize: function(_4f2, _4f3) {
				$(_4f2).fwb_datebox("resize", _4f3);
			}
		},
		fwb_combobox: {
			init: function(_4f4, _4f5) {
				var _4f6 = $("<input type=\"text\">").appendTo(_4f4);
				_4f6.fwb_combobox(_4f5 || {});
				return _4f6;
			},
			destroy: function(_4f7) {
				$(_4f7).fwb_combobox("destroy");
			},
			getValue: function(_4f8) {
				return $(_4f8).fwb_combobox("getValue");
			},
			setValue: function(_4f9, _4fa) {
				$(_4f9).fwb_combobox("setValue", _4fa);
			},
			resize: function(_4fb, _4fc) {
				$(_4fb).fwb_combobox("resize", _4fc);
			}
		},
		fwb_combotree: {
			init: function(_4fd, _4fe) {
				var _4ff = $("<input type=\"text\">").appendTo(_4fd);
				_4ff.fwb_combotree(_4fe);
				return _4ff;
			},
			destroy: function(_500) {
				$(_500).fwb_combotree("destroy");
			},
			getValue: function(_501) {
				return $(_501).fwb_combotree("getValue");
			},
			setValue: function(_502, _503) {
				$(_502).fwb_combotree("setValue", _503);
			},
			resize: function(_504, _505) {
				$(_504).fwb_combotree("resize", _505);
			}
		}
	};
	$.fn.fwb_datagrid.methods = {
		options: function(jq) {
			var _506 = $.data(jq[0], "fwb_datagrid").options;
			var _507 = $.data(jq[0], "fwb_datagrid").fwb_panel.fwb_panel("options");
			var opts = $.extend(_506, {
				width: _507.width,
				height: _507.height,
				closed: _507.closed,
				collapsed: _507.collapsed,
				minimized: _507.minimized,
				maximized: _507.maximized
			});
			var _508 = jq.fwb_datagrid("getPager");
			if (_508.length) {
				var _509 = _508.fwb_pagination("options");
				$.extend(opts, {
					pageNumber: _509.pageNumber,
					pageSize: _509.pageSize
				});
			}
			return opts;
		},
		getPanel: function(jq) {
			return $.data(jq[0], "fwb_datagrid").fwb_panel;
		},
		getPager: function(jq) {
			return $.data(jq[0], "fwb_datagrid").fwb_panel.find("div.fwb_datagrid-pager");
		},
		getColumnFields: function(jq, _50a) {
			return _3e8(jq[0], _50a);
		},
		getColumnOption: function(jq, _50b) {
			return _416(jq[0], _50b);
		},
		resize: function(jq, _50c) {
			return jq.each(function() {
				_3b9(this, _50c);
			});
		},
		load: function(jq, _50d) {
			return jq.each(function() {
				var opts = $(this).fwb_datagrid("options");
				opts.pageNumber = 1;
				var _50e = $(this).fwb_datagrid("getPager");
				_50e.fwb_pagination({
					pageNumber: 1
				});
				_4ae(this, _50d);
			});
		},
		reload: function(jq, _50f) {
			return jq.each(function() {
				_4ae(this, _50f);
			});
		},
		reloadFooter: function(jq, _510) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_datagrid").options;
				var view = $(this).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
				var _511 = view.children("div.fwb_datagrid-view1");
				var _512 = view.children("div.fwb_datagrid-view2");
				if (_510) {
					$.data(this, "fwb_datagrid").footer = _510;
				}
				if (opts.showFooter) {
					opts.view.renderFooter.call(opts.view, this, _512.find("div.fwb_datagrid-footer-inner"), false);
					opts.view.renderFooter.call(opts.view, this, _511.find("div.fwb_datagrid-footer-inner"), true);
					if (opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, this);
					}
					$(this).fwb_datagrid("fixRowHeight");
				}
			});
		},
		loading: function(jq) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_datagrid").options;
				$(this).fwb_datagrid("getPager").fwb_pagination("loading");
				if (opts.loadMsg) {
					var _513 = $(this).fwb_datagrid("getPanel");
					$("<div class=\"fwb_datagrid-mask\" style=\"display:block\"></div>").appendTo(_513);
					$("<div class=\"fwb_datagrid-mask-msg\" style=\"display:block\"></div>").html(opts.loadMsg).appendTo(_513);
					_3c9(this);
				}
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				$(this).fwb_datagrid("getPager").fwb_pagination("loaded");
				var _514 = $(this).fwb_datagrid("getPanel");
				_514.children("div.fwb_datagrid-mask-msg").remove();
				_514.children("div.fwb_datagrid-mask").remove();
			});
		},
		showLoadingMsg: function(jq){
			return jq.each(function() {
				var opts = $.data(this, "fwb_datagrid").options;
				if (opts.loadMsg) {
					var _513 = $(this).fwb_datagrid("getPanel");
					$("<div class=\"fwb_datagrid-mask\" style=\"display:block\"></div>").appendTo(_513);
					$("<div class=\"fwb_datagrid-mask-msg\" style=\"display:block\"></div>").html(opts.loadMsg).appendTo(_513);
					_3c9(this);
				}
			});
		},
		hideLoadingMsg: function(jq){
			return jq.each(function() {
				var _514 = $(this).fwb_datagrid("getPanel");
				_514.children("div.fwb_datagrid-mask-msg").remove();
				_514.children("div.fwb_datagrid-mask").remove();
			});
		},
		fitColumns: function(jq) {
			return jq.each(function() {
				_418(this);
			});
		},
		fixColumnSize: function(jq) {
			return jq.each(function() {
				_3e2(this);
			});
		},
		fixRowHeight: function(jq, _515) {
			return jq.each(function() {
				_3cc(this, _515);
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_43d(this, data);
				_4a2(this);
			});
		},
		getData: function(jq) {
			return $.data(jq[0], "fwb_datagrid").data;
		},
		getRows: function(jq) {
			return $.data(jq[0], "fwb_datagrid").data.rows;
		},
		getFooterRows: function(jq) {
			return $.data(jq[0], "fwb_datagrid").footer;
		},
		getRowIndex: function(jq, id) {
			return _445(jq[0], id);
		},
		getSelected: function(jq) {
			var rows = _447(jq[0]);
			return rows.length > 0 ? rows[0] : null;
		},
		getSelections: function(jq) {
			return _447(jq[0]);
		},
		clearSelections: function(jq) {
			return jq.each(function() {
				_408(this);
			});
		},
		selectAll: function(jq) {
			return jq.each(function() {
				_44e(this);
			});
		},
		unselectAll: function(jq) {
			return jq.each(function() {
				_44c(this);
			});
		},
		selectRow: function(jq, _516) {
			return jq.each(function() {
				_409(this, _516);
			});
		},
		selectRecord: function(jq, id) {
			return jq.each(function() {
				_460(this, id);
			});
		},
		unselectRow: function(jq, _517) {
			return jq.each(function() {
				_40a(this, _517);
			});
		},
		beginEdit: function(jq, _518) {
			return jq.each(function() {
				_468(this, _518);
			});
		},
		endEdit: function(jq, _519) {
			return jq.each(function() {
				_46e(this, _519, false);
			});
		},
		cancelEdit: function(jq, _51a) {
			return jq.each(function() {
				_46e(this, _51a, true);
			});
		},
		getEditors: function(jq, _51b) {
			return _479(jq[0], _51b);
		},
		getEditor: function(jq, _51c) {
			return _47d(jq[0], _51c);
		},
		refreshRow: function(jq, _51d) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_datagrid").options;
				opts.view.refreshRow.call(opts.view, this, _51d);
			});
		},
		validateRow: function(jq, _51e) {
			return _46d(jq[0], _51e);
		},
		updateRow: function(jq, _51f) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_datagrid").options;
				opts.view.updateRow.call(opts.view, this, _51f.index, _51f.row);
			});
		},
		appendRow: function(jq, row) {
			return jq.each(function() {
				_49f(this, row);
			});
		},
		insertRow: function(jq, _520) {
			return jq.each(function() {
				_49b(this, _520);
			});
		},
		deleteRow: function(jq, _521) {
			return jq.each(function() {
				_495(this, _521);
			});
		},
		getChanges: function(jq, _522) {
			return _48f(jq[0], _522);
		},
		acceptChanges: function(jq) {
			return jq.each(function() {
				_4a5(this);
			});
		},
		rejectChanges: function(jq) {
			return jq.each(function() {
				_4a7(this);
			});
		},
		mergeCells: function(jq, _523) {
			return jq.each(function() {
				_4b4(this, _523);
			});
		},
		showColumn: function(jq, _524) {
			return jq.each(function() {
				var _525 = $(this).fwb_datagrid("getPanel");
				_525.find("td[field=" + _524 + "]").show();
				$(this).fwb_datagrid("getColumnOption", _524).hidden = false;
				$(this).fwb_datagrid("fitColumns");
			});
		},
		hideColumn: function(jq, _526) {
			return jq.each(function() {
				var _527 = $(this).fwb_datagrid("getPanel");
				_527.find("td[field=" + _526 + "]").hide();
				$(this).fwb_datagrid("getColumnOption", _526).hidden = true;
				$(this).fwb_datagrid("fitColumns");
			});
		}
	};
	$.fn.fwb_datagrid.parseOptions = function(_528) {
		var t = $(_528);
		return $.extend({},
		$.fn.fwb_panel.parseOptions(_528), {
			fitColumns: (t.attr("fitColumns") ? t.attr("fitColumns") == "true": undefined),
			striped: (t.attr("striped") ? t.attr("striped") == "true": undefined),
			nowrap: (t.attr("nowrap") ? t.attr("nowrap") == "true": undefined),
			rownumbers: (t.attr("rownumbers") ? t.attr("rownumbers") == "true": undefined),
			singleSelect: (t.attr("singleSelect") ? t.attr("singleSelect") == "true": undefined),
			pagination: (t.attr("pagination") ? t.attr("pagination") == "true": undefined),
			pageSize: (t.attr("pageSize") ? parseInt(t.attr("pageSize")) : undefined),
			pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined),
			remoteSort: (t.attr("remoteSort") ? t.attr("remoteSort") == "true": undefined),
			sortName: t.attr("sortName"),
			sortOrder: t.attr("sortOrder"),
			showHeader: (t.attr("showHeader") ? t.attr("showHeader") == "true": undefined),
			showFooter: (t.attr("showFooter") ? t.attr("showFooter") == "true": undefined),
			scrollbarSize: (t.attr("scrollbarSize") ? parseInt(t.attr("scrollbarSize")) : undefined),
			loadMsg: (t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined),
			idField: t.attr("idField"),
			toolbar: t.attr("toolbar"),
			url: t.attr("url"),
			rowStyler: (t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined)
		});
	};
	var _529 = {
		render: function(_52a, _52b, _52c) {
			var opts = $.data(_52a, "fwb_datagrid").options;
			var rows = $.data(_52a, "fwb_datagrid").data.rows;
			var _52d = $(_52a).fwb_datagrid("getColumnFields", _52c);
			if (_52c) {
				if (! (opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
					return;
				}
			}
			
			/* 2012.02.06 修改：支持filed="customer.name"格式，保存row["customer.name"]格式的值 */
			// 查找带.的filed
			var cols = $(_52a).fwb_datagrid("getColumnFields");
			cols = $.grep(cols, function(n,i){
			  return n.indexOf(".") > -1;
			});
			/* end */
			
			var _52e = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			for (var i = 0; i < rows.length; i++) {
				/* 修改：支持filed="customer.name"格式，保存row["customer.name"]格式的值 */
				// 修改row的值
				for(var j = 0; j < cols.length; j++){
					var col = cols[j], row = rows[i];
					row[col] = findObject(row, col);
				};
				/* end */
				var cls = (i % 2 && opts.striped) ? "class=\"fwb_datagrid-row-alt\"": "";
				var _52f = opts.rowStyler ? opts.rowStyler.call(_52a, i, rows[i]) : "";
				var _530 = _52f ? "style=\"" + _52f + "\"": "";
				_52e.push("<tr fwb_datagrid-row-index=\"" + i + "\" " + cls + " " + _530 + ">");
				_52e.push(this.renderRow.call(this, _52a, _52d, _52c, i, rows[i]));
				_52e.push("</tr>");
			}
			_52e.push("</tbody></table>");
			$(_52b).html(_52e.join(""));
		},
		renderFooter: function(_531, _532, _533) {
			var opts = $.data(_531, "fwb_datagrid").options;
			var rows = $.data(_531, "fwb_datagrid").footer || [];
			var _534 = $(_531).fwb_datagrid("getColumnFields", _533);
			var _535 = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			for (var i = 0; i < rows.length; i++) {
				_535.push("<tr fwb_datagrid-row-index=\"" + i + "\">");
				_535.push(this.renderRow.call(this, _531, _534, _533, i, rows[i]));
				_535.push("</tr>");
			}
			_535.push("</tbody></table>");
			$(_532).html(_535.join(""));
		},
		renderRow: function(_536, _537, _538, _539, _53a) {
			var opts = $.data(_536, "fwb_datagrid").options;
			var cc = [];
			if (_538 && opts.rownumbers) {
				var _53b = _539 + 1;
				if (opts.pagination) {
					_53b += (opts.pageNumber - 1) * opts.pageSize;
				}
				cc.push("<td class=\"fwb_datagrid-td-rownumber\"><div class=\"fwb_datagrid-cell-rownumber\">" + _53b + "</div></td>");
			}
			for (var i = 0; i < _537.length; i++) {
				
				var _53c = _537[i];
				
				/* 2012.02.06 修改，支持field="customer.name"格式*/
				var val = findObject(_53a, _53c);
				
				var col = $(_536).fwb_datagrid("getColumnOption", _53c);
				if (col) {
					var _53d = col.styler ? (col.styler(_53a[_53c], _53a, _539) || "") : "";
					var _53e = col.hidden ? "style=\"display:none;" + _53d + "\"": (_53d ? "style=\"" + _53d + "\"": "");
					
					// 增加表格单元格的title属性
					var text = col.formatter ? text = col.formatter(val, _53a, _539) : _53a[_53c];
					var title = (text && text.indexOf && text.indexOf("<")) == -1 ? text : "";
					
					cc.push("<td title=\"" + title + "\" field=\"" + _53c + "\" " + _53e + ">");
					var _53e = "width:" + (col.boxWidth) + "px;";
					_53e += "text-align:" + (col.align || "left") + ";";
					_53e += opts.nowrap == false ? "white-space:normal;": "";
					cc.push("<div style=\"" + _53e + "\" ");
					if (col.checkbox) {
						cc.push("class=\"fwb_datagrid-cell-check ");
					} else {
						cc.push("class=\"fwb_datagrid-cell ");
					}
					cc.push("\">");
					if (col.checkbox) {
						cc.push("<input type=\"checkbox\"/>");
					} else {
						cc.push(text);
					}
					cc.push("</div>");
					cc.push("</td>");
				}
			}
			return cc.join("");
		},
		refreshRow: function(_53f, _540) {
			var row = {};
			var _541 = $(_53f).fwb_datagrid("getColumnFields", true).concat($(_53f).fwb_datagrid("getColumnFields", false));
			for (var i = 0; i < _541.length; i++) {
				row[_541[i]] = undefined;
			}
			var rows = $(_53f).fwb_datagrid("getRows");
			$.extend(row, rows[_540]);
			this.updateRow.call(this, _53f, _540, row);
		},
		updateRow: function(_542, _543, row) {
			var opts = $.data(_542, "fwb_datagrid").options;
			var _544 = $(_542).fwb_datagrid("getPanel");
			var rows = $(_542).fwb_datagrid("getRows");
			var tr = _544.find("div.fwb_datagrid-body tr[fwb_datagrid-row-index=" + _543 + "]");
			for (var _545 in row) {
				rows[_543][_545] = row[_545];
				var td = tr.children("td[field=" + _545 + "]");
				var cell = td.find("div.fwb_datagrid-cell");
				var col = $(_542).fwb_datagrid("getColumnOption", _545);
				if (col) {
					var _546 = col.styler ? col.styler(rows[_543][_545], rows[_543], _543) : "";
					td.attr("style", _546 || "");
					if (col.hidden) {
						td.hide();
					}
					if (col.formatter) {
						cell.html(col.formatter(rows[_543][_545], rows[_543], _543));
					} else {
						cell.html(rows[_543][_545]);
					}
				}
			}
			var _546 = opts.rowStyler ? opts.rowStyler.call(_542, _543, rows[_543]) : "";
			tr.attr("style", _546 || "");
			$(_542).fwb_datagrid("fixRowHeight", _543);
		},
		insertRow: function(_547, _548, row) {
			var opts = $.data(_547, "fwb_datagrid").options;
			var data = $.data(_547, "fwb_datagrid").data;
			var view = $(_547).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
			var _549 = view.children("div.fwb_datagrid-view1");
			var _54a = view.children("div.fwb_datagrid-view2");
			if (_548 == undefined || _548 == null) {
				_548 = data.rows.length;
			}
			if (_548 > data.rows.length) {
				_548 = data.rows.length;
			}
			for (var i = data.rows.length - 1; i >= _548; i--) {
				_54a.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + i + "]").attr("fwb_datagrid-row-index", i + 1);
				var tr = _549.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + i + "]").attr("fwb_datagrid-row-index", i + 1);
				if (opts.rownumbers) {
					tr.find("div.fwb_datagrid-cell-rownumber").html(i + 2);
				}
			}
			var _54b = $(_547).fwb_datagrid("getColumnFields", true);
			var _54c = $(_547).fwb_datagrid("getColumnFields", false);
			var tr1 = "<tr fwb_datagrid-row-index=\"" + _548 + "\">" + this.renderRow.call(this, _547, _54b, true, _548, row) + "</tr>";
			var tr2 = "<tr fwb_datagrid-row-index=\"" + _548 + "\">" + this.renderRow.call(this, _547, _54c, false, _548, row) + "</tr>";
			if (_548 >= data.rows.length) {
				var _54d = _549.children("div.fwb_datagrid-body").children("div.fwb_datagrid-body-inner");
				var _54e = _54a.children("div.fwb_datagrid-body");
				if (data.rows.length) {
					_54d.find("tr:last[fwb_datagrid-row-index]").after(tr1);
					_54e.find("tr:last[fwb_datagrid-row-index]").after(tr2);
				} else {
					_54d.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr1 + "</tbody></table>");
					_54e.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr2 + "</tbody></table>");
				}
			} else {
				_549.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + (_548 + 1) + "]").before(tr1);
				_54a.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + (_548 + 1) + "]").before(tr2);
			}
			data.total += 1;
			data.rows.splice(_548, 0, row);
			this.refreshRow.call(this, _547, _548);
		},
		deleteRow: function(_54f, _550) {
			var opts = $.data(_54f, "fwb_datagrid").options;
			var data = $.data(_54f, "fwb_datagrid").data;
			var view = $(_54f).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
			var _551 = view.children("div.fwb_datagrid-view1");
			var _552 = view.children("div.fwb_datagrid-view2");
			_551.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + _550 + "]").remove();
			_552.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + _550 + "]").remove();
			for (var i = _550 + 1; i < data.rows.length; i++) {
				_552.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + i + "]").attr("fwb_datagrid-row-index", i - 1);
				var tr = _551.children("div.fwb_datagrid-body").find("tr[fwb_datagrid-row-index=" + i + "]").attr("fwb_datagrid-row-index", i - 1);
				if (opts.rownumbers) {
					tr.find("div.fwb_datagrid-cell-rownumber").html(i);
				}
			}
			data.total -= 1;
			data.rows.splice(_550, 1);
		},
		onBeforeRender: function(_553, rows) {
			},
		onAfterRender: function(_554) {
			var opts = $.data(_554, "fwb_datagrid").options;
			if (opts.showFooter) {
				var _555 = $(_554).fwb_datagrid("getPanel").find("div.fwb_datagrid-footer");
				_555.find("div.fwb_datagrid-cell-rownumber,div.fwb_datagrid-cell-check").css("visibility", "hidden");
			}
		}
	};
	$.fn.fwb_datagrid.defaults = $.extend({},
	$.fn.fwb_panel.defaults, {
		frozenColumns: null,
		columns: null,
		fitColumns: false,
		toolbar: null,
		striped: false,
		method: "post",
		nowrap: true,
		idField: null,
		url: null,
		loadMsg: "Processing, please wait ...",
		rownumbers: false,
		singleSelect: false,
		fwb_pagination: false,
		pageNumber: 1,
		pageSize: 10,
		pageList: [10, 20, 30, 40, 50],
		queryParams: {},
		sortName: null,
		sortOrder: "asc",
		remoteSort: true,
		showHeader: true,
		showFooter: false,
		scrollbarSize: 18,
		rowStyler: function(_556, _557) {
			},
		loadFilter: function(data) {
			if (typeof data.length == "number" && typeof data.splice == "function") {
				return {
					total: data.length,
					rows: data
				};
			} else {
				return data;
			}
		},
		editors: _4bd,
		editConfig: {
			getTr: function(_558, _559) {
				return $(_558).fwb_datagrid("getPanel").find("div.fwb_datagrid-body tr[fwb_datagrid-row-index=" + _559 + "]");
			},
			getRow: function(_55a, _55b) {
				return $.data(_55a, "fwb_datagrid").data.rows[_55b];
			}
		},
		view: _529,
		onBeforeLoad: function(_55c) {
			},
		onLoadSuccess: function() {
			},
		onLoadError: function() {
			},
		onClickRow: function(_55d, _55e) {
			},
		onDblClickRow: function(_55f, _560) {
			},
		onClickCell: function(_561, _562, _563) {
			},
		onDblClickCell: function(_564, _565, _566) {
			},
		onSortColumn: function(sort, _567) {
			},
		onResizeColumn: function(_568, _569) {
			},
		onSelect: function(_56a, _56b) {
			},
		onUnselect: function(_56c, _56d) {
			},
		onSelectAll: function(rows) {
			},
		onUnselectAll: function(rows) {
			},
		onBeforeEdit: function(_56e, _56f) {
			},
		onAfterEdit: function(_570, _571, _572) {
			},
		onCancelEdit: function(_573, _574) {
			},
		onHeaderContextMenu: function(e, _575) {
			},
		onRowContextMenu: function(e, _576, _577) {
			}
	});
})(fn.jQuery);
 (function($) {
	function _578(_579) {
		var opts = $.data(_579, "fwb_propertygrid").options;
		$(_579).fwb_datagrid($.extend({},
		opts, {
			view: (opts.showGroup ? _57a: undefined),
			onClickRow: function(_57b, row) {
				if (opts.editIndex != _57b) {
					var col = $(this).fwb_datagrid("getColumnOption", "value");
					col.editor = row.editor;
					_57c(opts.editIndex);
					$(this).fwb_datagrid("beginEdit", _57b);
					$(this).fwb_datagrid("getEditors", _57b)[0].target.focus();
					opts.editIndex = _57b;
				}
				opts.onClickRow.call(_579, _57b, row);
			}
		}));
		$(_579).fwb_datagrid("getPanel").fwb_panel("fwb_panel").addClass("fwb_propertygrid");
		$(_579).fwb_datagrid("getPanel").find("div.fwb_datagrid-body").unbind(".fwb_propertygrid").bind("mousedown.fwb_propertygrid",
		function(e) {
			e.stopPropagation();
		});
		$(document).unbind(".fwb_propertygrid").bind("mousedown.fwb_propertygrid",
		function() {
			_57c(opts.editIndex);
			opts.editIndex = undefined;
		});
		function _57c(_57d) {
			if (_57d == undefined) {
				return;
			}
			var t = $(_579);
			if (t.fwb_datagrid("validateRow", _57d)) {
				t.fwb_datagrid("endEdit", _57d);
			} else {
				t.fwb_datagrid("cancelEdit", _57d);
			}
		};
	};
	$.fn.fwb_propertygrid = function(_57e, _57f) {
		if (typeof _57e == "string") {
			var _580 = $.fn.fwb_propertygrid.methods[_57e];
			if (_580) {
				return _580(this, _57f);
			} else {
				return this.fwb_datagrid(_57e, _57f);
			}
		}
		_57e = _57e || {};
		return this.each(function() {
			var _581 = $.data(this, "fwb_propertygrid");
			if (_581) {
				$.extend(_581.options, _57e);
			} else {
				$.data(this, "fwb_propertygrid", {
					options: $.extend({},
					$.fn.fwb_propertygrid.defaults, $.fn.fwb_propertygrid.parseOptions(this), _57e)
				});
			}
			_578(this);
		});
	};
	$.fn.fwb_propertygrid.methods = {};
	$.fn.fwb_propertygrid.parseOptions = function(_582) {
		var t = $(_582);
		return $.extend({},
		$.fn.fwb_datagrid.parseOptions(_582), {
			showGroup: (t.attr("showGroup") ? t.attr("showGroup") == "true": undefined)
		});
	};
	var _57a = $.extend({},
	$.fn.fwb_datagrid.defaults.view, {
		render: function(_583, _584, _585) {
			var opts = $.data(_583, "fwb_datagrid").options;
			var rows = $.data(_583, "fwb_datagrid").data.rows;
			var _586 = $(_583).fwb_datagrid("getColumnFields", _585);
			var _587 = [];
			var _588 = 0;
			var _589 = this.groups;
			for (var i = 0; i < _589.length; i++) {
				var _58a = _589[i];
				_587.push("<div class=\"fwb_datagrid-group\" group-index=" + i + ">");
				_587.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
				_587.push("<tr>");
				_587.push("<td style=\"border:0;\">");
				if (!_585) {
					_587.push("<span>");
					_587.push(opts.groupFormatter.call(_583, _58a.fvalue, _58a.rows));
					_587.push("</span>");
				}
				_587.push("</td>");
				_587.push("</tr>");
				_587.push("</tbody></table>");
				_587.push("</div>");
				_587.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
				for (var j = 0; j < _58a.rows.length; j++) {
					var cls = (_588 % 2 && opts.striped) ? "class=\"fwb_datagrid-row-alt\"": "";
					var _58b = opts.rowStyler ? opts.rowStyler.call(_583, _588, _58a.rows[j]) : "";
					var _58c = _58b ? "style=\"" + _58b + "\"": "";
					_587.push("<tr fwb_datagrid-row-index=\"" + _588 + "\" " + cls + " " + _58c + ">");
					_587.push(this.renderRow.call(this, _583, _586, _585, _588, _58a.rows[j]));
					_587.push("</tr>");
					_588++;
				}
				_587.push("</tbody></table>");
			}
			$(_584).html(_587.join(""));
		},
		onAfterRender: function(_58d) {
			var opts = $.data(_58d, "fwb_datagrid").options;
			var view = $(_58d).fwb_datagrid("getPanel").find("div.fwb_datagrid-view");
			var _58e = view.children("div.fwb_datagrid-view1");
			var _58f = view.children("div.fwb_datagrid-view2");
			$.fn.fwb_datagrid.defaults.view.onAfterRender.call(this, _58d);
			if (opts.rownumbers || opts.frozenColumns.length) {
				var _590 = _58e.find("div.fwb_datagrid-group");
			} else {
				var _590 = _58f.find("div.fwb_datagrid-group");
			}
			$("<td style=\"border:0\"><div class=\"fwb_datagrid-row-expander fwb_datagrid-row-collapse\" style=\"width:25px;height:16px;cursor:pointer\"></div></td>").insertBefore(_590.find("td"));
			view.find("div.fwb_datagrid-group").each(function() {
				var _591 = $(this).attr("group-index");
				$(this).find("div.fwb_datagrid-row-expander").bind("click", {
					groupIndex: _591
				},
				function(e) {
					var _592 = view.find("div.fwb_datagrid-group[group-index=" + e.data.groupIndex + "]");
					if ($(this).hasClass("fwb_datagrid-row-collapse")) {
						$(this).removeClass("fwb_datagrid-row-collapse").addClass("fwb_datagrid-row-expand");
						_592.next("table").hide();
					} else {
						$(this).removeClass("fwb_datagrid-row-expand").addClass("fwb_datagrid-row-collapse");
						_592.next("table").show();
					}
					$(_58d).fwb_datagrid("fixRowHeight");
				});
			});
		},
		onBeforeRender: function(_593, rows) {
			var opts = $.data(_593, "fwb_datagrid").options;
			var _594 = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var _595 = _596(row[opts.groupField]);
				if (!_595) {
					_595 = {
						fvalue: row[opts.groupField],
						rows: [row],
						startRow: i
					};
					_594.push(_595);
				} else {
					_595.rows.push(row);
				}
			}
			function _596(_597) {
				for (var i = 0; i < _594.length; i++) {
					var _598 = _594[i];
					if (_598.fvalue == _597) {
						return _598;
					}
				}
				return null;
			};
			this.groups = _594;
			var _599 = [];
			for (var i = 0; i < _594.length; i++) {
				var _595 = _594[i];
				for (var j = 0; j < _595.rows.length; j++) {
					_599.push(_595.rows[j]);
				}
			}
			$.data(_593, "fwb_datagrid").data.rows = _599;
		}
	});
	$.fn.fwb_propertygrid.defaults = $.extend({},
	$.fn.fwb_datagrid.defaults, {
		singleSelect: true,
		remoteSort: false,
		fitColumns: true,
		loadMsg: "",
		frozenColumns: [[{
			field: "f",
			width: 16,
			resizable: false
		}]],
		columns: [[{
			field: "name",
			title: "Name",
			width: 100,
			sortable: true
		},
		{
			field: "value",
			title: "Value",
			width: 100,
			resizable: false
		}]],
		showGroup: false,
		groupField: "group",
		groupFormatter: function(_59a) {
			return _59a;
		}
	});
})(fn.jQuery);
 (function($) {
	function _59b(_59c) {
		var opts = $.data(_59c, "fwb_treegrid").options;
		$(_59c).fwb_datagrid($.extend({},
		opts, {
			url: null,
			onLoadSuccess: function() {
				},
			onResizeColumn: function(_59d, _59e) {
				_5a8(_59c);
				opts.onResizeColumn.call(_59c, _59d, _59e);
			},
			onSortColumn: function(sort, _59f) {
				opts.sortName = sort;
				opts.sortOrder = _59f;
				if (opts.remoteSort) {
					_5a7(_59c);
				} else {
					var data = $(_59c).fwb_treegrid("getData");
					_5c8(_59c, 0, data);
				}
				opts.onSortColumn.call(_59c, sort, _59f);
			},
			onBeforeEdit: function(_5a0, row) {
				if (opts.onBeforeEdit.call(_59c, row) == false) {
					return false;
				}
			},
			onAfterEdit: function(_5a1, row, _5a2) {
				_5b9(_59c);
				opts.onAfterEdit.call(_59c, row, _5a2);
			},
			onCancelEdit: function(_5a3, row) {
				_5b9(_59c);
				opts.onCancelEdit.call(_59c, row);
			}
		}));
		if (opts.pagination) {
			var _5a4 = $(_59c).fwb_datagrid("getPager");
			_5a4.fwb_pagination({
				pageNumber: opts.pageNumber,
				pageSize: opts.pageSize,
				pageList: opts.pageList,
				onSelectPage: function(_5a5, _5a6) {
					opts.pageNumber = _5a5;
					opts.pageSize = _5a6;
					_5a7(_59c);
				}
			});
			opts.pageSize = _5a4.fwb_pagination("options").pageSize;
		}
	};
	function _5a8(_5a9, _5aa) {
		var opts = $.data(_5a9, "fwb_datagrid").options;
		var _5ab = $.data(_5a9, "fwb_datagrid").fwb_panel;
		var view = _5ab.children("div.fwb_datagrid-view");
		var _5ac = view.children("div.fwb_datagrid-view1");
		var _5ad = view.children("div.fwb_datagrid-view2");
		if (opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length > 0)) {
			if (_5aa) {
				_5ae(_5aa);
				_5ad.find("tr[node-id=" + _5aa + "]").next("tr.fwb_treegrid-tr-fwb_tree").find("tr[node-id]").each(function() {
					_5ae($(this).attr("node-id"));
				});
			} else {
				_5ad.find("tr[node-id]").each(function() {
					_5ae($(this).attr("node-id"));
				});
				if (opts.showFooter) {
					var _5af = $.data(_5a9, "fwb_datagrid").footer || [];
					for (var i = 0; i < _5af.length; i++) {
						_5ae(_5af[i][opts.idField]);
					}
					$(_5a9).fwb_datagrid("resize");
				}
			}
		}
		if (opts.height == "auto") {
			var _5b0 = _5ac.children("div.fwb_datagrid-body");
			var _5b1 = _5ad.children("div.fwb_datagrid-body");
			var _5b2 = 0;
			var _5b3 = 0;
			_5b1.children().each(function() {
				var c = $(this);
				if (c.is(":visible")) {
					_5b2 += c.outerHeight();
					if (_5b3 < c.outerWidth()) {
						_5b3 = c.outerWidth();
					}
				}
			});
			if (_5b3 > _5b1.width()) {
				_5b2 += 18;
			}
			_5b0.height(_5b2);
			_5b1.height(_5b2);
			view.height(_5ad.height());
		}
		_5ad.children("div.fwb_datagrid-body").triggerHandler("scroll");
		function _5ae(_5b4) {
			var tr1 = _5ac.find("tr[node-id=" + _5b4 + "]");
			var tr2 = _5ad.find("tr[node-id=" + _5b4 + "]");
			tr1.css("height", "");
			tr2.css("height", "");
			var _5b5 = Math.max(tr1.height(), tr2.height());
			tr1.css("height", _5b5);
			tr2.css("height", _5b5);
		};
	};
	function _5b6(_5b7) {
		var opts = $.data(_5b7, "fwb_treegrid").options;
		if (!opts.rownumbers) {
			return;
		}
		$(_5b7).fwb_datagrid("getPanel").find("div.fwb_datagrid-view1 div.fwb_datagrid-body div.fwb_datagrid-cell-rownumber").each(function(i) {
			var _5b8 = i + 1;
			$(this).html(_5b8);
		});
	};
	function _5b9(_5ba) {
		var opts = $.data(_5ba, "fwb_treegrid").options;
		var _5bb = $(_5ba).fwb_datagrid("getPanel");
		var body = _5bb.find("div.fwb_datagrid-body");
		body.find("span.fwb_tree-hit").unbind(".fwb_treegrid").bind("click.fwb_treegrid",
		function() {
			var tr = $(this).parent().parent().parent();
			var id = tr.attr("node-id");
			_606(_5ba, id);
			return false;
		}).bind("mouseenter.fwb_treegrid",
		function() {
			if ($(this).hasClass("fwb_tree-expanded")) {
				$(this).addClass("fwb_tree-expanded-hover");
			} else {
				$(this).addClass("fwb_tree-collapsed-hover");
			}
		}).bind("mouseleave.fwb_treegrid",
		function() {
			if ($(this).hasClass("fwb_tree-expanded")) {
				$(this).removeClass("fwb_tree-expanded-hover");
			} else {
				$(this).removeClass("fwb_tree-collapsed-hover");
			}
		});
		body.find("tr[node-id]").unbind(".fwb_treegrid").bind("mouseenter.fwb_treegrid",
		function() {
			var id = $(this).attr("node-id");
			body.find("tr[node-id=" + id + "]").addClass("fwb_datagrid-row-over");
		}).bind("mouseleave.fwb_treegrid",
		function() {
			var id = $(this).attr("node-id");
			body.find("tr[node-id=" + id + "]").removeClass("fwb_datagrid-row-over");
		}).bind("click.fwb_treegrid",
		function() {
			var id = $(this).attr("node-id");
			if (opts.singleSelect) {
				_5be(_5ba);
				_5f6(_5ba, id);
			} else {
				if ($(this).hasClass("fwb_datagrid-row-selected")) {
					_5f9(_5ba, id);
				} else {
					_5f6(_5ba, id);
				}
			}
			opts.onClickRow.call(_5ba, find(_5ba, id));
		}).bind("dblclick.fwb_treegrid",
		function() {
			var id = $(this).attr("node-id");
			opts.onDblClickRow.call(_5ba, find(_5ba, id));
		}).bind("contextfwb_menu.fwb_treegrid",
		function(e) {
			var id = $(this).attr("node-id");
			opts.onContextMenu.call(_5ba, e, find(_5ba, id));
		});
		body.find("div.fwb_datagrid-cell-check input[type=checkbox]").unbind(".fwb_treegrid").bind("click.fwb_treegrid",
		function(e) {
			var id = $(this).parent().parent().parent().attr("node-id");
			if (opts.singleSelect) {
				_5be(_5ba);
				_5f6(_5ba, id);
			} else {
				if ($(this).attr("checked")) {
					_5f6(_5ba, id);
				} else {
					_5f9(_5ba, id);
				}
			}
			e.stopPropagation();
		});
		var _5bc = _5bb.find("div.fwb_datagrid-header");
		_5bc.find("input[type=checkbox]").unbind().bind("click.fwb_treegrid",
		function() {
			if (opts.singleSelect) {
				return false;
			}
			if ($(this).attr("checked")) {
				_5bd(_5ba);
			} else {
				_5be(_5ba);
			}
		});
	};
	function _5bf(_5c0, _5c1) {
		var opts = $.data(_5c0, "fwb_treegrid").options;
		var view = $(_5c0).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
		var _5c2 = view.children("div.fwb_datagrid-view1");
		var _5c3 = view.children("div.fwb_datagrid-view2");
		var tr1 = _5c2.children("div.fwb_datagrid-body").find("tr[node-id=" + _5c1 + "]");
		var tr2 = _5c3.children("div.fwb_datagrid-body").find("tr[node-id=" + _5c1 + "]");
		var _5c4 = $(_5c0).fwb_datagrid("getColumnFields", true).length + (opts.rownumbers ? 1: 0);
		var _5c5 = $(_5c0).fwb_datagrid("getColumnFields", false).length;
		_5c6(tr1, _5c4);
		_5c6(tr2, _5c5);
		function _5c6(tr, _5c7) {
			$("<tr class=\"fwb_treegrid-tr-fwb_tree\">" + "<td style=\"border:0px\" colspan=\"" + _5c7 + "\">" + "<div></div>" + "</td>" + "</tr>").insertAfter(tr);
		};
	};
	function _5c8(_5c9, _5ca, data, _5cb) {
		var opts = $.data(_5c9, "fwb_treegrid").options;
		data = opts.loadFilter.call(_5c9, data, _5ca);
		var wrap = $.data(_5c9, "fwb_datagrid").fwb_panel;
		var view = wrap.children("div.fwb_datagrid-view");
		var _5cc = view.children("div.fwb_datagrid-view1");
		var _5cd = view.children("div.fwb_datagrid-view2");
		var node = find(_5c9, _5ca);
		if (node) {
			var _5ce = _5cc.children("div.fwb_datagrid-body").find("tr[node-id=" + _5ca + "]");
			var _5cf = _5cd.children("div.fwb_datagrid-body").find("tr[node-id=" + _5ca + "]");
			var cc1 = _5ce.next("tr.fwb_treegrid-tr-fwb_tree").children("td").children("div");
			var cc2 = _5cf.next("tr.fwb_treegrid-tr-fwb_tree").children("td").children("div");
		} else {
			var cc1 = _5cc.children("div.fwb_datagrid-body").children("div.fwb_datagrid-body-inner");
			var cc2 = _5cd.children("div.fwb_datagrid-body");
		}
		if (!_5cb) {
			$.data(_5c9, "fwb_treegrid").data = [];
			cc1.empty();
			cc2.empty();
		}
		if (opts.view.onBeforeRender) {
			opts.view.onBeforeRender.call(opts.view, _5c9, _5ca, data);
		}
		opts.view.render.call(opts.view, _5c9, cc1, true);
		opts.view.render.call(opts.view, _5c9, cc2, false);
		if (opts.showFooter) {
			opts.view.renderFooter.call(opts.view, _5c9, _5cc.find("div.fwb_datagrid-footer-inner"), true);
			opts.view.renderFooter.call(opts.view, _5c9, _5cd.find("div.fwb_datagrid-footer-inner"), false);
		}
		if (opts.view.onAfterRender) {
			opts.view.onAfterRender.call(opts.view, _5c9);
		}
		opts.onLoadSuccess.call(_5c9, node, data);
		if (!_5ca && opts.pagination) {
			var _5d0 = $.data(_5c9, "fwb_treegrid").total;
			var _5d1 = $(_5c9).fwb_datagrid("getPager");
			if (_5d1.fwb_pagination("options").total != _5d0) {
				_5d1.fwb_pagination({
					total: _5d0
				});
			}
		}
		_5a8(_5c9);
		_5b6(_5c9);
		_5d2();
		_5b9(_5c9);
		function _5d2() {
			var _5d3 = view.find("div.fwb_datagrid-header");
			var body = view.find("div.fwb_datagrid-body");
			var _5d4 = _5d3.find("div.fwb_datagrid-header-check");
			if (_5d4.length) {
				var ck = body.find("div.fwb_datagrid-cell-check");
				if ($.boxModel) {
					ck.width(_5d4.width());
					ck.height(_5d4.height());
				} else {
					ck.width(_5d4.outerWidth());
					ck.height(_5d4.outerHeight());
				}
			}
		};
	};
	function _5a7(_5d5, _5d6, _5d7, _5d8, _5d9) {
		var opts = $.data(_5d5, "fwb_treegrid").options;
		var body = $(_5d5).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		if (_5d7) {
			opts.queryParams = _5d7;
		}
		var _5da = $.extend({},
		opts.queryParams);
		if (opts.pagination) {
			$.extend(_5da, {
				page: opts.pageNumber,
				rows: opts.pageSize
			});
		}
		if (opts.sortName) {
			$.extend(_5da, {
				sort: opts.sortName,
				order: opts.sortOrder
			});
		}
		var row = find(_5d5, _5d6);
		if (opts.onBeforeLoad.call(_5d5, row, _5da) == false) {
			return;
		}
		if (!opts.url) {
			return;
		}
		var _5db = body.find("tr[node-id=" + _5d6 + "] span.fwb_tree-folder");
		_5db.addClass("fwb_tree-loading");
		$(_5d5).fwb_treegrid("loading");
		$.ajax({
			type: opts.method,
			url: opts.url,
			data: _5da,
			dataType: "json",
			success: function(data) {
				_5db.removeClass("fwb_tree-loading");
				$(_5d5).fwb_treegrid("loaded");
				_5c8(_5d5, _5d6, data, _5d8);
				if (_5d9) {
					_5d9();
				}
			},
			error: function() {
				_5db.removeClass("fwb_tree-loading");
				$(_5d5).fwb_treegrid("loaded");
				opts.onLoadError.apply(_5d5, arguments);
				if (_5d9) {
					_5d9();
				}
			}
		});
	};
	function _5dc(_5dd) {
		var rows = _5de(_5dd);
		if (rows.length) {
			return rows[0];
		} else {
			return null;
		}
	};
	function _5de(_5df) {
		return $.data(_5df, "fwb_treegrid").data;
	};
	function _5e0(_5e1, _5e2) {
		var row = find(_5e1, _5e2);
		if (row._parentId) {
			return find(_5e1, row._parentId);
		} else {
			return null;
		}
	};
	function _5e3(_5e4, _5e5) {
		var opts = $.data(_5e4, "fwb_treegrid").options;
		var body = $(_5e4).fwb_datagrid("getPanel").find("div.fwb_datagrid-view2 div.fwb_datagrid-body");
		var _5e6 = [];
		if (_5e5) {
			_5e7(_5e5);
		} else {
			var _5e8 = _5de(_5e4);
			for (var i = 0; i < _5e8.length; i++) {
				_5e6.push(_5e8[i]);
				_5e7(_5e8[i][opts.idField]);
			}
		}
		function _5e7(_5e9) {
			var _5ea = find(_5e4, _5e9);
			if (_5ea && _5ea.children) {
				for (var i = 0, len = _5ea.children.length; i < len; i++) {
					var _5eb = _5ea.children[i];
					_5e6.push(_5eb);
					_5e7(_5eb[opts.idField]);
				}
			}
		};
		return _5e6;
	};
	function _5ec(_5ed) {
		var rows = _5ee(_5ed);
		if (rows.length) {
			return rows[0];
		} else {
			return null;
		}
	};
	function _5ee(_5ef) {
		var rows = [];
		var _5f0 = $(_5ef).fwb_datagrid("getPanel");
		_5f0.find("div.fwb_datagrid-view2 div.fwb_datagrid-body tr.fwb_datagrid-row-selected").each(function() {
			var id = $(this).attr("node-id");
			rows.push(find(_5ef, id));
		});
		return rows;
	};
	function _5f1(_5f2, _5f3) {
		if (!_5f3) {
			return 0;
		}
		var opts = $.data(_5f2, "fwb_treegrid").options;
		var view = $(_5f2).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
		var node = view.find("div.fwb_datagrid-body tr[node-id=" + _5f3 + "]").children("td[field=" + opts.treeField + "]");
		return node.find("span.fwb_tree-indent,span.fwb_tree-hit").length;
	};
	function find(_5f4, _5f5) {
		var opts = $.data(_5f4, "fwb_treegrid").options;
		var data = $.data(_5f4, "fwb_treegrid").data;
		var cc = [data];
		while (cc.length) {
			var c = cc.shift();
			for (var i = 0; i < c.length; i++) {
				var node = c[i];
				if (node[opts.idField] == _5f5) {
					return node;
				} else {
					if (node["children"]) {
						cc.push(node["children"]);
					}
				}
			}
		}
		return null;
	};
	function _5f6(_5f7, _5f8) {
		var body = $(_5f7).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var tr = body.find("tr[node-id=" + _5f8 + "]");
		tr.addClass("fwb_datagrid-row-selected");
		tr.find("div.fwb_datagrid-cell-check input[type=checkbox]").attr("checked", true);
	};
	function _5f9(_5fa, _5fb) {
		var body = $(_5fa).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var tr = body.find("tr[node-id=" + _5fb + "]");
		tr.removeClass("fwb_datagrid-row-selected");
		tr.find("div.fwb_datagrid-cell-check input[type=checkbox]").attr("checked", false);
	};
	function _5bd(_5fc) {
		var tr = $(_5fc).fwb_datagrid("getPanel").find("div.fwb_datagrid-body tr[node-id]");
		tr.addClass("fwb_datagrid-row-selected");
		tr.find("div.fwb_datagrid-cell-check input[type=checkbox]").attr("checked", true);
	};
	function _5be(_5fd) {
		var tr = $(_5fd).fwb_datagrid("getPanel").find("div.fwb_datagrid-body tr[node-id]");
		tr.removeClass("fwb_datagrid-row-selected");
		tr.find("div.fwb_datagrid-cell-check input[type=checkbox]").attr("checked", false);
	};
	function _5fe(_5ff, _600) {
		var opts = $.data(_5ff, "fwb_treegrid").options;
		var body = $(_5ff).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var row = find(_5ff, _600);
		var tr = body.find("tr[node-id=" + _600 + "]");
		var hit = tr.find("span.fwb_tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("fwb_tree-collapsed")) {
			return;
		}
		if (opts.onBeforeCollapse.call(_5ff, row) == false) {
			return;
		}
		hit.removeClass("fwb_tree-expanded fwb_tree-expanded-hover").addClass("fwb_tree-collapsed");
		hit.next().removeClass("fwb_tree-folder-open");
		row.state = "closed";
		tr = tr.next("tr.fwb_treegrid-tr-fwb_tree");
		var cc = tr.children("td").children("div");
		if (opts.animate) {
			cc.slideUp("normal",
			function() {
				_5a8(_5ff, _600);
				opts.onCollapse.call(_5ff, row);
			});
		} else {
			cc.hide();
			_5a8(_5ff, _600);
			opts.onCollapse.call(_5ff, row);
		}
	};
	function _601(_602, _603) {
		var opts = $.data(_602, "fwb_treegrid").options;
		var body = $(_602).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var tr = body.find("tr[node-id=" + _603 + "]");
		var hit = tr.find("span.fwb_tree-hit");
		var row = find(_602, _603);
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("fwb_tree-expanded")) {
			return;
		}
		if (opts.onBeforeExpand.call(_602, row) == false) {
			return;
		}
		hit.removeClass("fwb_tree-collapsed fwb_tree-collapsed-hover").addClass("fwb_tree-expanded");
		hit.next().addClass("fwb_tree-folder-open");
		var _604 = tr.next("tr.fwb_treegrid-tr-fwb_tree");
		if (_604.length) {
			var cc = _604.children("td").children("div");
			_605(cc);
		} else {
			_5bf(_602, row[opts.idField]);
			var _604 = tr.next("tr.fwb_treegrid-tr-fwb_tree");
			var cc = _604.children("td").children("div");
			cc.hide();
			_5a7(_602, row[opts.idField], {
				id: row[opts.idField]
			},
			true,
			function() {
				_605(cc);
			});
		}
		function _605(cc) {
			row.state = "open";
			if (opts.animate) {
				cc.slideDown("normal",
				function() {
					_5a8(_602, _603);
					opts.onExpand.call(_602, row);
				});
			} else {
				cc.show();
				_5a8(_602, _603);
				opts.onExpand.call(_602, row);
			}
		};
	};
	function _606(_607, _608) {
		var body = $(_607).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var tr = body.find("tr[node-id=" + _608 + "]");
		var hit = tr.find("span.fwb_tree-hit");
		if (hit.hasClass("fwb_tree-expanded")) {
			_5fe(_607, _608);
		} else {
			_601(_607, _608);
		}
	};
	function _609(_60a, _60b) {
		var opts = $.data(_60a, "fwb_treegrid").options;
		var _60c = _5e3(_60a, _60b);
		if (_60b) {
			_60c.unshift(find(_60a, _60b));
		}
		for (var i = 0; i < _60c.length; i++) {
			_5fe(_60a, _60c[i][opts.idField]);
		}
	};
	function _60d(_60e, _60f) {
		var opts = $.data(_60e, "fwb_treegrid").options;
		var _610 = _5e3(_60e, _60f);
		if (_60f) {
			_610.unshift(find(_60e, _60f));
		}
		for (var i = 0; i < _610.length; i++) {
			_601(_60e, _610[i][opts.idField]);
		}
	};
	function _611(_612, _613) {
		var opts = $.data(_612, "fwb_treegrid").options;
		var ids = [];
		var p = _5e0(_612, _613);
		while (p) {
			var id = p[opts.idField];
			ids.unshift(id);
			p = _5e0(_612, id);
		}
		for (var i = 0; i < ids.length; i++) {
			_601(_612, ids[i]);
		}
	};
	function _614(_615, _616) {
		var opts = $.data(_615, "fwb_treegrid").options;
		if (_616.parent) {
			var body = $(_615).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
			var tr = body.find("tr[node-id=" + _616.parent + "]");
			if (tr.next("tr.fwb_treegrid-tr-fwb_tree").length == 0) {
				_5bf(_615, _616.parent);
			}
			var cell = tr.children("td[field=" + opts.treeField + "]").children("div.fwb_datagrid-cell");
			var _617 = cell.children("span.fwb_tree-icon");
			if (_617.hasClass("fwb_tree-file")) {
				_617.removeClass("fwb_tree-file").addClass("fwb_tree-folder");
				var hit = $("<span class=\"fwb_tree-hit fwb_tree-expanded\"></span>").insertBefore(_617);
				if (hit.prev().length) {
					hit.prev().remove();
				}
			}
		}
		_5c8(_615, _616.parent, _616.data, true);
	};
	function _618(_619, _61a) {
		var opts = $.data(_619, "fwb_treegrid").options;
		var body = $(_619).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
		var tr = body.find("tr[node-id=" + _61a + "]");
		tr.next("tr.fwb_treegrid-tr-fwb_tree").remove();
		tr.remove();
		var _61b = del(_61a);
		if (_61b) {
			if (_61b.children.length == 0) {
				tr = body.find("tr[node-id=" + _61b[opts.treeField] + "]");
				var cell = tr.children("td[field=" + opts.treeField + "]").children("div.fwb_datagrid-cell");
				cell.find(".fwb_tree-icon").removeClass("fwb_tree-folder").addClass("fwb_tree-file");
				cell.find(".fwb_tree-hit").remove();
				$("<span class=\"fwb_tree-indent\"></span>").prependTo(cell);
			}
		}
		_5b6(_619);
		function del(id) {
			var cc;
			var _61c = _5e0(_619, _61a);
			if (_61c) {
				cc = _61c.children;
			} else {
				cc = $(_619).fwb_treegrid("getData");
			}
			for (var i = 0; i < cc.length; i++) {
				if (cc[i][opts.treeField] == id) {
					cc.splice(i, 1);
					break;
				}
			}
			return _61c;
		};
	};
	$.fn.fwb_treegrid = function(_61d, _61e) {
		if (typeof _61d == "string") {
			var _61f = $.fn.fwb_treegrid.methods[_61d];
			if (_61f) {
				return _61f(this, _61e);
			} else {
				return this.fwb_datagrid(_61d, _61e);
			}
		}
		_61d = _61d || {};
		return this.each(function() {
			var _620 = $.data(this, "fwb_treegrid");
			if (_620) {
				$.extend(_620.options, _61d);
			} else {
				$.data(this, "fwb_treegrid", {
					options: $.extend({},
					$.fn.fwb_treegrid.defaults, $.fn.fwb_treegrid.parseOptions(this), _61d),
					data: []
				});
			}
			_59b(this);
			_5a7(this);
		});
	};
	$.fn.fwb_treegrid.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_treegrid").options;
		},
		resize: function(jq, _621) {
			return jq.each(function() {
				$(this).fwb_datagrid("resize", _621);
			});
		},
		fixRowHeight: function(jq, _622) {
			return jq.each(function() {
				_5a8(this, _622);
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_5c8(this, null, data);
			});
		},
		reload: function(jq, id) {
			return jq.each(function() {
				if (id) {
					var node = $(this).fwb_treegrid("find", id);
					if (node.children) {
						node.children.splice(0, node.children.length);
					}
					var body = $(this).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
					var tr = body.find("tr[node-id=" + id + "]");
					tr.next("tr.fwb_treegrid-tr-fwb_tree").remove();
					var hit = tr.find("span.fwb_tree-hit");
					hit.removeClass("fwb_tree-expanded fwb_tree-expanded-hover").addClass("fwb_tree-collapsed");
					_601(this, id);
				} else {
					_5a7(this, null, {});
				}
			});
		},
		reloadFooter: function(jq, _623) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_treegrid").options;
				var view = $(this).fwb_datagrid("getPanel").children("div.fwb_datagrid-view");
				var _624 = view.children("div.fwb_datagrid-view1");
				var _625 = view.children("div.fwb_datagrid-view2");
				if (_623) {
					$.data(this, "fwb_treegrid").footer = _623;
				}
				if (opts.showFooter) {
					opts.view.renderFooter.call(opts.view, this, _624.find("div.fwb_datagrid-footer-inner"), true);
					opts.view.renderFooter.call(opts.view, this, _625.find("div.fwb_datagrid-footer-inner"), false);
					if (opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, this);
					}
					$(this).fwb_treegrid("fixRowHeight");
				}
			});
		},
		loading: function(jq) {
			return jq.each(function() {
				$(this).fwb_datagrid("loading");
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				$(this).fwb_datagrid("loaded");
			});
		},
		getData: function(jq) {
			return $.data(jq[0], "fwb_treegrid").data;
		},
		getFooterRows: function(jq) {
			return $.data(jq[0], "fwb_treegrid").footer;
		},
		getRoot: function(jq) {
			return _5dc(jq[0]);
		},
		getRoots: function(jq) {
			return _5de(jq[0]);
		},
		getParent: function(jq, id) {
			return _5e0(jq[0], id);
		},
		getChildren: function(jq, id) {
			return _5e3(jq[0], id);
		},
		getSelected: function(jq) {
			return _5ec(jq[0]);
		},
		getSelections: function(jq) {
			return _5ee(jq[0]);
		},
		getLevel: function(jq, id) {
			return _5f1(jq[0], id);
		},
		find: function(jq, id) {
			return find(jq[0], id);
		},
		isLeaf: function(jq, id) {
			var opts = $.data(jq[0], "fwb_treegrid").options;
			var tr = opts.editConfig.getTr(jq[0], id);
			var hit = tr.find("span.fwb_tree-hit");
			return hit.length == 0;
		},
		select: function(jq, id) {
			return jq.each(function() {
				_5f6(this, id);
			});
		},
		unselect: function(jq, id) {
			return jq.each(function() {
				_5f9(this, id);
			});
		},
		selectAll: function(jq) {
			return jq.each(function() {
				_5bd(this);
			});
		},
		unselectAll: function(jq) {
			return jq.each(function() {
				_5be(this);
			});
		},
		collapse: function(jq, id) {
			return jq.each(function() {
				_5fe(this, id);
			});
		},
		expand: function(jq, id) {
			return jq.each(function() {
				_601(this, id);
			});
		},
		toggle: function(jq, id) {
			return jq.each(function() {
				_606(this, id);
			});
		},
		collapseAll: function(jq, id) {
			return jq.each(function() {
				_609(this, id);
			});
		},
		expandAll: function(jq, id) {
			return jq.each(function() {
				_60d(this, id);
			});
		},
		expandTo: function(jq, id) {
			return jq.each(function() {
				_611(this, id);
			});
		},
		append: function(jq, _626) {
			return jq.each(function() {
				_614(this, _626);
			});
		},
		remove: function(jq, id) {
			return jq.each(function() {
				_618(this, id);
			});
		},
		refresh: function(jq, id) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_treegrid").options;
				opts.view.refreshRow.call(opts.view, this, id);
			});
		},
		beginEdit: function(jq, id) {
			return jq.each(function() {
				$(this).fwb_datagrid("beginEdit", id);
				$(this).fwb_treegrid("fixRowHeight", id);
			});
		},
		endEdit: function(jq, id) {
			return jq.each(function() {
				$(this).fwb_datagrid("endEdit", id);
			});
		},
		cancelEdit: function(jq, id) {
			return jq.each(function() {
				$(this).fwb_datagrid("cancelEdit", id);
			});
		}
	};
	$.fn.fwb_treegrid.parseOptions = function(_627) {
		var t = $(_627);
		return $.extend({},
		$.fn.fwb_datagrid.parseOptions(_627), {
			treeField: t.attr("treeField"),
			animate: (t.attr("animate") ? t.attr("animate") == "true": undefined)
		});
	};
	var _628 = $.extend({},
	$.fn.fwb_datagrid.defaults.view, {
		render: function(_629, _62a, _62b) {
			var opts = $.data(_629, "fwb_treegrid").options;
			var _62c = $(_629).fwb_datagrid("getColumnFields", _62b);
			var view = this;
			var _62d = _62e(_62b, this.treeLevel, this.treeNodes);
			$(_62a).append(_62d.join(""));
			function _62e(_62f, _630, _631) {
				var _632 = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
				for (var i = 0; i < _631.length; i++) {
					var row = _631[i];
					if (row.state != "open" && row.state != "closed") {
						row.state = "open";
					}
					var _633 = opts.rowStyler ? opts.rowStyler.call(_629, row) : "";
					var _634 = _633 ? "style=\"" + _633 + "\"": "";
					_632.push("<tr node-id=" + row[opts.idField] + " " + _634 + ">");
					_632 = _632.concat(view.renderRow.call(view, _629, _62c, _62f, _630, row));
					_632.push("</tr>");
					if (row.children && row.children.length) {
						var tt = _62e(_62f, _630 + 1, row.children);
						var v = row.state == "closed" ? "none": "block";
						_632.push("<tr class=\"fwb_treegrid-tr-fwb_tree\"><td style=\"border:0px\" colspan=" + (_62c.length + (opts.rownumbers ? 1: 0)) + "><div style=\"display:" + v + "\">");
						_632 = _632.concat(tt);
						_632.push("</div></td></tr>");
					}
				}
				_632.push("</tbody></table>");
				return _632;
			};
		},
		renderFooter: function(_635, _636, _637) {
			var opts = $.data(_635, "fwb_treegrid").options;
			var rows = $.data(_635, "fwb_treegrid").footer || [];
			var _638 = $(_635).fwb_datagrid("getColumnFields", _637);
			var _639 = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				row[opts.idField] = row[opts.idField] || ("foot-row-id" + i);
				_639.push("<tr node-id=" + row[opts.idField] + ">");
				_639.push(this.renderRow.call(this, _635, _638, _637, 0, row));
				_639.push("</tr>");
			}
			_639.push("</tbody></table>");
			$(_636).html(_639.join(""));
		},
		renderRow: function(_63a, _63b, _63c, _63d, row) {
			var opts = $.data(_63a, "fwb_treegrid").options;
			var cc = [];
			if (_63c && opts.rownumbers) {
				cc.push("<td class=\"fwb_datagrid-td-rownumber\"><div class=\"fwb_datagrid-cell-rownumber\">0</div></td>");
			}
			for (var i = 0; i < _63b.length; i++) {
				var _63e = _63b[i];
				var col = $(_63a).fwb_datagrid("getColumnOption", _63e);
				if (col) {
					var _63f = col.styler ? (col.styler(row[_63e], row) || "") : "";
					var _640 = col.hidden ? "style=\"display:none;" + _63f + "\"": (_63f ? "style=\"" + _63f + "\"": "");
					cc.push("<td field=\"" + _63e + "\" " + _640 + ">");
					var _640 = "width:" + (col.boxWidth) + "px;";
					_640 += "text-align:" + (col.align || "left") + ";";
					_640 += opts.nowrap == false ? "white-space:normal;": "";
					cc.push("<div style=\"" + _640 + "\" ");
					if (col.checkbox) {
						cc.push("class=\"fwb_datagrid-cell-check ");
					} else {
						cc.push("class=\"fwb_datagrid-cell ");
					}
					cc.push("\">");
					if (col.checkbox) {
						if (row.checked) {
							cc.push("<input type=\"checkbox\" checked=\"checked\"/>");
						} else {
							cc.push("<input type=\"checkbox\"/>");
						}
					} else {
						var val = null;
						if (col.formatter) {
							val = col.formatter(row[_63e], row);
						} else {
							val = row[_63e] || "&nbsp;";
						}
						if (_63e == opts.treeField) {
							for (var j = 0; j < _63d; j++) {
								cc.push("<span class=\"fwb_tree-indent\"></span>");
							}
							if (row.state == "closed") {
								cc.push("<span class=\"fwb_tree-hit fwb_tree-collapsed\"></span>");
								cc.push("<span class=\"fwb_tree-icon fwb_tree-folder " + (row.iconCls ? row.iconCls: "") + "\"></span>");
							} else {
								if (row.children && row.children.length) {
									cc.push("<span class=\"fwb_tree-hit fwb_tree-expanded\"></span>");
									cc.push("<span class=\"fwb_tree-icon fwb_tree-folder fwb_tree-folder-open " + (row.iconCls ? row.iconCls: "") + "\"></span>");
								} else {
									cc.push("<span class=\"fwb_tree-indent\"></span>");
									cc.push("<span class=\"fwb_tree-icon fwb_tree-file " + (row.iconCls ? row.iconCls: "") + "\"></span>");
								}
							}
							cc.push("<span class=\"fwb_tree-title\" title=\""+ val +"\">" + val + "</span>"); // hap add (2011.12.21): 增加title提示
						} else {
							cc.push(val);
						}
					}
					cc.push("</div>");
					cc.push("</td>");
				}
			}
			return cc.join("");
		},
		refreshRow: function(_641, id) {
			var row = $(_641).fwb_treegrid("find", id);
			var opts = $.data(_641, "fwb_treegrid").options;
			var body = $(_641).fwb_datagrid("getPanel").find("div.fwb_datagrid-body");
			var _642 = opts.rowStyler ? opts.rowStyler.call(_641, row) : "";
			var _643 = _642 ? _642: "";
			var tr = body.find("tr[node-id=" + id + "]");
			tr.attr("style", _643);
			tr.children("td").each(function() {
				var cell = $(this).find("div.fwb_datagrid-cell");
				var _644 = $(this).attr("field");
				var col = $(_641).fwb_datagrid("getColumnOption", _644);
				if (col) {
					var _645 = col.styler ? (col.styler(row[_644], row) || "") : "";
					var _646 = col.hidden ? "display:none;" + _645: (_645 ? _645: "");
					$(this).attr("style", _646);
					var val = null;
					if (col.formatter) {
						val = col.formatter(row[_644], row);
					} else {
						val = row[_644] || "&nbsp;";
					}
					if (_644 == opts.treeField) {
						cell.children("span.fwb_tree-title").html(val);
						var cls = "fwb_tree-icon";
						var icon = cell.children("span.fwb_tree-icon");
						if (icon.hasClass("fwb_tree-folder")) {
							cls += " fwb_tree-folder";
						}
						if (icon.hasClass("fwb_tree-folder-open")) {
							cls += " fwb_tree-folder-open";
						}
						if (icon.hasClass("fwb_tree-file")) {
							cls += " fwb_tree-file";
						}
						if (row.iconCls) {
							cls += " " + row.iconCls;
						}
						icon.attr("class", cls);
					} else {
						cell.html(val);
					}
				}
			});
			$(_641).fwb_treegrid("fixRowHeight", id);
		},
		onBeforeRender: function(_647, _648, data) {
			if (!data) {
				return false;
			}
			var opts = $.data(_647, "fwb_treegrid").options;
			if (data.length == undefined) {
				if (data.footer) {
					$.data(_647, "fwb_treegrid").footer = data.footer;
				}
				if (data.total) {
					$.data(_647, "fwb_treegrid").total = data.total;
				}
				data = this.transfer(_647, _648, data.rows);
			} else {
				function _649(_64a, _64b) {
					for (var i = 0; i < _64a.length; i++) {
						var row = _64a[i];
						row._parentId = _64b;
						if (row.children && row.children.length) {
							_649(row.children, row[opts.idField]);
						}
					}
				};
				_649(data, _648);
			}
			var node = find(_647, _648);
			if (node) {
				if (node.children) {
					node.children = node.children.concat(data);
				} else {
					node.children = data;
				}
			} else {
				$.data(_647, "fwb_treegrid").data = $.data(_647, "fwb_treegrid").data.concat(data);
			}
			if (!opts.remoteSort) {
				this.sort(_647, data);
			}
			this.treeNodes = data;
			this.treeLevel = $(_647).fwb_treegrid("getLevel", _648);
		},
		sort: function(_64c, data) {
			var opts = $.data(_64c, "fwb_treegrid").options;
			var opt = $(_64c).fwb_treegrid("getColumnOption", opts.sortName);
			if (opt) {
				var _64d = opt.sorter ||
				function(a, b) {
					return (a > b ? 1: -1);
				};
				_64e(data);
			}
			function _64e(rows) {
				rows.sort(function(r1, r2) {
					return _64d(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1: -1);
				});
				for (var i = 0; i < rows.length; i++) {
					var _64f = rows[i].children;
					if (_64f && _64f.length) {
						_64e(_64f);
					}
				}
			};
		},
		transfer: function(_650, _651, data) {
			var opts = $.data(_650, "fwb_treegrid").options;
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push(data[i]);
			}
			var _652 = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (!_651) {
					if (!row._parentId) {
						_652.push(row);
						rows.remove(row);
						i--;
					}
				} else {
					if (row._parentId == _651) {
						_652.push(row);
						rows.remove(row);
						i--;
					}
				}
			}
			var toDo = [];
			for (var i = 0; i < _652.length; i++) {
				toDo.push(_652[i]);
			}
			while (toDo.length) {
				var node = toDo.shift();
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					if (row._parentId == node[opts.idField]) {
						if (node.children) {
							node.children.push(row);
						} else {
							node.children = [row];
						}
						toDo.push(row);
						rows.remove(row);
						i--;
					}
				}
			}
			return _652;
		}
	});
	$.fn.fwb_treegrid.defaults = $.extend({},
	$.fn.fwb_datagrid.defaults, {
		treeField: null,
		animate: false,
		singleSelect: true,
		view: _628,
		loadFilter: function(data, _653) {
			return data;
		},
		editConfig: {
			getTr: function(_654, id) {
				return $(_654).fwb_datagrid("getPanel").find("div.fwb_datagrid-body tr[node-id=" + id + "]");
			},
			getRow: function(_655, id) {
				return $(_655).fwb_treegrid("find", id);
			}
		},
		onBeforeLoad: function(row, _656) {
			},
		onLoadSuccess: function(row, data) {
			},
		onLoadError: function() {
			},
		onBeforeCollapse: function(row) {
			},
		onCollapse: function(row) {
			},
		onBeforeExpand: function(row) {
			},
		onExpand: function(row) {
			},
		onClickRow: function(row) {
			},
		onDblClickRow: function(row) {
			},
		onContextMenu: function(e, row) {
			},
		onBeforeEdit: function(row) {
			},
		onAfterEdit: function(row, _657) {
			},
		onCancelEdit: function(row) {
			}
	});
})(fn.jQuery);
 (function($) {
	function _658(_659, _65a) {
		var opts = $.data(_659, "fwb_combo").options;
		var _65b = $.data(_659, "fwb_combo").fwb_combo;
		var _65c = $.data(_659, "fwb_combo").fwb_panel;
		if (_65a) {
			opts.width = _65a;
		}
		_65b.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = _65b.find("input.fwb_combo-text").outerWidth();
		}
		var _65d = 0;
		if (opts.hasDownArrow) {
			_65d = _65b.find(".fwb_combo-arrow").outerWidth();
		}
		var _65a = opts.width - _65d;
		if ($.boxModel == true) {
			_65a -= _65b.outerWidth() - _65b.width();
		}
		_65b.find("input.fwb_combo-text").width(_65a);
		_65c.fwb_panel("resize", {
			width: (opts.panelWidth ? opts.panelWidth: _65b.outerWidth()),
			height: opts.panelHeight,
			mustInWindow: true
		});
		_65b.insertAfter(_659);
	};
	function _65e(_65f) {
		var opts = $.data(_65f, "fwb_combo").options;
		var _660 = $.data(_65f, "fwb_combo").fwb_combo;
		if (opts.hasDownArrow) {
			_660.find(".fwb_combo-arrow").show();
		} else {
			_660.find(".fwb_combo-arrow").hide();
		}
	};
	function init(_661) {
		$(_661).addClass("fwb_combo-f").hide();
		var span = $("<span class=\"fwb_combo\"></span>").insertAfter(_661);
		var _662 = $("<input type=\"text\" class=\"fwb_combo-text\">").appendTo(span);
		$("<span><span class=\"fwb_combo-arrow\"></span></span>").appendTo(span);
		$("<input type=\"hidden\" class=\"fwb_combo-value\">").appendTo(span);
		var _663 = $("<div class=\"fwb_combo-fwb_panel\"></div>").appendTo("body");
		_663.fwb_panel({
			doSize: false,
			closed: true,
			style: {
				position: "absolute",
				zIndex: 10
			},
			onOpen: function() {
				$(this).fwb_panel("resize");
				
				// 2012.09 hap add 
				// 防止被穿透
				_663.bgiframe({
					height: _663.height() - 2,
					width: _663.width() - 2 // 减2解决因为bgiframe引起的下拉框出现滚动条问题
				});
			}
		});
		var name = $(_661).attr("name");
		if (name) {
			span.find("input.fwb_combo-value").attr("name", name);
			$(_661).removeAttr("name").attr("comboName", name);
		}
		_662.attr("autocomplete", "off");
		
		return {
			fwb_combo: span,
			fwb_panel: _663
		};
	};
	function _664(_665) {
		var _666 = $.data(_665, "fwb_combo").fwb_combo.find("input.fwb_combo-text");
		_666.fwb_validatebox("destroy");
		$.data(_665, "fwb_combo").fwb_panel.fwb_panel("destroy");
		$.data(_665, "fwb_combo").fwb_combo.remove();
		$(_665).remove();
	};
	function _667(_668) {
		var _669 = $.data(_668, "fwb_combo");
		var opts = _669.options;
		var _66a = $.data(_668, "fwb_combo").fwb_combo;
		var _66b = $.data(_668, "fwb_combo").fwb_panel;
		var _66c = _66a.find(".fwb_combo-text");
		var _66d = _66a.find(".fwb_combo-arrow");
		$(document).unbind(".fwb_combo").bind("mousedown.fwb_combo",
		function(e) {
			$("div.fwb_combo-fwb_panel").fwb_panel("close");
		});
		_66a.unbind(".fwb_combo");
		_66b.unbind(".fwb_combo");
		_66c.unbind(".fwb_combo");
		_66d.unbind(".fwb_combo");
		if (!opts.disabled) {
			_66b.bind("mousedown.fwb_combo",
			function(e) {
				return false;
			});
			_66c.bind("mousedown.fwb_combo",
			function(e) {
				e.stopPropagation();
			}).bind("keydown.fwb_combo",
			function(e) {
				switch (e.keyCode) {
				case 38:
					opts.keyHandler.up.call(_668);
					break;
				case 40:
					opts.keyHandler.down.call(_668);
					break;
				case 13:
					e.preventDefault();
					opts.keyHandler.enter.call(_668);
					return false;
				case 9:
				case 27:
					_674(_668);
					break;
				default:
					if (opts.editable && !opts.autoRequest) {
						if (_669.timer) {
							clearTimeout(_669.timer);
						}
						_669.timer = setTimeout(function() {
							var q = _66c.val();
							if (_669.previousValue != q) {
								_669.previousValue = q;
								_66e(_668);
								opts.keyHandler.query.call(_668, _66c.val());
								_677(_668, true);
							}
						},
						opts.delay);
					}
				}
			});
			_66d.bind("click.fwb_combo",
			function() {
				if (_66b.is(":visible")) {
					_674(_668);
				} else {
					$("div.fwb_combo-fwb_panel").fwb_panel("close");
					_66e(_668);
				}
				_66c.focus();
			}).bind("mouseenter.fwb_combo",
			function() {
				$(this).addClass("fwb_combo-arrow-hover");
			}).bind("mouseleave.fwb_combo",
			function() {
				$(this).removeClass("fwb_combo-arrow-hover");
			}).bind("mousedown.fwb_combo",
			function() {
				return false;
			});
			
			// hap add (2011.08.26) 用户输入值发生变化时触发
			if($.isFunction(opts.onInputChange)) _66c.keyup(function(e){
				var oldV = _66c.data("_oldv") || "",
					newV = _66c.val();
				
				if(!newV || (newV != oldV)){
					setTimeout(function(){
						if(newV == _66c.val()){// 如果600毫秒内用户没有输入再调用回调
							opts.onInputChange.call(_668, newV);
							_66c.data("autoRequesting", false);
						};
					}, opts.autoRequestTime || 600);
					
					//_66e(_668);
					_66c.data("autoRequesting", true);
				};
				_66c.data("_oldv", newV);
			});
			//
		}
	};
	function _66e(_66f) {
		var opts = $.data(_66f, "fwb_combo").options;
		var _670 = $.data(_66f, "fwb_combo").fwb_combo;
		var _671 = $.data(_66f, "fwb_combo").fwb_panel;
		if ($.fn.fwb_window) {
			_671.fwb_panel("fwb_panel").css("z-index", $.fn.fwb_window.defaults.zIndex++);
		}
		_671.fwb_panel("move", {
			left: _670.offset().left,
			top: _672()
		});
		_671.fwb_panel("open");
		opts.onShowPanel.call(_66f);
		
		// 2011.8.10 hap修改：解决下拉框在IE6下被select控件穿透问题
		var top;
		(function() {
			if (_671.is(":visible")) {
				var offset = {
						left: _673(),
						top:  _672()
					},
					refresh = top != offset.top;
					
				if(refresh){
					_671.fwb_panel("move", offset);
					
					// 2011.11.28 hap修改：解决下拉框在IE6下被select控件穿透问题
					//$(_671).parent().bgiframe();
					
					top = offset.top;
				};
				setTimeout(arguments.callee, 200);
			}
		})();
		function _673() {
			var left = _670.offset().left;
			if (left + _671.outerWidth() > $(window).width() + $(document).scrollLeft()) {
				left = $(window).width() + $(document).scrollLeft() - _671.outerWidth();
			}
			if (left < 0) {
				left = 0;
			}
			return left;
		};
		function _672() {
			
			/*
			var top = _670.offset().top + _670.outerHeight();
			if (top + _671.outerHeight() > $(window).height() + $(document).scrollTop()) {
				top = _670.offset().top - _671.outerHeight();
			}
			if (top < $(document).scrollTop()) {
				top = _670.offset().top + _670.outerHeight();
			}
			
			return top;
			*/
			
			// 2011.8.6 hap修改：解决IE下位置bug
			var scroll = document.documentElement.scrollTop + document.body.scrollTop,
				top = _670.offset().top + _670.outerHeight() + ($(document).scrollTop() ? 0 : scroll);
			
			if (top + _671.outerHeight() > $(window).height() + scroll) {
				top = _670.offset().top - _671.outerHeight() + ($(document).scrollTop() ? 0 : scroll);
			}
			if (top < $(document).scrollTop()) {
				top = _670.offset().top + _670.outerHeight();
			}
			
			return top;
		};
	};
	function _674(_675) {
		var opts = $.data(_675, "fwb_combo").options;
		var _676 = $.data(_675, "fwb_combo").fwb_panel;
		_676.fwb_panel("close");
		opts.onHidePanel.call(_675);
	};
	function _677(_678, doit) {
		var opts = $.data(_678, "fwb_combo").options;
		var _679 = $.data(_678, "fwb_combo").fwb_combo.find("input.fwb_combo-text");
		_679.fwb_validatebox(opts);
		if (doit) {
			_679.fwb_validatebox("validate");
			_679.trigger("mouseleave");
		}
	};
	function _67a(_67b, _67c) {
		var opts = $.data(_67b, "fwb_combo").options;
		var _67d = $.data(_67b, "fwb_combo").fwb_combo;
		if (_67c) {
			opts.disabled = true;
			$(_67b).attr("disabled", true);
			_67d.find(".fwb_combo-value").attr("disabled", true);
			_67d.find(".fwb_combo-text").attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_67b).removeAttr("disabled");
			_67d.find(".fwb_combo-value").removeAttr("disabled");
			_67d.find(".fwb_combo-text").removeAttr("disabled");
		}
	};
	function _67e(_67f) {
		var opts = $.data(_67f, "fwb_combo").options;
		var _680 = $.data(_67f, "fwb_combo").fwb_combo;
		if (opts.multiple) {
			_680.find("input.fwb_combo-value").remove();
		} else {
			_680.find("input.fwb_combo-value").val("");
		}
		_680.find("input.fwb_combo-text").val("");
	};
	function _681(_682) {
		var _683 = $.data(_682, "fwb_combo").fwb_combo;
		return _683.find("input.fwb_combo-text").val();
	};
	function _684(_685, text) {
		var _686 = $.data(_685, "fwb_combo").fwb_combo;
		_686.find("input.fwb_combo-text").val(text);
		_677(_685, true);
		$.data(_685, "fwb_combo").previousValue = text;
		// hap 2012/3/22 解决combotree由于freeInput引起的check问题
		_686.find("input.fwb_combo-text").data("settext", text);
	};
	function _687(_688) {
		var _689 = [];
		var _68a = $.data(_688, "fwb_combo").fwb_combo;
		_68a.find("input.fwb_combo-value").each(function() {
			_689.push($(this).val());
		});
		return _689;
	};
	function _68b(_68c, _68d) {
		var opts = $.data(_68c, "fwb_combo").options;
		var _68e = _687(_68c);
		var _68f = $.data(_68c, "fwb_combo").fwb_combo;
		_68f.find("input.fwb_combo-value").remove();
		var name = $(_68c).attr("comboName");
		// hap add 2012/10/24
		// 增加valueType参数（多个值存在一个input里面，以逗号分隔）
		if(opts.valueType === "string"){
			var _690 = $("<input type=\"hidden\" class=\"fwb_combo-value\">").appendTo(_68f);
			if (name) {
				_690.attr("name", name);
			}
			_690.val(_68d.join(","));
		}else{
			// 原有代码
			for (var i = 0; i < _68d.length; i++) {
				var _690 = $("<input type=\"hidden\" class=\"fwb_combo-value\">").appendTo(_68f);
				if (name) {
					_690.attr("name", name);
				}
				_690.val(_68d[i]);
			};
		};
		var tmp = [];
		for (var i = 0; i < _68e.length; i++) {
			tmp[i] = _68e[i];
		}
		var aa = [];
		for (var i = 0; i < _68d.length; i++) {
			for (var j = 0; j < tmp.length; j++) {
				if (_68d[i] == tmp[j]) {
					aa.push(_68d[i]);
					tmp.splice(j, 1);
					break;
				}
			}
		}
		if (aa.length != _68d.length || _68d.length != _68e.length) {
			if (opts.multiple) {
				opts.onChange.call(_68c, _68d, _68e);
			} else {
				opts.onChange.call(_68c, _68d[0], _68e[0]);
			}
		};
	};
	function _691(_692) {
		var _693 = _687(_692);
		return _693[0];
	};
	function _694(_695, _696) {
		_68b(_695, [_696]);
	};
	function _697(_698) {
		var opts = $.data(_698, "fwb_combo").options;
		var fn = opts.onChange;
		opts.onChange = function() {
			};
		if (opts.multiple) {
			if (opts.value) {
				if (typeof opts.value == "object") {
					_68b(_698, opts.value);
				} else {
					_694(_698, opts.value);
				}
			} else {
				_68b(_698, []);
			}
		} else {
			_694(_698, opts.value);
		}
		opts.onChange = fn;
	};
	$.fn.fwb_combo = function(_699, _69a) {
		if (typeof _699 == "string") {
			try{return $.fn.fwb_combo.methods[_699](this, _69a);}catch(e){
				window.console && console.log("method "+_699+" is undefined");
			};
		}
		_699 = _699 || {};
		return this.each(function() {
			var _69b = $.data(this, "fwb_combo");
			if (_69b) {
				$.extend(_69b.options, _699);
			} else {
				var r = init(this);
				_69b = $.data(this, "fwb_combo", {
					options: $.extend({},
					$.fn.fwb_combo.defaults, $.fn.fwb_combo.parseOptions(this), _699),
					fwb_combo: r.fwb_combo,
					fwb_panel: r.fwb_panel,
					previousValue: null
				});
				$(this).removeAttr("disabled");
			}
			$("input.fwb_combo-text", _69b.fwb_combo).attr("readonly", !_69b.options.editable);
			_65e(this);
			_67a(this, _69b.options.disabled);
			_658(this);
			_667(this);
			_677(this);
			_697(this);
		});
	};
	$.fn.fwb_combo.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_combo").options;
		},
		panel: function(jq) {
			return $.fn.fwb_combo.methods.fwb_panel(jq);
		},
		fwb_panel: function(jq){
			return $.data(jq[0], "fwb_combo").fwb_panel;
		},
		textbox: function(jq) {
			return $.data(jq[0], "fwb_combo").fwb_combo.find("input.fwb_combo-text");
		},
		destroy: function(jq) {
			return jq.each(function() {
				_664(this);
			});
		},
		resize: function(jq, _69c) {
			return jq.each(function() {
				_658(this, _69c);
			});
		},
		showPanel: function(jq) {
			return jq.each(function() {
				_66e(this);
			});
		},
		hidePanel: function(jq) {
			return jq.each(function() {
				_674(this);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_67a(this, true);
				_667(this);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_67a(this, false);
				_667(this);
			});
		},
		validate: function(jq) {
			return jq.each(function() {
				_677(this, true);
			});
		},
		isValid: function(jq) {
			var _69d = $.data(jq[0], "fwb_combo").fwb_combo.find("input.fwb_combo-text");
			return _69d.fwb_validatebox("isValid");
		},
		clear: function(jq) {
			return jq.each(function() {
				_67e(this);
			});
		},
		getText: function(jq) {
			return _681(jq[0]);
		},
		setText: function(jq, text) {
			return jq.each(function() {
				_684(this, text);
			});
		},
		getValues: function(jq) {
			return _687(jq[0]);
		},
		setValues: function(jq, _69e) {
			return jq.each(function() {
				_68b(this, _69e);
			});
		},
		getValue: function(jq) {
			return _691(jq[0]);
		},
		setValue: function(jq, _69f) {
			return jq.each(function() {
				_694(this, _69f);
			});
		}
	};
	$.fn.fwb_combo.parseOptions = function(_6a0) {
		var t = $(_6a0);
		return $.extend({},
		$.fn.fwb_validatebox.parseOptions(_6a0), {
			width: (parseInt(_6a0.style.width) || undefined),
			panelWidth: (parseInt(t.attr("panelWidth")) || undefined),
			panelHeight: (t.attr("panelHeight") == "auto" ? "auto": parseInt(t.attr("panelHeight")) || "auto"),
			separator: (t.attr("separator") || undefined),
			multiple: (t.attr("multiple") ? (t.attr("multiple") == "true" || t.attr("multiple") == true) : undefined),
			editable: (t.attr("editable") ? t.attr("editable") == "true": undefined),
			autoRequest: (t.attr("autoRequest") ? t.attr("autoRequest") == "true": undefined),
			disabled: (t.attr("disabled") ? true: undefined),
			hasDownArrow: (t.attr("hasDownArrow") ? t.attr("hasDownArrow") == "true": undefined),
			value: (t.val() || undefined),
			delay: (t.attr("delay") ? parseInt(t.attr("delay")) : undefined),
			valueType: t.attr("valueType")
		});
	};
	$.fn.fwb_combo.defaults = $.extend({},
	$.fn.fwb_validatebox.defaults, {
		width: "auto",
		panelWidth: null,
		panelHeight: 200,
		multiple: false,
		separator: ",",
		editable: true,
		disabled: false,
		hasDownArrow: true,
		value: "",
		delay: 200,
		keyHandler: {
			up: function() {
				},
			down: function() {
				},
			enter: function() {
				},
			query: function(q) {
				}
		},
		onShowPanel: function() {
			},
		onHidePanel: function() {
			},
		onChange: function(_6a1, _6a2) {
			}
	});
})(fn.jQuery);
 (function($) {
	function _6a3(_6a4, _6a5) {
		var _6a6 = $(_6a4).fwb_combo("fwb_panel");
		var item = _6a6.find("div.fwb_combobox-item[value=" + _6a5 + "]");
		if (item.length) {
			if (item.position().top <= 0) {
				var h = _6a6.scrollTop() + item.position().top;
				_6a6.scrollTop(h);
			} else {
				if (item.position().top + item.outerHeight() > _6a6.height()) {
					var h = _6a6.scrollTop() + item.position().top + item.outerHeight() - _6a6.height();
					_6a6.scrollTop(h);
				}
			}
		}
	};
	function _6a7(_6a8) {
		var _6a9 = $(_6a8).fwb_combo("fwb_panel");
		var _6aa = $(_6a8).fwb_combo("getValues");
		var item = _6a9.find("div.fwb_combobox-item[value=" + _6aa.pop() + "]");
		if (item.length) {
			var prev = item.prev(":visible");
			if (prev.length) {
				item = prev;
			}
		} else {
			item = _6a9.find("div.fwb_combobox-item:visible:last");
		}
		var _6ab = item.attr("value");
		_6ac(_6a8, _6ab);
		_6a3(_6a8, _6ab);
	};
	function _6ad(_6ae) {
		var _6af = $(_6ae).fwb_combo("fwb_panel");
		var _6b0 = $(_6ae).fwb_combo("getValues");
		var item = _6af.find("div.fwb_combobox-item[value=" + _6b0.pop() + "]");
		if (item.length) {
			var next = item.next(":visible");
			if (next.length) {
				item = next;
			}
		} else {
			item = _6af.find("div.fwb_combobox-item:visible:first");
		}
		var _6b1 = item.attr("value");
		_6ac(_6ae, _6b1);
		_6a3(_6ae, _6b1);
	};
	function _6ac(_6b2, _6b3) {
		var opts = $.data(_6b2, "fwb_combobox").options;
		var data = $.data(_6b2, "fwb_combobox").data;
		if (opts.multiple) {
			var _6b4 = $(_6b2).fwb_combo("getValues");
			for (var i = 0; i < _6b4.length; i++) {
				if (_6b4[i] == _6b3) {
					return;
				}
			}
			_6b4.push(_6b3);
			_6b5(_6b2, _6b4);
		} else {
			_6b5(_6b2, [_6b3]);
		}
		for (var i = 0; i < data.length; i++) {
			if (data[i][opts.valueField] == _6b3) {
				opts.onSelect.call(_6b2, data[i]);
				return;
			}
		}
	};
	function _6b6(_6b7, _6b8) {
		var opts = $.data(_6b7, "fwb_combobox").options;
		var data = $.data(_6b7, "fwb_combobox").data;
		var _6b9 = $(_6b7).fwb_combo("getValues");
		for (var i = 0; i < _6b9.length; i++) {
			if (_6b9[i] == _6b8) {
				_6b9.splice(i, 1);
				_6b5(_6b7, _6b9);
				break;
			}
		}
		for (var i = 0; i < data.length; i++) {
			if (data[i][opts.valueField] == _6b8) {
				opts.onUnselect.call(_6b7, data[i]);
				return;
			}
		}
	};
	function _6b5(_6ba, _6bb, _6bc) {
		var opts = $.data(_6ba, "fwb_combobox").options;
		var data = $.data(_6ba, "fwb_combobox").data;
		var _6bd = $(_6ba).fwb_combo("fwb_panel");
		_6bd.find("div.fwb_combobox-item-selected").removeClass("fwb_combobox-item-selected");
		var vv = [],
		ss = [];
		for (var i = 0; i < _6bb.length; i++) {
			var v = _6bb[i];
			
			//var s = v; // 2011.10.09 hap 修改
			var s = "";
			
			for (var j = 0; j < data.length; j++) {
				if (data[j][opts.valueField] == v) {
					//s = data[j][opts.textField];
					// hap edit (2011.08.20) 增加formatter功能
					s = data[j]["_TEXT"] || (opts.formatter ? opts.formatter(data[j]) : data[j][opts.textField]);
					break;
				}
			}
			vv.push(v);
			ss.push(s);
			_6bd.find("div.fwb_combobox-item[value=" + v + "]").addClass("fwb_combobox-item-selected");
		}
		$(_6ba).fwb_combo("setValues", vv);
		if (!_6bc) {
			$(_6ba).fwb_combo("setText", ss.join(opts.separator));
		}
	};
	function _6be(_6bf) {
		var opts = $.data(_6bf, "fwb_combobox").options;
		var data = [];
		$(">option", _6bf).each(function() {
			var item = {};
			item[opts.valueField] = $(this).attr("value") != undefined ? $(this).attr("value") : $(this).html();
			item[opts.textField] = $(this).html();
			item["selected"] = $(this).attr("selected");
			data.push(item);
		});
		return data;
	};
	function _6c0(_6c1, data, _6c2) {
		var opts = $.data(_6c1, "fwb_combobox").options;
		var _6c3 = $(_6c1).fwb_combo("fwb_panel");
		$.data(_6c1, "fwb_combobox").data = data;
		var _6c4 = $(_6c1).fwb_combobox("getValues");
		_6c3.empty();
		for (var i = 0; i < data.length; i++) {
			var v = data[i][opts.valueField];
			var s = data[i][opts.textField];
			var item = $("<div class=\"fwb_combobox-item\"></div>").appendTo(_6c3);
			item.attr("value", v);
			if(data[i]["_TEXT"]){
				item.html(data[i]["_TEXT"]);
			}else if(opts.formatter) {
				item.html(opts.formatter.call(_6c1, data[i]));
			} else {
				item.html(s);
			};
			// hap add (2011.12.21): 增加title提示
			item.attr("title", item.text());
			//
			if (data[i]["selected"]) {
				 (function() {
					for (var i = 0; i < _6c4.length; i++) {
						if (v == _6c4[i]) {
							return;
						}
					}
					_6c4.push(v);
				})();
			}
		}
		if (opts.multiple) {
			_6b5(_6c1, _6c4, _6c2);
		} else {
			if (_6c4.length) {
				_6b5(_6c1, [_6c4[_6c4.length - 1]], _6c2);
			} else {
				_6b5(_6c1, [], _6c2);
			}
		}
		opts.onLoadSuccess.call(_6c1, data);
		$(".fwb_combobox-item", _6c3).hover(function() {
			$(this).addClass("fwb_combobox-item-hover");
		},
		function() {
			$(this).removeClass("fwb_combobox-item-hover");
		}).click(function() {
			var item = $(this);
			
			// hap 2012/4/6 增加_onItemClick事件
			var opts = $.data(_6c1, "fwb_combobox").options;
			// hap 2012/4/6 增加_onItemClick事件
			if(opts._onItemClick){
				if(opts._onItemClick() ==  false) return;
			};
			
			if (opts.multiple) {
				if (item.hasClass("fwb_combobox-item-selected")) {
					_6b6(_6c1, item.attr("value"));
				} else {
					_6ac(_6c1, item.attr("value"));
				}
			} else {
				_6ac(_6c1, item.attr("value"));
				$(_6c1).fwb_combo("hidePanel");
			}
		});
	};
	function _6c5(_6c6, url, _6c7, _6c8) {
		var opts = $.data(_6c6, "fwb_combobox").options;
		if (url) {
			opts.url = url;
		}
		if (!opts.url) {
			return;
		}
		_6c7 = _6c7 || {};
		$.ajax({
			type: opts.method,
			url: opts.url,
			dataType: "json",
			data: _6c7,
			success: function(data) {
				_6c0(_6c6, data, _6c8);
			},
			error: function() {
				opts.onLoadError.apply(this, arguments);
			}
		});
	};
	function _6c9(_6ca, q) {
		var opts = $.data(_6ca, "fwb_combobox").options;
		if (opts.multiple && !q) {
			_6b5(_6ca, [], true);
		} else {
			_6b5(_6ca, [q], true);
		}
		if (opts.mode == "remote") {
			_6c5(_6ca, null, {
				q: q
			},
			true);
		} else {
			var _6cb = $(_6ca).fwb_combo("fwb_panel");
			_6cb.find("div.fwb_combobox-item").hide();
			var data = $.data(_6ca, "fwb_combobox").data;
			for (var i = 0; i < data.length; i++) {
				if (opts.filter.call(_6ca, q, data[i])) {
					var v = data[i][opts.valueField];
					var s = data[i]["_TEXT"] || data[i][opts.textField];
					var item = _6cb.find("div.fwb_combobox-item[value=" + v + "]");
					item.show();
					if (s == q) {
						_6b5(_6ca, [v], true);
						item.addClass("fwb_combobox-item-selected");
					}
				}
			}
		}
	};
	function _6cc(_6cd) {
		var opts = $.data(_6cd, "fwb_combobox").options;
		$(_6cd).addClass("fwb_combobox-f");
		$(_6cd).fwb_combo($.extend({},
		opts, {
			onShowPanel: function() {
				$(_6cd).fwb_combo("fwb_panel").find("div.fwb_combobox-item").show();
				_6a3(_6cd, $(_6cd).fwb_combobox("getValue"));
				opts.onShowPanel.call(_6cd);
			}
		}));
	};
	$.fn.fwb_combobox = function(_6ce, _6cf) {
		if (typeof _6ce == "string") {
			var _6d0 = $.fn.fwb_combobox.methods[_6ce];
			if (_6d0) {
				return _6d0(this, _6cf);
			} else {
				return this.fwb_combo(_6ce, _6cf);
			}
		}
		_6ce = _6ce || {};
		return this.each(function() {
			var _6d1 = $.data(this, "fwb_combobox");
			if (_6d1) {
				$.extend(_6d1.options, _6ce);
				_6cc(this);
			} else {
				_6d1 = $.data(this, "fwb_combobox", {
					options: $.extend({},
					$.fn.fwb_combobox.defaults, $.fn.fwb_combobox.parseOptions(this), _6ce)
				});
				_6cc(this);
				// hap 2011.10.08: 注释掉下句，解决初始值闪现的问题
				//_6c0(this, _6be(this));
			}
			if (_6d1.options.data) {
				_6c0(this, _6d1.options.data);
			}
			_6c5(this);
		});
	};
	$.fn.fwb_combobox.methods = {
		options: function(jq) {
			// hap edit (2011.08.25) 解决莫名其妙报错问题
			try{
				return $.data(jq[0], "fwb_combobox").options;
			}catch(e){
				return jq[0];
			};
		},
		getData: function(jq) {
			return $.data(jq[0], "fwb_combobox").data;
		},
		setValues: function(jq, _6d2) {
			return jq.each(function() {
				_6b5(this, _6d2);
			});
		},
		setValue: function(jq, _6d3) {
			return jq.each(function() {
				_6b5(this, [_6d3]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				$(this).fwb_combo("clear");
				var _6d4 = $(this).fwb_combo("fwb_panel");
				_6d4.find("div.fwb_combobox-item-selected").removeClass("fwb_combobox-item-selected");
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_6c0(this, data);
			});
		},
		reload: function(jq, url) {
			return jq.each(function() {
				_6c5(this, url);
			});
		},
		select: function(jq, _6d5) {
			return jq.each(function() {
				_6ac(this, _6d5);
			});
		},
		unselect: function(jq, _6d6) {
			return jq.each(function() {
				_6b6(this, _6d6);
			});
		}
	};
	$.fn.fwb_combobox.parseOptions = function(_6d7) {
		var t = $(_6d7);
		return $.extend({},
		$.fn.fwb_combo.parseOptions(_6d7), {
			valueField: t.attr("valueField"),
			textField: t.attr("textField"),
			mode: t.attr("mode"),
			method: (t.attr("method") ? t.attr("method") : undefined),
			url: t.attr("url")
		});
	};
	$.fn.fwb_combobox.defaults = $.extend({},
	$.fn.fwb_combo.defaults, {
		valueField: "value",
		textField: "text",
		mode: "local",
		method: "post",
		url: null,
		data: null,
		keyHandler: {
			up: function() {
				_6a7(this);
			},
			down: function() {
				_6ad(this);
			},
			enter: function() {
				var _6d8 = $(this).fwb_combobox("getValues");
				$(this).fwb_combobox("setValues", _6d8);
				$(this).fwb_combobox("hidePanel");
			},
			query: function(q) {
				_6c9(this, q);
			}
		},
		filter: function(q, row) {
			var opts = $(this).fwb_combobox("options");
			return row[opts.textField].indexOf(q) == 0 || (row["_TEXT"] || "").indexOf(q) == 0;
		},
		formatter: function(row) {
			var opts = $(this).fwb_combobox("options");
			return row["_TEXT"] || row[opts.textField];
		},
		onLoadSuccess: function() {
			},
		onLoadError: function() {
			},
		onSelect: function(_6d9) {
			},
		onUnselect: function(_6da) {
			}
	});
})(fn.jQuery);
 (function($) {
	function _6db(_6dc) {
		var opts = $.data(_6dc, "fwb_combotree").options;
		var fwb_tree = $.data(_6dc, "fwb_combotree").fwb_tree;
		$(_6dc).addClass("fwb_combotree-f");
		$(_6dc).fwb_combo(opts);
		var _6dd = $(_6dc).fwb_combo("fwb_panel");
		if (!fwb_tree) {
			fwb_tree = $("<ul></ul>").appendTo(_6dd);
			$.data(_6dc, "fwb_combotree").fwb_tree = fwb_tree;
		}
		fwb_tree.fwb_tree($.extend({},
		opts, {
			checkbox: opts.multiple,
			onLoadSuccess: function(node, data) {
				var _6de = $(_6dc).fwb_combotree("getValues");
				if (opts.multiple) {
					var _6df = fwb_tree.fwb_tree("getChecked");
					for (var i = 0; i < _6df.length; i++) {
						var id = _6df[i].id;
						 (function() {
							for (var i = 0; i < _6de.length; i++) {
								if (id == _6de[i]) {
									return;
								}
							}
							_6de.push(id);
						})();
					}
				}
				$(_6dc).fwb_combotree("setValues", _6de);
				opts.onLoadSuccess.call(this, node, data);
			},
			onClick: function(node) {
				_6e1(_6dc);
				$(_6dc).fwb_combo("hidePanel");
				opts.onClick.call(this, node);
			},
			onCheck: function(node, _6e0) {
				_6e1(_6dc);
				this.element = _6dc;
				opts.onCheck.call(this, node, _6e0);
			}
		}));

		// hap add 2012/10/28
		// 
		$(fwb_tree).data("combo_input", _6dc);
	};
	function _6e1(_6e2) {
		var opts = $.data(_6e2, "fwb_combotree").options;
		var fwb_tree = $.data(_6e2, "fwb_combotree").fwb_tree;
		var vv = [],
		ss = [];
		if (opts.multiple) {
			var _6e3 = fwb_tree.fwb_tree("getChecked");
			for (var i = 0; i < _6e3.length; i++) {
				vv.push(_6e3[i].id);
				ss.push(_6e3[i].formatText); // hap edit (2011.08.21) 增加formatter功能
			}
		} else {
			var node = fwb_tree.fwb_tree("getSelected");
			if (node) {
				vv.push(node.id);
				ss.push(node.formatText); // hap edit (2011.08.21) 增加formatter功能
			}
		}
		$(_6e2).fwb_combo("setValues", vv).fwb_combo("setText", ss.join(opts.separator));
	};
	function _6e4(_6e5, _6e6) {
		var opts = $.data(_6e5, "fwb_combotree").options;
		var fwb_tree = $.data(_6e5, "fwb_combotree").fwb_tree;
		fwb_tree.find("span.fwb_tree-checkbox").addClass("fwb_tree-checkbox0").removeClass("fwb_tree-checkbox1 fwb_tree-checkbox2");
		var vv = [],
		ss = [];
		for (var i = 0; i < _6e6.length; i++) {
			var v = _6e6[i];

			//var s = v; // 2011.10.09 hap 修改
			var s = "";
			
			var node = fwb_tree.fwb_tree("find", v);
			if (node) {
				s = node.formatText; // hap edit (2011.08.21) 增加formatter功能
				fwb_tree.fwb_tree("check", node.target);
				fwb_tree.fwb_tree("select", node.target);
			}
			vv.push(v);
			ss.push(s);
		}
		$(_6e5).fwb_combo("setValues", vv).fwb_combo("setText", ss.join(opts.separator));
	};
	$.fn.fwb_combotree = function(_6e7, _6e8) {
		if (typeof _6e7 == "string") {
			var _6e9 = $.fn.fwb_combotree.methods[_6e7];
			if (_6e9) {
				return _6e9(this, _6e8);
			} else {
				return this.fwb_combo(_6e7, _6e8);
			}
		}
		_6e7 = _6e7 || {};
		return this.each(function() {
			var _6ea = $.data(this, "fwb_combotree");
			if (_6ea) {
				$.extend(_6ea.options, _6e7);
			} else {
				$.data(this, "fwb_combotree", {
					options: $.extend({},
					$.fn.fwb_combotree.defaults, $.fn.fwb_combotree.parseOptions(this), _6e7)
				});
			}
			_6db(this);
		});
	};
	$.fn.fwb_combotree.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_combotree").options;
		},
		tree: function(jq) {
			return $.fn.fwb_combotree.methods.fwb_tree(jq);
		},
		fwb_tree: function(jq) {
			return $.data(jq[0], "fwb_combotree").fwb_tree;
		},
		getChecked: function(jq) {
			return $($.fn.fwb_combotree.methods.fwb_tree(jq)).fwb_tree("getChecked");
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_combotree").options;
				opts.data = data;
				var fwb_tree = $.data(this, "fwb_combotree").fwb_tree;
				fwb_tree.fwb_tree("loadData", data);
			});
		},
		reload: function(jq, url) {
			return jq.each(function() {
				var opts = $.data(this, "fwb_combotree").options;
				var fwb_tree = $.data(this, "fwb_combotree").fwb_tree;
				if (url) {
					opts.url = url;
				}
				fwb_tree.fwb_tree({
					url: opts.url
				});
			});
		},
		setValues: function(jq, _6eb) {
			return jq.each(function() {
				_6e4(this, _6eb);
			});
		},
		setValue: function(jq, _6ec) {
			return jq.each(function() {
				_6e4(this, [_6ec]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				var fwb_tree = $.data(this, "fwb_combotree").fwb_tree;
				fwb_tree.find("div.fwb_tree-node-selected").removeClass("fwb_tree-node-selected");
				$(this).fwb_combo("clear");
			});
		}
	};
	$.fn.fwb_combotree.parseOptions = function(_6ed) {
		return $.extend({},
		$.fn.fwb_combo.parseOptions(_6ed), $.fn.fwb_tree.parseOptions(_6ed));
	};
	$.fn.fwb_combotree.defaults = $.extend({},
	$.fn.fwb_combo.defaults, $.fn.fwb_tree.defaults, {
		editable: false
	});
})(fn.jQuery);
 (function($) {
	function _6ee(_6ef) {
		var opts = $.data(_6ef, "fwb_combogrid").options;
		var grid = $.data(_6ef, "fwb_combogrid").grid;
		$(_6ef).addClass("fwb_combogrid-f");
		$(_6ef).fwb_combo(opts);
		var _6f0 = $(_6ef).fwb_combo("fwb_panel");
		if (!grid) {
			grid = $("<table></table>").appendTo(_6f0);
			$.data(_6ef, "fwb_combogrid").grid = grid;
		}
		grid.fwb_datagrid($.extend({},
		opts, {
			border: false,
			fit: true,
			singleSelect: (!opts.multiple),
			onLoadSuccess: function(data) {
				var _6f1 = $.data(_6ef, "fwb_combogrid").remainText;
				var _6f2 = $(_6ef).fwb_combo("getValues");
				_6fe(_6ef, _6f2, _6f1);
				opts.onLoadSuccess.apply(_6ef, arguments);
			},
			onClickRow: _6f3,
			onSelect: function(_6f4, row) {
				_6f5();
				opts.onSelect.call(this, _6f4, row);
			},
			onUnselect: function(_6f6, row) {
				_6f5();
				opts.onUnselect.call(this, _6f6, row);
			},
			onSelectAll: function(rows) {
				_6f5();
				opts.onSelectAll.call(this, rows);
			},
			onUnselectAll: function(rows) {
				if (opts.multiple) {
					_6f5();
				}
				opts.onUnselectAll.call(this, rows);
			}
		}));
		function _6f3(_6f7, row) {
			$.data(_6ef, "fwb_combogrid").remainText = false;
			_6f5();
			if (!opts.multiple) {
				$(_6ef).fwb_combo("hidePanel");
			}
			opts.onClickRow.call(this, _6f7, row);
		};
		function _6f5() {
			var _6f8 = $.data(_6ef, "fwb_combogrid").remainText;
			var rows = grid.fwb_datagrid("getSelections");
			var vv = [],
			ss = [];
			for (var i = 0; i < rows.length; i++) {
				vv.push(rows[i][opts.idField]);
				ss.push(rows[i][opts.textField]);
			}
			if (!opts.multiple) {
				$(_6ef).fwb_combo("setValues", (vv.length ? vv: [""]));
			} else {
				$(_6ef).fwb_combo("setValues", vv);
			}
			if (!_6f8) {
				$(_6ef).fwb_combo("setText", ss.join(opts.separator));
			}
		};
	};
	function _6f9(_6fa, step) {
		var opts = $.data(_6fa, "fwb_combogrid").options;
		var grid = $.data(_6fa, "fwb_combogrid").grid;
		var _6fb = grid.fwb_datagrid("getRows").length;
		$.data(_6fa, "fwb_combogrid").remainText = false;
		var _6fc;
		var _6fd = grid.fwb_datagrid("getSelections");
		if (_6fd.length) {
			_6fc = grid.fwb_datagrid("getRowIndex", _6fd[_6fd.length - 1][opts.idField]);
			_6fc += step;
			if (_6fc < 0) {
				_6fc = 0;
			}
			if (_6fc >= _6fb) {
				_6fc = _6fb - 1;
			}
		} else {
			if (step > 0) {
				_6fc = 0;
			} else {
				if (step < 0) {
					_6fc = _6fb - 1;
				} else {
					_6fc = -1;
				}
			}
		}
		if (_6fc >= 0) {
			grid.fwb_datagrid("clearSelections");
			grid.fwb_datagrid("selectRow", _6fc);
		}
	};
	function _6fe(_6ff, _700, _701) {
		var opts = $.data(_6ff, "fwb_combogrid").options;
		var grid = $.data(_6ff, "fwb_combogrid").grid;
		var rows = grid.fwb_datagrid("getRows");
		var ss = [];
		for (var i = 0; i < _700.length; i++) {
			var _702 = grid.fwb_datagrid("getRowIndex", _700[i]);
			if (_702 >= 0) {
				grid.fwb_datagrid("selectRow", _702);
				ss.push(rows[_702][opts.textField]);
			} else {
				ss.push(_700[i]);
			}
		}
		if ($(_6ff).fwb_combo("getValues").join(",") == _700.join(",")) {
			return;
		}
		$(_6ff).fwb_combo("setValues", _700);
		if (!_701) {
			$(_6ff).fwb_combo("setText", ss.join(opts.separator));
		}
	};
	function _703(_704, q) {
		var opts = $.data(_704, "fwb_combogrid").options;
		var grid = $.data(_704, "fwb_combogrid").grid;
		$.data(_704, "fwb_combogrid").remainText = true;
		if (opts.multiple && !q) {
			_6fe(_704, [], true);
		} else {
			_6fe(_704, [q], true);
		}
		if (opts.mode == "remote") {
			grid.fwb_datagrid("clearSelections");
			grid.fwb_datagrid("load", {
				q: q
			});
		} else {
			if (!q) {
				return;
			}
			var rows = grid.fwb_datagrid("getRows");
			for (var i = 0; i < rows.length; i++) {
				if (opts.filter.call(_704, q, rows[i])) {
					grid.fwb_datagrid("clearSelections");
					grid.fwb_datagrid("selectRow", i);
					return;
				}
			}
		}
	};
	$.fn.fwb_combogrid = function(_705, _706) {
		if (typeof _705 == "string") {
			var _707 = $.fn.fwb_combogrid.methods[_705];
			if (_707) {
				return _707(this, _706);
			} else {
				return $.fn.fwb_combo.methods[_705](this, _706);
			}
		}
		_705 = _705 || {};
		return this.each(function() {
			var _708 = $.data(this, "fwb_combogrid");
			if (_708) {
				$.extend(_708.options, _705);
			} else {
				_708 = $.data(this, "fwb_combogrid", {
					options: $.extend({},
					$.fn.fwb_combogrid.defaults, $.fn.fwb_combogrid.parseOptions(this), _705)
				});
			}
			_6ee(this);
		});
	};
	$.fn.fwb_combogrid.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_combogrid").options;
		},
		grid: function(jq) {
			return $.data(jq[0], "fwb_combogrid").grid;
		},
		setValues: function(jq, _709) {
			return jq.each(function() {
				_6fe(this, _709);
			});
		},
		setValue: function(jq, _70a) {
			return jq.each(function() {
				_6fe(this, [_70a]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				$(this).fwb_combogrid("grid").fwb_datagrid("clearSelections");
				$(this).fwb_combo("clear");
			});
		}
	};
	$.fn.fwb_combogrid.parseOptions = function(_70b) {
		var t = $(_70b);
		return $.extend({},
		$.fn.fwb_combo.parseOptions(_70b), $.fn.fwb_datagrid.parseOptions(_70b), {
			idField: (t.attr("idField") || undefined),
			textField: (t.attr("textField") || undefined),
			mode: t.attr("mode")
		});
	};
	$.fn.fwb_combogrid.defaults = $.extend({},
	$.fn.fwb_combo.defaults, $.fn.fwb_datagrid.defaults, {
		loadMsg: null,
		idField: null,
		textField: null,
		mode: "local",
		keyHandler: {
			up: function() {
				_6f9(this, -1);
			},
			down: function() {
				_6f9(this, 1);
			},
			enter: function() {
				_6f9(this, 0);
				$(this).fwb_combo("hidePanel");
			},
			query: function(q) {
				_703(this, q);
			}
		},
		filter: function(q, row) {
			var opts = $(this).fwb_combogrid("options");
			return row[opts.textField].indexOf(q) == 0;
		}
	});
})(fn.jQuery);
 (function($) {
	function _70c(_70d) {
		var _70e = $.data(_70d, "fwb_datebox");
		var opts = _70e.options;
		$(_70d).addClass("fwb_datebox-f");
		$(_70d).fwb_combo($.extend({},
		opts, {
			onShowPanel: function() {
				_70e.fwb_calendar.fwb_calendar("resize");
				opts.onShowPanel.call(_70d);
			}
		}));
		$(_70d).fwb_combo("textbox").parent().addClass("fwb_datebox");
		if (!_70e.fwb_calendar) {
			_70f();
		}
		function _70f() {
			var _710 = $(_70d).fwb_combo("fwb_panel");
			_70e.fwb_calendar = $("<div></div>").appendTo(_710).wrap("<div class=\"fwb_datebox-fwb_calendar-inner\"></div>");
			_70e.fwb_calendar.fwb_calendar({
				fit: true,
				border: false,
				onSelect: function(date) {
					var _711 = opts.formatter(date);
					_715(_70d, _711);
					$(_70d).fwb_combo("hidePanel");
					opts.onSelect.call(_70d, date);
				}
			});
			_715(_70d, opts.value);
			var _712 = $("<div class=\"fwb_datebox-button\"></div>").appendTo(_710);
			$("<a href=\"javascript:void(0)\" class=\"fwb_datebox-current\"></a>").html(opts.currentText).appendTo(_712);
			$("<a href=\"javascript:void(0)\" class=\"fwb_datebox-close\"></a>").html(opts.closeText).appendTo(_712);
			_712.find(".fwb_datebox-current,.fwb_datebox-close").hover(function() {
				$(this).addClass("fwb_datebox-button-hover");
			},
			function() {
				$(this).removeClass("fwb_datebox-button-hover");
			});
			_712.find(".fwb_datebox-current").click(function() {
				_70e.fwb_calendar.fwb_calendar({
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					current: new Date()
				});
			});
			_712.find(".fwb_datebox-close").click(function() {
				$(_70d).fwb_combo("hidePanel");
			});
		};
	};
	function _713(_714, q) {
		_715(_714, q);
	};
	function _716(_717) {
		var opts = $.data(_717, "fwb_datebox").options;
		var c = $.data(_717, "fwb_datebox").fwb_calendar;
		var _718 = opts.formatter(c.fwb_calendar("options").current);
		_715(_717, _718);
		$(_717).fwb_combo("hidePanel");
	};
	function _715(_719, _71a) {
		var _71b = $.data(_719, "fwb_datebox");
		var opts = _71b.options;
		$(_719).fwb_combo("setValue", _71a).fwb_combo("setText", _71a);
		_71b.fwb_calendar.fwb_calendar("moveTo", opts.parser(_71a));
	};
	$.fn.fwb_datebox = function(_71c, _71d) {
		if (typeof _71c == "string") {
			var _71e = $.fn.fwb_datebox.methods[_71c];
			if (_71e) {
				return _71e(this, _71d);
			} else {
				return this.fwb_combo(_71c, _71d);
			}
		}
		_71c = _71c || {};
		return this.each(function() {
			var _71f = $.data(this, "fwb_datebox");
			if (_71f) {
				$.extend(_71f.options, _71c);
			} else {
				$.data(this, "fwb_datebox", {
					options: $.extend({},
					$.fn.fwb_datebox.defaults, $.fn.fwb_datebox.parseOptions(this), _71c)
				});
			}
			_70c(this);
		});
	};
	$.fn.fwb_datebox.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_datebox").options;
		},
		calendar: function(jq) {
			return $.fn.fwb_datebox.methods.fwb_calendar(jq);
		},
		fwb_calendar: function(jq) {
			return $.data(jq[0], "fwb_datebox").fwb_calendar;
		},
		setValue: function(jq, _720) {
			return jq.each(function() {
				_715(this, _720);
			});
		}
	};
	$.fn.fwb_datebox.parseOptions = function(_721) {
		var t = $(_721);
		return $.extend({},
		$.fn.fwb_combo.parseOptions(_721), {});
	};
	$.fn.fwb_datebox.defaults = $.extend({},
	$.fn.fwb_combo.defaults, {
		panelWidth: 180,
		panelHeight: "auto",
		keyHandler: {
			up: function() {
				},
			down: function() {
				},
			enter: function() {
				_716(this);
			},
			query: function(q) {
				_713(this, q);
			}
		},
		currentText: "Today",
		closeText: "Close",
		okText: "Ok",
		formatter: function(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			return m + "/" + d + "/" + y;
		},
		parser: function(s) {
			var t = Date.parse(s);
			if (!isNaN(t)) {
				return new Date(t);
			} else {
				return new Date();
			}
		},
		onSelect: function(date) {
			}
	});
})(fn.jQuery);
 (function($) {
	function _722(_723) {
		var _724 = $.data(_723, "fwb_datetimebox");

		var opts = _724.options;
		$(_723).fwb_datebox($.extend({},
		opts, {
			onShowPanel: function() {
				var _725 = $(_723).fwb_datetimebox("getValue");
				_72d(_723, _725, true);
				opts.onShowPanel.call(_723);
			}
		}));
		$(_723).removeClass("fwb_datebox-f").addClass("fwb_datetimebox-f");
		$(_723).fwb_datebox("fwb_calendar").fwb_calendar({
			onSelect: function(date) {
				opts.onSelect.call(_723, date);
			}
		});
		var _726 = $(_723).fwb_datebox("fwb_panel");
		if (!_724.fwb_spinner) {
			var p = $("<div style=\"padding:2px\"><input style=\"width:80px\"></div>").insertAfter(_726.children("div.fwb_datebox-fwb_calendar-inner"));
			_724.fwb_spinner = p.children("input");
			_724.fwb_spinner.fwb_timespinner({
				showSeconds: true
			}).bind("mousedown",
			function(e) {
				e.stopPropagation();
			});
			_72d(_723, opts.value);
			var _727 = _726.children("div.fwb_datebox-button");
			var ok = $("<a href=\"javascript:void(0)\" class=\"fwb_datebox-ok\"></a>").html(opts.okText).appendTo(_727);
			ok.hover(function() {
				$(this).addClass("fwb_datebox-button-hover");
			},
			function() {
				$(this).removeClass("fwb_datebox-button-hover");
			}).click(function() {
				_728(_723);
			});
		}
	};
	function _729(_72a) {
		var c = $(_72a).fwb_datetimebox("fwb_calendar");
		var t = $(_72a).fwb_datetimebox("fwb_spinner");
		var date = c.fwb_calendar("options").current;
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.fwb_timespinner("getHours"), t.fwb_timespinner("getMinutes"), t.fwb_timespinner("getSeconds"));
	};
	function _72b(_72c, q) {
		_72d(_72c, q, true);
	};
	function _728(_72e) {
		var opts = $.data(_72e, "fwb_datetimebox").options;
		var date = _729(_72e);
		_72d(_72e, opts.formatter(date));
		$(_72e).fwb_combo("hidePanel");
	};
	function _72d(_72f, _730, _731) {
		var opts = $.data(_72f, "fwb_datetimebox").options;
		$(_72f).fwb_combo("setValue", _730);
		if (!_731) {
			if (_730) {
				var date = opts.parser(_730);
				$(_72f).fwb_combo("setValue", opts.formatter(date));
				$(_72f).fwb_combo("setText", opts.formatter(date));
			} else {
				$(_72f).fwb_combo("setText", _730);
			}
		}
		var date = opts.parser(_730);
		$(_72f).fwb_datetimebox("fwb_calendar").fwb_calendar("moveTo", opts.parser(_730));
		$(_72f).fwb_datetimebox("fwb_spinner").fwb_timespinner("setValue", _732(date));
		function _732(date) {
			function _733(_734) {
				return (_734 < 10 ? "0": "") + _734;
			};
			var tt = [_733(date.getHours()), _733(date.getMinutes())];
			if (opts.showSeconds) {
				tt.push(_733(date.getSeconds()));
			}
			return tt.join($(_72f).fwb_datetimebox("fwb_spinner").fwb_timespinner("options").separator);
		};
	};
	$.fn.fwb_datetimebox = function(_735, _736) {
		if (typeof _735 == "string") {
			var _737 = $.fn.fwb_datetimebox.methods[_735];
			if (_737) {
				return _737(this, _736);
			} else {
				return this.fwb_datebox(_735, _736);
			}
		}
		_735 = _735 || {};
		return this.each(function() {
			var _738 = $.data(this, "fwb_datetimebox");
			if (_738) {
				$.extend(_738.options, _735);
			} else {
				$.data(this, "fwb_datetimebox", {
					options: $.extend({},
					$.fn.fwb_datetimebox.defaults, $.fn.fwb_datetimebox.parseOptions(this), _735)
				});
			}
			_722(this);
		});
	};
	$.fn.fwb_datetimebox.methods = {
		options: function(jq) {
			return $.data(jq[0], "fwb_datetimebox").options;
		},
		spinner: function(jq) {
			return $.fn.fwb_datetimebox.methods.fwb_spinner(jq);
		},
		fwb_spinner: function(jq) {
			return $.data(jq[0], "fwb_datetimebox").fwb_spinner;
		},
		setValue: function(jq, _739) {
			return jq.each(function() {
				_72d(this, _739);
			});
		}
	};
	$.fn.fwb_datetimebox.parseOptions = function(_73a) {
		var t = $(_73a);
		return $.extend({},
		$.fn.fwb_datebox.parseOptions(_73a), {});
	};
	$.fn.fwb_datetimebox.defaults = $.extend({},
	$.fn.fwb_datebox.defaults, {
		showSeconds: true,
		keyHandler: {
			up: function() {
				},
			down: function() {
				},
			enter: function() {
				_728(this);
			},
			query: function(q) {
				_72b(this, q);
			}
		},
		formatter: function(date) {
			var h = date.getHours();
			var M = date.getMinutes();
			var s = date.getSeconds();
			function _73b(_73c) {
				return (_73c < 10 ? "0": "") + _73c;
			};
			return $.fn.fwb_datebox.defaults.formatter(date) + " " + _73b(h) + ":" + _73b(M) + ":" + _73b(s);
		},
		parser: function(s) {
			if ($.trim(s) == "") {
				return new Date();
			}
			var dt = s.split(" ");
			var d = $.fn.fwb_datebox.defaults.parser(dt[0]);
			var tt = dt[1].split(":");
			var hour = parseInt(tt[0], 10);
			var _73d = parseInt(tt[1], 10);
			var _73e = parseInt(tt[2], 10);
			return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, _73d, _73e);
		}
	});
})(fn.jQuery);



/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.3-pre
 */
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


// =================================================
// 本地化
// =================================================
(function($){
	if ($.fn.fwb_pagination){
		$.fn.fwb_pagination.defaults.beforePageText = "第";
		$.fn.fwb_pagination.defaults.afterPageText = "页，共{pages}页";
		$.fn.fwb_pagination.defaults.displayMsg = "显示{from}到{to},共{total}记录";
	}
	if ($.fn.fwb_datagrid){
		$.fn.fwb_datagrid.defaults.loadMsg = "正在处理，请稍候。。。";
	}
	if ($.fn.fwb_validatebox){
		$.fn.fwb_validatebox.defaults.missingMessage = "不能为空。";
		$.fn.fwb_validatebox.defaults.rules.email.message = "请输入有效的电子邮件地址";
		$.fn.fwb_validatebox.defaults.rules.url.message = '请输入有效的URL地址';
		$.fn.fwb_validatebox.defaults.rules.length.message = "输入内容长度必须介于{0}和{1}之间";
		$.fn.fwb_validatebox.defaults.rules.remote.message = "请修正该字段";
	}
	if ($.fn.fwb_numberbox){
		$.fn.fwb_numberbox.defaults.missingMessage = '不能为空。';
	}
	if ($.fn.fwb_combobox){
		$.fn.fwb_combobox.defaults.missingMessage = '不能为空。';
	}
	if ($.fn.fwb_combotree){
		$.fn.fwb_combotree.defaults.missingMessage = '不能为空。';
	}
})(fn.jQuery);
}; // end fn.widgetBase