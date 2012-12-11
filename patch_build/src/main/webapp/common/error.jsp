<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ include file="/include/header.jsp" %>
<div class="queryBar"></div>
<div class="pt">
	${tips }
	<div class="pt">
		<input type="button" value="返回" onclick="history.go(-1)"/>
		<input type="button" value="回到我的消息" onclick="window.location.href='${basePath}/msg/mymsg.jsp'"/>
	</div>
</div>
<s:debug/>
<%@ include file="/include/footer.jsp" %>