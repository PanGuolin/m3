package com.m3.patchbuild.svn;

import java.util.List;

import org.tmatesoft.svn.core.SVNException;

import com.m3.patchbuild.base.IService;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.Pack;

public interface ISVNLogService extends IService{
	
	
	/**
	 * 将SVN日志信息更新到本地数据库
	 * @param branch
	 * @param keywords
	 * @return
	 * @throws SVNException
	 */
	public void updateLog(Branch branch) throws SVNException;

	/**
	 * 根据关键字查找所有SVN日志信息
	 * @param keywords
	 * @return
	 * @throws SVNException 
	 */
	public List<SVNLog> listByKeyword(Branch branch, String keywords) throws SVNException;
	
	/**
	 * 更新构建包中的文件版本
	 * @param pack
	 * @throws SVNException 
	 */
	public void fillBuildPack(Pack pack) throws Exception;
	
	/**
	 * 列出版本号最小的日志信息
	 * @param branch
	 * @return
	 */
	public List<Object[]> listBaseVersion(Branch branch);

}
