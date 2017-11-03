class Solution {
	public int compress(char[] chars) {
		int j = 0, curRun = 1, n = chars.length;
		for (int i=1;i<=n;i++,curRun++) {
			if (i < n && chars[i] == chars[i-1]) continue;           
			chars[j++] = chars[i-1];
			if (curRun != 1) {
				String s = Integer.toString(curRun);
				for (int k=j;k<j+s.length();k++) chars[k] = s.charAt(k-j);
				j += s.length();  
			}
			curRun = 0;    
		}
		return j;
	}
}