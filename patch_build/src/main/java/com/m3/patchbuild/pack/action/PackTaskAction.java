package com.m3.patchbuild.pack.action;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.message.MessageHandler;
import com.m3.patchbuild.pack.Pack;

/**
 * 查询构建包任务的相关信息
 */
public class PackTaskAction extends BaseAction{
	
	public static final String KEY_PAGE_MODE = "pageMode"; //JSON KEY OF Page Mode
	
	public static final String KEY_PAGE_URL = "pageUrl"; //JSON KEY OF Page URL
	
	private String i;//消息UUID

	@Override
	protected String doExecute() throws Exception {
		if (i == null) {
			setTips("必须指定ID");
			return SUCCESS;
		} else {
			Pack pack = (Pack) BussFactory.getService(Pack.class).findByUuid(i);
			if (pack == null) {
				setTips("指定的构建包不存在");
			} else {
				String input = MessageHandler.getInputView(pack);
				if (input == null) {
					setTips("该构建包没有相应的任务！");
				} else {
					this.dataMap.put(KEY_PAGE_MODE,  MessageHandler.getViewMode(pack));
					this.dataMap.put(KEY_PAGE_URL, MessageHandler.getAction(pack));
				}
			}
			return SUCCESS;
		}
	}

	public void setI(String i) {
		this.i = i;
	}
}

