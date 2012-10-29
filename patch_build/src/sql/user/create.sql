/*==============================================================*/
/* Table: SYS_FunctionPerm                                      */
/*==============================================================*/
DROP TABLE IF EXISTS SYS_FunctionPerm;
create table SYS_FunctionPerm 
(
   UUID                 char(36)                       not null,
   code                 varchar(30)                    not null,
   perName              varchar(80)                    not null,
   info                 varchar(300)                   not null,
   type                 int                            not null,
   constraint PK_SYS_FUNCTIONPERM primary key clustered (UUID)
);

create unique index SYS_FunctionPerm_UI on SYS_FunctionPerm (
code ASC
);

/*==============================================================*/
/* Table: SYS_RolePermission                                    */
/*==============================================================*/
DROP TABLE IF EXISTS SYS_RolePermission;
create table SYS_RolePermission 
(
   roleName             varchar(30)                    not null,
   permCode             varchar(30)                    not null
);

create unique index Sys_RolePermission_UI on SYS_RolePermission (
	roleName ASC,
	permCode ASC
);

