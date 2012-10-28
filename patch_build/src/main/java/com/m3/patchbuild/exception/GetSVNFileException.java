package com.m3.patchbuild.exception;

/**
 * 获取SVN文件出错异常
 * @author MickeyMic
 *
 */
public class GetSVNFileException extends BussException{
	private static final long serialVersionUID = 1L;

	public GetSVNFileException(Throwable e) {
		super(e);
	}

	@Override
	public String getMessage() {
		if (getCause() != null) {
			if (getCause().getMessage().indexOf("E170000") != -1) {
				return "请求的某些文件不存在于SVN服务器";
			}
		}
		return super.getMessage();
	}
	
	
}
