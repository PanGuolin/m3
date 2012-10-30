
/*==============================================================*/
/* Table: Msg_Message                                           */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_Message;
CREATE TABLE Msg_Message 
(
   UUID                 char(36)                       not null,
   BussType             varchar(200),
   BussId               char(36),
   Subject              varchar(200)                   not null,
   Content              varchar(4000),
   OperateTime          timestamp,
   Operator             char(30),
   SendTime             timestamp                      not null,
   Sender               char(30),
   MessageType          int,
   status               int,
   constraint PK_MSG_MESSAGE primary key clustered (UUID)
);

/*==============================================================*/
/* Table: Msg_Attachment                                        */
/*==============================================================*/
DROP TABLE IF EXISTS Msg_Attachment;
create table Msg_Attachment 
(
   MessageId            char(36)                       not null,
   Attachments          varchar(300)                   not null
);

DROP TABLE IF EXISTS Msg_Notifier;
create table Msg_Notifier 
(
   MessageId            char(36)                       not null,
   Notifiers            varchar(30)                    not null,
   constraint PK_MSG_NOTIFIER primary key clustered (MessageId, Notifiers)
);

DROP TABLE IF EXISTS Msg_Reciever;
create table Msg_Reciever 
(
   MessageId            char(36)                       not null,
   Recievers            varchar(30)                    not null,
   constraint PK_MSG_RECIEVER primary key clustered (MessageId, Recievers)
);
