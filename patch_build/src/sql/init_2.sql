/*==============================================================*/
/* Table: PB_BuildPack                                          */
/*==============================================================*/
DROP TABLE IF EXISTS PB_BuildPack;

create table PB_BuildPack 
(
   UUID                 CHAR(36)                       not null,
   BuildNo              varchar(40)                    not null,
   keywords             VARCHAR(200),
   requester            VARCHAR(40),
   requestTime          timestamp,
   checker              varchar(40),
   checkTime            timestamp,
   assigner             varchar(40),
   assignTime           timestamp,
   tester               varchar(40),
   testTime             timestamp,
   passTime             timestamp,
   deployer             varchar(40),
   deployTime           timestamp,
   branch               varchar(40)                    not null,
   patch                varchar(40),
   customers            varchar(200),
   comments             varchar(400),
   status               varchar(40),
   failReason           varchar(2000),
   constraint PK_PB_BUILDPACK primary key clustered (UUID)
);

create unique index PB_BuildPack_UI on PB_BuildPack (
	branch ASC,
	BuildNo ASC
);


/*==============================================================*/
/* Table: PB_BuildFile                                          */
/*==============================================================*/
DROP TABLE IF EXISTS PB_BuildFile; 

create table PB_BuildFile 
(
   UUID                 char(36)                       not null,
   buildNo              varchar(40)                    null,
   url                  varchar(300)                   not null,
   revision             bigint                         not null,
   modifyTime           timestamp,
   modifier             varchar(40),
   constraint PK_PB_BUILDFILE primary key clustered (UUID)
);

/*==============================================================*/
/* Table: PB_BuildPackDepend                                    */
/*==============================================================*/
DROP TABLE IF EXISTS PB_BuildPackDepend; 
create table PB_BuildPackDepend 
(
   buildUuid            char(36)                       not null,
   dependNo             varchar(40)                    not null,
   constraint PK_PB_BUILDPACKDEPEND primary key clustered (buildUuid, dependNo)
);


