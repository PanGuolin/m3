package com.m3.patchbuild.patch;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.m3.patchbuild.AbstractService;
import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.branch.Branch;

/**
 * 补丁业务接口
 * @author MickeyMic
 *
 */
public abstract class PatchService extends AbstractService{
	
	public PatchService() {
		super(new PatchDao());
	}


	public PatchDao getDao() {
		return (PatchDao)super.getDao();
	}
	/**
	 * 返回某一天的补丁
	 * @param branch
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public Patch getPatch(Branch branch, Date date) {
		return getPatch(branch, getPatchName(branch, date));
	}
	
	
	public Patch createPatch(Branch branch) {
		Date date = new Date();
		Patch info = new Patch();
		info.setBranch(branch);
		info.setLastModify(date);
		info.setCreateTime(date);
		info.setName(getPatchName(branch, date));
		getDao().saveInfo(info);
		return info;
	}
	
	/**
	 * 返回指定名称的补丁
	 * @param branch
	 * @param name
	 * @return
	 */
	public Patch getPatch(Branch branch, String name) {
		return (Patch)getDao().findByBillNo(
				BaseDAO.getBillNo("branch", branch)
				.setValue("name", name)); 
	}
	
	/**
	 * 返回指定日期的补丁名称
	 * @param brach
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public String getPatchName(Branch branch, Date date) {
		if (date == null) date = new Date();
		String version = branch.getVersion();
		version = version.replaceAll("yyyy", new SimpleDateFormat("yyyy").format(date));
		version = version.replaceAll("yy", new SimpleDateFormat("yy").format(date));
		version = version.replaceAll("dd", new SimpleDateFormat("dd").format(date));
		version = version.replaceAll("MM", new SimpleDateFormat("MM").format(date));
		version = version.replaceAll("mm", new SimpleDateFormat("mm").format(date));
		return version;
	}

}
