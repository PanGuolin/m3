var handletestObj = {
	attachEnv : function() {
		$("[name='context.pass']").change(handletestObj.validate);
		$("[name=addBtn]").click(handletestObj.addBugLine);
		$('[name=bugNo]').change(handletestObj.validate);
		$('#saveBug').click(handletestObj.bugSubmit);
		$(':checkbox[value=true]').attr('checked', 'checked').attr('disabled', 'true');
		$('#bugTable').find(':checkbox').attr('value', 'true');
		handletestObj.validate();
		
		//var bugTable = $('#bugTable');
		//var bugTrs = bugTable.find('TR');
		//var last = $(bugTrs[bugTrs.length-2]);
		//$(last.find('input')[0]).attr('name', 'pack.bugs[' + (bugTrs.length-3) + '].bugNo');
		//$(last.find('input')[1]).attr('name', 'pack.bugs[' + (bugTrs.length-3) + '].comment');
	},
	
	validate : function() {
		var has = handletestObj.hasNewBug();
		$("#comfResult").attr("disabled", has);
		$("[name='context.pass']").attr("disabled", has);
		$('#failreason').attr('disabled', has);
		//$('#saveBug').attr('disabled', !has);
		if (!has) {
			if ($("[name='context.pass']:checked").length == 0) {
				$("#comfResult").attr("disabled", "disabled");
			} else {
				$("#comfResult").removeAttr('disabled');
			}
			if($("[name='context.pass']:checked").val() == "false") {
				$('#failreason').removeAttr('disabled');
			} else {
				$('#failreason').attr('disabled', 'disabled');
			}
		}
	},
	
	addBugLine : function() {
		var tr = $(this).closest('tr');
		var ntr = tr.prev().clone(true);
		ntr.find("input").val('');
		tr.before(ntr);
	},
	
	hasNewBug : function() {
		var bugNos = $('#bugTable').find('[name=bugNo]');
		for (var i=0; i<bugNos.length; i++) {
			if ($(bugNos[i]).val() != '')
				return true;
		}
		return false;
	},
	
	bugSubmit : function() {
		var startIndex = $('.buguuid').length;
		var bugNos = $('#bugTable').find('[name=bugNo]');
		var bugCmts = $('#bugTable').find('[name=comment]');
		var bugFixed = $('#bugTable').find('[name=fixed]');
		for (var i=0; i<bugNos.length; i++) {
			$(bugNos[i]).attr('name', 'info.bugs[' + startIndex + '].bugNo');
			$(bugCmts[i]).attr('name', 'info.bugs[' + startIndex + '].comment');
			$(bugFixed[i]).attr('name', 'info.bugs[' + startIndex + '].fixed');
			startIndex ++;
		}
		$('#bugform').submit();
	}
};

$().ready(handletestObj.attachEnv);