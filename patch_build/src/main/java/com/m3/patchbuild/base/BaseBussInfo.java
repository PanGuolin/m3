package com.m3.patchbuild.base;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import org.hibernate.annotations.GenericGenerator;

import com.m3.patchbuild.IBussInfo;

/**
 * 业务对象基类
 * 
 * @author pangl
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class BaseBussInfo implements IBussInfo, Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "hibernate-uuid")
	@GenericGenerator(name = "hibernate-uuid", strategy = "uuid2")
	private String uuid;

	final public String getUuid() {
		return uuid;
	}

	final public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public boolean equals(Object other) {
		if (this == other)
			return true;
		if (other == null)
			return false;
		if (!(other instanceof BaseBussInfo))
			return false;
		BaseBussInfo info = (BaseBussInfo) other;
		if (uuid == null)
			return info.uuid == null;
		return uuid.equals(info.uuid);
	}

	@Override
	public int hashCode() {
		return uuid == null ? super.hashCode() : uuid.hashCode();
	}
}
