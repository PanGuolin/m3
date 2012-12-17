var footerObj = {
	init : function(){
		$('#queryBar').before($('#queryDiv'));
		if ($('#queryDiv').length) {
			$('#queryBar').append($("<img src='" + basePath + "/images/up.png'/>"))
				.append($("<img src='" + basePath + "/images/down.png'/>"))
				.click(function(){$('#queryDiv').slideToggle();});
		}
		if(menuPath) {
			var paths = menuPath.split(">>");
			for (var i=0; i<paths.length; i++) {
				$("#menu_" + paths[i] ).css("color", "black").css("font-weight", "blod");
			}
		}
		
		$("TABLE").each(function() {
			var clss = $(this).attr("colClass");
			if (!clss || clss.length == 0) return;
			var clsList = clss.split(";");
			$("TR", this).each(function(){
				$("TD", this).each(function(){$(this).addClass(clsList[$(this).index() % clsList.length]);});
			});
		});

		
		var sels = $('select');
		for (var i=0; i<sels.length; i++) {
			var v = $(sels[i]).attr("selValue");
			if (v) $(sels[i]).val(v);
		}
		
		$('form').submit(footerObj.beforeSubmit);
		
		var reqs = $('.required');
		for (var i=0; i<reqs.length; i++) {
			var req = $(reqs[i]);
			if(req.html() == "")continue;
			if (req.attr("title") != undefined && req.attr("title") != "") continue;
			var td = req.closest('td').prev();
			if (!td || !td.length) continue;
			td = $(td[0]);
			if (td.text().charAt(0) != "*") {
				td.text("*" + td.text());
				req.attr("title", td.text());
			}
		}
		
		var queryForm = $('#queryForm');
		if (queryForm.length) {
			if ($('.toolBar').length)
				$('<div id="lastQuery"></div>').appendTo($('.toolBar'));
		}
		
		var ths = $('TH.dateTime');
		if (ths.length) {
			for (var i=0; i<ths.length; i++) {
				var index = $(ths[i]).index();
				if (!index) continue;
				var table = $(ths[i]).closest('TABLE');
				if (!table.length) continue;
				var trs = table.find("TR");
				for (var j=0; j<trs.length; j++) {
					var tds = $(trs[j]).find("TD");
					if (tds.length < index){continue;}
					try {
						var d = new Date($(tds[index]).text());
						$(tds[index]).text(date2str(d, "MM/dd hh:mm"));
					} catch (exception){}
				}
			}
		}
		
		appendSubmit('#queryForm', function(){return doDataQuery();});
		doDataQuery();
		if (mainObj && mainObj.init) mainObj.init();
	},
	
	beforeSubmit : function() {
		var form = $(this);
		if (form.attr('tagName') != 'FORM')
			form = $(arguments[0]);
		var r = form.find('.required');
		if (r && r.length) {
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
		}
		var warn = form.find(".submitConfirm");
		if (warn.length) {
			 return confirm($(warn[0]).html()); 
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
function getSelectedRow(warn, gridId) {
	var dg = gridId ? $get("#"+gridId) : $get("#datagrid");
	var data = dg.getSelected();
	if (!data) {
		if (warn) alert('必须选择一条记录');
		return undefined;
	}
	return data;
}

function defTaskWinLoaed() {
	taskWinLoaded();
}

function appendSubmit(form, newFunct) {
	var _form = $(form);
	if (!_form || _form.attr('tagName') != 'FORM') return;
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
	}
}

function date2str(x,y) {
	var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
	y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
	return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
}

function doDataQuery(formId, datagridId) {
	var queryForm = formId ? $('#' + formId) : $('#queryForm');
	var dataGrid = datagridId ?  $get('#' + datagridId) : $get('#datagrid');
	if (!dataGrid) return;
	var queryStr = "jfs=true";
	if (queryForm.length)queryStr += "&" + queryForm.serialize();
	dataGrid.reload(null, queryStr, true);
	if ($('#lastQuery').length)
		$('#lastQuery').text("最后查询时间：" + date2str(new Date(),"yyyy年MM月dd日 hh:mm:ss"));
	return false;
}

function openUrlOfSelected(url) {
	var row = getSelectedRow(true);
	if (!row) return;
	window.location.href = basePath + url + row.uuid;
}