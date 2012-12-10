package com.m3.patchbuild.msgflow;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.IService;

public aspect ServiceAspect {
	private boolean IBussInfo.isSave = false;//是否保存(true)或更新(false)
	
	public static void setIsSave(IBussInfo info, boolean flag) {
		info.isSave = flag;
	}
	
	public static boolean isSave(IBussInfo info) {
		return info.isSave;
	}
	
	pointcut save(IService service, IBussInfo info) : 
		call(void IService.saveInfo(IBussInfo)) 
		&& target(service)
		&& args(info);
	
	before(IService service, IBussInfo info) : save(service, info) {
		setIsSave(info, info.getUuid() == null);
		System.out.println("begin save");
	}
	
	after(IService service, IBussInfo info) returning : save(service, info) {
		if (!isSave(info))//更新
			return;
		System.out.println("OK");
	}

}
