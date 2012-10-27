package com.m3.patchbuild.info;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 邮件模板信息
 * @author pangl
 *
 */
@Entity
@Table(name="PB_HtmlTemplate")
public class HtmlTemplate {

	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	@Column(name="uuid")
	private String uuid ; //唯一ID
	
	@BillNo
	@Column(name="type")
	private String type; //类型
	
	@Column(name="content")
	private String content; //内容

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	

}
