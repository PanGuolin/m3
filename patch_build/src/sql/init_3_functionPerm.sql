INSERT INTO SYS_FunctionPerm(UUID, code, perName, info, type) VALUES(uuid(), 'AddBuild', '请求构建', 'com.m3.patchbuild.pack.action.AddBuildAction', 0);

INSERT INTO SYS_RolePermission(roleName, permCode) VALUES('[LoginedUser]', 'AddBuild');