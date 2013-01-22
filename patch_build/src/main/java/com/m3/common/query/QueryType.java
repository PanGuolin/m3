package com.m3.common.query;

/**
 * 查询条件类型枚举
 * @author pangl
 *
 */
public enum QueryType {

	Equal, //相等
	LeftLike, //左相似
	RightLike, //右相似
	AllLike, //全相似
	Greate, //大于
	Little, //小于
	GreateEqual, //大于等于
	LittleEqual, //小于等于
}
