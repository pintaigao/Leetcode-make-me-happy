class Solution {
    public int findLUSlength(String[] strs) {
   
        Arrays.sort(strs, new Comparator<String>(){
        	public int compare(String s1, String s2){
        		return -(s1.length() - s2.length());
        	}
        });

        for(int i = 0; i < strs.length; i++){
            boolean flag = false;
        	for(int j = 0; j < strs.length && strs[j].length() >= strs[i].length(); j++){
                if(j == i) continue;
        		if(helper(strs[j],strs[i])) {
                    flag = true;
                    break;
                }
        	}
            if(!flag) return strs[i].length();
        }

        return -1;
    }


    public boolean helper(String s1, String s2){
    	int index = 0;
    	for(int i = 0; i < s1.length(); i++){
    		if(s1.charAt(i) == s2.charAt(index)) index++;
    		if(index == s2.length()) return true;
    	}
    	return false;
    }
}
