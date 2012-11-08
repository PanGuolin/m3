<%@page language="java" pageEncoding="UTF-8"%>
<%@ include file="/include/simple_header.jsp" %>
<script type="text/javascript" src="${basePath}/js/syh/XRegExp.js"></script> 
<script type="text/javascript" src="${basePath}/js/syh/shCore.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJScript.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushJava.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushSql.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushXml.js"></script>
<script type="text/javascript" src="${basePath}/js/syh/shBrushPhp.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}/css/syh/shCore.css"/>
<link type="text/css" rel="Stylesheet" href="${basePath}/css/syh/shThemeDefault.css" />

<div style="text-align:left">
<span id="fileUrl">${dataMap.url }</span>
<script type="syntaxhighlighter" class="brush: ${dataMap.type };"><![CDATA[
${dataMap.content}
]]></script>
</div>
<script type="text/javascript">SyntaxHighlighter.hlall();</script>
<%@ include file="../include/footer.jsp" %>