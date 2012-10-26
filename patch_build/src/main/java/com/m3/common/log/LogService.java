package com.m3.common.log;

import java.util.Calendar;
import java.util.List;

/**
 * 日志服务
 * @author pangl
 *
 */
public abstract class LogService {
	
	private static LogDAO dao = new LogDAO();
	
	public static void save(LogInfo info) {
		if (info.getOpTime() != null)
			info.setOpTime(Calendar.getInstance().getTime());
		dao.save(info);
	}
	
	public static List<LogInfo> find(String user) {
		return dao.find(user);
	}

}
