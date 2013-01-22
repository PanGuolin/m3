package com.m3.patchbuild.patch;

import java.util.Date;
import java.util.List;

import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.patch.action.PatchQuery;

/**
 * 补丁服务接口
 * @author pangl
 *
 */
public interface IPatchService extends IService{
	/**
	 * 返回某一天的补丁
	 * @param branch
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public Patch getPatch(Branch branch, Date date);
	
	
	public Patch createPatch(Branch branch);
	
	/**
	 * 返回指定名称的补丁
	 * @param branch
	 * @param name
	 * @return
	 */
	public Patch getPatch(Branch branch, String name) ;
	
	/**
	 * 返回指定日期的补丁名称
	 * @param brach
	 * @param date 指定的日期，如果日期为空则表示返回当天的
	 * @return
	 */
	public String getPatchName(Branch branch, Date date) ;


	public List<Patch> query(PatchQuery q) ;


	public void save(Patch patch);

}
