class Solution {
    public int start,end;
    public String longestPalindrome(String s) {
        if (s.length() < 2)
            return s;
        for(int i=0 ;i< s.length();i++){
            helper(s,i,i);
            helper(s,i,i+1);
        }
        return s.substring(start,start+end);
    }

    public void helper(String s,int i,int j){
        while(i >= 0 && j < s.length()&& s.charAt(i) == s.charAt(j)){
            i--;
            j++;
        }
        if(end < j-i-1){
            start = i+1;
            end = j-i-1;
        }
    }
}