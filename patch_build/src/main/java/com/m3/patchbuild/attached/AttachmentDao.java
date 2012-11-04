package com.m3.patchbuild.attached;

import com.m3.patchbuild.BaseDAO;

public class AttachmentDao extends BaseDAO{

	@Override
	protected Class<?> getInfoClass() {
		return Attachment.class;
	}

}
