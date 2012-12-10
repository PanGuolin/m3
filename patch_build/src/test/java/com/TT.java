package com;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class TT implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String f1 = "panda";
	
	private String f2 = "nn";
	
	public static void main(String[] args) throws Exception{
		
//		TT t = new TT();
//		ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(("C:\\tt.obj")));
//		out.writeObject(t);
//		out.flush();
//		out.close();
		ObjectInputStream in = new ObjectInputStream(new FileInputStream(("C:\\tt.obj")));
		TT t = (TT)in.readObject();
		//System.out.println(t.f1 + "===" + t.f2);
		t.print();
		System.out.println("OK");
	}
	
	public void print() {
		System.out.println(f1 + "===" + f2);
	}

}
