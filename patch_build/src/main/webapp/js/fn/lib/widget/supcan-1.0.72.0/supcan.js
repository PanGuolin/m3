//区分浏览器(Firefox / IE)
var $agnt=navigator.userAgent.toLowerCase();
var $isIE = ($agnt.indexOf("msie")>0) ? true : false;
var $is64 = ($agnt.indexOf("win64")>=0 || $agnt.indexOf("x64")>=0) ? true : false;


// 获取supcan路径
window.SupcanPath = fn.path + "lib/widget/supcan/";
window.SpucanPagerPath = window.SupcanPath + "pager.jsp";

//private:
function bldStr(ctlType, id, para)
{
 //!!!!组件版本号，升级后须修改!!!!
 var ctlver = '1.0.72.0';

 var typeid;
 if($is64)
  typeid = 'CLASSID="clsid:11249C26-4BCD-4A74-B4D9-068936D77EFE" Codebase="' +SupcanPath+ 'supcan2.x64.cab#Version=1,0,0,3"';
 else if($isIE)
  typeid = 'CLASSID="clsid:619F1AC0-2644-40D3-9EB1-22F81C5FE097" Codebase="' +SupcanPath+ 'supcan2.cab#Version=1,0,0,3"';
 else
  typeid = 'type="application/supcan-plugin" Codebase="' +SupcanPath+ 'supcan.xpi"';

 //组件包URL
 var zipurl = SupcanPath + ($is64 ? "BCV1.x64.bin" : "BCV1.bin");
 if(ctlType=="LuxForm")
  zipurl += "," +SupcanPath+ ($is64 ? "LuxForm.x64.bin" : "LuxForm.bin");
 else if(ctlType.indexOf("BCV4")>=0)
  zipurl += "," +SupcanPath+ ($is64 ? "BCV4.x64.bin" : "BCV4.bin");

 var str = '<Object id=' +id+ ' Width=100% height=100% ' +typeid+ '>';
 str += '<param Name="CtlName" Value="' +ctlType+ '">';
 str += '<param Name="CtlVersion" Value="' +ctlver+ '">';
 str += '<param Name="ZipUrl" Value="' +zipurl+ '">';
 str += '<param Name="id" Value="' +id+ '">';
 str += '<param Name="Cookie" Value="' +document.cookie+ '">';
 str += '<param Name="CtlPara" Value="' +para+ '">';
 str += '<param Name="wmode" Value="Transparent"></Object>';

 return str;
}

//public:
function insertTreeList(id, para)	{ document.write( bldStr("BCV1.TreeList",id, para) ) }
function insertEdit(id, para)		{ document.write( bldStr("BCV1.Edit",	 id, para) ) }
function insertReport(id, para)		{ document.write( bldStr("LuxForm",	 id, para) ) }
function insertTree(id, para)		{ document.write( bldStr("BCV1.Tree",	 id, para) ) }
function insertFreeForm(id, para)	{ document.write( bldStr("BCV1.FreeForm",id, para) ) }
function insertChart(id, para)		{ document.write( bldStr("BCV1.Chart",	 id, para) ) }
function insertUpload(id, para)		{ document.write( bldStr("BCV1.Upload",  id, para) ) }
function insertFormDesigner(id, para)	{ document.write( bldStr("BCV4.FormDesigner",id, para) ) }

//必需的函数(控件会反向调用，用途:切换焦点)
function focusIE(obj_or_id)
{
 if($isIE==false) {
  document.activeElement.blur();
  return;
 }
 try {
  if(typeof(obj_or_id)=='object') {
   if(document.activeElement != obj_or_id) obj_or_id.focus();
  }
  else {
   if(document.activeElement.id == obj_or_id) return;
   var o = document.getElementById(obj_or_id);
   if(o != null) o.focus();
  }
 }
 catch(e) {
 }
}


