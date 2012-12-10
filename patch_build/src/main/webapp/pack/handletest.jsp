<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<style>
	input.bugNo, input.oldBugNo{width:120px;}
	input.comment, input.oldComment{width:400px;}
</style>
<table>
	<caption style="white-space:nowrap;">你已经开始对构建包${info.buildNo }进行测试，可以执行以下操作</caption>
	<tr class="cap">
		<td >安装补丁</td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td class="r"><a href="${basePath }/installPatch.jnlp">启动构建包安装工具</a></td>
		<td class="pl l cmt">服务器地址：http://wiki.bytter.com/pb/</td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td class="r"><a href="${basePath }/pack/download?uuid=${i}">下载构建包</a></td>
		<td class="pl l cmt">直接下载构建包在本地进行安装验证</td>
		<td></td>
	</tr>
	<tr class="cap">
		<td >录入BUG</td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td colspan="3">
		<s:form action="handletest" theme="simple" id="bugform" namespace="/pack">
			<s:hidden name="info.uuid"/>
			<table id="bugTable">
				<tr>
					<th>BUG编号</th>
					<th>BUG描述</th>
					<th>已修复</th>
				</tr>
				<s:iterator value="info.bugs" status='st' id='bug'> 
				<tr>
					<td>
						<input type="hidden" name="info.bugs[${st.index}].uuid" class="buguuid" value="${bug.uuid}"/>
						<input type="text" class="oldBugNo" name="info.bugs[${st.index}].bugNo" value="${bug.bugNo }" readonly="true"/></td>
					<td><input type="text" class="oldComment" name="info.bugs[${st.index}].comment" value="${bug.comment}"/></td>
					<td><input type="checkbox" name="info.bugs[${st.index}].fixed" value="${bug.fixed}"/></td>
				</tr>
				</s:iterator>
				<tr>
					<td>
						<input type="text" class="bugNo" name="bugNo"/></td>
					<td><input type="text" class="comment" name="comment"/></td>
					<td><input type="checkbox" name="fixed"/></td>
				</tr>
				<tr>
					<td></td>
					<td class="r"><input type="button" value="保存BUG信息" id="saveBug"/></td>
					<td><img style="width:25px; height:25px; cursor:pointer" src="${basePath }/images/add.png" name="addBtn"/></td>
				</tr>
			</table>
		</s:form>
		</td>
	</tr>
	<tr class="cap">
		<td >反馈测试结果</td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td ></td>
		<td colspan="3">
			<s:form action="handleTask" theme="simple" id="taskForm" namespace="/msg">
			<input type="hidden" name="i" value="${i}"/>
			<input type="hidden" name="t" value="${t}"/>
			<table>
				<tr>
					<td><input type="radio" name="context.pass" value="true"/>测试通过</td>
					<td class="pl l cmt">该构建包已经没有问题，可以进入发布阶段</td>
				</tr>
				<tr>
					<td><input type="radio" name="context.pass" value="false"/>打回开发</td>
					<td class="pl l cmt">该构建包存在严重BUG，并且无法通过BUG构建包解决，必须打回开发人员重新构建</td>
				</tr>
				<tr>
					<td>打回原因描述</td>
					<td class="pl"><textarea style="width:100%;" id="failreason" name="context.failReason">严重错误</textarea></td>
				</tr>
				<tr>
					<td class="pl"></td>
					<td class="c"><input type="submit" value="确认结果" id="comfResult"/></td>
				</tr>
			</table>
			</s:form>
			
		</td>
	</tr>
</table>
<script type="text/javascript" src="${basePath}/js/pack/handletest.js"></script>
<%@ include file="/include/footer.jsp" %>