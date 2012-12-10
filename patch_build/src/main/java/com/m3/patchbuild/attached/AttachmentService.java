package com.m3.patchbuild.attached;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.m3.common.FileUtil;
import com.m3.patchbuild.IBussInfo;
import com.m3.patchbuild.base.BaseService;
import com.m3.patchbuild.base.BussFactory;
import com.m3.patchbuild.base.DaoUtil;

/**
 * 附件服务
 * @author MickeyMic
 *
 */
public class AttachmentService extends BaseService{
	
	private static final Logger logger = Logger.getLogger(AttachmentService.class);

	public static final String KEY_ROOT_DIR = "m3.attach.root"; //从System.properties中获取保存附件根目录的KEY
	
	public static final String KEY_SEP_BY_DATE = "m3.attach.sepbydate"; //是否以创建时间进行保存
	
	public static final String DEFAULT_ROOT_DIR = "/m3_attachments"; //保存附件的默认根目录
	
	private static File ROOT_DIR = null;
	private static boolean SEP_BY_DATE = false;
	
	static {
		if (System.getProperty(KEY_ROOT_DIR) != null) {
			ROOT_DIR = new File(System.getProperty(KEY_ROOT_DIR));
		} else {
			ROOT_DIR = new File(DEFAULT_ROOT_DIR);
		}
		try {
			ROOT_DIR.mkdirs();
		} catch (Throwable t) {
			logger.error("创建附件根目录时出错", t);
		}
	}
	
	/**
	 * 创建附件信息
	 * @param file 待创建的文件，必须存在并且不能是目录
	 * @param keepSource 是否保留原文件
	 * @return
	 * @throws IOException 
	 */
	public Attachment createAttachment(File file, IBussInfo info, boolean keepSource) throws IOException {		
		if (!file.exists() || !file.isFile())
			return null;
		File to = ROOT_DIR;
		
		Date date = new Date();
		if (SEP_BY_DATE) {
			to = new File(to, new SimpleDateFormat("yyyy/MM/dd").format(date));
			to.mkdirs();
		}
		String toName = UUID.randomUUID().toString();
		to = new File(to, toName);
		
		FileUtil.copyContent(file, to);
		if (!keepSource)
			file.delete();
		Attachment att = new Attachment();
		att.setFileName(file.getName());
		att.setFileUuid(toName);
		if (info != null) {
			att.setBussId(info.getUuid());
			att.setBussType(BussFactory.getBussType(info.getClass()));
		}
		DaoUtil.saveInfo(att);
		return att;
	}

	@Override
	protected Class<? extends IBussInfo> doGetBizClass() {
		return Attachment.class;
	}
}
