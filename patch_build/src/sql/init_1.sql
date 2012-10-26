/*==============================================================*/
/* 初始化模板内容                                                                                                                                                           */
/*==============================================================*/
DROP TABLE IF EXISTS PB_HtmlTemplate;

CREATE TABLE IF NOT EXISTS PB_HtmlTemplate 
(
   UUID                 char(36)                       not null,
   type                 varchar(80)                    not null,
   content              varchar(4000)                  not null,
   constraint PK_PB_HTMLTEMPLATE primary key clustered (UUID)
);

create unique index PB_MailTemplate_UI on PB_HtmlTemplate (
	type ASC
);


INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_REQUEST', '【补丁构建】：请检查用户构建请求${BP.buildNo}');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_REQUEST', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>请求用户：${BP.requester}<br/>请登录系统并检查构建包内容是否合法并进行审批。');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_CHECKFAIL', '【补丁构建】：构建请求${BP.buildNo}检查不通过，请修复后重新提交');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_CHECKFAIL', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>检查人:${BP.checker}<br/>检查意见：${BP.failReason}');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_BUILD', '【补丁构建】：构建包${BP.buildNo}成功输出，请分配测试员进行测试');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_BUILD', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>请求用户：${BP.requester}<br/>请登录系统并分配相应的测试员进行测试');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_BUILDF', '【补丁构建】：构建包${BP.buildNo}构建失败，请修复后重新提交');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_BUILDF', '${BP.branch.branch}构建包${BP.buildNo}构建失败，构建日志请参考附件。');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_ASSIGN', '【补丁构建】：请测试构建包${BP.buildNo}');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_ASSIGN', '${BP.branch.branch}构建包${BP.buildNo}已分配给你测试，请登录系统获取构建包并测试。');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_PASS', '【补丁构建】：构建包${BP.buildNo}测试通过,请发布到补丁中');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_PASS', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>请求用户：${BP.requester}<br/>测试人员:${BP.tester}<br/>请登录系统并进行发布');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_TESTFAIL', '【补丁构建】：构建包${BP.buildNo}测试不通过,请修复后重新提交');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_TESTFAIL', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>测试人员:${BP.tester}<br/>不通过原因:${BP.failReason}');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_TESTING', '【补丁构建】：构建包${BP.buildNo}开始测试');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_TESTING', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>测试人员:${BP.tester}');

INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_SUBJ_DEPLOY', '【补丁构建】：构建包${BP.buildNo}已发布');
INSERT INTO PB_HtmlTemplate(UUID, type, content) VALUE (uuid(), 'MAIL_CONT_DEPLOY', '构建分支:${BP.branch.branch}<br/>构建号：${BP.buildNo}<br/>发布人员${BP.deployer}<br/>发布补丁${BP.patch}');