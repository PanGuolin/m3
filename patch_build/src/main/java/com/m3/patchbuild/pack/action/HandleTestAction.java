package com.m3.patchbuild.pack.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.exception.IllegalBPStateException;
import com.m3.patchbuild.pack.Bug;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackStatus;

/**
 * 测试人员处理任务Action
 */
public class HandleTestAction extends BaseAction {
	
	private Pack info = null; //构建包对象

	private int pass = 0; //通过状态

	@Override
	protected String doExecute() throws Exception {
		IPackService packService = (IPackService) BussFactory.getService(Pack.class);
		Pack oldPack = (Pack) packService.findByUuid(info.getUuid());
		if (!PackStatus.testing.equals(oldPack.getStatus())) {
			throw new IllegalBPStateException(oldPack, PackStatus.testing);
		}
		if (pass != 0) {//设置状态
			info = oldPack;
			
			if (pass == -1) {
				info.setStatus(PackStatus.testFail);
			} else {
				info.setStatus(PackStatus.pass);
				info.setPassTime(new Date());
			}
			packService.saveInfo(info);
			return SUCCESS;
		} else { //录入BUG
			List<Bug> nbugs = info.getBugs();
			List<Bug> obugs = oldPack.getBugs();
			List<String> addList = new ArrayList<String>();
			List<String> fixedList = new ArrayList<String>();
			for (Bug nbug : nbugs) {
				if (nbug.getUuid() == null) {
					if (StringUtil.isEmpty(nbug.getBugNo()))
						continue;
					nbug.setBuildNo(oldPack.getBuildNo());
					nbug.setTester(ContextUtil.getUserId());
					nbug.setCreateTime(new Date());
					obugs.add(nbug);
					if (nbug.isFixed()) {
						addList.add(nbug.getBugNo());
					} else {
						fixedList.add(nbug.getBugNo());
					}
					
					continue;
				}
				for (Bug obug : obugs) {//修改时间
					if (obug.getUuid().equals(nbug.getUuid())) {
						if (nbug.isFixed() && !obug.isFixed()) {
							obug.setFixed(true);
							fixedList.add(obug.getBugNo());
						}
						if (nbug.getComment() != null) {
							obug.setComment(nbug.getComment());
						}
						break;
					}
				}
			}
			info = oldPack;
			packService.saveInfo(info);
//			for (String bugNo : addList) {
//				msgService.bugAdded(info, bugNo);
//			}
//			for (String bugNo : fixedList) {
//				msgService.bugFixed(info, bugNo);
//			}
			return INPUT;
		}
	}
	
	public Pack getInfo() {
		if (info == null)
			info = new Pack();
		return info;
	}


	public void setPack(Pack pack) {
		this.info = pack;
	}


	public int getPass() {
		return pass;
	}


	public void setPass(int pass) {
		this.pass = pass;
	}

}
