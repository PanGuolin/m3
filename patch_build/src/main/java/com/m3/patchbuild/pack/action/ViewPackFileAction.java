package com.m3.patchbuild.pack.action;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import com.m3.common.FileUtil;
import com.m3.patchbuild.BaseAction;
import com.m3.patchbuild.BussFactory;
import com.m3.patchbuild.branch.Branch;
import com.m3.patchbuild.pack.BuildFile;
import com.m3.patchbuild.pack.Pack;
import com.m3.patchbuild.pack.PackService;

/**
 * 查看构建包中的文件内容
 * @author pangl
 *
 */
public class ViewPackFileAction extends BaseAction{
	public static final String KEY_URL = "url"; //保存URL的KEY
	public static final String KEY_CONTENT = "content"; //保存内容的KEY
	
	private String i; //pack uuid + file uuid;
	private Map<String, Object> dataMap = new HashMap<String, Object>();

	@Override
	protected String doExecute() throws Exception {
		String packUid = i.substring(0, 36);
		String fileUid = i.substring(36);
		PackService packService = (PackService)BussFactory.getService(Pack.class);
		Pack pack = (Pack) packService.findInfoByUuid(packUid);
		for (BuildFile f : pack.getBuildFiles()) {
			if (fileUid.equals(f.getUuid())) {
				File bpRoot = new File(pack.getWSRoot(), Branch.DIR_SVN);
				String url = f.getUrl();
				String str = FileUtil.getTextContent(new File(bpRoot, url), null);
				if (str != null) {
					str = str.trim();
					str = str.replaceAll(">", "&gt;");
					str = str.replaceAll("<", "&lt;");
				}
				dataMap.put(KEY_URL, url);
				dataMap.put(KEY_CONTENT, str);
				String fileType = "plain";
				int index = url.lastIndexOf('.');
				if (index != -1) {
					String sufix = url.substring(index+1);
					if ("sql".equalsIgnoreCase(sufix)) {
						fileType = "sql";
					} else if ("java".equalsIgnoreCase(sufix)) {
						fileType = "java";
					} else if ("js".equalsIgnoreCase(sufix)) {
						fileType = "js";
					} else if ("xml".equalsIgnoreCase(sufix)) {
						fileType = "xml";
					}
				}
				dataMap.put("type", fileType);
				return SUCCESS;
			}
		}
		return ERROR;
	}

	public String getI() {
		return i;
	}

	public void setI(String i) {
		this.i = i;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}
}
