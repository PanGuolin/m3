package com.m3.patchbuild.info;

import org.hibernate.Session;

import com.m3.common.HibernateUtil;

import junit.framework.TestCase;

public class AnimalTest extends TestCase {

	public void test_ani(){
		Dog dog = new Dog();
		dog.setName("wangcai");
		dog.setLeg(4);
		HibernateUtil.openSession().save(dog);
		HibernateUtil.closeSession();
		
		Dog dog2 = (Dog) HibernateUtil.openSession().get(Dog.class, dog.getUuid());
		assertEquals(dog2.getLeg(), dog.getLeg());
	}
}
