class Solution {
    public boolean isSubsequence(String s, String t) {
        int prev = 0;
        for(int i =0;i<s.length();i++){
            char tempchar = s.charAt(i);
            prev = t.indexOf(tempchar, prev);  // indexof(char char,int fromIndex) ..
            if(prev == -1) return false;
            prev ++;
        }
        return true;
    }
}