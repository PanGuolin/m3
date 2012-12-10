var relationObj = {
		init : function() {
			if ($("#members").val()) {
				var ms = $("#members").val().split(";");
				var mus = $('[name=member]');
				for (var i=0; i<ms.length; i++) {
					for (var j=0; j<mus.length; j++) {
						if ($(mus[j]).val() == ms[i]) {
							$(mus[j]).attr("checked", true);
						}
					}
				}
			}
			if ($("#followers").val()) {
				var fs = $("#followers").val().split(";");
				var fus = $('[name=follow]');
				for (var i=0; i<fs.length; i++) {
					for (var j=0; j<fus.length; j++) {
						if ($(fus[j]).val() == fs[i]) {
							$(fus[j]).attr("checked", true);
						}
					}
				}
			}
			$('#save').click(relationObj.save);
		},
		
	
		save : function() {
			var ms = "";
			var mus = $('[name="member"]:checked');
			for (var i=0; i<mus.length; i++) {
				ms += $(mus[i]).val() + ";";
			}
			$("#members").val(ms);
			
			var fs = "";
			var fus = $('[name="follow"]:checked');
			for (var i=0; i<fus.length; i++) {
				fs += $(fus[i]).val() + ";";
			}
			$("#followers").val(fs);
			$("#relationForm").submit();
		}
};
$().ready(relationObj.init);