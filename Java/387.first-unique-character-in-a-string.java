import java.util.Set;

public class Solution {
    public int firstUniqChar(String s) {
        int[] map = new int[26];
        for (int i = 0; i < s.length(); i++) {
            map[s.charAt(i) - 'a']++;
        }
        int minindex = Integer.MAX_VALUE;
        for (int i = 0; i < map.length; i++) {
            if (map[i] == 1 && s.indexOf((char) (i + 'a')) < minindex) {
                minindex = s.indexOf((char) (i + 'a'));
            }
        }
        return minindex == Integer.MAX_VALUE ? -1 : minindex;
    }
}