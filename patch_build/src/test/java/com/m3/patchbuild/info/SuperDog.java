package com.m3.patchbuild.info;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "test_super_dog")
public class SuperDog extends Dog{
	
	private int speed;

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int spped) {
		this.speed = spped;
	}
	
	

}