// hap add 2012/4/28
// supcan表格控件jquery增强插件
/*
	改进1： 不需要写“insertTreeList(id, para)”， 改为使用带有 class="treelist" 属性的标签， 
			如：
			<div class="treelist" 
				builder="treelist/t1.xml"
				url="treelistdata/data.txt"
				style="width:500px;height:300px;"></div>
				
			如果要给object对象指定ID并且赋值给同名的全局变量， 可以使用objid属性，
			如：
			<div class="treelist" objid="AF1"
				builder="treelist/t1.xml"
				url="treelistdata/data.txt"
				style="width:500px;height:300px;"></div>
			<script>
				AF1.func("Load", "xxx.do");
			</script>
			
	
	改进2： 不需要写OnReady， 提供新的嵌入在定义标签里的onReady事件， 每个定义标签的onReady事件会被它对应的object单独调用， 
			所以它比原来的全局OnReady少了前两个参数： id, Event， 
			如：
			<div class="treelist" 
				builder="treelist/t1.xml"
				url="treelistdata/data.txt"
				onReady="function(p1,p2,p3,p4){}"
				style="width:500px;height:300px;"></div>
	
	改进3： 不需要写OnEvent， 提供单独的嵌入在定义标签里的onEvent事件；  
			如：
			<div class="treelist" 
				builder="treelist/t1.xml"
				url="treelistdata/data.txt"
				onSelChanged="function(p1,p2,p3,p4){}"
				onClicked="function(p1,p2,p3,p4){}"
				style="width:500px;height:300px;"></div>
				
	改进4：新增 onButtonClicked 事件
			该事件只有两个参数， 一个是行号， 一个是按钮索引（从1开始）
*/
(function($){
	var console = window.console || {log: alert};
	// 常量
	var CONST = {};
	CONST.CHECKBOX_COL_NAME = "checked";

	// 字符串转换成变量
	function toVar(str){
		str = (str || "") + "";

		// 尝试全局变量
		var ns = fn.ns(str);
		if(typeof ns == "function"){
			return ns;
		};
		
		// 强制转换
		window.___temp = null;
		try{
			eval("window.___temp = " + str);
		}catch(e){};
		
		return window.___temp || null; 
	};
	
	
	// 命名空间
	window.supcan = window.supcan || {
		
		// 存储所有列表实体
		all: {},
		
		TreeList: {
			
			// events
			events: ["SelChanged","Clicked","DblClicked","EditChanged","DropdownSelChanged",
				"BeforeDropdown","LooseFocus","rowsInserted","rowsDeleted","LazyLoad",
				"MenuBeforePopup","MenuClicked","RequstAllPages","Sort","HotKey","Load"
				//,"ButtonClicked", "Refresh", "Print", "AfterReady", "AfterSort", "AfterRefresh", "AfterLoad"
			], // end events
			
			// prototype
			proto: {

				// replace func
				method: function(name){
					var args = [];
					for(var i = 1; i < arguments.length; i++){
						args.push(arguments[i]);
					};
					return this.func(name, args.join(" \r\n "));
				},
				
				getEvent: function(name){
					var self = this;
					
					var e = 
						self.events["on" + name] ||
						self.opts["on" + name] ||
						toVar(self.element.attr("on" + name)) || null;
					
					return e;
				},
				
				/**
				 * 触发事件， 如果事件不存在则忽略
				 * @param {string} event 事件名（不带on）
				 * @param {arguments} args 事件参数数组
				 */
				execEvent: function(event, args){
					var e;
					
					if(typeof event == "string"){
						e = this.getEvent(event);
					};
					
					if($.isFunction(e)){
						try{
							return e.apply(this, args);
						}catch(e){
							var msg = "[" + event + "]" + e;
							console && console.log(msg);
						}
					};
				},
				
				// 取得bottomBar的freeform句柄
				getBBar: function(){
					if(!this._bBar){
						this._bBar = this.method("GetHandle", "bBar");
						this._bBar.host = this;
					};
					return this._bBar || null;
				},
				
				refreshTimes: 0,
				
				// 刷新表格数据
				refresh: function(params){
					
					params = params || {};
					
					var self = this;
					
					// 刷新前（第一次刷新除外）要保存本地custom配置（cookie）
					self.refreshTimes++;
					if(self.refreshTimes > 1){
						self.saveCustomConfig();
					};
					
					//var where = encodeURI(serialize(":input", self.opts.queryForm)),
					var where = fn.form2param(self.opts.queryForm, false), // 序列化表单（不转换URL编码）
						postData = $.extend({}, {
								sort: self.method("GetProp", "sort"),
								sleep: 1,
								startRow: params.startRow || self.method(self.getBBar() + "GetObjProp", "ID0", "startRow") || 0,
								rows: params.rows || self.method(self.getBBar() + "GetObjProp", "ID0", "PageRows") || 20
							}, params); // end postData
					
					// 从服务器端取数
					$.ajax({
						url: self.opts.url,
						data: fn.paramExtend(where, postData),
						//type: "post",
						type: fn.isLocal ? "get" : "post",// DO
						cache: false,
						async: false,
						error: function(){
							alert("加载表格数据失败");
						},
						success: function(data){
							// 存储数据
							self._data = fn.string.json2obj(data);
							// [fn-2012.09]优化supcan：兼容无分页（data为数组，省略totalRows属性）
							if($.isArray(self._data)){
								self._data = {
									totalRows: self._data.length,
									rows: self._data
								};
							};
							
							// 重新builder
							if(self._data && self._data.builder){
								self.method("Build", self._data.builder);
								self.dynamicColumns = null;
							};
							
							// 隐藏所有动态列
							if(self.dynamicColumns){
								var cols = self.dynamicColumns;
								for(var n in cols){
									self.method("HideCol", n, true);
								};
							};
							
							// 添加或显示动态列
							if(self._data && self._data.columns){
								self.dynamicColumns = self.dynamicColumns || {};
								$.each(self._data.columns, function(i,col){
									// 检查是否已经添加过
									if(!col){
										return;
										
									}else if(self.dynamicColumns[col.name]){
										self.method("HideCol", col.name, false);
										return;
										
									}else{
										self.dynamicColumns[col.name] = col;
									};
									// 默认序号为-1（插在最后）
									if((!col.index && col.index !== 0) || isNaN(col.index)){
										col.index = -1;
									}else{
										col.index = parseInt(col.index);
									};
									// 如果有checkbox则index加一（index==-1除外）
									if((col.index !== -1) && self.opts.checkbox){
										col.index++;
									};
									// 序列化列属性
									var param = [];
									for(var n in col){
										param.push(n + '=' + col[n]);
									};
									param = param.join(';');
									// 插入列
									self.method('InsertCol', col.index, param);
								});
								
								// 重新调整动态列的顺序
								var preCol;
								$.each(self._data.columns, function(i,col){
									if(preCol){
										self.method("MoveCol", col.name, preCol.name, false);
									};
									preCol = col;
								});
							};
							
							// 将数据填充到表格中
							self.load(data);
							
							//
							self.execEvent("AfterRefresh", [self._data]);
						
							// 每次刷新完成后要读取本地custom配置（cookie）
							if(self.opts.autoLoatCustomConfig) self.loadCustomConfig();
							
							// 重新格式化表格（加入check列， 更改check可选状态）
							self.formatter();
						}
					}); // end ajax
				}, // end refresh
				
				// 加载数据
				load: function(data){
					var self = this;
					if(self.opts.bBar){
						self.method(self.getBBar() + "SetObjectProp", "ID0", "dataURL", data);
					}else{
						self.method("Load", data);
					}
				},
				
				// 格式化表格
				formatter: function(fmt){
					var self = this,
						data = self.getData(),
						fmt = self.opts.formatter,
						checkbox = $.isFunction(self.opts.checkbox) && self.opts.checkbox;
						
					if(!data || !data.rows || !data.rows.length){
						return;
					};
					
					// checkbox
					if(self.refreshTimes == 1){
						if(self.opts.checkbox){
							self.method("InsertCol", "0", "name=" + CONST.CHECKBOX_COL_NAME + ";isCheckboxOnly=true");
						};
					};
					
					if($.isFunction(fmt)){
						$.each(data.rows, function(i, row){
							if($.isFunction(checkbox)){
								var checkable = checkbox.call(self, i, row);
								self.method("SetCellEditAble", i, "checked", checkable);
							};
							fmt.call(self, i, row, data);
						});
					}else if($.isPlainObject(fmt)){
						for(var col in fmt){
							var f = fmt[col];
							if(!$.isFunction(f)){
								return;
							};
							$.each(data.rows, function(i, row){
								var text = f(row[col], row);
								self.method("SetCellText", i, col, text);
							});
						};
					}; // end if
				}, // end formatter
				
				// 获取数据
				getData: function(url){
					return this._data;
				},
				
				// 获取指定行号的数据
				getDataByRowIndex: function(index){
					var data = this.getData();
					if(data && data.rows && $.isArray(data.rows)){
						return data.rows[index];
					};
				},
				
				//行号-列名-是否超链接
				setLink: function(rowIndex, colName, isHyperLink){						
					this.method("SetCellHyperLink", rowIndex, colName, isHyperLink != false);					
				},
				
				/*
				getSelectedRows()  获取选中的行数据
				getCheckedRows() 获取checked选中的行数据数组
				deleteRows(exps) 删除行
				deleteSelectedRows() 删除选中行
				deleteCheckedRows() 删除选中行
				*/
				// 获取选中的行数据
				getSelectedRows: function(){
					var self = this;
					var data = this.getData().rows || [];
					var ids = this.method("GetCurrentRow").split(",");
					if(!ids.length || !ids[0]){
						return null;
					}else{
						ids = parseInt(ids[0]);
						return data[ids] || null;
					};
				},
				
				// 获取checked选中的行数据数组
				getCheckedRows: function(){
					var self = this;
					var rows = [];
					var data = this.getData().rows || [];
					$.each(data, function(i,n){
						if(self.method("GetCellData", i, CONST.CHECKBOX_COL_NAME) === "1"){
							rows.push(n);
						};
					});
					return rows;
				},
				
				// 删除行
				deleteRows: function(exps){
					this.method("DeleteRows", exps);
				},
				
				// 删除选中的行
				deleteSelectedRows: function(){
					var self = this;
					var ids = this.method("GetCurrentRow").split(",");
					$.each(ids, function(i,n){
						if(!n) return;
						self.method("DeleteRows", n, "1");
					});
				},
				
				// 删除checked选中的行
				deleteCheckedRows: function(){
					this.method("DeleteRows", CONST.CHECKBOX_COL_NAME + "=1");
				},
				
				// 读取本地custom配置
				loadCustomConfig: function(){
					var self = this;
					
					fn.use("jquery/cookie");
					self.CustomConfigId = location.pathname + "?treelist=" + self.opts.objid;
					self.CustomConfig = $.cookie(this.CustomConfigId);
					
					// 应用本地custom配置
					if(self.CustomConfig){
						self.method("setCustom", self.CustomConfig);
					};
					
					return self.CustomConfig;
				},
				
				// 保存本地custom配置
				// 离开页面时自动保存
				saveCustomConfig: function(){
					var self = this;
					
					fn.use("jquery/cookie");
					self.CustomConfigId = location.pathname + "?treelist=" + self.opts.objid;
					
					var custom = self.method("getCustom");
					if(custom){
						$.cookie(self.CustomConfigId, custom, {expires: 365}); // 保存本地builder至cookie（有效期365天）
					};
					return custom;
				}
				
				/* 获取配置文件
				 @returns {null|object}
				*/
				/*
				,
				getBuilder: function(){
					var self = this;
					
					if(this._builder){
						return this._builder;
					};
					
					this._builder = null;
					
					if(this.opts.builder){
						$.ajax({
							url: this.opts.builder,
							async: false, 
							success: function(text){
								self._builder = text;
								// DO
							}
						});
					}; // end if
					
					return this._builder;
				}
				*/
			}, // end prototype
			
			// defaultEvents
			defaultEvents: {

				onReady: function(){

					// onReady可能会发生在proto拷贝之前， 所以method方法要手动加上去
					this.method = this.method || window.supcan[this.opts.type].proto.method;
					
					//服务器端排序
					this.method("SetProp", "IsRemoteSort", this.opts.isRemoteSort.toString());
			        
					if(this.opts.bBar){
						//取得Treelist句柄
						var h = this.method("GetHandle", "");
						//取得bottomBar的freeform句柄，并调用freeform的扩展函数：绑定Treelist
						var bBar = this.getBBar();
						
						//绑定分页器
						this.method(bBar + "BindPager", h, "ID0");
					};
					
					if(this.opts.autoLoad){
						this.refresh();
					};
			  	 	
				}, // end onReady

		
				// 内置排序事件
				onSort_: function(p1,p2,p3,p4){
					if(p1=='1'){
						this.refresh();
					}
				},
				
				// 内置刷新事件
				onRefresh_: function(){
					this.refresh();
				},
				
				// 内置打印事件
				onPrint_: function(){
					this.method("Print");
				},
				
				// 内置分页事件
				onPager_: function(p1,p2,p3,p4){
					this.refresh({
						startRow: p2,
						rows: p3
					});
				}
				
			} // end defaultEvents
			
		}, // end TreeList
	
		FreeForm: {
			
			// events
			events: ["EditChanged","ButtonClicked","LooseFocus","BeforeDropdown","MenuClicked",
				"MenuBeforePopup","Upload","ImageClicked","ImageDblClicked","FreeformTreeClicked",
				"FreeformTreeDblClicked","BeforePager","Pager","HyperLink","HotKey"
			], // end events

			// prototype
			proto: {
				
			}, // end prototype
			
			// defaultEvents
			defaultEvents: {
				
			} // end defaultEvents
			
		} // end FreeForm
		
	}; // end window.supcan
	
	
	// 新treelist组件
	var Supcan = function(type, selector, opt){
		
		type = {treelist: "TreeList", freeform: "FreeForm"}[type.toLowerCase()] || "";
		if(!type) {
			alert("错误的控件类型！");
			return null;
		};
			
		
		var results = [];
		$(selector).each(function(){
			var element = $(this);
			
			// 如果对应object已经存在， 直接返回， 否则初始化它
			var objId = element.attr("objid");
			var obj = objId ? window.supcan.all[objId] : null;
			if(obj){
				results.push(obj);
				//如果对应object已经存在， 直接返回,执行下一次遍历
				return;
			};
			
			// 检查和默认参数
			opt = opt || {}
			opt.type = type;
			opt.objid = objId;
			opt.para = opt.para || "";
			opt.builder = opt.builder || element.attr("builder");
			opt.url = opt.url || element.attr("url");
			opt.bBar = opt.bBar || element.attr("bBar") || "";
			opt.autoHeight = opt.autoHeight || element.attr("autoHeight") != "false";
			opt.queryForm = $(opt.queryForm || element.attr("queryForm"));
			opt.queryButton = $(opt.queryButton || element.attr("queryButton") || $(":submit", opt.queryForm));
			opt.isRemoteSort = opt.isRemoteSort || (element.attr("isRemoteSort") != "false");
			opt.checkForm = fn.tagFunc(element.attr("checkForm"));
			opt.autoLoad = element.attr("autoLoad") != "false";
			opt.checkbox = opt.checkbox || toVar(element.attr("checkbox"));
			opt.formatter = opt.formatter || toVar(element.attr("formatter")) || function(){};
			opt.autoLoatCustomConfig = element.attr("autoLoatCustomConfig") != "false";
			
			opt.url = fn.url.format(opt.url);
			opt.url = fn.string.replace(opt.url, "startRow=@startRow&rows=@rows", ""); // 清除旧页面中遗留的参数
			
			// 默认分页条
			if(opt.bBar == "default"){
				opt.bBar = window.SpucanPagerPath; 
			};
			
			// 自适应高度
			if(opt.autoHeight){
				autoHeight(element);
			};
			
			// 自动生成一个ID， 并绑定到element
			objId = objId || ("objId" + parseInt(Math.random()*1000000));
			element.attr("objid", objId);
			
			// 插入activex对象
			element.append(bldStr("BCV1." + type, objId, opt.para));
			obj = $("#" + objId, selector).get(0);
			obj.element = element;
			obj.opts = opt;
			obj.opts.type = type;
			
			// 离开页面时自动保存custom配置
			window.onunload = function(){
				obj.saveCustomConfig();
			};
			

			// 事件, default < dom < opt
			obj.events = $.extend({}, window.supcan[type].defaultEvents, (function(){
				var es = {}, 
					events = window.supcan[type].events;
				
				for(var i=0,len = events.length; i<len; i++){
					
					// from dom
					var e = toVar(element.attr("on" + events[i]));
					if(e) es["on" + events[i]] = e;
					
					// from opt
					var e2 = obj.opts["on" + events[i]];
					if(e2 != undefined) es["on" + events[i]] = e2;
				};
				
				return es;
			})());

			// 扩展属性
			var proto = window.supcan[type].proto;
			for(var n in proto){
				obj[n] = proto[n];
			};
			
			// bind event
			obj.opts.queryButton.click(function(){
				// 验证表单
				if(obj.opts.checkForm && (obj.opts.checkForm() == false)) return;
				
				// 刷新
				obj.refresh.apply(obj);				
			});	
			
			window.supcan.all[objId] = obj;
			window[objId] = obj;
			
			// 写入返回结果
			results.push(obj);
		});		
		
		if(results.length == 0){
			return null;
		}else if(results.length == 1){
			return results[0];
		}else{
			return results;
		};
	}; // end treelist
	
	// 重写OnReady
	window.OnReady = function(id){	
		
		var obj = window.supcan.all[id];
		if(!obj) return;		
		
		if(obj.opts.builder){		
			obj.func("Build", obj.opts.builder);
		};

		if(obj.opts.bBar){	
			var a = obj.func("OpenFreeformBar", obj.opts.bBar+" \r\n bBar");
		};
		
		if(obj.events.onReady){
			obj.events.onReady.call(obj, id);
		};
		
		if(obj.events.onAfterReady){
			obj.events.onAfterReady.call(obj, id);
		};
	}; // end OnReady
	
	// 重写OnEvent
	window.OnEvent = function(id, eventName, p1, p2, p3, p4){
		//原始参数  OnEvent(id, Event, p1, p2, p3, p4)  id:控件id event:事件名称
		
		// 提取参数 从第3个开始
		var args = (function(args){
			var _args = [];			
			for(var i = 2; i < args.length; i++){
				_args.push(args[i]);
			};
			return _args;
		})(arguments);
		
		// 获取对象
		var obj = window.supcan.all[id];
		if(!obj) return;
		//fn.d([id, eventName, p1, p2, p3, p4]);
		
		// 扩展点击事件
		if(eventName === "Clicked"){ // 单元格点击事件
			var isButton = args.length >= 3 && args[3] && args[3].indexOf("button") == 0;
			var isLink = args[2];
			
			var key = obj.func("GetRowKey", args[0]); //主键id
			var col = args[1]; 
			var buttonIndex = parseInt(args[3].replace("button","") || 1) - 1;	
			
			var e;
			
			if(isButton || isLink){
				e = obj.getEvent(capitalize(col) + buttonIndex + "Clicked") ||
					obj.getEvent(capitalize(col) + "Clicked");
			}else{
				e = obj.getEvent(capitalize(col) + "Clicked");
			};
			
			if(e){
				e.call(obj, {
					rowIndex: args[0],                    // 行号
					data: obj.getDataByRowIndex(args[0]), // 行数据
					key: key,                             // 行的key
					buttonIndex: buttonIndex              // 点击的按钮的索引号（第几个按钮, 从0开始）
				});
			};
			
			return; 
			
		}else if(eventName === "ButtonClicked"){
			
			if(p1 === "IDRefresh"){ // 刷新
				// 如果可自定义事件返回false， 停止执行后面的内置事件, 下同
				if(obj.execEvent("Refresh", args) === false) return false;
				obj.execEvent("Refresh_", args);
				
			}else if(p1 === "IDPrint"){ // 打印
				if(obj.execEvent("Print", args) === false) return false;
				obj.execEvent("Print_", args);
				
			}else{ // 其它按钮点击事件
				return obj.execEvent(eventName, args);
				
			};

		}else if(eventName === "Load"){ // 加载
			if(obj.execEvent("Load", args) === false) return false;			
			obj.execEvent("Load_", args);
			obj.execEvent("AfterLoad", args);
			
		}else if(eventName === "Pager"){ // 分页
			if(obj.execEvent("Pager", args) == false) return false;
			obj.execEvent("Pager_", args);
			
		}else if(eventName === "Sort"){ // 排序
			if(obj.execEvent("Sort", args) === false) return false;
			obj.execEvent("Sort_", args);
			
		}else{ // 其它事件
			return obj.execEvent(eventName, args);
			
		};
		
	}; // end OnEvent
	
	// 初始化方法
	window.$treelist = function(selector, opts){
		return Supcan("treelist", selector, opts)
	};
	
	// 页面加载完成时自动执行初始化
	$(function(){
		$treelist(".treelist");	
		$treelist(".fn-treelist");	
	});


	/**
	 * 自适应高度
	 */
	// 让元素自适应页面高度
	function autoHeight(elem, bindResize){

		// 防止抖动
		if(window._disabled) return;
		window._count = (window._count || (function(){
			window._time = (new Date()).getTime();
			return 0;
		})()) + 1;
		if(window._count >= 9){
			if((new Date()).getTime() - window._time < 1000){
				window._disabled = true;
			};
			window._count = 0;
		};
		
		//
		elem = $(elem).height(0);
		
		var h = clientHeight() - bodyHeight() + elem.outerHeight();
		//alert([clientHeight(), bodyHeight(), elem.outerHeight()]);
		if(h > 0){
			h = h > 8 ? h - 8 : 400;
			elem.height(h);
			//$("input").val(h);
			// 绑定window.onresize事件
			if(bindResize !=  false) $(window).resize((function(elem){
				return function(){
					autoHeight(elem, false);
				};
			})(elem));
		};
	};

	// 获取元素总高度
	function bodyHeight(dtd){
		var h = 0, bd = $(document.body);
		
		// 计算dtd信息
		var dtd = window._dtd || (function(){
			var docType = (
					document.body.parentNode && 
					document.body.parentNode.parentNode && 
					document.body.parentNode.parentNode.firstChild && 
					document.body.parentNode.parentNode.firstChild.nodeValue || ""
				).toLowerCase(),
				xhtml = docType.indexOf("xhtml") > -1;
			
			window._dtd = {
				string : docType,                                             // dtd声明
				noType : docType.indexOf("-//w3c//dtd") < 0,                  // dtd类型未指定
				html4_strict : !xhtml && docType.indexOf("strict") > -1,      // dtd类型： html4/strict
				html4_loose : !xhtml && docType.indexOf("loose") > -1,        // dtd类型：html4/loose
				html4_frameset : !xhtml && docType.indexOf("frameset") > -1,  // dtd类型：html4/frameset
				xhtml : xhtml                                                 // dtd类型：xhtml
			};
			
			window._dtd.ltHtml4Strict = window._dtd.noType || (               // dtd小于等于html4 strict
				!window._dtd.xhtml &&
				!window._dtd.html4_loose && 
				!window._dtd.html4_strict && 
				!window._dtd.html4_frameset
			);
			
			
			return window._dtd;
		})();
		
		// 如果是IE
		// 如果声明dtd或者dtd的版本低于html4_strict 或者 大于html4_strict且浏览器为IE6/7， 则手动计算body子元素总高度
		if(!!window.ActiveXObject && (dtd.ltHtml4Strict || (!dtd.ltHtml4Strict && (!-[1,] && !(!-[1,] && !!document.documentMode))))){
			bd.children().each(function(){
				if(this.style.opacity == 0 || this.style.display == "none" || this.style.position == "absolute") return;
				h += $(this).outerHeight();
			});
		}else{
			// 如果是火狐
			h = bd.height();
		};
		
		h += parseInt(bd.css("margin-top")) || 0;
		h += parseInt(bd.css("margin-bottom")) || 0;
		
		return h;
	};

	// 获取浏览器可视范围高度
	function clientHeight(){
		var _rootEl = document.compatMode=="CSS1Compat" ? document.documentElement : document.body;
		return _rootEl.clientHeight;
	};

	// 获取元素总高度
	function outerHeight(elem){
		elem = $(elem);
		var h = elem.height();
		var mt = parseInt(elem.css("margin-top")) || 0;
		var mb = parseInt(elem.css("margin-bottom")) || 0;
		return h + mt + mb;
	};
	
	// 序列化指定范围内的指定dom
	function serialize(selector, parent){
		var s = [];
		$(selector, parent || document || "body").each(function(){
		    var val = $(this).val(), name = $(this).attr("name");
		    if(name){
		        s.push(name + "=" + val);
		    };
		});
		return s.join("&");

	};
	
	// 首字母大写
	function capitalize(s){
		s = s.toLowerCase();
		return s.slice(0,1).toUpperCase() + s.slice(1);
	};
	
	function addParam(url, param){
		if(url.indexOf("?") == -1){
			url += "?";
		};
		var lastChar = url.charAt(url.length - 1);
		if(lastChar != "&" && lastChar != "?"){
			url += "&";
		};
		return url + param;
	};

	
})(jQuery);