package com.m3.patchbuild.ant;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.types.FileSet;

/**
 * 合并多个文本文件
 * @author pangl
 *
 */
public class MergeTextFile extends Task {

	private String encoding="GBK";
	
	private File destFile; //目标文件
	
	private List<FileSet> fileSets = new ArrayList<FileSet>();
	
	private String commentStart = "/*";
	
	private String commentEnd = "*/";
	
	@Override
	public void execute() throws BuildException {
		StringBuilder sb = new StringBuilder(readFile(destFile));
		for (FileSet fs : fileSets) {
			  DirectoryScanner ds = fs.getDirectoryScanner(getProject());
			  File fromDir = fs.getDir(getProject());
			  String[] srcFiles = ds.getIncludedFiles();
			  for (String str : srcFiles) {
				  File file = new File(fromDir, str);
				  //去除原始信息
				  String sToken = commentStart + file.getName() + "_start " + commentEnd + "\r\n";
				  String eToken = commentStart + file.getName() + "_end " + commentEnd + "\r\n";
				  int sIndex = sb.indexOf(sToken);
				  if (sIndex != -1) {
					  int eIndex = sb.indexOf(eToken, sIndex + sToken.length());
					  if (eIndex != -1) {
						  sb.replace(sIndex, eIndex + eToken.length(), "");
						  super.log("文件内容已在，移除：" + str);
					  }
				  }
				  String content = readFile(file);
				  if (content.length() > 0) {
					  sb.append(sToken + content + eToken);
				  }
				  super.log("成功追加文件内容:" + str + "到" + destFile);
			  }
		}
		try {
			if (!destFile.getParentFile().exists())
				destFile.getParentFile().mkdirs();
			FileOutputStream out = new FileOutputStream(destFile);
			out.write(sb.toString().getBytes(encoding));
			out.flush();
			out.close();
		} catch (IOException ex) {
			throw new BuildException(ex);
		}
	}
	
	private String readFile(File textFile) {
		if (!textFile.exists())
			return "";
		StringBuilder sb = new StringBuilder();
		try {
			InputStreamReader isr = new InputStreamReader(new FileInputStream(textFile), encoding);
			BufferedReader reader = new BufferedReader(isr);
			String line = null;
			while((line = reader.readLine()) != null) {
				sb.append(line + "\r\n");
			}
			reader.close();
			return sb.toString();
		} catch (IOException e) {
			throw new BuildException(e);
		}
	}

	public void setDestFile(File destFile) {
		this.destFile = destFile;
	}

	public void addFileSet(FileSet fileset) {
		this.fileSets.add(fileset);
	}

	public void setCommentStart(String commentStart) {
		this.commentStart = commentStart;
	}

	public void setCommentEnd(String commentEnd) {
		this.commentEnd = commentEnd;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}
}
