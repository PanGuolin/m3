package com.m3.patchbuild.msgflow;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.jdom.Element;
import org.jdom.Namespace;

import com.m3.patchbuild.aop.handler.Participant;

/**
 * 业务配置信息
 * 
 * @author pangl 
 * <messages>
 *  <message>
 *    <service>com.m3.patchbuild.user.ResetPassReqService</service> <!-- 业务对象 -->
 *    <method>saveInfo(com.m3.patchbuild.IBussInfo)</method> <!-- 业务方法 --> 
 *    <advice>afterX</advice>
 *    <recievers> <!-- 消息接收人列表 -->
 *     <participant>
 *      <type>role</type>
 *      <expr>admin</expr>
 *     </participant>
 *    </recievers>
 *    <notifiers> <!-- 消息抄送人列表 -->
 *     <participant>
 *      <type>relation</type>
 *      <expr>requester</expr>
 *     </participant>
 *    </notifiers>
 *    <subject><![CDATA[密码重置:${Parameter0.userId}]]></subject> <!-- 消息主题 --> 
 *    <content><![CDATA[ 用户:${Parameter0.userId}申请密码重置，请审批。 ]]></content>  <!-- 消息内容 -->
 *   </message>
 *  </messages>
 */
public class MessageConfig extends BaseAdviceConfig{

	private Collection<Participant> recievers;
	private Collection<Participant> notifiers;
	private String subject;
	private String content;
	private int infoIndex = 0;
	private static final Logger logger = Logger.getLogger(MessageConfig.class);
	
	public MessageConfig(Element msgEl, Namespace ns) throws Exception {
		setService(msgEl.getChildTextTrim("service", ns));
		setAdviceType(AdviceType.valueOf(msgEl.getChildTextTrim("advice", ns)));
		recievers = getParticipants(msgEl.getChild("recievers", ns));
		notifiers = getParticipants(msgEl.getChild("notifiers", ns));
		subject = msgEl.getChildTextTrim("subject", ns);
		content = msgEl.getChildTextTrim("content", ns);
		String condition = msgEl.getChildTextTrim("condition", ns);
		setCondition(condition);
		try {
			infoIndex = Integer.parseInt(msgEl.getChildTextTrim("infoIndex", ns));
		} catch (Throwable t) {
			logger.info("", t);
		}
		String methodExp = msgEl.getChildTextTrim("method", ns);
		int sIndex = methodExp.indexOf('(');
		if (sIndex != -1) {
			setMethodName(methodExp.substring(0, sIndex).trim());
			String paramExp = methodExp.substring(sIndex + 1, methodExp.length()-1).trim();
			String[] paramTypes = paramExp.split(",");
			for (int i=0; i<paramTypes.length; i++) {
				paramTypes[i] = paramTypes[i].trim();
			}
			setParamTypes(paramTypes);
		} else {
			setMethodName(methodExp);
		}
		if (condition != null) {
			if ("NEW_INFO".equals(condition)) {
				setCondition("'${_P" + getInfoIndex() + ".uuid}' == 'null'");
			} else if ("OLD_INFO".equals(condition)){
				setCondition("'${_P" + getInfoIndex() + ".uuid}' != 'null'");
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	private static Collection<Participant> getParticipants(Element parentEl) {
		Set<Participant> ps = new HashSet<Participant>();
		if (parentEl == null)
			return ps;
		Namespace ns = parentEl.getNamespace();
		List<Element> pEls = parentEl.getChildren("participant", ns);
		if (pEls != null) {
			for (Element pEl : pEls) {
				ps.add(new Participant(pEl, ns));
			}
		}
		return ps;
	}

	public Collection<Participant> getRecievers() {
		return recievers;
	}

	public Collection<Participant> getNotifiers() {
		return notifiers;
	}

	public String getSubject() {
		return subject;
	}

	public String getContent() {
		return content;
	}

	public int getInfoIndex() {
		return infoIndex;
	}
}
