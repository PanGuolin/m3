package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 处理构建包的相关任务Action基础类
 * @author pangl
 *
 */
public abstract class HandleTaskAction extends BaseAction{

	private String i= null;//构建包ID
	
	@Override
	protected String doExecute() throws Exception {
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		Pack pack = (Pack) packService.findByUuid(i);
		if (pack == null) {
			throw new Exception("指定的构建包不存在" + i);
		}
		if (getValidStatus() != null && !getValidStatus().equals(pack.getStatus())) {
			throw new IllegalBPStateException(pack, getValidStatus());
		}
		
		validPack(pack);
		fillPack(pack);
		packService.saveInfo(pack);
		
		return SUCCESS;
	}
	
	/**
	 * 返回构建包应该有效的状态
	 * @return null 表示不检查
	 */
	protected abstract PackStatus getValidStatus();
	
	/**
	 *  实现类检查包是否合法
	 * @param pack
	 * @throws Exception 如果不合法则应当抛出异常信息
	 */
	protected void validPack(Pack pack) throws Exception{
	}
	
	/**
	 * 填充构建包信息，由具体类实现
	 * @param pack
	 * @throws Exception
	 */
	protected abstract void fillPack(Pack pack) throws Exception;

	final public String getI() {
		return i;
	}

	final public void setI(String i) {
		this.i = i;
	}
	
	

}
