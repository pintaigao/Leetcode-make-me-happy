public class Solution {
    public String reverseString(String s) {
        char[] result = s.toCharArray();
        int start = 0, end = result.length - 1;
        while (start < end) {
            char temp = result[start];
            result[start] = result[end];
            result[end] = temp;
            start++;
            end--;
        }
        return new String(result);
    }
}
