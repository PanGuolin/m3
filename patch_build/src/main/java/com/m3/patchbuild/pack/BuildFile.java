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
	
	private static final long serialVersionUID = 1L;

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
	public int hashCode() {
		final int prime = 31;
		final int offset = 32;
		int result = super.hashCode();
		result = prime * result
				+ ((modifier == null) ? 0 : modifier.hashCode());
		result = prime * result
				+ ((modifyTime == null) ? 0 : modifyTime.hashCode());
		result = prime * result + ((packUid == null) ? 0 : packUid.hashCode());
		result = prime * result + (int) (revision ^ (revision >>> offset));
		result = prime * result + ((url == null) ? 0 : url.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		BuildFile other = (BuildFile) obj;
		if (modifier == null) {
			if (other.modifier != null)
				return false;
		} else if (!modifier.equals(other.modifier))
			return false;
		if (modifyTime == null) {
			if (other.modifyTime != null)
				return false;
		} else if (!modifyTime.equals(other.modifyTime))
			return false;
		if (packUid == null) {
			if (other.packUid != null)
				return false;
		} else if (!packUid.equals(other.packUid))
			return false;
		if (revision != other.revision)
			return false;
		if (url == null) {
			if (other.url != null)
				return false;
		} else if (!url.equals(other.url))
			return false;
		return true;
	}

	
	public String getPackUid() {
		return packUid;
	}

	public void setPackUid(String packUid) {
		this.packUid = packUid;
	}
}
