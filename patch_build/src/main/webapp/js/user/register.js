var mainObj = {
};

$().ready(function(){
	$('#registerForm').submit(function(){
		if ($("[name='user.password']").val() != $('#confirmPassord').val()){
			alert("两次输出的口令不一致");
			return false;
		}
		return true;
	});
});