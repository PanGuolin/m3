/**
 * 
 * MoneyBox
 */
(function($) {
	function _1(_2) {
		var _3 = $.data(_2, "moneybox").options;
		var value = com.utils.Utils.parseMoney($(_2).val())
		var _4 = parseFloat(value).toFixed(_3.precision);
		if (isNaN(_4)) {
			$(_2).val("");
			setHideElValue(_2);
			return;
		}
		if (_3.min != null && _3.min != undefined && _4 < _3.min) {
			$(_2).val(_3.min.toFixed(_3.precision));
		} else {
			if (_3.max != null && _3.max != undefined && _4 > _3.max) {
				$(_2).val(_3.max.toFixed(_3.precision));
			} else {
				$(_2).val(_4);
			}
		}
		var _val = $(_2).val();
		setHideElValue(_2,_val);
		$(_2).val(com.utils.Utils.fomatMoney(_val));
		
	}
	;
	function _5(_6) {
		$(_6).unbind(".moneybox");
		$(_6).bind(
				"keypress.moneybox",
				function(e) {
					if (e.which == 45) {
						return true;
					}
					if (e.which == 46) {
						return true;
					} else {
						if ((e.which >= 48 && e.which <= 57
								&& e.ctrlKey == false && e.shiftKey == false)
								|| e.which == 0 || e.which == 8) {
							return true;
						} else {
							if (e.ctrlKey == true
									&& (e.which == 99 || e.which == 118)) {
								return true;
							} else {
								return false;
							}
						}
					}
				}).bind("paste.moneybox", function() {
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
		}).bind("dragenter.moneybox", function() {
			return false;
		}).bind("blur.moneybox", function() {
			_1(_6);
			var onAfterBlur = $.data(_6, "moneybox").options['onAfterBlur'];
			var rs = eval(onAfterBlur);
			if($.isFunction(rs)){
				rs.call(_6);
			}
		}).bind("focus.moneybox",function(){
			$(_6).val(com.utils.Utils.parseMoney($(_6).val()));		
			if(_6.selectionStart!=null){
				_6.setSelectionRange(0,$(_6).val().length);
			}else if(_6.createTextRange){
				var _c=_6.createTextRange();
				_c.collapse();
				_c.moveEnd("character",$(_6).val().length);
				_c.moveStart("character",0);
				_c.select();
			}			
		});
	}
	;
	function _7(_8) {
		if ($.fn.validatebox) {
			var _9 = $.data(_8, "moneybox").options;
			$(_8).validatebox(_9);
		}
	}
	;
	function _a(_b, _c) {
		var _d = $.data(_b, "moneybox").options;
		if (_c) {
			_d.disabled = true;
			$(_b).attr("disabled", true);
		} else {
			_d.disabled = false;
			$(_b).removeAttr("disabled");
		}
	}
	;
	function createHideEl(_el){
		var name = $(_el).attr("hel");
		if(name){
			var ops = $.data(_el, "moneybox").options;
			var value = $(_el).val();
			if(value != ""){
				value = com.utils.Utils.parseMoney($(_el).val())
				value = parseFloat(value).toFixed(ops.precision);
			}
			var $hel = $("<input name='"+name+"' type='hidden' value='"+value+"'/>");
			$(_el).after($hel);
			$(_el).data("moneybox_hel",$hel);
		}
	}
	function setHideElValue(_el,value){
		var name = $(_el).attr("hel");
		var helObj = $(_el).data("moneybox_hel");
		if(helObj){
			helObj.val(value);
		}
	}
	$.fn.moneybox = function(_e, _f) {
		if (typeof _e == "string") {
			var _10 = $.fn.moneybox.methods[_e];
			if (_10) {
				return _10(this, _f);
			} else {
				return this.validatebox(_e, _f);
			}
		}
		_e = _e || {};
		return this.each(function() {
			var _11 = $.data(this, "moneybox");
			if (_11) {
				$.extend(_11.options, _e);
			} else {
				_11 = $.data(this, "moneybox", {
					options : $.extend({}, $.fn.moneybox.defaults,
							$.fn.moneybox.parseOptions(this), _e)
				});
				$(this).removeAttr("disabled");
				$(this).css({
					imeMode : "disabled"
				});
			}
			_a(this, _11.options.disabled);
			_5(this);
			_7(this);
			createHideEl(this);
			
		});
	};
	$.fn.moneybox.methods = {
		disable : function(jq) {
			return jq.each(function() {
				_a(this, true);
			});
		},
		enable : function(jq) {
			return jq.each(function() {
				_a(this, false);
			});
		},
		fix : function(jq) {
			return jq.each(function() {
				_1(this);
			});
		}
	};
	$.fn.moneybox.parseOptions = function(_12) {
		var t = $(_12);
		return $.extend({}, $.fn.validatebox.parseOptions(_12), {
			disabled : (t.attr("disabled") ? true : undefined),
			min : (t.attr("min") == "0" ? 0 : parseFloat(t.attr("min"))
					|| undefined),
			max : (t.attr("max") == "0" ? 0 : parseFloat(t.attr("max"))
					|| undefined),
			precision : (parseInt(t.attr("precision")) || undefined),
			onAfterBlur : t.attr("onAfterBlur")
		});
	};
	$.fn.moneybox.defaults = $.extend({}, $.fn.validatebox.defaults, {
		disabled : false,
		min : null,
		max : null,
		precision : 2,
		onAfterBlur : null
	});	
})(jQuery);
jQuery().ready(function($){
	$(".easyui-moneybox").moneybox();
});
