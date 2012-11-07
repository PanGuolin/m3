
var checkObj = {
		view : function(id) {
			//document.write( basePath + "/pack/viewf?i=" + id);
			$('#fileSource').window('refresh', basePath + "/pack/viewf?i=" + id);
			$('#fileSource').window('open');
		},
		
		handleData : function(data, status) {
			if (status == "success" ) {
				//var url = data.url;
				var content = data.content;
				if (content) {
					$('#fileSource').attr("title", data.url);
					alert($('#fileContent').length);
					$('#fileContent').html(content);
					$('#fileSource').window('open');
				}
			}
			
		}
};
