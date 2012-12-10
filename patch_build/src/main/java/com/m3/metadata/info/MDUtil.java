package com.m3.metadata.info;

import java.lang.reflect.Field;
import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;
import org.jdom.Element;
import org.jdom.Namespace;

public abstract class MDUtil {
	
	public static IMetadataInfo loadFromDom(Class<? extends IMetadataInfo> clz, Element el) throws Exception{
		IMetadataInfo info = clz.newInstance();
		loadFromDom(info, el);
		return info;
	}
	
	public static void loadFromDom(IMetadataInfo obj, Element el) throws Exception {
		Field[] fs = obj.getClass().getFields();
		Namespace ns = el.getNamespace();
		for (Field f : fs) {
			Class<?> fc = f.getClass();
			if (!fc.isPrimitive() && fc != String.class && fc != Date.class)
				continue;
			String value = el.getChildTextTrim(f.getName(), ns);
			if (value != null) {
				BeanUtils.setProperty(obj, f.getName(), value);
			}
		}
	}

}
