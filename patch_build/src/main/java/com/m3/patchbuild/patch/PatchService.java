package com.m3.patchbuild.patch;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.m3.patchbuild.BaseDAO;
import com.m3.patchbuild.branch.BuildBranch;

/**
 * 补丁业务接口
 * @author MickeyMic
 *
 */
public abstract class PatchService {
	
	private static PatchDao dao = new PatchDao();
	
	/**
	 * 返回某一天的补丁
	 * @param branch
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public static PatchInfo getPatch(BuildBranch branch, Date date) {
		return getPatch(branch, getPatchName(branch, date));
	}
	
	
	public static PatchInfo createPatch(BuildBranch branch) {
		Date date = new Date();
		PatchInfo info = new PatchInfo();
		info.setBranch(branch);
		info.setLastModify(date);
		info.setCreateTime(date);
		info.setName(getPatchName(branch, date));
		dao.saveInfo(info);
		return info;
	}
	
	/**
	 * 返回指定名称的补丁
	 * @param branch
	 * @param name
	 * @return
	 */
	public static PatchInfo getPatch(BuildBranch branch, String name) {
		return (PatchInfo)dao.findByBillNo(
				BaseDAO.getBillNo("branch", branch)
				.setValue("name", name)); 
	}
	
	/**
	 * 返回指定日期的补丁名称
	 * @param brach
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public static String getPatchName(BuildBranch branch, Date date) {
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
