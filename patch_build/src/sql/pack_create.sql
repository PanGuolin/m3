DROP TABLE IF EXISTS Pack_Bug;

create table Pack_Bug 
(
   UUID                 char(36)		not null,	-- 唯一ID
   BugNo             	varchar(40)		not null,	-- BUG编号
   BuildNo              varchar(40)		not null,	-- 对应的构建包ID
   Cmmt              varchar(200)    null, 		-- BUG说明
   Tester				varchar(40)		not null, 	-- 测试用户
   CreateTime			timestamp		not null, 	-- 录入日期
   FixTime				timestamp		null,		-- 修复日期
   constraint PK_Pack_Bug primary key clustered (UUID)
);

create unique index Pack_Bug_BN on Pack_Bug (BugNo ASC);

--------------------------------------------------------------------
- 补丁依赖信息
--------------------------------------------------------------------
DROP TABLE IF EXISTS Pack_Depend;

create table Pack_Depend 
(
   packUid			char(36)		not null,	-- 构建包UUID
   dependUid        char(36)		not null,	-- 被依赖包UUID
   constraint PK_Pack_Bug primary key clustered (packUid, dependUid)
);

--------------------------------------------------------------------
- 补丁包含文件列表
--------------------------------------------------------------------
DROP TABLE IF EXISTS Pack_BuildFile;

create table Pack_BuildFile
(
   uuid			char(36)		not null,	-- 构建包UUID
   packUid      char(36)		null,		-- 被依赖包UUID
   url			varchar(300)	null,	-- 文件路径
   revision		bigint(20)		null,	-- 文件版本号
   modifyTime	timestamp		null,		-- 文件最后修改时间
   modifier		varchar(40)		null,		-- 最件最后修改人 
   constraint PK_Pack_Bug primary key clustered (uuid)
);

create unique index Pack_BuildFile_BN on Pack_BuildFile (packUid ASC, url ASC);
