package com.m3.patchbuild.exception;

import java.text.SimpleDateFormat;

import com.m3.patchbuild.pack.Pack;

/**
 * 构建包忆存在异常
 * @author MickeyMic
 *
 */
public class PackExistsException extends BuildPackException {
	private static final long serialVersionUID = 1L;
	
	private Pack old = null;
	public PackExistsException(Pack bp, Pack old) {
		super(bp);
		this.old = old;
	}
	@Override
	public String getMessage() {
		return "已存在相同构建包,申请人：" + old.getRequester() +
				",申请时间：" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(old.getRequestTime()) +
				",状态：" + old.getStatus();
	}

	
	

}
