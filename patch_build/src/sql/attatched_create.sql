DROP TABLE IF EXISTS Att_Attachment;
create table Att_Attachment 
(
   UUID                 char(36)                       not null,
   FileName             varchar(100)                   not null,
   CreateTime           timestamp                      not null,
   FileUuid             char(36)                       not null,
   BussId	            char(36)                       null,
   BussType             varchar(80)                    null,
   SaveByTime           bit                            not null default 0,
   constraint PK_ATT_ATTACHMENT primary key clustered (UUID)
);