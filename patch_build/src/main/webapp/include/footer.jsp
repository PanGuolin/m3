<%@page language="java" pageEncoding="UTF-8"%>
</div>
</body>
<script src="${pageContext.request.contextPath}/js/fn/fn.js?use=widget"></script>
<script src="${pageContext.request.contextPath}/js/include/footer.js"></script>
<script>
if ($('#taskWindow').length) {
	fn.use("jquery/easyui");
	fn.use("jquery/form");
	$('#taskWindow').window({closed:true, onLoad:defTaskWinLoaed});
}
</script>
</html>