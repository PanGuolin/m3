package com.m3.patchbuild.svn;

/**
 * 打Tag的文件信息
 * @author pangl
 *
 */
public class TagFileInfo {

	private long revision; //文件的版本号
	private String path; //文件的路径
	public long getRevision() {
		return revision;
	}
	public void setRevision(long revision) {
		this.revision = revision;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
	
}
