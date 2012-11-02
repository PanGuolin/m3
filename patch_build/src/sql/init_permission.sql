DROP TABLE IF EXISTS SYS_FunctionPerm;
create table SYS_FunctionPerm 
(
   UUID                 char(36)                       not null,
   code             	varchar(30),
   perName              varchar(80),
   info              	varchar(400)                   not null,
   type          		int							   not null default 0,
   constraint PK_Sys_FunctionPerm primary key clustered (UUID)
);

create unique index SYS_FunctionPerm_UI on SYS_FunctionPerm (code ASC);


DROP TABLE IF EXISTS SYS_RolePermission;
create table SYS_RolePermission 
(
   roleName             varchar(80)                    not null,
   permCode             varchar(30)					   not null,
   constraint PK_SYS_RolePermission primary key clustered (roleName, permCode)
);

INSERT INTO SYS_FunctionPerm(UUID, code, perName, info, type) VALUES(uuid(), 'AddBuild', '请求构建', 'com.m3.patchbuild.pack.action.AddBuildAction', 0);
INSERT INTO SYS_FunctionPerm(UUID, code, perName, info, type) VALUES(uuid(), 'FetchMessage', '查看消息列表', 'com.m3.patchbuild.message.action.FetchMessageAction', 0);

INSERT INTO SYS_RolePermission(roleName, permCode) VALUES('[LoginedUser]', 'AddBuild');
INSERT INTO SYS_RolePermission(roleName, permCode) VALUES('[LoginedUser]', 'FetchMessage');