package com.m3.patchbuild.sys;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 菜单信息
 * @author pangl
 */
@Entity
@Table(name="Sys_Menu")
public class Menu extends BaseBussInfo{

	@Column(name="MenuIndex")
	private int index; //菜单索引
	@ManyToOne(cascade=CascadeType.MERGE, fetch=FetchType.EAGER)
	@JoinColumn(name="parent")
	private Menu parent; //父级菜单 
	private String id;//ID号
	private String name; //属性
	private int level;//级别
	@ManyToOne
	@JoinColumn(name="function")
	private Function function; //对应的功能
	
//	@ManyToMany(cascade ={CascadeType.PERSIST,CascadeType.MERGE}, fetch=FetchType.EAGER)
//    @JoinTable(name="Sys_MenuRole",  joinColumns={@JoinColumn(name="menuId")}, inverseJoinColumns={@JoinColumn(name="roleId")} )
//	private Set<Role> roles = new HashSet<Role>();

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public Menu getParent() {
		return parent;
	}

	public void setParent(Menu parent) {
		this.parent = parent;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public Function getFunction() {
		return function;
	}

	public void setFunction(Function function) {
		this.function = function;
	}
	
	
}
