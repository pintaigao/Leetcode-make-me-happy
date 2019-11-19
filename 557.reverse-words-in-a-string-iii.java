/*
 * @lc app=leetcode id=557 lang=java
 *
 * [557] Reverse Words in a String III
 */

// @lc code=start
class Solution {
    public String reverseWords(String s) {

        String strArray[] = s.split(" ");
        for (int i = 0; i < strArray.length; i++) {
            StringBuilder sb = new StringBuilder(strArray[i]);
            sb = sb.reverse();
            strArray[i] = sb.toString();
        }
        String str = String.join(" ", strArray);
        return str;
    }
}
// @lc code=end
