DROP TABLE IF EXISTS Patch_Patch;

create table Patch_Patch 
(
   UUID                 char(36)		not null,			-- 唯一ID
   Name             	varchar(40)		not null,			-- 补丁名称
   Branch             	varchar(40)		not null,			-- 对应的构建包ID
   MD5              	char(10)	    null, 				-- MD5值
   packCount			int				not null default 0, -- 包含补丁数量
   CreateTime			timestamp		not null, 			-- 创建日期
   ModifyTime			timestamp		null,				-- 修改日期
   Builds				varchar(1000)	null,				-- 包含构建包列表
   constraint PK_Pack_Bug primary key clustered (UUID)
);

create unique index Patch_Patch_BN on Patch_Patch (Branch ASC, Name ASC);