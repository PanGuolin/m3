
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
   Notifiers			varchar(400),
   Recievers			varchar(400),
   Attachments			varchar(400),
   constraint PK_MSG_MESSAGE primary key clustered (UUID)
);