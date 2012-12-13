package com.m3.patchbuild.message;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import com.m3.patchbuild.sys.UserNoLoginException;


/**
 * 用户消息对象，保存特定用户的消息对象
 * @author pangl
 *
 */
public class UserMessageQueue {
	
	private static long expiredTime = 1000 * 60 * 10; //线程超期10分钟
	private static volatile Map<Object, UserMessageQueue> queues = new Hashtable<Object, UserMessageQueue>(); //全局消息分类队列
	
	/**
	 * 开始消费一个指定队列中的消息
	 * @param queueId
	 * @param consumer
	 * @throws Exception
	 */
	public static void consume(Object queueId,  String userId, 
			IMessageConsumer consumer) throws Exception{
		if (userId == null)
			throw new UserNoLoginException();
		UserMessageQueue queue = queues.get(queueId);
		if (queue == null) {
			synchronized (queues) {
				queue = queues.get(queueId);
				if (queue == null) {
					queue = new UserMessageQueue(userId);
					queues.put(queueId, queue);
				}
			}
			queue = new UserMessageQueue(userId);
			queues.put(queueId, queue);
		}
		//session的用户已经发生变化，则应当清除旧消息
		if (!userId.equals(queue.userId)) {
			queue.messageQueue.clear();
			queue.userId = userId;
		}
		queue.consume(consumer);
	}
	
	/**
	 * 消息已发送时触发本方法
	 * @param message
	 */
	public static void messageSended(Message message) {
		List<Object> expiredList = new ArrayList<Object>();
		for (Object key : queues.keySet()) {
			UserMessageQueue queue = queues.get(key);
			if (System.currentTimeMillis() - queue.lastActived > expiredTime) {
				//过期的队列将被移除
				expiredList.add(key);
				queue.interruptLatest(); //中断当前线程
			} else {
				queue.accept(message);
			}
		}
		synchronized (queues) {
			for (Object key : expiredList) {
				queues.remove(key);
			}
		}
	}
	
	
	//private static final Logger logger  = Logger.getLogger(UserMessageQueue.class);
	
	private static int maxQueueLength = 50; //最大队列长度，默认为50条消息，注意队列中可能存在非特定消费者可消费的类型
	
	private long lastActived = 0L; //上一次活动时间
	
	private List<Message> messageQueue = new ArrayList<Message>();//消息列表
	
	private Thread lastThread = null; //上一次消费线程，防止失效的线程进行消费
	
	private String userId;
	
	private UserMessageQueue(String userId) {
		this.lastActived = System.currentTimeMillis();
		this.userId = userId;
	}
	
	/**
	 * 接受一个消息并返回是否接收成功
	 * @param message
	 */
	private boolean accept(Message message) {
		boolean acceptable = false;
		for (MessageReciever rec : message.getRecievers()) {
			if (userId.equals(rec.getUserId())) {
				acceptable = true;
				break;
			}
		}
		if (!acceptable) {
			return false;
		}
		synchronized (messageQueue) {
			while (messageQueue.size() >= maxQueueLength) {
				messageQueue.remove(0);
			}
			messageQueue.add(message);
			messageQueue.notifyAll();
		}
		return true;
	}
	
	/**
	 * 中断最后一次等待的线程
	 */
	private void interruptLatest() {
		synchronized (this) {
			if (lastThread != null && lastThread != Thread.currentThread()) {
				lastThread.interrupt();
			}
		}
	}

	/**
	 * 消费一条消息
	 */
	private void consume(IMessageConsumer consumer) throws Exception{
		lastActived = System.currentTimeMillis();
		synchronized (this) {
			if (lastThread != null && lastThread != Thread.currentThread()) {
				lastThread.interrupt();
			}
			lastThread = Thread.currentThread();
		}
		
		while(true) {
			Message message = null;
			synchronized (messageQueue) {
				if (!messageQueue.isEmpty()) 
					message = messageQueue.remove(0);
			}
			if (message != null) {
				synchronized (this) {
					if (lastThread == Thread.currentThread())
						lastThread = null;
				}
				consumer.consume(message);
				return;
			} else {
				synchronized (messageQueue) { 
					messageQueue.wait();
				}
			}
		}
	}
	
	
}
