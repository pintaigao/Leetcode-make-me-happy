class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        boolean[] result = new boolean[s.length() + 1];
        result[0] = true;
        for(int i = 1;i <= s.length();i++){
            for(int j = i-1;j>=0;j--){
                if(result[j] && wordDict.contains(s.substring(j, i))){
                    result[i] = true;
                    break;
                }
            }
        }
        return result[s.length()];
    }
}