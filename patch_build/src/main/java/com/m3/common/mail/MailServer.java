package com.m3.common.mail;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.log4j.Logger;

/**
 * 邮件服务器对象
 * @author pangl
 *
 */
public class MailServer{
	
	private static Logger logger = Logger.getLogger(MailServer.class);
	
	private String host; //服务器地址
	
	private int smtpPort = 25; //发送接口
	
	private String user; //登录用户
	
	private String name; //服务器名称
	
	private String password; //登录口令
	
	private boolean useSSL = false; //是否使用SSL
	
	private boolean debug = false;
	
	public void sendMail(MailInfo info) throws MessagingException, UnsupportedEncodingException{
		
		Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.auth", password == null ? "false" : "true");
        props.put("mail.smtp.port", smtpPort);
        props.put("mail.debug", debug ? "true" : "false");
        if (useSSL) {
	        props.put("mail.smtp.socketFactory.port", smtpPort);
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.socketFactory.fallback", "false");
        }
		
        Session session = Session.getDefaultInstance(props, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, password);
			}
			
		});
        
        final MimeMessage message = new MimeMessage(session);
        //String subject =  MimeUtility.encodeText(new String(info.getSubject().getBytes(), 
        //		info.getEncoding()), info.getEncoding(), "B");
		message.setSubject(info.getSubject(), info.getEncoding());
		//message.setText(info.getContent(), info.getEncoding(), info.getContentType());
		
		
		Multipart mp = new MimeMultipart();
		MimeBodyPart mbpContent = new MimeBodyPart();
		mbpContent.setContent(info.getContent(), info.getContentType() + ";charset=" + info.getEncoding());
		mp.addBodyPart(mbpContent);
		for (File file : info.getAttachments()) {
			if (!file.isFile() || !file.exists())
				continue;
			MimeBodyPart mbpFile = new MimeBodyPart();
			FileDataSource fds = new FileDataSource(file);
			mbpFile.setDataHandler(new DataHandler(fds));
			mbpFile.setFileName(fds.getName());
			mp.addBodyPart(mbpFile);
		}
		message.setContent(mp);
		message.saveChanges();		
		message.setSentDate(new Date());
		message.setFrom(new InternetAddress(user, name));
		
		for (Address to : info.getToAddrs()) {
			message.addRecipient(Message.RecipientType.TO, to);
		}
		
		for (Address cc : info.getCcAddrs()) {
			message.addRecipient(Message.RecipientType.CC, cc);
		}
		
		Thread th = new Thread() {
			public void run() {
				try {
					Transport.send(message);
					logger.info("邮件发送成功，主题:" + message.getSubject());
				} catch (MessagingException e) {
					logger.error("发送邮件时出错", e);
					e.printStackTrace();
				} 
			}
		};
		//th.setDaemon(true);
		th.start();
		
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getSmtpPort() {
		return smtpPort;
	}

	public void setSmtpPort(int smtpPort) {
		this.smtpPort = smtpPort;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isUseSSL() {
		return useSSL;
	}

	public void setUseSSL(boolean useSSL) {
		this.useSSL = useSSL;
	}

	public boolean isDebug() {
		return debug;
	}

	public void setDebug(boolean debug) {
		this.debug = debug;
	}
	
}
