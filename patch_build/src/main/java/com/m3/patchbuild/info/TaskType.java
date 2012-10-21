package com.m3.patchbuild.info;

/**
 * 任务类型
 * @author MickeyMic
 *
 */
public final class TaskType {
	
	public static final TaskType register = new TaskType("register", "注册申请", true);
	public static final TaskType build = new TaskType("build", "构建申请", false);
	public static final TaskType assign = new TaskType("assign", "测试分配", false);
	public static final TaskType test = new TaskType("test", "测试", false);
	public static final TaskType rebuild = new TaskType("rebuild", "重新构建", true);
	
	private String id;
	private String name;
	private boolean ignorable;
	
	private TaskType(String id, String name, boolean ignorable) {
		this.id = id;
		this.name = name;
		this.ignorable = ignorable;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public boolean isIgnorable() {
		return ignorable;
	}
	
}
