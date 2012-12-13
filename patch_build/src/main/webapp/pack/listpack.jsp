<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include/header.jsp" %>
<div class="queryDiv">
	<s:form action="query" theme="simple" id="queryForm" namespace="/pack">
	<s:set value="@com.m3.patchbuild.branch.BranchUtil@listAllBranch()" name="branchs"/>
	<s:set value="@com.m3.patchbuild.pack.PackStatus@values()" name="packStatus"/>
	<table>
		<tr>
			<td class="h">所属分支：</td>
			<td><select name="q.branch" selValue="${currentBranch.branch}">
				<option value=""></option>
				<s:iterator value='branchs' status='st' id='branch' >
				<option value="<s:property value='#branch.branch'/>"> <s:property value='#branch.name'/></option>
				</s:iterator> 
			</select></td>
			<td class="h">构建包状态：</td>
			<td><select name="q.packStatus">
				<option value="-1"></option>
				<s:iterator value='packStatus' status='st' id='stats'>
				<option value="<s:property value='#st.index'/>"><s:property value='#stats'/></option>
				</s:iterator>
			</select></td>
			<td class="h">构建号：</td>
			<td><input type="text" name="q.buildNo"/></td>
			<td class="h">所属补丁：</td>
			<td><input type="text" name="q.patch"/></td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="h">申请人ID：</td>
			<td><input type="text" name="q.requester"/></td>
			<td class="h">测试员ID：</td>
			<td><input type="text" name="q.tester"/></td>
			<td class="h">检查员ID：</td>
			<td><input type="text" name="q.checker"/></td>
			<td class="h"><input type="checkbox" name="q.showDeployed" 	value="true"/></td>
			<td>显示已发布</td>
			<td class="h"><input type="checkbox" name="q.showFailed" 	value="true"/></td>
			<td>显示失败构建包</td>
			<td class="h"><input type="checkbox" name="q.onlyMyFollowed" value="true"/></td>
			<td>仅显示我关注的</td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="h">构建时间：</td>
			<td><input type="text" class="fn-date" name="q.buildStart"/></td>
			<td class="h">到：</td>
			<td><input type="text" class="fn-date" name="q.buildEnd"/></td>
			<td class="h">发布时间：</td>
			<td><input type="text" class="fn-date" name="q.deployStart"/></td>
			<td class="h">到：</td>
			<td><input type="text" class="fn-date" name="q.deployEnd"/></td>
			<td><input type="submit" id="querySubmit" value="查询"/></td>
			<td><input type="reset" id="querySubmit" value="重置条件"/></td>
		</tr>
	</table>
	</s:form>
</div>
<div class="queryBar" title="点击隐藏/显示查询表单"><img src="${basePath }/images/up.png"/><img src="${basePath }/images/down.png"/></div>
<div class="toolBar">
	<img id="viewOp" 		src="${basePath}/images/tb/users.png" 		title="查看操作人"/>
	<img id="handleTask" 	src="${basePath}/images/tb/task.png" 		title="处理任务"/>
	<img id="downloadFile" 	src="${basePath}/images/tb/download.png" 	title="下载文件"/>
	<img id="addPack" 		src="${basePath}/images/tb/add.png" 		title="新增构建"/>
	<img id="viewDetail" 	src="${basePath}/images/tb/detail.png" 		title="查看明细"/>
	<img id="viewBuildLog"	src="${basePath}/images/tb/log.png" 		title="查看构建日志"/>
</div>

<table class="fn-datagrid" style="display:none;" id="datagrid"
		pagination="true"
		rownumbers="true" 
		fitColumns="false"
		resizable="true"
		pageSize="30"
		singleSelect="true"
		pageIndexParam="q.pageIndex"
		pageSizeParam="q.pageSize"
		autoLoad="false"
		url="${basePath }/pack/query"
		>
	<thead>
		<tr>
			<th field="branch.branch" width="50">分支</th>
			<th field="buildNo" 	width="100">构建号</th>
			<th field="requester" 	width="100">申请人</th>
			<th field="requestTime" width="100" 	align="right" formatter="formatTime">申请时间</th>
			<th field="buildTime"	width="100" 	align="right" formatter="formatTime">构建时间</th>
			<th field="status" 		width="100" 	align="center" formatter="formatStatus" >当前状态</th>
			<th field="dependsA"	width="100">依赖构建包</th>
			<th field="checker" 	width="60">检查人</th>
			<th field="checkTime" 	width="100" 	align="right" formatter="formatTime">检查时间</th>
			<th field="assigner"	width="60">分配人</th>
			<th field="assignTime" 	width="100" 	align="right" formatter="formatTime">分配时间</th>
			<th field="tester" 		width="60">测试人</th>
			<th field="testTime"	width="100"		align="right" formatter="formatTime">开始测试时间</th>
			<th field="passTime"	width="100"		align="right" formatter="formatTime">测试通过时间</th>
			<th field="deployer"	width="60">发布人</th>
			<th field="patch" 		width="150" 	align="left">所属补丁</th>
			<th field="deployTime"	width="100"		align="right" formatter="formatTime">发布时间</th>
		</tr>
	</thead>
</table>
<div id="taskWindow" class="easyui-window" title="处理构建包" data-options="iconCls:'icon-save'" style="width:400px;height:300px;"></div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pack/listpack.js"></script>
<%@ include file="/include/footer.jsp" %>