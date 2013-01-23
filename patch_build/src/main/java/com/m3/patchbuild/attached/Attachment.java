package com.m3.patchbuild.attached;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 附件信息
 * @author MickeyMic
 *
 */
@Entity
@Table(name="Att_Attachment")
public class Attachment extends BaseBussInfo{

	private static final long serialVersionUID = 1L;
	private String fileName; //附件名称
	private Date createTime; //创建时间
	private String fileUuid; //文件的唯一名称 
	private String bussId; //业务对象
	private String bussType; //业务类型
	
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getFileUuid() {
		return fileUuid;
	}
	public void setFileUuid(String fileUuid) {
		this.fileUuid = fileUuid;
	}
	public String getBussType() {
		return bussType;
	}
	public void setBussType(String bussType) {
		this.bussType = bussType;
	}
	
	public String getBussId() {
		return bussId;
	}
	public void setBussId(String bussId) {
		this.bussId = bussId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
