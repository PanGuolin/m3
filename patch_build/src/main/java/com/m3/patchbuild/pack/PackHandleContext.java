package com.m3.patchbuild.pack;

import java.io.PrintStream;

import com.m3.common.StringUtil;
import com.sun.xml.internal.messaging.saaj.util.ByteOutputStream;

public class PackHandleContext {
	
	private String failReason;
	
	private PackStatus oldStatus; //旧状态，用于检查
	
	private String tester; //分配的测试人员
	
	private String uuid; 
	
	private String deployer; //发布人员
	
	private String patchNo; //发布的补丁编号
	
	private boolean pass;

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}

	public PackStatus getOldStatus() {
		return oldStatus;
	}

	public void setOldStatus(PackStatus oldStatus) {
		this.oldStatus = oldStatus;
	}

	public String getTester() {
		return tester;
	}

	public void setTester(String tester) {
		this.tester = tester;
	}
	
	public boolean isFailed() {
		return !StringUtil.isEmpty(failReason);
	}
	
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public void setException(Throwable t) {
		if (t == null)
			return;
		ByteOutputStream out = new ByteOutputStream();
		t.printStackTrace(new PrintStream(out));
		String s = new String(out.getBytes());
		this.failReason = s.length() > 300 ? s.substring(0, 300) : s;
	}

	public String getDeployer() {
		return deployer;
	}

	public void setDeployer(String deployer) {
		this.deployer = deployer;
	}

	public String getPatchNo() {
		return patchNo;
	}

	public void setPatchNo(String patchNo) {
		this.patchNo = patchNo;
	}

	public boolean isPass() {
		return pass;
	}

	public void setPass(boolean pass) {
		this.pass = pass;
	}
}
