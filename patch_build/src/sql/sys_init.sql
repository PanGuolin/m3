
-- ====================================================================================
-- 系统角色
-- ====================================================================================
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'developer', '开发工程师', 1, 0, 1);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'designer', '设计师', 1, 1, 1);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'testmanager', '测试经理', 1, 1, 1);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'tester', '测试工程师', 1, 0, 1);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'deployer', '发布人员', 1, 0, 1);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'admin', '管理员', 1, 0, 0);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), '[loginedUser]', '登录用户', 1, 0, 0);
INSERT INTO Sys_Role (UUID, Code, Name, SystemRole, ManageRole, Assignable) VALUES (uuid(), 'manager', '系统管理员', 1, 0, 0);


-- ====================================================================================
-- 系统功能
-- ====================================================================================
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'QueryMessage', '查看我的消息', '/msg/mymsg.jsp', null);
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'QueryPack', '查看构建包列表', '/pack/listpack.jsp', null);
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'QueryPatch', '查看补丁列表', '/patch/listpatch.jsp', null);
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'MyRelation', '用户关系', '/uer/relation', 'com.m3.patchbuild.user.action.ManagerRelationAction');
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'UserInfo', '个人信息', '/user/userinfo', 'com.m3.patchbuild.user.action.EditUserAction');
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'AddPack', '新增构建包', '/pack/addbuild.jsp', null);
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'SysManager', '系统维护', '/sys/index.jsp', null);

-- ====================================================================================
-- 角色权限
-- ====================================================================================
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryMessage' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryPack' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryPatch' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='MyRelation' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='UserInfo' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='AddPack' and role.code='developer');




-- ====================================================================================
-- 系统菜单
-- ====================================================================================
INSERT INTO Sys_Menu(UuId, Parent, MenuIndex, Id, Name, Level, Function) (SELECT uuid(), null, 0, 'myMessage', '我的消息', 1, uuid FROM Sys_Function WHERE code='QueryMessage');
INSERT INTO Sys_Menu(UuId, Parent, MenuIndex, Id, Name, Level, Function) (SELECT uuid(), null, max(menu.MenuIndex)+10, 'packList', '构建包管理', 1, funct.uuid FROM Sys_Function funct, Sys_Menu menu WHERE code='QueryPack');
INSERT INTO Sys_Menu(UuId, Parent, MenuIndex, Id, Name, Level, Function) (SELECT uuid(), null, max(menu.MenuIndex)+10, 'patchList', '补丁管理', 1,  funct.uuid FROM Sys_Function funct, Sys_Menu menu WHERE code='QueryPatch');
INSERT INTO Sys_Menu(UuId, Parent, MenuIndex, Id, Name, Level, Function) (SELECT uuid(), null, max(menu.MenuIndex)+10, 'myRelation', '我的关系', 1, funct.uuid FROM Sys_Function funct, Sys_Menu menu WHERE code='MyRelation');
INSERT INTO Sys_Menu(UuId, Parent, MenuIndex, Id, Name, Level, Function) (SELECT uuid(), null, max(menu.MenuIndex)+10, 'sysManager', '系统维护', 1, funct.uuid FROM Sys_Function funct, Sys_Menu menu WHERE code='SysManager');

-- ====================================================================================
-- 完整功能
-- ====================================================================================
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewMsgDetail', '查看详细消息', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewMsgDetail' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, 'ViewMsgDetail', '查看详细消息', -1, funct.uuid, 1, '/images/tb/detail.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='myMessage') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewMsgDetail' and menu.id='myMessage'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewMsgOp', '查看任务处理人', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewMsgOp' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, 'ViewMsgOp', '查看任务处理人', -1, funct.uuid, 1, '/images/tb/users.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='myMessage') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewMsgOp' and menu.id='myMessage'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'DoMsgTask', '处理消息相关任务', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='DoMsgTask' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, 'DoMsgTask', '处理消息相关任务', -1, funct.uuid, 1, '/images/tb/task.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='myMessage') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='DoMsgTask' and menu.id='myMessage'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'IgnoreMsg', '忽略消息', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='IgnoreMsg' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/trash.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='myMessage') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='IgnoreMsg' and menu.id='myMessage'
);

------ 
INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'NewPack', '新增构建包', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='NewPack' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/add.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='NewPack' and menu.id='packList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewPackOP', '查看操作人', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewPackOP' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/users.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewPackOP' and menu.id='packList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'HandlePack', '处理构建包', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='HandlePack' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/task.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='HandlePack' and menu.id='packList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'DownloadPack', '下载构建包', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='DownloadPack' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/download.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='DownloadPack' and menu.id='packList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewPackDetail', '查看构建包详细信息', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewPackDetail' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/detail.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList') 
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewPackDetail' and menu.id='packList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewPackBuildLog', '查看构建日志', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewPackBuildLog' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/log.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='packList')
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewPackBuildLog' and menu.id='packList'
);

--- 补丁管理

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'ViewPatchDetail', '查看补丁详细信息', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='ViewPatchDetail' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/detail.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='patchList')
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='ViewPatchDetail' and menu.id='patchList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'DownloadPatch', '下载原始补丁', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='DownloadPatch' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/download.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='patchList')
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='DownloadPatch' and menu.id='patchList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'DonladEncodedPatch', '下载加密补丁', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='DonladEncodedPatch' and role.code='[loginedUser]');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/lock.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='patchList')
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='DonladEncodedPatch' and menu.id='patchList'
);

INSERT INTO Sys_Function(UUID, Code, Name, URL, Act) VALUES (uuid(), 'CreateBrachOfPatch', '创建补丁对应分支', '', null);
INSERT INTO Sys_FunctionRole(FunctionId, roleId) 
	(SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='CreateBrachOfPatch' and role.code='deployer');
INSERT INTO Sys_Menu(UuId, Parent, Id, Name, Level, Function, ToolMenu, image, MenuIndex) (
	SELECT uuid(), menu.uuid, funct.code, funct.name, -1, funct.uuid, 1, '/images/tb/branch.png',
		(SELECT ifNULL(max(s.MenuIndex), 0)+10 FROM Sys_Menu s, Sys_Menu p WHERE s.parent=p.uuid && p.id='patchList')
	FROM Sys_Function funct, Sys_Menu menu WHERE funct.code='CreateBrachOfPatch' and menu.id='patchList'
);

