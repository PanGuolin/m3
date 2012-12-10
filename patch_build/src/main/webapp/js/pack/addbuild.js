var addBuildObject = {
	attach : function() {
		$('[name=lib]').change(function() {
			alert($(this).val());
		});
	}
};

$().ready(addBuildObject.attach);