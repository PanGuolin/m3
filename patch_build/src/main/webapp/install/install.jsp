<%@page language="java" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<title>Insert title here</title>
</head>
<body>
<applet code="com.m3.patchbuild.applet.InstallPack.class" name="installApp" id="installApp"
 width="200" height="100" codebase="." archive="pb.jar">
</applet>
<br/>
<input type="button" onclick="document.getElementById('installApp').start()" value="start"/>
</body>
</html>