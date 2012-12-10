package com.m3.common.query;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.m3.patchbuild.IBussInfo;

/**
 * 查询条件的标注
 * @author pangl
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface QueryField {
	String property() default ""; //对应的属性名称
	QueryType type() default QueryType.Equal; //比较类型
	boolean acceptNull() default false; //是否接受空值和空字符串
	Class<? extends IBussInfo> propertyClass() default IBussInfo.class;
}
