/** 
 图片处理
 @namespace 
 @name fn.image
*/

window.fn = window.fn || {};
fn.jQuery = fn.jQuery || window.jQuery;

(function($){
	// 
	var IMAGE = {
		/*
		 本地预览
		 @param {selector|dom|path}  file  图片路径，或者一个file
		 @param {selector|dom}       to    一个容器（DIV）， 图像预览将显示到这个容器中
		*/
		preview: function(file, to){
			var maxWidth, maxHeight;
			file = $(file).get(0);
			to = $(to).addClass("preview_div");
			// 参数检查
			if(!file) return;
			if(!to.length) return;
			
			$('<style>.preview_div{ width:200px; height:200px;' + 
				' border:#CCC solid 1px; overflow:hidden;}</style>'
			).appendTo("head");
			//
			maxWidth = to.width();
			maxHeight = to.height();
			
			// 预览
			var _preview = [,].length == 2 ? function(){
				
				var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
				
				// 获取file中的图片地址
				var src = "";
				try{
					file.select();
					file.blur();
					src = document.selection.createRange().text;
				}catch(e){};
				
				if(!src) try{
					src = file.value;
				}catch(e){};
				
				// 插入并获得img， 设置图片地址
				var filter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);';
				var img = $('<img style="' + filter + '">').appendTo(to.html("")).get(0);
				img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
				// 设置图片大小
				var rect = _zoom(maxWidth, maxHeight, img.offsetWidth, img.offsetHeight);
				var status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
				to.html("<div style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;margin-left:"+rect.left+"px;"+sFilter+src+"\"'></div>");
				
			} : function(){
				
				var img = $('<img>').appendTo(to.html("")).get(0);
				img.onload = function(){
					var rect = _zoom(maxWidth, maxHeight, img.offsetWidth, img.offsetHeight);
					img.width = rect.width;
					img.height = rect.height;
					img.style.marginLeft = rect.left+'px';
					img.style.marginTop = rect.top+'px';
				};
				var reader = new FileReader();
				reader.onload = function(evt){img.src = evt.target.result;}
				reader.readAsDataURL(file.files[0]);
				
			}; // end _preview
			
			// 缩放
			var _zoom = function(maxWidth, maxHeight, width, height){
				var param = {top:0, left:0, width:width, height:height};
				if( width>maxWidth || height>maxHeight )
				{
					rateWidth = width / maxWidth;
					rateHeight = height / maxHeight;
					
					if( rateWidth > rateHeight )
					{
						param.width =  maxWidth;
						param.height = Math.round(height / rateWidth);
					}else
					{
						param.width = Math.round(width / rateHeight);
						param.height = maxHeight;
					}
				}
				
				param.left = Math.round((maxWidth - param.width) / 2);
				param.top = Math.round((maxHeight - param.height) / 2);
				return param;
			}; // end _zoom
			
			_preview();
		}// end preview
	};
	
	$.extend(fn.image = fn.image || {}, IMAGE); // end fn.date
	
})(fn.jQuery);