
/*==============================================================*/
/* Table: Msg_Message                                           */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_Message;

create table Msg_Message 
(
   UUID                 char(36)                       not null,
   BussType             varchar(200),
   BussId               char(36),
   Subject              varchar(200)                   not null,
   OperateTime          timestamp,
   Operator             char(30),
   SendTime             timestamp                      not null,
   Sender               char(30),
   MessageType          int,
   Status               int,
   DetailId             char(36),
   Attached             bit,
   constraint PK_MSG_MESSAGE primary key clustered (UUID)
);

create index Msg_Message_BN on Msg_Message (BussType ASC, BussId ASC);

create index Msg_Message_STA on Msg_Message (Status ASC);

/*==============================================================*/
/* Table: Msg_MessageDtl                                        */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_MessageDtl;
create table Msg_MessageDtl 
(
   UUID                 char(36)                       not null,
   Content              varchar(4000)                  null,
   Attachments          varchar(300)                   null,
   constraint PK_MSG_MESSAGEDTL primary key clustered (UUID)
);


/*==============================================================*/
/* Table: Msg_MessageSend                                       */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_Reciever;
create table Msg_Reciever 
(
   UUID                 char(36)                       not null,
   MessageId            char(36)                       not null,
   SendType             int                            not null,
   UserId               char(30)                       not null,
   Status               int,
   constraint PK_MSG_MESSAGESEND primary key clustered (UUID)
);

