package com.m3.patchbuild.install;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.border.TitledBorder;
import javax.swing.filechooser.FileFilter;

import net.sf.json.JSONObject;

public class PackInstaller extends JFrame {

	private static final long serialVersionUID = 1L;
	private Insets defaultInsert = new Insets(5, 2, 2, 0);
	private JTextField userName;
	private JPasswordField password;
	private JTextField appRoot;
	private JTextField dsConfig;
	private JTextField serverAddr;
	private String sessionid;
	private String rootPath;
	private JCheckBox cbOnlyOwn;
	private JCheckBox cbSBuilded;
	private JCheckBox cbSChecked;
	private JCheckBox cbSAssigned;
	private JCheckBox cbSTesting;
	private JComboBox<String> packCombo;
	private List<String> packUuids = new ArrayList<String>();
	private JTextField status;
	private JCheckBox installPatch;
	private JCheckBox installDepend;
	private JCheckBox uninstallOther;
	private static final String title_unlogin = "��������װ����(δ��¼)";
	private static final String title_logined = "��������װ����(�ѵ�¼)";
	public PackInstaller() {
		super(title_unlogin);
		
		JPanel topPane = newPanel(null);
		this.getContentPane().add(topPane, BorderLayout.NORTH);
		//topPane.setLayout(new BorderLayout());
		
		JPanel panel = newPanel("��¼ϵͳ");
		//panel.setPreferredSize(new Dimension(500, 200));
		addToParent(topPane, panel, 0, 0);
		int x=0, y=0;
		newLabel(panel, "��������ַ", x++, y);
		serverAddr = newText(panel, x++, y);
		x=0;y++;
		newLabel(panel, "�û���: ", x++, y);
		userName = newText(panel, x++, y);
		x=0;y++;
		newLabel(panel, "����: ", x++, y);
		password = newPassword(panel, x++, y);
		x=0;y++;
		JButton loginBtn = newButton(panel, "��¼", ++x, y);
		loginBtn.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					PackInstaller.this.setTitle(title_unlogin);
					if (!login()) 
						return;
					PackInstaller.this.setTitle(title_logined);
					getPacks();
				} catch (Exception e1) {
					e1.printStackTrace();
					JOptionPane.showMessageDialog(PackInstaller.this, "���ʷ�����ʱ����" + e1.getMessage());
					return;
				}
			}
		});
		
		panel = newPanel("��װѡ��");
		addToParent(topPane, panel, 1, 0);
		panel.setLayout(new BorderLayout());
		JPanel refreshPanel = newPanel(null);
		panel.add(refreshPanel, BorderLayout.NORTH);
		x=0; y=0;
		newLabel(refreshPanel, "ѡ�񹹽�����", x++, y);
		packCombo = newCombo(refreshPanel, x++, y);
		 newButton(refreshPanel, "ˢ��", x++, y).addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					getPacks();
				} catch (Exception e1) {
					JOptionPane.showMessageDialog(null, "ˢ��ʱ����" + e1.getMessage());
				}
			}
		});
		
		JPanel packStatPanel = newPanel(null);
		panel.add(packStatPanel, BorderLayout.CENTER);
		x=0; y=0;
		cbOnlyOwn = newCheckBox(packStatPanel, "ֻ��ʾ�ҵĹ�����", x++, y);
		cbSBuilded = newCheckBox(packStatPanel, "��ʾ�ѹ���", x++, y);
		cbSChecked = newCheckBox(packStatPanel, "��ʾ�Ѽ��", x++, y);
		x=0; y++;
		cbSAssigned = newCheckBox(packStatPanel, "��ʾ�ѷ���", x++, y);
		cbSTesting = newCheckBox(packStatPanel, "��ʾ�Ѳ���", x++, y);
		
		panel = newPanel("��װ��Ϣ");
		this.getContentPane().add(panel, BorderLayout.CENTER);
		panel.setLayout(new BorderLayout());
		
		JPanel installOps = newPanel(null);
		panel.add(installOps, BorderLayout.NORTH);
		x=0; y=0;
		installPatch = newCheckBox(installOps, "��װ���²���", ++x, y);
		installDepend = newCheckBox(installOps, "��װ����������", ++x, y);
		installDepend.setEnabled(false);
		uninstallOther = newCheckBox(installOps, "ж������������", ++x, y);
		
		JPanel dirPanel = newPanel(null);
		panel.add(dirPanel, BorderLayout.CENTER);
		//panel.add(newPanel("haha"), BorderLayout.CENTER);
		//panel = subPanel;
		
		newLabel(dirPanel, "Ӧ�ø�Ŀ¼: ", 0, 0);
		appRoot = newText(dirPanel, 1, 0);
		JButton browApp = newButton(dirPanel, "���..", 2, 0);
		browApp.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				JFileChooser jfc = new JFileChooser(new File(appRoot.getText()));  
                jfc.setDialogTitle("��ѡ��Ӧ�õĸ�Ŀ¼");  
                jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
                if (JFileChooser.APPROVE_OPTION != jfc.showOpenDialog(PackInstaller.this)) {
                	return;
                }
                File file = jfc.getSelectedFile(); 
                File webFile = new File(file, "WEB-INF/web.xml");
                if (!webFile.exists()) {
                	JOptionPane.showMessageDialog(null, "����ѡ��WEB��Ŀ¼���ļ������ڣ�" + webFile.getAbsolutePath()); 
                	return;
                }
                appRoot.setText(file.getAbsolutePath());
			}
		});
		
		
		newLabel(dirPanel, "����Դ�����ļ�: ", 0, 1);
		dsConfig = newText(dirPanel, 1, 1);
		JButton browDs = newButton(dirPanel, "���..", 2, 1);
		browDs.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				JFileChooser jfc = new JFileChooser(new File(dsConfig.getText()));  
                jfc.setDialogTitle("��Ӧ�õĸ�Ŀ¼");  
                jfc.setFileSelectionMode(JFileChooser.FILES_ONLY);
                jfc.setFileFilter(new FileFilter() {
					@Override
					public String getDescription() {
						return "���ݿ������ļ�";
					}
					@Override
					public boolean accept(File f) {
						return f.isDirectory() || f.getName().toLowerCase().endsWith(".xml");
					}
				});
                if (JFileChooser.APPROVE_OPTION != jfc.showOpenDialog(PackInstaller.this)) {
                	return;
                }
                File file = jfc.getSelectedFile();
                dsConfig.setText(file.getAbsolutePath());
			}
		});
		
		JPanel opPane = newPanel(null);
		this.getContentPane().add(opPane, BorderLayout.SOUTH);
		opPane.setLayout(new BorderLayout());
		panel = newPanel(null);
		opPane.add(panel, BorderLayout.CENTER);
		//this.getContentPane().add(panel, BorderLayout.SOUTH);
		x=0;y=0;
		newButton(panel, "�������ݿ�", x++, 0).addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				readDsConfig();
				final JButton btn = (JButton) e.getSource();
				//btn.setText("��������...");
				btn.setEnabled(false);
				//PackInstaller.this.update(getGraphics());
				Thread t = new Thread() {
					@Override
					public void run() {
						try {
							btn.setText("��������...");
							Class.forName(dsClsName);
							Connection conn = DriverManager.getConnection(dsUrl, dsUser, dsPass);
							//conn.getSchema();
							conn.close();
							JOptionPane.showMessageDialog(null, "���ݿ����ӳɹ�" + dsUrl);
						} catch (Exception ex) {
							ex.printStackTrace();
							JOptionPane.showMessageDialog(null, "���ݿ�����ʧ��" + dsUrl + "," + ex.getMessage());
						}
						btn.setEnabled(true);
						btn.setText("�������ݿ�");
					}
				};
				t.start();
			}
		});
		newButton(panel, "��ʼ��װ", x++, 0).addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				int index = packCombo.getSelectedIndex();
				if (index == -1 || packUuids.isEmpty()) {
					JOptionPane.showMessageDialog(null, "����ѡ��һ��������");
					return;
				}
				String uuid = packUuids.get(packCombo.getSelectedIndex());
				File file;
				try {
					file = InstallUtil.downloadPack(rootPath, sessionid, appRoot.getText(), uuid);
				} catch (Exception e2) {
					e2.printStackTrace();
					JOptionPane.showMessageDialog(null, "���ذ�ʱ����:" + e2.getMessage());
					return;
				}
				
				//ж������������
				if (uninstallOther.isSelected()) {
					try {
						InstallUtil.unstallPacks(new File(appRoot.getText()));
					} catch (IOException e1) {
						e1.printStackTrace();
						JOptionPane.showMessageDialog(null, "ж�ؾɹ�����ʱ����:" + e1.getMessage());
						return;
					}
				}
				
				Connection conn;
				try {
					readDsConfig();
					Class.forName(dsClsName);
					conn = DriverManager.getConnection(dsUrl, dsUser, dsPass);
				} catch (Exception ex) {
					ex.printStackTrace();
					JOptionPane.showMessageDialog(null, "�������ݿ�ʱ����:" + ex.getMessage());
					return;
				}
				try {
					InstallUtil.installPack(new File(appRoot.getText()), file, conn);
				} catch (Exception e1) {
					e1.printStackTrace();
					JOptionPane.showMessageDialog(null, "��װʱ����:" + e1.getMessage());
				}
				try {
					if (conn != null)
					conn.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				JOptionPane.showMessageDialog(null, "��װ��ɣ�������WEBӦ��");
				
			}
		});
		
		panel = newPanel(null);
		opPane.add(panel, BorderLayout.SOUTH);
		x=0;y=0;
		newLabel(panel, "��Ϣ:", x++, y);
		status = newText(panel, x++, y);
		status.setBorder(null);
		status.setEditable(false);
		//newButton(panel, "���..", 2, 1);
		
		try {
			restoreConfig();
		} catch (Exception e1) {
			JOptionPane.showMessageDialog(this, "װ�������ļ�ʱ����:" + e1.getMessage());
		}
	}
		
	private String dsClsName;
	private String dsPass;
	private String dsUser;
	private String dsUrl;
	private void readDsConfig() {
		File file = new File(dsConfig.getText());
		if (!file.exists() && !file.isFile()) {
			JOptionPane.showMessageDialog(null, "����ѡ������Դ�����ļ�");
			return;
		}
		String content;
		try {
			content = readContent(new FileInputStream(file));
		} catch (Exception e1) {
			e1.printStackTrace();
			JOptionPane.showMessageDialog(null, "��ȡ����Դʱ����" + e1.getMessage());
			return;
		}
		
		dsClsName = getConfSection(content, "driverClassName");
		dsPass = getConfSection(content, "password");
		dsUser = getConfSection(content, "username");
		dsUrl = getConfSection(content, "url");
	}
	
	private String getConfSection(String content, String keyword) {
		int index = content.indexOf(keyword);
		int start = content.indexOf('"', index + keyword.length());
		int end = content.indexOf('"', start + 1);
		return content.substring(start+1, end);
	}
	
	@SuppressWarnings("unchecked")
	private void getPacks() throws Exception{
		packCombo.removeAllItems();
		packUuids.clear();
		if (sessionid == null || sessionid.startsWith("-")) {
			JOptionPane.showMessageDialog(null, "�����ȵ�¼");
			return;
		}
		String url = rootPath + "pack/bystat?status=";
		if (this.cbSAssigned.isSelected()) {
			url += "6,";
		}
		if (this.cbSBuilded.isSelected()) {
			url += "4,";
		}
		if (this.cbSChecked.isSelected()) {
			url += "3,";
		}
		if (this.cbSTesting.isSelected()) {
			url += "7,";
		}
		if (url.endsWith(",")) {
			url = url.substring(0, url.length() - 1);
		} else {
			url += "7";
		}
        URL u=new URL(url);
        HttpURLConnection con=(HttpURLConnection)u.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Cookie", sessionid);
        InputStream in = con.getInputStream();
        String str = readContent(in);
        JSONObject json = JSONObject.fromObject(str);
        List<Map<String, Object>> list = (List<Map<String, Object>>) json.get("rows");
        for (Map<String, Object> row : list) {
        	String branch = (String) ((Map<String, Object>)row.get("branch")).get("branch");
        	String item = "[" + branch + "] -" + row.get("buildNo") + "(" + row.get("status") + ")";
        	packUuids.add((String) row.get("uuid"));
        	packCombo.addItem(item);
        }
	}
	
	private boolean login() throws Exception {
		String uname = userName.getText();
		char[] paswd = password.getPassword();
		if (uname.length() == 0) {
			JOptionPane.showMessageDialog(PackInstaller.this, "�û�������Ϊ��");
			return false;
		}
		sessionid = "-1";
		String path = serverAddr.getText();
		if (path.trim().length() == 0) {
			JOptionPane.showMessageDialog(null, "��������ַ����Ϊ��");
			return false;
		}
		if (!path.startsWith("http://"))
			path = "http://" + path;
		if (!path.endsWith("/"))
			path = path + "/";
		rootPath = path;
		
		String loginPath = path + "user/login?t=1&username=" + uname + "&password=" + new String(paswd);
		URL url = new URL(loginPath);
		URLConnection conn = url.openConnection();
		InputStream input = (InputStream) conn.getContent();
		String str = readContent(input);
		String prefix = "\"sessionId\":\"";
		int sIndex = str.indexOf(prefix);
		if (sIndex != -1) {
			int eIndex = str.indexOf("\"", sIndex + prefix.length());
			if (eIndex != -1) {
				sessionid = str.substring(sIndex + prefix.length(), eIndex);
			}
		}
		if (sessionid.startsWith("-")) {
			JOptionPane.showMessageDialog(null, "��¼ʧ��!");
			return false;
		} else {
			setStatus("�ɹ���¼ϵͳ��" + new Date());
			return true;
		}
	}
	
	private void setStatus(String str) {
		this.status.setText(str == null ? "" : str);
	}
	
	private String readContent(InputStream input) throws IOException {
		int size = 1024;
		byte[] bs = new byte[size];
		int len= 0;
		while((len = input.read(bs, bs.length-size, size)) != -1) {
			byte[] nbs = new byte[bs.length + len];
			System.arraycopy(bs, 0, nbs, 0, bs.length);
			bs = nbs;
		}
		input.close();
		return new String(bs, "UTF-8");
	}
	
	private void saveConfig() throws Exception{
		Properties prop = new Properties();
		prop.setProperty("username", userName.getText());
		prop.setProperty("password", new String(password.getPassword()));
		prop.setProperty("appRoot", appRoot.getText());
		prop.setProperty("dsConfig", dsConfig.getText());
		prop.setProperty("server", serverAddr.getText());
		
		prop.setProperty("installPatch", installPatch.isSelected() ? "true" : "false");
		prop.setProperty("installDepend", installDepend.isSelected() ? "true" : "false");
		prop.setProperty("uninstallOther", uninstallOther.isSelected() ? "true" : "false");
		
		FileOutputStream out = new FileOutputStream(new File("./packInstall.prop"));
		prop.store(out, new Date().toString());
		out.flush();
		out.close();
	}
	
	private void restoreConfig() throws Exception {
		File configFile = new File("./packInstall.prop");
		if (!configFile.exists())
			return;
		Properties prop = new Properties();
		FileInputStream input = new FileInputStream(new File("./packInstall.prop"));
		prop.load(input);
		input.close();
		this.userName.setText(prop.getProperty("username") == null ? "" : prop.getProperty("username"));
		this.password.setText(prop.getProperty("password") == null ? "" : prop.getProperty("password"));
		this.appRoot.setText(prop.getProperty("appRoot") == null ? "" : prop.getProperty("appRoot"));
		this.dsConfig.setText(prop.getProperty("dsConfig") == null ? "" : prop.getProperty("dsConfig"));
		this.serverAddr.setText(prop.getProperty("server") == null ? "" : prop.getProperty("server"));
		
		
		installPatch.setSelected("true".equals(prop.getProperty("installPatch"))? true : false);
		installDepend.setSelected("true".equals(prop.getProperty("installDepend"))? true : false);
		uninstallOther.setSelected("true".equals(prop.getProperty("uninstallOther"))? true : false);
	}
	
	
	private void addToParent(Container parent, JPanel panel, int x, int y) {
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 0.5, 0.5, GridBagConstraints.NORTHWEST, GridBagConstraints.HORIZONTAL,
				defaultInsert, 1, 1);
		parent.add(panel, cons);
	}
	
	private JPanel newPanel(String title) {
		JPanel panel = new JPanel();
		if (title != null)
			panel.setBorder(new TitledBorder(title));
		panel.setLayout(new GridBagLayout());
		return panel;
	}
	
	private JLabel newLabel(Container parent, String label, int x, int y) {
		JLabel jl = new JLabel(label);
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 0, 0, GridBagConstraints.EAST, GridBagConstraints.NONE,
				defaultInsert, 1, 1);
		parent.add(jl, cons);
	    return jl;
	}
	
	private JTextField newText(Container parent, int x, int y) {
		JTextField text = new JTextField();
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 1, 0, GridBagConstraints.WEST, GridBagConstraints.HORIZONTAL,
				defaultInsert, 1, 1);
		parent.add(text, cons);
		return text;
	}
	
	private JComboBox<String> newCombo(Container parent, int x, int y) {
		JComboBox<String> combo = new JComboBox<String>();
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 1, 0, GridBagConstraints.WEST, GridBagConstraints.HORIZONTAL,
				defaultInsert, 1, 1);
		parent.add(combo, cons);
		return combo;
	}
	
	private JButton newButton(Container parent, String label, int x, int y) {
		JButton btn = new JButton(label);
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 0, 0, GridBagConstraints.EAST, GridBagConstraints.NONE,
				defaultInsert, 1, 1);
		parent.add(btn, cons);
		return btn;
	}
	
	private JPasswordField newPassword(Container parent, int x, int y) {
		JPasswordField psw = new JPasswordField();
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 1, 0, GridBagConstraints.WEST, GridBagConstraints.HORIZONTAL,
				defaultInsert, 1, 1);
		parent.add(psw, cons);
		return psw;
	}
	
	private JCheckBox newCheckBox(Container parent, String label, int x, int y) {
		JCheckBox box = new JCheckBox(label);
		GridBagConstraints cons = new GridBagConstraints(x, y, 1, 1, 0, 0, GridBagConstraints.NORTHWEST, GridBagConstraints.NONE,
				defaultInsert, 1, 1);
		parent.add(box, cons);
		return box;
	}
	
	

	public static void main(String[] args) {
		final PackInstaller f = new PackInstaller();
		f.setBounds(100, 100, 600, 400);
		f.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosed(WindowEvent e) {
				try {
					f.saveConfig();
				} catch (Exception e1) {
					JOptionPane.showMessageDialog(f, "����������Ϣʧ��!" + e1.getMessage());
				}
				System.exit(0);
			}
		});
	}
}
