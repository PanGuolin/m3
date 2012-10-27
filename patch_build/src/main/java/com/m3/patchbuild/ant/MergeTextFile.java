package com.m3.patchbuild.ant;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.types.FileSet;

/**
 * 合并多个文本文件
 * @author pangl
 *
 */
public class MergeTextFile extends Task {

	private String encoding="UTF-8";
	
	private File destFile; //目标文件
	
	private List<FileSet> fileSets = new ArrayList<FileSet>();
	
	@Override
	public void execute() throws BuildException {
		super.log("filsSet:" + fileSets.size());
		// TODO Auto-generated method stub
		super.execute();
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public void setDestFile(File destFile) {
		this.destFile = destFile;
	}

	public void setFileSets(List<FileSet> fileSets) {
		this.fileSets = fileSets;
	}
	
	
}
