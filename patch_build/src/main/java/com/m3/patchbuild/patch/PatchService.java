package com.m3.patchbuild.patch;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.DaoUtil;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.patch.action.PatchQuery;

/**
 * 补丁业务接口
 * @author MickeyMic
 *
 */
public class PatchService extends BaseService implements IPatchService{
	
	public PatchService() {
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
		DaoUtil.saveInfo(info);
		return info;
	}
	
	/**
	 * 返回指定名称的补丁
	 * @param branch
	 * @param name
	 * @return
	 */
	public Patch getPatch(Branch branch, String name) {
		return (Patch) DaoUtil.findByBillNo(getBizClass(), 
				new String[]{"branch", "name"},
				new Object[]{branch, name});
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


	@SuppressWarnings("unchecked")
	public List<Patch> query(PatchQuery q) {
		return (List<Patch>) DaoUtil.list(getBizClass(), q);
	}


	public void save(Patch patch) {
		DaoUtil.saveInfo(patch);
	}


	@Override
	public Class<? extends IBussInfo> doGetBizClass() {
		return Patch.class;
	}

}
