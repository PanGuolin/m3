package com.m3.patchbuild.sys.action;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;

/**
 * 验证工具类
 * @author pangl
 *
 */
public abstract class ValidateUtil {
	
	public static byte[] getImageData(String text) throws IOException{
       int width=85, height=20;  
       BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
       Graphics g = image.getGraphics();  
       Random random = new Random();  
       g.setColor(getRandColor(200,250));  
       g.fillRect(0, 0, width, height);  
       g.setFont(new Font("Times New Roman",Font.PLAIN,18));  
       g.setColor(getRandColor(160,200));  
       for (int i=0;i<155;i++)  {  
        int x = random.nextInt(width);  
        int y = random.nextInt(height);  
               int xl = random.nextInt(12);  
               int yl = random.nextInt(12);  
        g.drawLine(x,y,x+xl,y+yl);  
       } 
       for (int i=0; i<text.length(); i++) {
    	   g.setColor(new Color(20+random.nextInt(110),20+random.nextInt(110),20+random.nextInt(110))); 
    	   g.drawString(text.charAt(i)+"",13*i+6,16);
       }
       g.dispose();  
       ByteArrayOutputStream output = new ByteArrayOutputStream();  
       ImageOutputStream imageOut = ImageIO.createImageOutputStream(output);  
       ImageIO.write(image, "JPEG", imageOut);  
       imageOut.close();  
       return output.toByteArray();
	}
	
	
	/*  
     * 给定范围获得随机颜色  
     */  
    private static Color getRandColor(int fc,int bc){  
        Random random = new Random();  
        if(fc>255) fc=255;  
        if(bc>255) bc=255;  
        int r=fc+random.nextInt(bc-fc);  
        int g=fc+random.nextInt(bc-fc);  
        int b=fc+random.nextInt(bc-fc);  
        return new Color(r,g,b);  
   }  

}
