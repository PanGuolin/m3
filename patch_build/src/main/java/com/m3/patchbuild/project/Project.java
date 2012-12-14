package com.m3.patchbuild.project;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.user.User;

/**
 * 项目信息
 * @author pangl
 *
 */
@Entity
@Table(name="Project_Project")
public class Project extends BaseBussInfo{
	private String code;
	private String name;
	private Date createTime;
	private User createUser;
	private boolean enable;
	private String comment;
}
