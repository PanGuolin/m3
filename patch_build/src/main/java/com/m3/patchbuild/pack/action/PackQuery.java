package com.m3.patchbuild.pack.action;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.m3.common.ContextUtil;
import com.m3.common.query.BaseQuery;
import com.m3.common.query.QueryField;
import com.m3.common.query.QueryType;
import com.m3.patchbuild.pack.PackStatus;
import com.m3.patchbuild.user.User;
import com.m3.patchbuild.user.UserUtil;

public class PackQuery extends BaseQuery{

	@QueryField(property="branch.branch")
	private String branch; //所属分支
	@QueryField(property="status")
	private int packStatus = -1; //补丁状态
	@QueryField(type=QueryType.AllLike)
	private String buildNo; //构建号
	@QueryField(type=QueryType.AllLike)
	private String patch; //所属补丁
	@QueryField(type=QueryType.AllLike)
	private String requester; //申请人
	@QueryField(type=QueryType.AllLike)
	private String tester; //测试员
	@QueryField(type=QueryType.AllLike)
	private String checker; //检查人
	
	private boolean showDeployed; //是否显示已发布
	private boolean showFailed; //是否显示异常状态的构建包
	private boolean onlyMyFollowed; //是否仅显示我关注的
	
	@QueryField(type=QueryType.GreateEqual, property="buildTime")
	private Date buildStart; //构建日期范围开始
	@QueryField(type=QueryType.LittleEqual, property="buildTime")
	private Date buildEnd; //构建日期范围结束
	@QueryField(type=QueryType.GreateEqual, property="deployTime")
	private Date deployStart; //发布日期范围开始
	@QueryField(type=QueryType.LittleEqual, property="deployTime")
	private Date deployEnd; //发布日期范围结束
	
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public PackStatus getPackStatus() {
		if (packStatus == -1)
			return null;
		return PackStatus.values()[packStatus];
	}
	public void setPackStatus(int packStatus) {
		this.packStatus = packStatus;
	}
	public String getBuildNo() {
		return buildNo;
	}
	public void setBuildNo(String buildNo) {
		this.buildNo = buildNo;
	}
	public String getPatch() {
		return patch;
	}
	public void setPatch(String patch) {
		this.patch = patch;
	}
	public String getRequester() {
		return requester;
	}
	public void setRequester(String requester) {
		this.requester = requester;
	}
	public String getTester() {
		return tester;
	}
	public void setTester(String tester) {
		this.tester = tester;
	}
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	public boolean isShowDeployed() {
		return showDeployed;
	}
	public void setShowDeployed(boolean showDeployed) {
		this.showDeployed = showDeployed;
	}
	public boolean isShowFailed() {
		return showFailed;
	}
	public void setShowFailed(boolean showFailed) {
		this.showFailed = showFailed;
	}
	public boolean isOnlyMyFollowed() {
		return onlyMyFollowed;
	}
	public void setOnlyMyFollowed(boolean onlyMyFollowed) {
		this.onlyMyFollowed = onlyMyFollowed;
	}
	public Date getBuildStart() {
		return buildStart;
	}
	public void setBuildStart(Date buildStart) {
		this.buildStart = buildStart;
	}
	public Date getBuildEnd() {
		return buildEnd;
	}
	public void setBuildEnd(Date buildEnd) {
		this.buildEnd = buildEnd;
	}
	public Date getDeployStart() {
		return deployStart;
	}
	public void setDeployStart(Date deployStart) {
		this.deployStart = deployStart;
	}
	public Date getDeployEnd() {
		return deployEnd;
	}
	public void setDeployEnd(Date deployEnd) {
		this.deployEnd = deployEnd;
	}
	
	@Override
	protected void doBeforeQuery(Criteria criter) {
		if (isOnlyMyFollowed()) {
			User user = ContextUtil.getLoginUser();
			Set<User> fs = user.getFollowers();
			if (!fs.isEmpty()) {
				List<String> userIds = UserUtil.getUserId(fs);
				criter.add(Restrictions.in("requester", userIds));
			}
		}
		if (packStatus == -1) {
			Set<PackStatus> status = new HashSet<PackStatus>();
			status.add(PackStatus.builded);
			status.add(PackStatus.checked);
			status.add(PackStatus.pass);
			status.add(PackStatus.request);
			status.add(PackStatus.testing);
			status.add(PackStatus.assigned);
			if (showDeployed)
				status.add(PackStatus.published);
			if (showFailed) {
				status.add(PackStatus.buildFail);
				status.add(PackStatus.canceled);
				status.add(PackStatus.checkFail);
				status.add(PackStatus.publishFail);
				status.add(PackStatus.testFail);
			}
			criter.add(Restrictions.in("status", status));
		}
	}
}
