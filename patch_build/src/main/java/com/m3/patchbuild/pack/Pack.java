package com.m3.patchbuild.pack;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.apache.tools.ant.util.FileUtils;

import com.m3.common.StringUtil;
import com.m3.patchbuild.base.BaseBussInfo;
import com.m3.patchbuild.branch.Branch;

/**
 * 补丁构建包对象
 * @author MickeyMic
 *
 */
public class Pack  extends BaseBussInfo {
	private static final Logger logger = Logger.getLogger(Pack.class);

	private String buildNo; //构建号
	private String keywords; //构建关键字
	private String requester; //构建申请人
	private String checker; //最后构建检查人
	private Date checkTime; //检查通过时间
	private Date requestTime; //申请日期
	private String tester; //测试用户
	private String assigner; //分配用户
	private Date assignTime; //分配时间
	private Date testTime; //开始测试时间
	private Date passTime; //测试通过时间
	private String deployer; //发布用户
	private Date deployTime; //发布时间
	private Branch branch; //所属分支
	private String customers = "ALL"; //适用客户
	private String comments; //构建描述
	private String patch; //所属补丁
	private PackStatus status = PackStatus.init; //当前状态
	private List<BuildFile> buildFiles = new ArrayList<BuildFile>(); //构建文件列表
	//private Set<String> depends = new HashSet<String>(); //依赖其它构建包列表
	private Set<Pack> depends = new HashSet<Pack>();//依赖关系
	private String failReason; //失败原因
	private List<Bug> bugs = new ArrayList<Bug>();//对应的BUG号
	private String libfiles; //lib包列表，用分号连接
	private Date buildTime; //构建时间
	
	public String getBuildNo() {
		return buildNo;
	}
	public void setBuildNo(String buildNo) {
		this.buildNo = buildNo;
	}
	public String getKeywords() {
		if (keywords == null)
			keywords = ";";
		if (!keywords.startsWith(";"))
			keywords = ";" + keywords;
		if (!keywords.endsWith(";"))
			keywords += ";";
		if (keywords.indexOf(";" + buildNo + ";") == -1)
			keywords += buildNo + ";";
		for (Bug bug : bugs) {
			if (keywords.indexOf(";" + bug.getBugNo() + ";") == -1) {
				keywords += bug.getBugNo() + ";";
			}
		}
		return keywords;
	}
	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
	public String getRequester() {
		return requester;
	}
	public void setRequester(String requester) {
		this.requester = requester;
	}
	public Date getRequestTime() {
		return requestTime;
	}
	public void setRequestTime(Date requestTime) {
		this.requestTime = requestTime;
	}
	public String getTester() {
		return tester;
	}
	public void setTester(String tester) {
		this.tester = tester;
	}
	public Date getTestTime() {
		return testTime;
	}
	public void setTestTime(Date testTime) {
		this.testTime = testTime;
	}
	public Date getPassTime() {
		return passTime;
	}
	public void setPassTime(Date passTime) {
		this.passTime = passTime;
	}
	public String getDeployer() {
		return deployer;
	}
	public void setDeployer(String deployer) {
		this.deployer = deployer;
	}
	public Branch getBranch() {
		return branch;
	}
	public void setBranch(Branch branch) {
		this.branch = branch;
	}
	public String getCustomers() {
		return customers;
	}
	public void setCustomers(String customers) {
		this.customers = customers;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public PackStatus getStatus() {
		return status;
	}
	public void setStatus(PackStatus status) {
		this.status = status;
	}
	public Date getDeployTime() {
		return deployTime;
	}
	public void setDeployTime(Date deployTime) {
		this.deployTime = deployTime;
	}
	public String getPatch() {
		return patch;
	}
	public void setPatch(String patch) {
		this.patch = patch;
	}
	public List<BuildFile> getBuildFiles() {
		return buildFiles;
	}
	public void setBuildFiles(List<BuildFile> buildFiles) {
		this.buildFiles = buildFiles;
	}
	public void addBuildFile(BuildFile file) {
		this.buildFiles.add(file);
	}
	
	public boolean removeBuildFile(String url) {
		return this.buildFiles.remove(url);
	}
//	public Set<String> getDepends() {
//		return depends;
//	}
//	public void setDepends(Set<String> depends) {
//		if (depends != null)
//			this.depends = depends;
//	}
//	
//	public void addDepends(String depend) {
//		this.depends.add(depend);
//	}
//	
	public String[] getFilePaths() {
		Set<String> set = new HashSet<String>();
		for (BuildFile file : buildFiles) {
			set.add(file.getUrl());
		}
		return (String[])set.toArray(new String[set.size()]);
	}
	
	public void addFilePath(String path) {
		if (path == null)
			return;
		path = path.trim();
		for (BuildFile file :buildFiles) {
			if (path.equalsIgnoreCase(file.getUrl())) {
				return;
			}
		}
		BuildFile file = new BuildFile();
		file.setUrl(path);
		this.buildFiles.add(file);
	}
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	public Date getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}
	public String getFailReason() {
		return failReason;
	}
	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}
	
	public Date getAssignTime() {
		return assignTime;
	}
	public void setAssignTime(Date assignTime) {
		this.assignTime = assignTime;
	}
	
	public String getAssigner() {
		return assigner;
	}
	public void setAssigner(String assigner) {
		this.assigner = assigner;
	}
	/**
	 * 获取构建包的工作目录
	 * @return
	 */
	public File getWSRoot() {
		return new File(branch.getWorkspace(), "builds/" + getBuildNo());
	}
	
	public static final String BUILD_LOG = "build.log";
	public File getBuildLogFile() {
		return new File(getWSRoot(), "build.log");
	}
	
	public String getBuildLog() {
		try {
			return FileUtils.readFully(new FileReader(getBuildLogFile()));
		} catch (IOException e) {
			logger.error("读取日志文件时出错", e);
			return "";
		}
	}
	@Override
	public String toString() {
		return getBranch().getBranch() + " -" + buildNo;
	}
	
	public File getZipFile() {
		return new File(getWSRoot(), buildNo + ".zip");
	}
	
	public List<Bug> getBugs() {
		return bugs;
	}
	public void setBugs(List<Bug> bugs) {
		this.bugs = bugs;
	}
	
	public Bug findBugByNo(String bugNo) {
		if (StringUtil.isEmpty(bugNo))
			return null;
		for (Bug bug : bugs) {
			if (bugNo.equals(bug.getBugNo())) {
				return bug;
			}
		}
		return null;
	}
	public Set<Pack> getDepends() {
		return depends;
	}
	public void setDepends(Set<Pack> depends) {
		this.depends = depends;
	}
	public String getLibfiles() {
		return libfiles;
	}
	public void setLibfiles(String libfiles) {
		this.libfiles = libfiles;
	}
	public Date getBuildTime() {
		return buildTime;
	}
	public void setBuildTime(Date buildTime) {
		this.buildTime = buildTime;
	}
}
