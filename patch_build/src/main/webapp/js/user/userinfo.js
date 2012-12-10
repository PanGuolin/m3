var userinfoObj = {
	init : function(roles) {
		var rs = roles.split(";");
		var _roles = $("[name='roles']");
		for (var i=0; i<rs.length; i++) {
			for (var j=0; j<_roles.length; j++) {
				if (rs[i] == $(_roles[j]).attr("value")) {
					$(_roles[j]).attr("checked", true);
					break;
				}
			}
		}
		appendSubmit($('#userForm'), function() {
			var form = arguments[0];
			$.post(form.action, $(form).serialize(), function(data, status){
				if (status != "success") {alert("无法访问！"); return;}
				if (data && data.tips) alert(data.tips.replace("<br/>", "\n"));
			});
			return false;
		});
	}
};