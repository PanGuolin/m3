<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
	<div style="font-weight:bold;">构建包【${pack.buildNo}】构建成功构建，请设计师检查是否允许进入测试阶段</div>
	<div style="text-align:left; width:960px; clear:both; margin:0 auto;">
		<table style="width:100%; border:1px solid #ccc;">
			<tr>
				<td class="r">构建分支：</td>
				<td>${pack.branch.branch }</td>
				<td class="r">申请用户：</td>
				<td>${pack.requester}</td>
				<td class="r">申请时间：</td>
				<td>${pack.requestTime }</td>
			</tr>
		</table>
		<table class="dataTable">
			<caption>补丁包含文件列表</caption>
			<tr>
				<th>索引</th>
				<th>文件路径</th>
				<th>修改时间</th>
				<th>最后修改人</th>
				<th></th>
			</tr>
		<s:iterator value="pack.buildFiles" status='st' id='buildFile'> 
			<tr>
				<td><s:property value="#st.index + 1"/></td>
				<td><s:property value='#buildFile.url'/></td>
				<td><s:property value="#buildFile.modifyTime"/></td>
				<td><s:property value="#buildFile.modifier"/></td>
				<td class="c"><a href="#" onclick="checkObj.view('${pack.uuid}<s:property value="#buildFile.uuid"/>')">查看</a></td>
			</tr>
		</s:iterator> 
		</table>
		<table id="checklist" style="margin-top:20px;">
			<caption>检查清单</caption>
			<tr class="cap">
				<td >名称检查</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">构建包名称是否符合规范：</td>
				<td class="l"><select name=""><option></option><option>通过</option><option>不通过</option></select></td>
			</tr>
			<tr class="cap">
				<td>SQL文件检查</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">SQL语法正确性：</td>
				<td class="l"><select name=""><option></option><option>通过</option><option>不通过</option></select></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">脚本可重复执行：</td>
				<td class="l"><select name=""><option></option><option>通过</option><option>不通过</option></select></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">包含各数据库脚本：</td>
				<td class="l"><select name=""><option></option><option>通过</option><option>不通过</option></select></td>
			</tr>
			<tr class="cap">
				<td>其它检查项</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">是否通过：</td>
				<td class="l"><select name=""><option>通过</option><option>不通过</option></select></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">不通过原因：</td>
				<td class="l"><textarea cols="100" rows="5"></textarea></td>
			</tr>
			<tr class="cap">
				<td>最后检查结果:</td>
				<td class="r"></td>
				<td class="l"></td>
			</tr>
			<tr>
				<td></td>
				<td class="r">当前的检查结果为：<span id="chkresult"></span></td>
				<td style="text-align:center"><input type="button" value="提交检查结果"/></td>
			</tr>
		</table>
	</div> 
    <div id="fileSource" class="easyui-window" title="SourceWindow" data-options="iconCls:'icon-save'" style="width:800px;height:600px;"> 
    </div> 
    
<script type="text/javascript" src="${basePath}/js/pack/check.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/XRegExp.js"></script> 
<script type="text/javascript" src="${basePath}/js/syh/shCore.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJScript.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJava.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushSql.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushXml.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}/css/syh/shCore.css"/>
<link type="text/css" rel="Stylesheet" href="${basePath}/css/syh/shThemeDefault.css" />
<%@ include file="../include/footer.jsp" %>
<script>
fn.use("jquery/easyui");
$('#fileSource').window({closed:true});
$().ready(function(){
	for (var p in SyntaxHighlighter) {
		//alert(p + "=" + SyntaxHighlighter[p]);
	}});
	
	
	
</script>