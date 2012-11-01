(function(){
	
	var r = {
		ip: /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/,
		en: /^[A-Za-z]+$/,
		userName: /^([A-Za-z0-9]|_)+$/,
		url: new RegExp("[a-zA-z]+://[^s]*")
	};
	
	return {
		
		// IP
		IP: {
			validator: function(val, param){   
				return r.ip.test(val);
			},  
			message: function(val, param){
				return '请输入有效的IP地址';
			}
		} // end IP
		,
		
		// EN
		EN: {
			validator: function(val, param){   
				return r.en.test(val);
			},  
			message: function(val, param){
				return '只能输入英文字母';
			}
		} // end IP
		,
		
		// userName
		userName: {
			validator: function(val, param){
				if(!r.userName.test(val)){
					return false;
				};
				if(param.length > 0 && !isNaN(param[0]) && val.length < parseInt(param[0])){
					return false
				};
				if(param.length > 1 && !isNaN(param[1]) && val.length < parseInt(param[1])){
					return false
				};
				
				return true;
			},  
			message: function(val, param){
				var msg = "只能输入英文字母和下划线";
				if(param.length == 2){
					msg += "，并且长度在[" + param[0] + "," + param[1] + "]之间";
				}else if(param.length == 1){
					msg += "，并且长度必须大于" + param[0]
				};
				
				return msg;
			}
		} // end IP
		
	}; // end rules
})()