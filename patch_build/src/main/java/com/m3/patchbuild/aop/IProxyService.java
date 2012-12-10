package com.m3.patchbuild.aop;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

import com.m3.patchbuild.base.IService;

/**
 * AOP调用的服务代量类
 * @author pangl
 *
 */
public class IProxyService implements InvocationHandler{
	private IService service;
	
	public IProxyService(IService service) {
		this.service = service;
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		
		Method tMethod = service.getClass().getMethod(method.getName(), method.getParameterTypes());
		AOPUtil.before(this.service, method, args);
		Object ret = null;
		try {
			ret = method.invoke(this.service, args);
			AOPUtil.returnning(this.service, tMethod, args, ret);
			return ret;
		} catch (Throwable t) {
			AOPUtil.exception(this.service, tMethod, args, t);
			throw t;
		} finally {
			AOPUtil.after(this.service, method, args, ret);
		}
	}

}
