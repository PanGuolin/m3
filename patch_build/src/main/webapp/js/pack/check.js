
var checkObj = {
		view : function(id) {
			$('#fileSource').window('refresh', basePath + "/pack/viewf?i=" + id);
			$('#fileSource').window('open');
			
		},
		
		passAll : function() {
			$('SELECT').val($(this).attr("checked") ? '通过' : '');
			checkObj.changed();
		},

		attach : function() {
			$('SELECT').change(checkObj.changed);
			$('#otherReason').keyup(checkObj.changed);
			$('#passAll').click(checkObj.passAll);
			$('#subchk').click(checkObj.submit);
		}, 
		changed : function() {
			var sels = $('SELECT');
			var pass = true;
			var all = true;
			for (var i =0; i<sels.length; i++) {
				var value = $(sels[i]).val();
				if (value == '') {
					all = false;
				} else if (value == '不通过') {
					pass = false;
				}
			}
			$("#chkresult").html(pass ? "通过" : "不通过");
			if (all) {
				if ($('#otherPass').val() == '不通过' 
					&& $('#otherReason').val().trim() == '') {
						$('#subchk').attr("disabled", "disabled");
				} else  {
					$('#subchk').removeAttr("disabled");
				}
			} else {
				$('#subchk').attr("disabled", "disabled");
			}
		},
		submit :function() {
			var rea = "";
			var sels = $('SELECT');
			for (var i =0; i<sels.length; i++) {
				var obj = $(sels[i]);
				if (obj.val() == '不通过') {
					var tr = obj.closest('td').prev();
					rea += tr.html() + "不通过;";
				}
			}
			if ($('#otherPass').val() == '不通过') {
				rea += "其它原因:" + $('#otherReason').val().trim();
			}
			$('#failreason').val(rea);
			//alert($('#failreason').val());
			$('#checkForm').submit();
		}
};
