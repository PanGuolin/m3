var footerObj = {
	init : function(){
		$('.queryBar').click(function(){$('.queryDiv').slideToggle();});
		
		var sels = $('select');
		for (var i=0; i<sels.length; i++) {
			var v = $(sels[i]).attr("selValue");
			if (v) $(sels[i]).val(v);
		}
		
		$('form').submit(footerObj.checkRequired);
		
		var reqs = $('.required');
		for (var i=0; i<reqs.length; i++) {
			var req = $(reqs[i]);
			if (req.attr("title") != undefined && req.attr("title") != "") continue;
			var td = req.closest('td').prev();
			if (!td || !td.length) continue;
			td = $(td[0]);
			if (td.text().charAt(0) != "*") {
				td.text("*" + td.text());
				req.attr("title", td.text());
			}
		}
		
		if ($('#queryForm').length == 1 && $('.toolBar').length == 1) {
			$('<div id="lastQuery"></div>').appendTo($('.toolBar'));
		}
	},
	
	checkRequired : function() {
		var form = (arguments.length > 0) ? $(arguments[0]) : $(this);
		var r = form.find('.required');
		if (!r || !r.length) return true;
		for (var i=0; i<r.length; i++) {
			var or = $(r[i]);
			if (!or.val) continue;
			if(or.val().trim().length == 0) {
				alert(or.attr("title") + "不能为空");
				event.preventDefault();
				event.stopPropagation();
				return false;
			}
		}
		return true;
	}
};
$().ready(footerObj.init);
/**
 * 获取选择的记录
 * @param warn
 * @returns
 */
function getSelectedRow(warn, gridId, dataOwner) {
	if (!gridId) gridId = "datagrid";
	var dg = $get("#" + gridId);
	var index = dg.getRowIndex(dg.getSelected());
	if (index == -1) {
		if (warn)
			alert('必须选择一条记录');
		return undefined;
	}
	if (!dataOwner) dataOwner = mainObj;
	if (dataOwner && dataOwner.data)
		return dataOwner.data.rows[index];
}

function defTaskWinLoaed() {
	taskWinLoaded();
}

function appendSubmit(form, newFunct) {
	var _form = $(form);
	var bacFuncts = [];
	if (_form.data('events') && _form.data('events')['submit']) {
		var oldFuncts = _form.data('events')['submit'];
		for (var i=0; i<oldFuncts.length; i++) {
			bacFuncts[i] = oldFuncts[i].handler;
			bacFuncts[i]["this"] = _form;
		}
	}
	
	_form.unbind('submit');
	_form.bind('submit', function() {
		for (var i=0; i<bacFuncts.length; i++) {
			var ret = bacFuncts[i](this);
			if (ret == false) {
				return false;
			}
		}
		return newFunct(this);
	});
}

function taskWinLoaded(windowId, dataOwner) {
	if (!windowId)
		windowId = "taskWindow";
	windowId = "#" + windowId;
	footerObj.init();
	var subms = $(windowId).window('body').find('form');
	if (subms.length) {
		var hidden = $("<input type='hidden' name='jfs' value='true'/>");
		subms.append(hidden);
		for (var i=0; i<subms.length; i++) {
			appendSubmit(subms[i], function() {
				var form = arguments[0];
				$.post(form.action, $(form).serialize(), function(data, status){
					$(windowId).window('close');
					if (status != "success") {alert("无法访问！"); return;}
					if (data && data.tips) alert(data.tips);
		 			if (!dataOwner)	dataOwner = mainObj;
		 			if (dataOwner && dataOwner.query)
		 				dataOwner.query();
				});
				return false;
			});
		}
//		subms.bind('submit', function() {
//			var v = $(this).data("events")['submit'][1];
//			for (var p in v) {
//				alert(p + ":" + v[p]);
//			}
//			alert($(this).data("events")['submit'][0] );
//			alert(footerObj.checkRequired);
//			var value = footerObj.checkRequired(this);
//			alert("===" + value);
//			return false;
//		});
		
// 		subms.ajaxForm(function(data) {
// 			$(windowId).window('close');
// 			if (data && data.tips) {
// 				alert(data.tips);
// 			}
// 			if (!dataOwner)
// 				dataOwner = mainObj;
// 			if (dataOwner && dataOwner.query)
// 				dataOwner.query();
// 		});
		
	}
}

function date2str(x,y) {
	var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
	y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
	return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
}