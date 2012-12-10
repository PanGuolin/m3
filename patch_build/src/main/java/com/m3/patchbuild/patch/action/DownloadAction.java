package com.m3.patchbuild.patch.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import com.byttersoft.code.Base64Util;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.patch.IPatchService;
import com.m3.patchbuild.patch.Patch;

/**
 * 下载补丁包Action
 * @author pangl
 *
 */
public class DownloadAction extends BaseAction{
	
	private String uuid; //Pack的uuid
	private InputStream inputStream;
	private String fileName; //文件名称
	private boolean en = false; //是否下载加密包

	@Override
	protected String doExecute() throws Exception {
		IPatchService patchService = (IPatchService)BussFactory.getService(Patch.class);
		Patch patch = (Patch) patchService.findByUuid(uuid);
		File file = new File(patch.getWSRoot(), patch.getName() + ".zip");
		if (en) {
			File enFile = new File(patch.getWSRoot(), patch.getName() + ".patch");
			if (!enFile.exists() || file.lastModified() > enFile.lastModified()) {
				Base64Util.encodeFile(file.getAbsolutePath(), enFile.getAbsolutePath());
			}
			file = enFile;
		}
		this.fileName = file.getName();
		inputStream = new FileInputStream(file);
		
		return SUCCESS;
	}


	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getUuid() {
		return uuid;
	}


	public void setUuid(String uuid) {
		this.uuid = uuid;
	}


	public boolean isEn() {
		return en;
	}


	public void setEn(boolean en) {
		this.en = en;
	}
	
}
