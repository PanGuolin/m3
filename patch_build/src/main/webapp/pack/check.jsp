<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div class="queryBar"></div>
<div style="font-weight:bold; margin-top:10px;">
	<span style="font-size:1.2em;" >构建包【${info.buildNo}】构建成功构建，请设计师检查是否允许进入测试阶段</span>
	<a href="#" class="pl">查看检查规范</a>
</div>
<div style="text-align:left; width:960px; clear:both; margin:0 auto;">
	<table style="width:100%; border:1px solid #ccc;">
		<tr>
			<td class="r">构建分支：</td>
			<td>${info.branch.branch }</td>
			<td class="r">申请用户：</td>
			<td>${info.requester}</td>
			<td class="r">申请时间：</td>
			<td>${info.requestTime }</td>
		</tr>
	</table>
	<table class="dataTable">
		<caption>补丁依赖列表</caption>
		<tr>
			<th>索引</th>
			<th>补丁编号</th>
			<th>当前状态</th>
			<th>申请人</th>
			<th>测试人</th>
		</tr>
		<s:iterator value="info.depends" status='st' id='depend'> 
		<tr>
			<td><s:property value="#st.index + 1"/></td>
			<td><s:property value='#depend.buildNo'/></td>
			<td><s:property value="#depend.status"/></td>
			<td><s:property value="#depend.requester"/></td>
			<td><s:property value="#depend.tester"/></td>
		</tr>
		</s:iterator> 
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
		<s:iterator value="info.buildFiles" status='st' id='buildFile'> 
		<tr>
			<td><s:property value="#st.index + 1"/></td>
			<td><s:property value='#buildFile.url'/></td>
			<td><s:property value="#buildFile.modifyTime"/></td>
			<td><s:property value="#buildFile.modifier"/></td>
			<td class="c"><a href="#" onclick="checkObj.view('${info.uuid}<s:property value="#buildFile.uuid"/>')">查看</a></td>
		</tr>
		</s:iterator> 
	</table>
	<br/>
	<div style="clear:both">包含依赖包:${info.libfiles}</div>
	<table id="checklist" style="margin-top:20px;">
		<caption>检查清单</caption>
		<tr>
			<td></td>
			<td>全部通过<input type="checkbox" id="passAll"/></td>
			<td></td>
		</tr>
		<tr class="cap">
			<td >名称检查</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">构建包名称是否符合规范：</td>
			<td class="l"><select><option></option><option>通过</option><option>不通过</option></select></td>
		</tr>
		<tr class="cap">
			<td>SQL文件检查</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">SQL语法正确性：</td>
			<td class="l"><select><option></option><option>通过</option><option>不通过</option></select></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">脚本可重复执行：</td>
			<td class="l"><select><option></option><option>通过</option><option>不通过</option></select></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">包含各数据库脚本：</td>
			<td class="l"><select><option></option><option>通过</option><option>不通过</option></select></td>
		</tr>
		<tr class="cap">
			<td>其它检查项</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">其它检查：</td>
			<td class="l"><select id="otherPass"><option>通过</option><option>不通过</option></select><span style="color:#333">*不通过必须填写原因</span></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">不通过原因：</td>
			<td class="l"><textarea cols="100" rows="5" id="otherReason"></textarea></td>
		</tr>
		<tr class="cap">
			<td>最后检查结果:</td>
			<td class="r"></td>
			<td class="l"></td>
		</tr>
		<tr>
			<td></td>
			<td class="r">当前的检查结果为：<span id="chkresult"></span></td>
			<td style="text-align:center"><input type="button" value="提交检查结果" id="subchk" disabled="disabled"/></td>
		</tr>
	</table>
	<s:form action="handleTask" theme="simple" id="taskForm" namespace="/msg">
		<span class="submitConfirm">确定要提交检查结果？</span>
		<input type="hidden" name="i" value="${i}"/>
		<input type="hidden" name="t" value="${t}"/>
		<input type="hidden" name="context.failReason" id="failreason" value=""/>
	</s:form>
</div> 
<div id="fileSource" class="easyui-window" title="查看源文件" data-options="iconCls:'icon-save'" style="width:800px;height:600px;"> 
</div> 
    
<script type="text/javascript" src="${basePath}/js/pack/check.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/XRegExp.js"></script> 
<script type="text/javascript" src="${basePath}/js/syh/shCore.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJScript.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJava.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushSql.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushXml.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushPhp.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}/css/syh/shCore.css"/>
<link type="text/css" rel="Stylesheet" href="${basePath}/css/syh/shThemeDefault.css" />
<%@ include file="/include/footer.jsp" %>
<script>
fn.use("jquery/easyui");
$('#fileSource').window({closed:true});
$().ready(checkObj.attach);
</script>