package com.m3.patchbuild.pack;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.exception.BussException;
import com.m3.patchbuild.message.IHandleService;
import com.m3.patchbuild.pack.action.PackQuery;

/**
 * 构建包服务接口
 * @author pangl
 *
 */
public interface IPackService extends IService, IHandleService {
	
	
	public void cancel(Pack pack);
	
	/**
	 * 准备构建，获取相应的文件并记录版本信息
	 * @param bp
	 * @throws Exception 
	 */
	public void prepareBuild(Pack pack, Set<String> files) throws BussException;

	/**
	 * 列出所有待构建(检查通过)的构建包信息
	 * @return
	 */
	public List<Pack> listByStatus(PackStatus status);
	
	/**
	 * 发布构建包
	 * @param bp
	 * @throws Exception
	 */
	public void publish(Pack bp) throws BussException;

	public List<Pack> listByStatus(Collection<PackStatus> slist);

	/**
	 * 列出所有 已测试通过的构建包
	 * @param branch
	 * @param pass
	 * @return
	 */
	public List<Pack> listByStatus(String branch, PackStatus status);

	/**
	 * 列出指定UUID的构建包
	 * @param asList
	 * @return
	 */
	public List<Pack> listByUuids(Collection<String> uuids);

	public void clearBuildFiles(Pack bp);

	/**
	 * 根据条件查询Pack信息
	 * @param q
	 * @return
	 */
	public List<Pack> query(PackQuery q);

	/**
	 * 列出所有在指定日期前发布的构建包
	 * @param time
	 * @return
	 */
	public List<Pack> listPublished(Branch branch, Date time);
	
	public Pack find(String branch, String buildNo);

}
