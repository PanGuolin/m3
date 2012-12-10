var handleChangeRoleObj = {
		init : function(roles) {
			var rs = roles.split(";");
			var _roles = $("[name='context.roles']");
			for (var i=0; i<rs.length; i++) {
				for (var j=0; j<_roles.length; j++) {
					if (rs[i] == $(_roles[j]).attr("value")) {
						$(_roles[j]).attr("checked", true);
						break;
					}
				}
			}
		},
};
