
package com.m3.patchbuild.info;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * BillNo表明业务对象的某个属性是单据编号属性
 * @author MickeyMic
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface BillNO {

}
