package com.m3.patchbuild.exception;

import java.util.Collection;

import com.m3.patchbuild.info.BuildPack;

/**
 * 依赖的构建包未发布异常
 * @author pangl
 *
 */
public class DependsUnpublishException extends BuildPackException{
	
	private static final long serialVersionUID = 4915787980515932813L;
	
	private Collection<BuildPack> depends = null;
	
	public DependsUnpublishException(BuildPack bp, Collection<BuildPack> depends) {
		super(bp);
		this.depends = depends;
	}

	@Override
	public String getMessage() {
		StringBuilder sb = new StringBuilder("构建包[" + buildPack.getBuildNo() + "]所依赖的包还没有发布\n");
		if (depends != null && !depends.isEmpty()) {
			sb.append("依赖的构建包列表：");
			for (BuildPack bp : depends) {
				sb.append(bp.getBuildNo() + ",");
			}
		}
		return sb.toString();
	}
}
