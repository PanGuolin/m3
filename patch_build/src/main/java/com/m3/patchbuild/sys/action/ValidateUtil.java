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
		final int width = 85;
		final int height = 20;
       BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
       Graphics g = image.getGraphics();  
       Random random = new Random();  
       final int fc1 = 200, bc1 = 250;
       g.setColor(getRandColor(fc1,bc1));  
       g.fillRect(0, 0, width, height);  
       final int fontSize = 18;
       g.setFont(new Font("Times New Roman",Font.PLAIN,fontSize)); 
       final int fc2 = 160, bc2 = 200;
       g.setColor(getRandColor(fc2, bc2));  
       final int lineCount = 155;
       final int interval = 12;
       for (int i=0;i<lineCount;i++)  {  
        int x = random.nextInt(width);  
        int y = random.nextInt(height);  
               int xl = random.nextInt(interval);  
               int yl = random.nextInt(interval);  
        g.drawLine(x,y,x+xl,y+yl);  
       } 
       final int interval2 = 110;
       final int base = 20;
       final int charWidth = 13;
       final int charOff = 6;
       final int charHeight = 16;
       for (int i=0; i<text.length(); i++) {
    	   g.setColor(new Color(base+random.nextInt(interval2),base+random.nextInt(interval2),base+random.nextInt(interval2))); 
    	   g.drawString(text.charAt(i)+"",charWidth*i+charOff,charHeight);
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
    	final int maxColor = 255;
        Random random = new Random();  
        if(fc>maxColor) fc=maxColor;  
        if(bc>maxColor) bc=maxColor;  
        int r=fc+random.nextInt(bc-fc);  
        int g=fc+random.nextInt(bc-fc);  
        int b=fc+random.nextInt(bc-fc);  
        return new Color(r,g,b);  
   }  

}
