package com.m3.patchbuild.info;

import junit.framework.TestCase;

import com.m3.common.HibernateUtil;

public class AnimalTest extends TestCase {

	public void test_ani(){
		SuperDog dog = new SuperDog();
		dog.setName("super wangcai");
		dog.setLeg(4);
		dog.setSpeed(50);
		HibernateUtil.openSession().save(dog);
		HibernateUtil.closeSession();
		
		
		Dog dog2 = new Dog();
		dog2.setName("wangcai");
		dog2.setLeg(4);
		HibernateUtil.openSession().save(dog2);
		HibernateUtil.closeSession();
		
		Dog dog1 = (Dog) HibernateUtil.openSession().get(Dog.class, dog.getUuid());
		assertEquals(dog2.getLeg(), dog.getLeg());
	}
}
