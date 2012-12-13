
-- ====================================================================================
-- 系统角色
-- ====================================================================================
DROP TABLE IF EXISTS Sys_Role;
create table Sys_Role 
(
   UUID                 char(36)		not null,					-- 唯一ID
   Code             	varchar(40)		not null,					-- 编号
   Name              	varchar(40)		not null,					-- 角色名称
   SystemRole           bit    			not null default 0, 		-- 是否系统角色
   ManageRole			bit				not null default 0, 		-- 是否管理角色
   Assignable			bit				not null default 1,			-- 是否可分配
   constraint PK_Sys_Role primary key clustered (UUID)
);

create unique index Sys_Role_BN on Sys_Role (code ASC);

-- ====================================================================================
-- 系统功能
-- ====================================================================================
DROP TABLE IF EXISTS Sys_Function;
create table Sys_Function 
(
   UUID                 char(36)		not null,					-- 唯一ID
   Code             	varchar(40)		not null,					-- 编号
   Name              	varchar(40)		not null,					-- 功能名称
   Info		           	varchar(300)   	not null, 					-- 功能描述
   Type					int				not null default 0, 		-- 功能类型，0:Action; 1:JSP
   constraint PK_Sys_Function primary key clustered (UUID)
);

create unique index Sys_Function_BN on Sys_Function (code ASC);


-- ====================================================================================
-- 系统功能/角色关系
-- ====================================================================================
DROP TABLE IF EXISTS Sys_FunctionRole;
create table Sys_FunctionRole 
(
   FunctionId           char(36)		not null,					-- 功能ID
   RoleId	            char(36)		not null,					-- 角色ID
   constraint PK_Sys_Function primary key clustered (FunctionId, RoleId)
);
