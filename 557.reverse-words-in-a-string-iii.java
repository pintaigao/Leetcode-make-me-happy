/*
 * @lc app=leetcode id=557 lang=java
 *
 * [557] Reverse Words in a String III
 */

// @lc code=start
class Solution {
    /* 1. 简单粗暴法 */
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
    /* 2. 最优解 */
}

class Solution {
    public String reverseWords(String s) {
        char[] arr = s.toCharArray();
        int i = 0, j = 0, ws = 0;

        while (ws < s.length()) {
            ws = s.indexOf(' ', j);
            if (ws == -1)
                ws = s.length();

            i = ws - 1;
            rev(arr, j, i);

            ws++;
            j = ws;
        }

        return new String(arr);
    }

    public void rev(char[] arr, int start, int end) {
        while (end > start) {
            char temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;

            end--;
            start++;
        }
    }
}

// @lc code=end
