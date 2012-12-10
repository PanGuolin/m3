package com.m3.patchbuild.pack.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.pack.IPackService;
import com.m3.patchbuild.pack.Pack;

/**
 * 下载构建包Action
 * @author pangl
 *
 */
public class DownloadAction extends BaseAction{
	
	private String uuid; //Pack的uuid
	private InputStream inputStream;
	private String fileName; //文件名称

	@Override
	protected String doExecute() throws Exception {
		IPackService packService = (IPackService)BussFactory.getService(Pack.class);
		Pack pack = (Pack) packService.findByUuid(uuid);
		File file = new File(pack.getWSRoot(), pack.getBuildNo() + ".zip");
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
	
	
}
