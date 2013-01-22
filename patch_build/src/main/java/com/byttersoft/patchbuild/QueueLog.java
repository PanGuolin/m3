package com.byttersoft.patchbuild;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * 构建队列日志对象
 * @author pangl
 *
 */
public class QueueLog {

	private String id;
	private List<String> messages = new ArrayList<String>();
	
	public QueueLog(String id) {
		this.id = id;
	}
	
	public String getLastMessage() {
		if (messages.size() == 0)
			return "";
		return messages.get(messages.size() - 1);
	}
	
	public void logMessage(String msg) {
		this.messages.add("[" + id + "]" + getTS()  + ": " + msg);
	}
	
	private String getTS() {
		return new SimpleDateFormat("MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((messages == null) ? 0 : messages.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		QueueLog other = (QueueLog) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (messages == null) {
			if (other.messages != null)
				return false;
		} else if (!messages.equals(other.messages))
			return false;
		return true;
	}
}
