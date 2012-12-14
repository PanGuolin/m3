
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
INSERT INTO Sys_Function(UUID, Code, Name, Info, Type) VALUES (uuid(), 'QueryMessage', '查看我的消息', '/msg/mymsg.jsp', '1');
INSERT INTO Sys_Function(UUID, Code, Name, Info, Type) VALUES (uuid(), 'QueryPack', '查看构建包列表', '/pack/listpack.jsp', '1');
INSERT INTO Sys_Function(UUID, Code, Name, Info, Type) VALUES (uuid(), 'QueryPatch', '查看补丁列表', '/patch/listpatch.jsp', '1');
INSERT INTO Sys_Function(UUID, Code, Name, Info, Type) VALUES (uuid(), 'MyRelation', '用户关系', 'com.m3.patchbuild.user.action.ManagerRelationAction', '0');
INSERT INTO Sys_Function(UUID, Code, Name, Info, Type) VALUES (uuid(), 'UserInfo', '个人信息', 'com.m3.patchbuild.user.action.EditUserAction', '0');

-- ====================================================================================
-- 角色权限
-- ====================================================================================
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryMessage' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryPack' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='QueryPatch' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='MyRelation' and role.code='[loginedUser]');
INSERT INTO Sys_FunctionRole(FunctionId, roleId) (SELECT funct.uuid, role.uuid FROM Sys_Function funct,Sys_role role where funct.code='UserInfo' and role.code='[loginedUser]');