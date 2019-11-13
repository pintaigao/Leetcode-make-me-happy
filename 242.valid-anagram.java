/*
 * @lc app=leetcode id=242 lang=java
 *
 * [242] Valid Anagram
 */

// @lc code=start
class Solution {
    public boolean isAnagram(String s, String t) {
        int[] charArray = new int[26];
        char[] array1 = s.toCharArray();
        for (char c : array1) {
            charArray[c - 'a']++;
        }

        for (char c : t.toCharArray()) {
            charArray[c - 'a']--;
            if (charArray[c - 'a'] < 0) {
                return false;
            }
        }

        for (int i = 0; i < charArray.length; i++) {
            if (charArray[i] > 0)
                return false;
        }

        return true;
    }
}
// @lc code=end
