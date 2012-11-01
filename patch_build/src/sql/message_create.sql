
/*==============================================================*/
/* Table: Msg_Message                                           */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_Message;

create table Msg_Message 
(
   UUID                 char(36)                       not null,
   GroupId              char(36)                       null,
   BussType             varchar(200)                   null,
   BussId               char(36)                       null,
   Owner                varchar(30)                    null,
   OwnType              varchar(30)                    null,
   Subject              varchar(200)                   not null,
   OperateTime          timestamp                      null,
   SendTime             timestamp                      not null,
   Sender               char(30)                       null,
   MessageType          int                            null,
   status               int                            null,
   constraint PK_MSG_MESSAGE primary key clustered (UUID)
);


create index Msg_Message_BN on Msg_Message (BussType ASC, BussId ASC);

/*==============================================================*/
/* Table: Msg_MessageDtl                                        */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_MessageDtl;
create table Msg_MessageDtl 
(
   UUID                 char(36)                       not null,
   MessageId            char(36)                       not null,
   Content              varchar(4000)                  null,
   Attachments          varchar(300)                   null,
   constraint PK_MSG_MESSAGEDTL primary key clustered (UUID)
);

create unique index Msg_MessageDtl_BN on Msg_MessageDtl (MessageId ASC);

