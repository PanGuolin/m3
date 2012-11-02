package com.m3.patchbuild;

/**
 * 有状态的业务集合
 * @author pangl
 *
 */
public interface IStateful {
	
	int STATE_NORMAL = 0; //正常状态
	
	int STATE_INVALID = -1; //失效状态

}
