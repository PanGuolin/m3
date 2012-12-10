package com.m3.patchbuild.aop.handler;

import java.util.Collection;
import java.util.Map;

import org.jdom.Element;

import com.m3.common.ContextUtil;
import com.m3.common.StringUtil;
import com.m3.patchbuild.aop.ExecuteException;
import com.m3.patchbuild.aop.IAOPHandler;
import com.m3.patchbuild.aop.IExecuteArguments;
import com.m3.patchbuild.aop.IExecuteContext;

public class PermissionHandler implements IAOPHandler {

	@Override
	public IExecuteArguments readArguments(Element argEl) {
		return new PermissionArguments(argEl);
	}

	@Override
	public void execute(IExecuteArguments arguments, IExecuteContext context)
			throws ExecuteException {
		PermissionArguments args = (PermissionArguments)arguments;
		Map<String, Object> scriptContext = context.getScriptContext();
		Collection<String> users = ParticipantUtil.getUserIds(args.getAccepts(), scriptContext);
		if (!users.contains(ContextUtil.getUserId())) {
			throw new NoPermissionExcetpion(StringUtil.join(args.getAccepts(), ";"));
		}
	}

}
