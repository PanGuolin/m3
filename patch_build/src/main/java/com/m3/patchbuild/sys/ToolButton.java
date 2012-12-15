package com.m3.patchbuild.sys;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.m3.patchbuild.base.BaseBussInfo;

/**
 * 工具按钮
 * @author pangl
 *
 */
@Entity
@Table(name="Sys_ToolButton")
public class ToolButton extends BaseBussInfo{
	private int index; //索引号
	private String id; //ID号
	private String name; //显示名称
	private String imgPath;//图片路径
	@ManyToOne
	@JoinColumn(name="menu")
	private Menu menu; //所属菜单
	
	@ManyToOne
	@JoinColumn(name="function")
	private Function function;
	
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
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
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public Menu getMenu() {
		return menu;
	}
	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	public Function getFunction() {
		return function;
	}
	public void setFunction(Function function) {
		this.function = function;
	}
}
