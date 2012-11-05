package com.m3.patchbuild.info;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="test_bird")
public class Bird extends Animal{
	
	private int speed = 100;

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}
	
	

}
