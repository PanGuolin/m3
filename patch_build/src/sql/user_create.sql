
DROP TABLE IF EXISTS User_UserRole;
create table User_UserRole 
(
	UUID			char(36)	not null,
	UserId			char(36)	not null,
	RoleId			varchar(40)	not null,
	Branch			varchar(40)	not null,
	constraint PK_User_Role primary key clustered (UUID)
) ;


DROP TABLE IF EXISTS User_Follower;
create table User_Follower 
(
	UserId			char(36)	not null,
	FollowerId		char(36)	not null,
	constraint PK_User_Follower primary key clustered (UserId, FollowerId)
) ;

DROP TABLE IF EXISTS User_Superior;
create table User_Superior
(
	UserId			char(36)	not null,
	SuperiorID		char(36)	not null,
	constraint PK_User_Follower primary key clustered (UserId, SuperiorID)
);

DROP TABLE IF EXISTS User_ResetPassReq;
create table User_ResetPassReq
(
	uuid			char(36)		not null,
	requester		char(36)		not null,
	handleUser		char(36)		null,
	password		varchar(80)		not null,
	createTime		timestamp		not null,
	handleTime		timestamp		null,
	accepted		BIT(1)			null,
	comment			varchar(300)	null,
	clientAddr		varchar(200)	null,
	constraint PK_User_Follower primary key clustered (uuid)
);

DROP TABLE IF EXISTS User_RegisterReq;
create table User_RegisterReq
(
	uuid			char(36)	not null,
	userID			varchar(80)	not null,
	createTime		timestamp	not null,
	handleTime		timestamp	null,
	handleUser		varchar(80) null,
	accepted		BIT(1)		null,
	comment			varchar(300)	null,
	constraint PKUser_RegisterReq primary key clustered (uuid)
);
create index User_RegisterReq_BN on User_RegisterReq (userID ASC);

DROP TABLE IF EXISTS User_ChangeRoleReq;
create table User_ChangeRoleReq
(
	uuid			char(36)		not null,
	requester		char(36)		not null,
	createTime		timestamp		not null,
	handleUser		char(36) 		null,
	handleTime		timestamp		null,
	accepted		BIT(1)			null,
	comment			varchar(300)	null,
	newRoles		varchar(200)	null,
	branch			varchar(40)		null,
	constraint PKUser_ChangeRoleReq primary key clustered (uuid)
);
create index User_ChangeRoleReq_BN on User_ChangeRoleReq (requester ASC);

