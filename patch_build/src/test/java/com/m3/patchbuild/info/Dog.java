package com.m3.patchbuild.info;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "test_dog")
public class Dog extends Animal{
	
	private int leg;

	public int getLeg() {
		return leg;
	}

	public void setLeg(int leg) {
		this.leg = leg;
	}
	
	

}
