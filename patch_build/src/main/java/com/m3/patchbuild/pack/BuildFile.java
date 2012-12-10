package com.m3.patchbuild.pack;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * BuildFile 表示构建内包含的文件信息
 * @author pangl
 *
 */
@Entity
@Table(name="Pack_BuildFile")
public class BuildFile extends BaseBussInfo{
	
	@Column(name="url")
	private String url; //文件路径
	
	@Column(name="revision")
	private long revision; //文件版本号
	
	@Column(name="modifyTime")
	private Date modifyTime; //对应修改日期
	
	@Column(name="modifier")
	private String modifier; //修改人
	
	private String packUid;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public long getRevision() {
		return revision;
	}

	public void setRevision(long revision) {
		this.revision = revision;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null)
			return false;
		if (obj == this)
			return true;
		if (!(obj instanceof BuildFile))
			return false;
		BuildFile of = (BuildFile)obj;
		return this.url.endsWith(of.url) && this.revision == of.revision;
	}

	public String getPackUid() {
		return packUid;
	}

	public void setPackUid(String packUid) {
		this.packUid = packUid;
	}
}
