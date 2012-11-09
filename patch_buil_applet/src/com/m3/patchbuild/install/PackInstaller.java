package com.m3.patchbuild.install;

import java.awt.BorderLayout;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class PackInstaller extends JFrame {

	private static final long serialVersionUID = 1L;

	public PackInstaller() {
		super("构建包安装程序");
		String loadedFrom = this.getClass().getClassLoader().toString();
		JLabel jl = new JLabel("loaded by " + loadedFrom);
		JEditorPane jtp = new JEditorPane("text/plain", "Edit this text ");
		try {
			jtp.setPage("http://127.0.0.1:8080/");
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println("Error: " + e.getMessage());
		}

		getContentPane().add(jl, BorderLayout.NORTH);
		getContentPane().add(jtp, BorderLayout.CENTER);
	}

	public static void main(String[] args) {
		JFrame f = new PackInstaller();
		f.setBounds(100, 100, 325, 250);
		f.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosed(WindowEvent e) {
				System.out.println("Shutting down...");
				System.exit(0);
			}
		});
	}
}
