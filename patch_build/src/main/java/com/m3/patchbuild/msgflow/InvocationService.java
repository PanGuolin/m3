package com.m3.patchbuild.msgflow;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

import com.m3.patchbuild.base.IService;

public class InvocationService implements InvocationHandler{
	private IService service;
	
	public InvocationService(IService service) {
		this.service = service;
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		
		Method tMethod = service.getClass().getMethod(method.getName(), method.getParameterTypes());
		InvocationUtil.before(this.service, method, args);
		Object ret = null;
		try {
			ret = method.invoke(this.service, args);
			InvocationUtil.returnning(this.service, tMethod, args, ret);
			return ret;
		} catch (Throwable t) {
			InvocationUtil.exception(this.service, tMethod, args, t);
			throw t;
		} finally {
			InvocationUtil.after(this.service, method, args, ret);
		}
	}

}
