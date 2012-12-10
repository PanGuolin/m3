package com.m3.patchbuild.msgflow;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.log4j.Logger;

import com.m3.common.BeanUtil;
import com.m3.patchbuild.base.IService;

/**
 * 切面工具类
 * @author pangl
 *
 */
public abstract class AdviceConfigUtil {
	private static final Logger logger = Logger.getLogger(AdviceConfigUtil.class);
	
	public static boolean accept(IAdviceConfig config, IService service, Method method, AdviceType type, Map<String, Object> context) {
		if (!config.getAdviceType().equals(type))
			return false;
		if (!service.getClass().getName().equals(config.getService()))
			return false;
		if (!method.getName().equals(config.getMethodName()))
			return false;
		Class<?>[] types = method.getParameterTypes();
		String[] paramTypes = config.getParamTypes();
		if (types == null) {
			if (paramTypes != null)
				return false;
		} else {
			if (paramTypes == null)
				return false;
			if (types.length != paramTypes.length)
				return false;
			for (int i=0; i<types.length; i++) {
				try {
					if (!Class.forName(paramTypes[i]).isAssignableFrom(types[i]))
						return false;
				} catch (ClassNotFoundException e) {
					logger.error("未找到类:" + paramTypes[i], e);
					return false;
				}
			}
		}
		
		if (config.getCondition() != null) {
			String script = BeanUtil.parseString(config.getCondition(), context);
			ScriptEngineManager manager = new ScriptEngineManager();
			ScriptEngine engine = manager.getEngineByName ("js");
			try {
				Object rs = engine.eval(script);
				return ((Boolean)rs).booleanValue();
			} catch (ScriptException e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
	
	public static Map<String, Object> getContext(Object[] args, Object returnValue) {
		Map<String, Object> context = new HashMap<String, Object>();
		if (args != null) {
			for (int i=0; i<args.length; i++) {
				context.put("_P" + i, args[i]);
			}
		}
		context.put("_Result", returnValue);
		return context;
	}
}
