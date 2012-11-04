package com.m3.patchbuild.message;


/**
 * 消息消费者接口
 * @author pangl
 *
 */
public interface IMessageConsumer {

	/**
	 * 消费一条消息
	 * @param message
	 * @param isTail 是否队列中的最后一条消息
	 */
	 void consume(Message message) throws Exception;

//	 /**
//	  * 消息者是否可以消费某条消息
//	  * @param message
//	  * @return
//	  */
//	boolean accept(Message message);
	 

}
