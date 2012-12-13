<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/header.jsp" %>
<div class="wf l mt">【构建日志】分支:${pack.branch.branch }, 构建号:${pack.buildNo }</div>
<div class="queryBar"></div>
<textarea class="wf" style="height:500px" disabled="disabled">${pack.buildLog }</textarea>
<%@ include file="/include/footer.jsp" %>