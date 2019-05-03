public class Solution {
    public boolean wordPattern(String pattern, String str) {
        String[] strs = str.split(" ");
        if (pattern.length() != strs.length)
            return false;
        HashMap<Character, String> hm1 = new HashMap<Character, String>();
        HashMap<String, Character> hm2 = new HashMap<String, Character>();
        for (int i = 0; i < pattern.length(); ++i) {
            if (hm1.containsKey(pattern.charAt(i))) {
                if (!hm1.get(pattern.charAt(i)).equals(strs[i]))
                    return false;
            } else {
                if (hm2.containsKey(strs[i]))
                    return false;
                else {
                    hm1.put(pattern.charAt(i), strs[i]);
                    hm2.put(strs[i], pattern.charAt(i));
                }
            }
        }
        return true;
    }
}