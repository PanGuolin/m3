package com.m3.patchbuild.message;

import com.m3.patchbuild.BaseQuery;

/**
 * 消息查询对象
 * @author pangl
 *
 */
public class MessageQuery extends BaseQuery{
	
	private boolean includeNotifer = true; //是否包含通知人
	
	private boolean includeReciever = true; //是否包含接收人
	
	private boolean includeDealed = false; //是否包含已处理

	public boolean isIncludeNotifer() {
		return includeNotifer;
	}

	public void setIncludeNotifer(boolean includeNotifer) {
		this.includeNotifer = includeNotifer;
	}

	public boolean isIncludeReciever() {
		return includeReciever;
	}

	public void setIncludeReciever(boolean includeReciever) {
		this.includeReciever = includeReciever;
	}

	public boolean isIncludeDealed() {
		return includeDealed;
	}

	public void setIncludeDealed(boolean includeDealed) {
		this.includeDealed = includeDealed;
	}
	
	
	

}
