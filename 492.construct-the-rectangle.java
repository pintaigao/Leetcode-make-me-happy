class Solution {
	public int[] constructRectangle(int area) {
		int length =(int) Math.sqrt(area);
		while(area%length != 0) length--;;
		return new int[]{area/length,length};        
	}
}